#!/usr/bin/env python3
"""
Deterministische Pruefpunkte der Phasen 2, 3 und 5.

Der Pruefkatalog markiert einige Punkte als `produced_by: validator`. Diese
darf kein Sprachmodell beantworten - sie sind aus dem Dateisystem und den
Metadaten eindeutig entscheidbar.

Der Nutzen ist doppelt:

  1. Ein Modell kann sie nicht falsch beantworten.
  2. Die Testsuite kann sie exakt pruefen. Bei Sprachmodellausgaben ginge das
     nicht, weil sie nicht reproduzierbar sind.

Der Orchestrator ruft `evaluate()` und fragt den Provider nur nach den
verbleibenden Punkten.
"""
from __future__ import annotations

import re
from pathlib import Path

# Quelle: tools/validators/validate_completeness.py im Hauptrepository
SCENARIO_TERMS = {
    "scenario.positive_present": "positiv",
    "scenario.reworkable_present": "nachbearbeitbar",
    "scenario.negative_present": "negativ",
}


# ---------------------------------------------------------------------------
def _entry(meta: dict, result: str, **kw) -> dict:
    out = {
        "id": meta["id"],
        "label": meta["label"],
        "category": meta["category"],
        "result": result,
        "produced_by": "validator",
    }
    if result not in {"pass", "not_applicable"} and meta.get("severity_if_failed"):
        out["severity"] = meta["severity_if_failed"]
    out.update(kw)
    return out


def _scenario_terms_present(artifact_dir: Path) -> dict[str, bool]:
    """Sucht die drei Szenariobegriffe in allen Markdown-Dateien des Beitrags."""
    text = ""
    for path in artifact_dir.rglob("*.md"):
        text += path.read_text(encoding="utf-8", errors="ignore").lower()
    return {cid: term in text for cid, term in SCENARIO_TERMS.items()}


# ---------------------------------------------------------------------------
def evaluate(phase_spec: dict, s1a: dict, artifact_dir: Path,
             phase3_spec: dict | None = None) -> list[dict]:
    """Berechnet alle `produced_by: validator`-Punkte einer Phase.

    Gibt eine Liste fertiger Pruefpunkte im Schema-Format zurueck. Punkte, die
    hier nicht behandelt werden, bleiben dem Provider ueberlassen.
    """
    findings = s1a["findings"]
    metadata = s1a["metadata"]
    results: list[dict] = []

    by_id = {c["id"]: c for c in phase_spec["checks"]}

    # --- Phase 2: Pflichtdateien und Struktur -----------------------------
    if "files.required_present" in by_id:
        missing = findings["missing_required_files"]
        one_of_ok = findings["one_of_satisfied"]
        problems = list(missing) + ([] if one_of_ok else ["canvas/ oder worksheet/"])
        results.append(_entry(
            by_id["files.required_present"],
            "pass" if not problems else "fail",
            finding=("Alle Pflichtdateien vorhanden."
                     if not problems else f"Fehlend: {', '.join(problems)}"),
            recommendation=("" if not problems else
                            "Fehlende Dateien ergaenzen. Ohne sie ist kein bronze moeglich."),
        ))

    if "files.no_placeholders" in by_id:
        placeholders = findings["placeholders"]
        results.append(_entry(
            by_id["files.no_placeholders"],
            "pass" if not placeholders else "warn",
            finding=("Keine Platzhalter gefunden." if not placeholders else
                     f"{len(placeholders)} Platzhalter gefunden."),
            evidence=[{"file": p["file"], "quote": p["placeholder"]}
                      for p in placeholders[:5]],
        ))

    if "files.extension_convention" in by_id:
        note = s1a.get("metadata_note")
        results.append(_entry(
            by_id["files.extension_convention"],
            "pass" if not note else "warn",
            finding=note or "Metadatendatei heisst korrekt metadata.yml.",
            recommendation=("" if not note else
                            "Datei in metadata.yml umbenennen, sonst findet der "
                            "Validator des Hauptrepositorys sie nicht."),
        ))

    # --- Phase 3: Metadaten ----------------------------------------------
    spec3 = phase3_spec or phase_spec
    if "meta.fields_present" in by_id:
        required = spec3.get("required_metadata_fields", [])
        missing = [f for f in required if f not in metadata]
        results.append(_entry(
            by_id["meta.fields_present"],
            "pass" if not missing else "fail",
            finding=(f"Alle {len(required)} Pflichtfelder vorhanden."
                     if not missing else f"Fehlende Felder: {', '.join(missing)}"),
        ))

    if "meta.enums_valid" in by_id:
        enums = spec3.get("enums", {})
        bad = []
        for field in ("license_status", "data_risk", "ai_act_proximity",
                      "sources_status", "status"):
            allowed = enums.get(field)
            value = metadata.get(field)
            if allowed and value is not None and value not in allowed:
                bad.append(f"{field}={value!r}")
        results.append(_entry(
            by_id["meta.enums_valid"],
            "pass" if not bad else "fail",
            finding=("Alle Feldwerte innerhalb der erlaubten Enums."
                     if not bad else f"Unzulaessige Werte: {', '.join(bad)}"),
        ))

    if "meta.status_allowed" in by_id:
        enums = spec3.get("enums", {})
        allowed = set(enums.get("status_allowed_in_course", []))
        conditional = set(enums.get("status_conditional", []))
        status = metadata.get("status")
        if status in allowed:
            result, finding = "pass", f"Status {status!r} ist im Kurs zulaessig."
        elif status in conditional:
            result, finding = ("warn",
                               f"Status {status!r} nur bei echten dokumentierten "
                               "Tests zulaessig.")
        else:
            result, finding = ("fail",
                               f"Status {status!r} ist im Kurs gesperrt. Erlaubt: "
                               f"{', '.join(sorted(allowed))}.")
        results.append(_entry(by_id["meta.status_allowed"], result, finding=finding))

    # --- Phase 5: Szenario-Triade ----------------------------------------
    scenario_ids = [cid for cid in SCENARIO_TERMS if cid in by_id]
    if scenario_ids:
        present = _scenario_terms_present(artifact_dir)
        for cid in scenario_ids:
            found = present[cid]
            results.append(_entry(
                by_id[cid],
                "pass" if found else "fail",
                finding=(f"Begriff {SCENARIO_TERMS[cid]!r} in den Markdown-Dateien "
                         f"{'gefunden' if found else 'nicht gefunden'}."),
                recommendation=("" if found else
                                "Die Szenario-Triade ist Pflicht. Ohne sie bleibt "
                                "der Beitrag draft oder hoechstens bronze_candidate."),
            ))

    return results


def handled_ids(phase_spec: dict) -> set[str]:
    """Welche Pruefpunkte dieser Phase deterministisch behandelt werden."""
    known = {
        "files.required_present", "files.no_placeholders", "files.extension_convention",
        "meta.fields_present", "meta.enums_valid", "meta.status_allowed",
        *SCENARIO_TERMS,
    }
    return {c["id"] for c in phase_spec["checks"]} & known
