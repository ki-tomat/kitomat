#!/usr/bin/env python3
"""Extract one AP15 ZIP into its deterministic artifact path without trusting metadata."""
import argparse
import json
import shutil
import sys
import zipfile
from pathlib import Path, PurePosixPath

import yaml

FOLDERS = {'prompt': ('prompts', 'prompt_package'), 'dataset': ('datasets', 'dataset_package'), 'industry': ('models', 'model')}
ALLOWED = {'.md', '.yml', '.yaml'}
MAX_ENTRIES = 100
MAX_UNCOMPRESSED = 100 * 1024 * 1024
MAX_RATIO = 50

parser = argparse.ArgumentParser()
parser.add_argument('--zip', required=True)
parser.add_argument('--type', required=True, choices=FOLDERS)
parser.add_argument('--id', required=True)
parser.add_argument('--destination', required=True)
parser.add_argument('--status', required=True, choices=('bronze', 'silver', 'gold'))
args = parser.parse_args()

folder, artifact_type = FOLDERS[args.type]
prefix = PurePosixPath(folder, args.id)
destination = Path(args.destination).resolve()
target = (destination / folder / args.id).resolve()
if target.exists():
    sys.exit('Zielartefakt existiert bereits; AP15 überschreibt nie vorhandene Inhalte.')

with zipfile.ZipFile(args.zip) as archive:
    files = [entry for entry in archive.infolist() if not entry.filename.startswith('__MACOSX/') and '.DS_Store' not in entry.filename]
    if not files or len(files) > MAX_ENTRIES:
        sys.exit('ZIP enthält keine oder zu viele Dateien.')
    paths = set()
    uncompressed = 0
    compressed = 0
    for entry in files:
        path = PurePosixPath(entry.filename)
        mode = (entry.external_attr >> 16) & 0o170000
        if entry.flag_bits & 0x1 or mode == 0o120000 or entry.compress_type not in {zipfile.ZIP_STORED, zipfile.ZIP_DEFLATED}:
            sys.exit(f'Unzulässiger ZIP-Eintrag: {entry.filename}')
        if entry.is_dir() or '\\' in entry.filename or '\x00' in entry.filename or path.is_absolute() or '..' in path.parts or path.parts[:2] != prefix.parts or path.suffix.lower() not in ALLOWED:
            sys.exit(f'Unzulässiger ZIP-Eintrag: {entry.filename}')
        normalized = str(path).casefold()
        if normalized in paths:
            sys.exit(f'Doppelter ZIP-Eintrag: {entry.filename}')
        paths.add(normalized)
        uncompressed += entry.file_size
        compressed += entry.compress_size
        if uncompressed > MAX_UNCOMPRESSED or (entry.file_size and not entry.compress_size) or (compressed and uncompressed / compressed > MAX_RATIO):
            sys.exit('ZIP überschreitet die zulässigen Entpackgrenzen.')
        content = archive.read(entry)
        try:
            content.decode('utf-8')
        except UnicodeDecodeError:
            sys.exit(f'Datei ist nicht UTF-8: {entry.filename}')
        output = (destination / Path(*path.parts)).resolve()
        if target not in output.parents and output != target:
            sys.exit(f'Zielpfad außerhalb des Artefakts: {entry.filename}')
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_bytes(content)

metadata_path = target / 'metadata.yml'
if not metadata_path.is_file():
    sys.exit('metadata.yml fehlt.')
metadata = yaml.safe_load(metadata_path.read_text(encoding='utf-8'))
if not isinstance(metadata, dict):
    sys.exit('metadata.yml ist ungültig.')
metadata['artifact_type'] = artifact_type
metadata['status'] = args.status
metadata['human_review_required'] = True
metadata_path.write_text(yaml.safe_dump(metadata, allow_unicode=True, sort_keys=False), encoding='utf-8')
print(json.dumps({'artifact_path': str(Path(folder, args.id)), 'artifact_type': artifact_type, 'artifact_id': args.id}))
