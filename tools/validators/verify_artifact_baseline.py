#!/usr/bin/env python3
"""Ensure the approved AP14 baseline artifacts remain byte-for-byte intact."""
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASELINE = Path(__file__).with_name("artifact_baseline.json")
ROOTS = ("prompts", "datasets", "models")


def snapshot() -> dict[str, str]:
    entries: dict[str, str] = {}
    for root_name in ROOTS:
        root = ROOT / root_name
        if not root.exists():
            continue
        for path in sorted(item for item in root.rglob("*") if item.is_file()):
            relative = path.relative_to(ROOT).as_posix()
            entries[relative] = hashlib.sha256(path.read_bytes()).hexdigest()
    return entries


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="write the current tree as the protected baseline")
    args = parser.parse_args()
    current = snapshot()

    if args.write:
        BASELINE.write_text(json.dumps({"files": current}, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        print(f"Artifact baseline written for {len(current)} files.")
        return 0

    try:
        expected = json.loads(BASELINE.read_text(encoding="utf-8"))["files"]
    except (FileNotFoundError, json.JSONDecodeError, KeyError, TypeError) as exc:
        print(f"Artifact baseline is unavailable: {exc}", file=sys.stderr)
        return 1

    missing = sorted(path for path in expected if path not in current)
    changed = sorted(path for path, digest in expected.items() if current.get(path) not in (None, digest))
    if missing or changed:
        print("Artifact baseline validation failed:")
        for path in missing:
            print(f"- missing: {path}")
        for path in changed:
            print(f"- changed: {path}")
        return 1

    print(f"Artifact baseline validation passed for {len(expected)} protected files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
