#!/usr/bin/env python3
"""
Stufe 1a - deterministische Vorpruefung fuer den KItomat Review-Agenten.

Laeuft lokal, ohne Netzzugriff und ohne Datenuebertragung. Erst wenn diese
Pruefung sauber durchlaeuft, darf ein Sprachmodell den Beitrag sehen.

Aendert nichts im Hauptrepository. Die Muster werden aus dem bestehenden
Validator importiert, damit beide synchron bleiben; die Bewertung der Treffer
erfolgt hier strenger (blockierend statt warnend).

Aufruf:
    python3 stage1a_scan.py <repo-root> <artefakt-pfad>

Beispiel:
    python3 stage1a_scan.py . models/kmu-ki-online-marketing-workbook
"""
from __future__ import annotations

import hashlib
import json
import re
import sys
from pathlib import Path

import yaml

TEXT_SUFFIXES = {".md", ".txt", ".csv", ".yml", ".yaml", ".json"}

PII_PATTERNS = {
    "email": re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"),
    "phone_like": re.compile(r"\b(?:\+?\d[\d\s()./-]{7,}\d)\b"),
    "iban_like": re.compile(r"\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b"),
    "german_tax_id_like": re.compile(r"\b\d{11}\b"),
}

PLACEHOLDERS = ["TODO", "TBD", "lorem ipsum", "Replace with", "replace-with", "pXX"]


def load_catalog(review_root: Path) -> dict:
    return yaml.safe_load((review_root / "policy" / "review-checks.yml").read_text(encoding="utf-8"))


def build_exclusions(catalog: dict) -> list[re.Pattern]:
    """Vorfilter gegen falsch-positive PII-Treffer.

    Abrufdaten sind laut Abgabe-Checkliste Pflicht. Das Muster phone_like trifft
    aber auf jedes ISO-Datum. Ohne diesen Vorfilter wuerde das Gate praktisch
    jeden korrekten Beitrag blockieren.
    """
    phase0 = next(p for p in catalog["phases"] if p["id"] == "phase-0")
    check = next(c for c in phase0["checks"] if c["id"] == "safety.pii_scan")
    return [re.compile(e["pattern"]) for e in check.get("exclude_before_matching", [])]


def scrub(text: str, exclusions: list[re.Pattern]) -> str:
    """Ersetzt Datums- und Versionsangaben laengengleich durch Leerzeichen,
    damit Zeilennummern und Offsets erhalten bleiben."""
    for rx in exclusions:
        text = rx.sub(lambda m: " " * len(m.group()), text)
    return text


TYPE_BY_ROOT = {
    "prompts": "prompt_package",
    "datasets": "dataset_package",
    "models": "model",
}
ROOT_BY_TYPE = {v: k for k, v in TYPE_BY_ROOT.items()}


def _resolve_type(artifact_rel: str, metadata: dict) -> tuple[str, str, str]:
    """Ermittelt Artefakttyp und den kanonischen Pfad im Content-Repository.

    Zwei Wege fuehren zu einem Review:

    1. Der Beitrag liegt bereits unter `prompts/`, `datasets/` oder `models/`.
       Dann bestimmt der Pfad den Typ - so wie es die Validatoren des
       Hauptrepositorys auch tun.

    2. Der Beitrag liegt in `review/intake/`, weil ihn jemand ohne
       Schreibrechte abgegeben hat. Dort gibt es diese Ordnerstruktur nicht.
       Dann entscheidet `artifact_type` aus `metadata.yml`, und der spaetere
       Zielpfad wird daraus abgeleitet.

    Rueckgabe: (typ, kanonischer_pfad, herkunft_der_typangabe)
    """
    root = artifact_rel.split("/")[0]

    if root in TYPE_BY_ROOT:
        return TYPE_BY_ROOT[root], artifact_rel, "pfad"

    declared = str(metadata.get("artifact_type") or "").strip()
    artifact_id = str(metadata.get("id") or "").strip()

    if declared in ROOT_BY_TYPE and artifact_id:
        return declared, f"{ROOT_BY_TYPE[declared]}/{artifact_id}", "metadata"

    if declared in ROOT_BY_TYPE:
        # Ohne id laesst sich kein Zielpfad bilden. Ordnername als Notbehelf.
        fallback = artifact_rel.rstrip("/").split("/")[-1]
        return declared, f"{ROOT_BY_TYPE[declared]}/{fallback}", "metadata"

    return "unknown", artifact_rel, "unbekannt"


def scan(repo_root: Path, artifact_rel: str, review_root: Path) -> dict:
    # Unter Windows kommt der Pfad mit Backslashes an. Im Ergebnisdokument
    # stehen aber immer Schraegstriche - so verlangt es das Schema, und so
    # sind Ergebnisse plattformunabhaengig vergleichbar.
    artifact_rel = artifact_rel.replace("\\", "/").strip("/")
    artifact = repo_root / artifact_rel
    if not artifact.is_dir():
        raise SystemExit(f"Artefaktordner nicht gefunden: {artifact}")

    catalog = load_catalog(review_root)
    exclusions = build_exclusions(catalog)

    phase0 = next(p for p in catalog["phases"] if p["id"] == "phase-0")
    pii_check = next(c for c in phase0["checks"] if c["id"] == "safety.pii_scan")
    blocking_patterns = set(pii_check.get("blocking_patterns", list(PII_PATTERNS)))

    files: list[dict] = []
    pii_raw: list[dict] = []
    pii_filtered: list[dict] = []
    placeholders: list[dict] = []

    for path in sorted(artifact.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(artifact).as_posix()
        raw = path.read_bytes()
        is_text = path.suffix.lower() in TEXT_SUFFIXES
        files.append({
            "path": rel,
            "sha256": hashlib.sha256(raw).hexdigest(),
            "size_bytes": len(raw),
            "sent_to_agent": is_text,
            "redaction_count": 0,
        })
        if not is_text:
            continue

        text = path.read_text(encoding="utf-8", errors="ignore")
        cleaned = scrub(text, exclusions)
        for label, rx in PII_PATTERNS.items():
            for match in rx.finditer(text):
                pii_raw.append({"file": rel, "label": label, "value": match.group()[:60]})
            for match in rx.finditer(cleaned):
                hit = {
                    "file": rel,
                    "line": cleaned.count("\n", 0, match.start()) + 1,
                    "label": label,
                    "value": match.group()[:60],
                    "blocking": label in blocking_patterns,
                }
                pii_filtered.append(hit)
        for word in PLACEHOLDERS:
            if word in text:
                placeholders.append({"file": rel, "placeholder": word})

    # Metadaten zuerst lesen - sie werden fuer die Typerkennung gebraucht
    meta_path = artifact / "metadata.yml"
    meta_alt = artifact / "metadata.yaml"
    metadata, meta_note = {}, None
    if meta_path.exists():
        metadata = yaml.safe_load(meta_path.read_text(encoding="utf-8")) or {}
    elif meta_alt.exists():
        metadata = yaml.safe_load(meta_alt.read_text(encoding="utf-8")) or {}
        meta_note = "Datei heisst metadata.yaml statt metadata.yml und wird vom Validator nicht gefunden."

    artifact_type, canonical_path, type_source = _resolve_type(artifact_rel, metadata)

    phase2 = next(p for p in catalog["phases"] if p["id"] == "phase-2")
    spec = phase2["required_files"].get(artifact_type, {"files": []})
    missing = [f for f in spec.get("files", []) if not (artifact / f).exists()]
    one_of = spec.get("one_of", [])
    one_of_ok = (not one_of) or any((artifact / d.rstrip("/")).exists() for d in one_of)

    maintainer = str(metadata.get("maintainer", ""))
    maintainer_ok = bool(re.fullmatch(r"p\d{2}", maintainer))

    blocking_hits = [h for h in pii_filtered if h["blocking"]]
    notice_hits = [h for h in pii_filtered if not h["blocking"]]
    hard_stop = bool(blocking_hits)

    return {
        "artifact_path": canonical_path,
        "source_path": artifact_rel,
        "type_source": type_source,
        "artifact_type": artifact_type,
        "files": files,
        "metadata": metadata,
        "metadata_note": meta_note,
        "findings": {
            "pii_raw_count": len(pii_raw),
            "false_positives_removed": len(pii_raw) - len(pii_filtered),
            "pii_blocking": blocking_hits,
            "pii_notice": notice_hits,
            "placeholders": placeholders,
            "missing_required_files": missing,
            "one_of_satisfied": one_of_ok,
            "maintainer_is_code": maintainer_ok,
        },
        "hard_stop_triggered": hard_stop,
        "gate": "blocked" if hard_stop else "open",
    }


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    repo_root = Path(sys.argv[1]).resolve()
    artifact_rel = sys.argv[2].strip("/")
    review_root = Path(__file__).resolve().parents[1]

    result = scan(repo_root, artifact_rel, review_root)
    f = result["findings"]

    print(f"Artefakt       : {result['artifact_path']}  ({result['artifact_type']})")
    if result["source_path"] != result["artifact_path"]:
        print(f"Gelesen aus    : {result['source_path']}  "
              f"(Typ aus {result['type_source']})")
    print(f"Dateien        : {len(result['files'])}")
    print(f"PII roh        : {f['pii_raw_count']}  Vorfilter entfernte: {f['false_positives_removed']}")
    print(f"PII blockierend: {len(f['pii_blocking'])}")
    for hit in f["pii_blocking"][:10]:
        print(f"   STOPP {hit['file']}:{hit['line']}  {hit['label']}  {hit['value']!r}")
    if f["pii_notice"]:
        print(f"PII Hinweis    : {len(f['pii_notice'])} Zahlenfolgen zur menschlichen Sichtung")
        for hit in f["pii_notice"][:3]:
            print(f"   {hit['file']}:{hit['line']}  {hit['value']!r}")
    print(f"Pflichtdateien : {'vollstaendig' if not f['missing_required_files'] else f['missing_required_files']}")
    if not f["one_of_satisfied"]:
        print("   canvas/ oder worksheet/ fehlt")
    if f["placeholders"]:
        print(f"Platzhalter    : {f['placeholders'][:5]}")
    if result["metadata_note"]:
        print(f"Hinweis        : {result['metadata_note']}")
    if not f["maintainer_is_code"]:
        print("Hinweis        : maintainer ist kein Teilnehmercode p01-p20")
    print(f"\nGate           : {result['gate'].upper()}")
    if result["hard_stop_triggered"]:
        print("Der Beitrag wird NICHT an ein Sprachmodell uebertragen.")

    out = Path("stage1a_result.json")
    out.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Ergebnis       : {out}")
    return 1 if result["hard_stop_triggered"] else 0


if __name__ == "__main__":
    sys.exit(main())
