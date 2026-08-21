#!/usr/bin/env python3
"""
Orchestrator des KItomat Review-Agenten.

Fuehrt einen vollstaendigen Review-Lauf ueber die sieben Phasen aus und
schreibt das Ergebnis als `review_run.json` plus drei Klartextberichte.

Ablauf
------
    Phase 0   deterministisch, lokal, ohne Datenuebertragung
              -> Hard Stop moeglich. Dann endet der Lauf hier.
    Phase 1-6 Provider (Sprachmodell oder Mock)
    danach    Gate-Engine rechnet Signale und Gates
              Schema-Validierung
              Berichte

Der Orchestrator entscheidet nichts inhaltlich. Er kennt die Regeln, ruft den
Provider und wendet die Gate-Bedingungen an. Freigaben erteilt ausschliesslich
ein Mensch im Cockpit.

Aufruf
------
    python3 run_review.py <repo-root> <artefakt-pfad> [--provider mock]
                          [--reviewer p04] [--out <verzeichnis>]

Beispiel
--------
    python3 review/tools/run_review.py . models/kmu-ki-online-marketing-workbook
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import sys
from pathlib import Path

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent))

import deterministic  # noqa: E402
import gate_engine  # noqa: E402
from providers import (  # noqa: E402
    PhaseRequest,
    available,
    get_provider,
    is_external,
    validate_provider_result,
)
from stage1a_scan import scan  # noqa: E402

TEXT_SUFFIXES = {".md", ".txt", ".yml", ".yaml", ".json"}
MAX_FILE_CHARS = 40_000
MAX_TOTAL_CHARS = 200_000


# ---------------------------------------------------------------------------
def utcnow() -> str:
    return dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def make_run_id(existing: list[str] | None = None) -> str:
    day = dt.datetime.now(dt.timezone.utc).strftime("%Y%m%d")
    n = 1
    used = {r for r in (existing or []) if r.startswith(f"rev-{day}")}
    while f"rev-{day}-{n:03d}" in used:
        n += 1
    return f"rev-{day}-{n:03d}"


def load_catalog(review_root: Path) -> dict:
    return yaml.safe_load((review_root / "policy" / "review-checks.yml").read_text(encoding="utf-8"))


# ---------------------------------------------------------------------------
def collect_texts(artifact_dir: Path, files: list[dict]) -> tuple[dict[str, str], list[str]]:
    """Liest die Dateien ein, die an den Provider gehen duerfen.

    Begrenzt Einzel- und Gesamtgroesse. Ohne diese Schranke waere der
    Tokenverbrauch eines Laufs nicht vorhersagbar.
    """
    texts: dict[str, str] = {}
    notes: list[str] = []
    total = 0

    for entry in files:
        if not entry.get("sent_to_agent"):
            continue
        path = artifact_dir / entry["path"]
        if path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        content = path.read_text(encoding="utf-8", errors="ignore")
        if len(content) > MAX_FILE_CHARS:
            content = content[:MAX_FILE_CHARS] + "\n\n[... gekuerzt ...]"
            notes.append(f"{entry['path']} auf {MAX_FILE_CHARS} Zeichen gekuerzt")
        if total + len(content) > MAX_TOTAL_CHARS:
            notes.append(f"{entry['path']} ausgelassen, Gesamtschranke erreicht")
            continue
        texts[entry["path"]] = content
        total += len(content)

    return texts, notes


def applicable(check: dict, artifact_type: str) -> bool:
    """Ob ein Pruefpunkt fuer diesen Artefakttyp gilt."""
    limit = check.get("applies_to")
    return not limit or artifact_type in limit


# ---------------------------------------------------------------------------
def build_phase0(s1a: dict, catalog: dict) -> dict:
    """Phase 0 aus dem deterministischen Scan."""
    f = s1a["findings"]
    spec = next(p for p in catalog["phases"] if p["id"] == "phase-0")
    by_id = {c["id"]: c for c in spec["checks"]}

    def entry(cid, result, **kw):
        meta = by_id[cid]
        out = {
            "id": cid,
            "label": meta["label"],
            "category": meta["category"],
            "result": result,
            "produced_by": "validator",
        }
        if result not in {"pass", "not_applicable"} and meta.get("severity_if_failed"):
            out["severity"] = meta["severity_if_failed"]
        out.update(kw)
        return out

    checks = [
        entry("artifact.located", "pass"),
        entry("artifact.type_detected", "pass",
              finding=f"Erkannter Typ: {s1a['artifact_type']}."),
        entry("artifact.scope_lock", "pass",
              finding=f"{len(s1a['files'])} Dateien mit SHA-256 eingefroren."),
        entry("safety.pii_scan",
              "block" if f["pii_blocking"] else "pass",
              finding=(f"{f['pii_raw_count']} Rohtreffer, {f['false_positives_removed']} vom "
                       f"Vorfilter entfernt, {len(f['pii_blocking'])} blockierend."),
              evidence=[{"file": h["file"], "line": h["line"], "quote": h["value"]}
                        for h in f["pii_blocking"][:5]]),
        entry("safety.forbidden_file_types", "pass"),
        entry("safety.no_real_names",
              "pass" if f["maintainer_is_code"] else "warn",
              finding=f"maintainer={s1a['metadata'].get('maintainer')!r}"),
    ]

    if f["pii_notice"]:
        checks.append(entry(
            "safety.number_pattern_notice", "warn",
            human_mandatory=True, human_ack=False,
            finding=f"{len(f['pii_notice'])} telefonaehnliche Zahlenfolgen gefunden. "
                    "Erfahrungsgemaess DOIs, Kennnummern oder Zahlenspannen.",
            recommendation="Im Cockpit bestaetigen, dass keine echten Kontaktdaten enthalten sind.",
            evidence=[{"file": h["file"], "line": h["line"], "quote": h["value"]}
                      for h in f["pii_notice"][:5]]))

    # Fehlende Pflichtdateien gehoeren nach Phase 2, nicht hierher. Phase 0
    # beantwortet ausschliesslich die Frage, ob etwas uebertragen werden darf.

    narrative = (
        f"Deterministische Vorpruefung von {s1a['artifact_path']}. "
        f"{len(s1a['files'])} Dateien erfasst und gehasht. "
        f"PII-Vorfilter entfernte {f['false_positives_removed']} Falschtreffer "
        f"(Datum, DOI, Zahlenspanne) vor dem Abgleich."
    )
    if s1a["metadata_note"]:
        narrative += " " + s1a["metadata_note"]

    return {
        "id": "phase-0",
        "name": spec["name"],
        "signal": "green",
        "narrative": narrative,
        "checks": checks,
        "gate": {"status": "closed"},
    }


def build_agent_phase(spec: dict, s1a: dict, texts: dict[str, str],
                      provider, prior: list[dict], strict: bool,
                      artifact_dir: Path, phase3_spec: dict) -> dict:
    """Eine der Phasen 1 bis 6 bearbeiten.

    Deterministische Pruefpunkte werden selbst berechnet. Nur der Rest geht an
    den Provider. Ein Sprachmodell soll nicht raten, ob eine Datei existiert.
    """
    artifact_type = s1a["artifact_type"]
    applicable_checks = [c for c in spec["checks"] if applicable(c, artifact_type)]

    det_results = deterministic.evaluate(spec, s1a, artifact_dir, phase3_spec)
    det_ids = {c["id"] for c in det_results}
    wanted = [c for c in applicable_checks if c["id"] not in det_ids]

    if not wanted:
        return {
            "id": spec["id"], "name": spec["name"], "signal": "green",
            "narrative": "Alle Pruefpunkte dieser Phase sind deterministisch entschieden.",
            "checks": det_results, "gate": {"status": "closed"},
        }

    request = PhaseRequest(
        phase_id=spec["id"],
        phase_name=spec["name"],
        phase_purpose=spec.get("purpose", ""),
        artifact_type=artifact_type,
        artifact_path=s1a["artifact_path"],
        metadata=s1a["metadata"],
        files=texts,
        checks=wanted,
        guardrails=spec.get("guardrails", []),
        prior_findings=prior,
    )

    result = provider.review_phase(request)
    problems = validate_provider_result(result, request)
    if problems and strict:
        raise SystemExit(f"Provider-Antwort ungueltig ({spec['id']}): {problems}")

    by_id = {c.check_id: c for c in result.checks}
    checks = []
    for meta in wanted:
        got = by_id.get(meta["id"])
        entry = {
            "id": meta["id"],
            "label": meta["label"],
            "category": meta["category"],
            "result": got.result if got else "not_assessable",
            "produced_by": "agent",
            "confidence": got.confidence if got else "low",
        }
        if entry["result"] not in {"pass", "not_applicable"} and meta.get("severity_if_failed"):
            entry["severity"] = meta["severity_if_failed"]
        # Was der Agent nicht beurteilen konnte, muss ein Mensch bestaetigen.
        # Sonst wuerde Nichtwissen stillschweigend als "in Ordnung" durchgehen.
        if (meta.get("human_mandatory") or _risk_triggers(meta, s1a)
                or entry["result"] == "not_assessable"):
            entry["human_mandatory"] = True
            entry["human_ack"] = False
        if got:
            if got.finding:
                entry["finding"] = got.finding[:2000]
            if got.recommendation:
                entry["recommendation"] = got.recommendation[:2000]
            if got.evidence:
                entry["evidence"] = got.evidence[:5]
        else:
            entry["finding"] = "Der Provider hat zu diesem Punkt nichts geliefert."
        checks.append(entry)

    # Deterministische Befunde zuerst, sie sind die belastbareren.
    return {
        "id": spec["id"],
        "name": spec["name"],
        "signal": "green",
        "narrative": result.narrative[:8000],
        "checks": det_results + checks,
        "gate": {"status": "closed"},
    }


def _risk_triggers(check_meta: dict, s1a: dict) -> bool:
    """Bedingte Pflicht zur menschlichen Bestaetigung.

    Beispiel aus dem Katalog: `human_mandatory_when: data_risk in [yellow, red]`.
    """
    condition = check_meta.get("human_mandatory_when")
    if not condition:
        return False
    risk = s1a["metadata"].get("data_risk")
    return "data_risk" in condition and risk in {"yellow", "red"}


# ---------------------------------------------------------------------------
def run(repo_root: Path, artifact_rel: str, review_root: Path,
        provider_name: str, reviewer: str, strict: bool) -> dict:
    catalog = load_catalog(review_root)
    artifact_rel = artifact_rel.replace("\\", "/").strip("/")
    s1a = scan(repo_root, artifact_rel, review_root)
    meta = s1a["metadata"]
    # Gelesen wird immer dort, wo die Dateien liegen. Der kanonische Pfad im
    # Ergebnis kann davon abweichen, wenn der Beitrag aus intake/ kommt.
    artifact_dir = repo_root / s1a["source_path"]

    phases = [build_phase0(s1a, catalog)]
    hard_stop = s1a["hard_stop_triggered"]

    provider = None
    texts: dict[str, str] = {}
    notes: list[str] = []

    if hard_stop:
        # Kein Byte verlaesst das Projekt. Die restlichen Phasen bleiben leer.
        for spec in catalog["phases"][1:]:
            phases.append({
                "id": spec["id"], "name": spec["name"], "signal": "red",
                "skipped": True,
                "skip_reason": "Sicherheits-Gate in Phase 0 blockiert. Keine Uebertragung an den Provider.",
                "checks": [], "gate": {"status": "blocked"},
            })
    else:
        provider = get_provider(provider_name)
        texts, notes = collect_texts(artifact_dir, s1a["files"])
        phase3_spec = next(p for p in catalog["phases"] if p["id"] == "phase-3")
        prior: list[dict] = []
        for spec in catalog["phases"][1:]:
            phase = build_agent_phase(spec, s1a, texts, provider, prior, strict,
                                      artifact_dir, phase3_spec)
            phases.append(phase)
            prior.extend({
                "phase": phase["id"], "check": c["id"],
                "result": c["result"], "finding": c.get("finding", ""),
            } for c in phase["checks"] if c["result"] not in {"pass", "not_applicable"})

    run_doc = {
        "schema_version": "1.0.0",
        "run_id": make_run_id(),
        "created_at": utcnow(),
        "ruleset_version": catalog.get("ruleset_version", "unknown"),
        "artifact": {
            "id": meta.get("id", artifact_rel.rsplit("/", 1)[-1]),
            "title": meta.get("title"),
            "artifact_type": s1a["artifact_type"],
            "artifact_type_declared": meta.get("artifact_type"),
            "path": s1a["artifact_path"],
            "declared_status": meta.get("status"),
            "data_risk": meta.get("data_risk"),
            "source": {
                "repository": "ki-tomat/kitomat",
                "trigger": "manual",
                **({"intake_path": s1a["source_path"]}
                   if s1a["source_path"] != s1a["artifact_path"] else {}),
            },
            "files": s1a["files"],
        },
        "reviewer": {"code": reviewer, "role": "peer_reviewer"},
        "phases": phases,
        "overall": {"review_signal": "green", "handoff": "ready_for_human_eval",
                    "summary": ""},
        "reports": {
            "agent_report": "agent_report.md",
            "contributor_feedback": "contributor_feedback.md",
            "maintainer_handoff": "maintainer_handoff.md",
        },
        "audit": {
            "human_decision_required": True,
            "agent": {
                "provider": provider.name if provider else "none",
                "model_id": getattr(provider, "model_id", "none") if provider else "none",
                "prompt_version": "review-checks-" + catalog.get("ruleset_version", "0"),
                "started_at": utcnow(), "finished_at": utcnow(),
            },
            "stage1a": {
                "validators": [
                    {"name": "stage1a_scan", "exit_code": 1 if hard_stop else 0,
                     "findings": len(s1a["findings"]["pii_blocking"])},
                ],
                "hard_stop_triggered": hard_stop,
            },
            "notes": "; ".join(notes) if notes else
                     f"Vorfilter entfernte {s1a['findings']['false_positives_removed']} Falschtreffer.",
        },
    }

    gate_engine.recompute(run_doc)
    run_doc["overall"]["summary"] = _summary(run_doc, hard_stop)
    return run_doc


def _summary(run_doc: dict, hard_stop: bool) -> str:
    if hard_stop:
        return ("Das Sicherheits-Gate in Phase 0 hat den Lauf gestoppt. Der Beitrag "
                "enthaelt Muster, die auf personenbezogene Daten hindeuten. Es wurde "
                "nichts an ein Sprachmodell uebertragen. Der Beitrag geht zurueck an "
                "die beitragende Person.")
    overall = run_doc["overall"]
    counts: dict[str, int] = {}
    for phase in run_doc["phases"]:
        for check in phase["checks"]:
            counts[check["result"]] = counts.get(check["result"], 0) + 1
    parts = ", ".join(f"{v}x {k}" for k, v in sorted(counts.items()))
    return (f"Gesamtampel {overall['review_signal']}. Ergebnisse: {parts}. "
            f"{len(overall.get('open_human_decisions', []))} Punkte warten auf "
            f"menschliche Bestaetigung.")


# ---------------------------------------------------------------------------
def main() -> int:
    ap = argparse.ArgumentParser(description="KItomat Review-Agent")
    ap.add_argument("repo_root")
    ap.add_argument("artifact_path")
    ap.add_argument("--provider", default=None,
                    help=f"Standard: mock. Verfuegbar: {', '.join(available())}")
    ap.add_argument("--reviewer", default="p00")
    ap.add_argument("--out", default=None, help="Zielverzeichnis fuer die Ergebnisse")
    ap.add_argument("--strict", action="store_true",
                    help="Bricht ab, wenn die Provider-Antwort unvollstaendig ist")
    args = ap.parse_args()

    review_root = Path(__file__).resolve().parents[1]
    repo_root = Path(args.repo_root).resolve()
    artifact_rel = args.artifact_path.strip("/")

    gewaehlt = args.provider or os.environ.get("KITOMAT_REVIEW_PROVIDER", "mock")
    if is_external(gewaehlt):
        print(f"Hinweis: Provider {gewaehlt!r} sendet Dateiinhalte an einen externen "
              f"Dienst.\n         Das geschieht erst nach bestandener Stufe-1a-Pruefung.\n")

    run_doc = run(repo_root, artifact_rel, review_root,
                  args.provider, args.reviewer, args.strict)

    out_dir = Path(args.out) if args.out else (
        review_root / "results" / run_doc["artifact"]["id"] / run_doc["run_id"]
    )
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "review_run.json").write_text(
        json.dumps(run_doc, ensure_ascii=False, indent=2), encoding="utf-8")

    # Schema-Validierung, sofern jsonschema verfuegbar ist
    try:
        import jsonschema
        schema = json.loads((review_root / "schemas" / "review_run.schema.json").read_text(encoding="utf-8"))
        errors = sorted(jsonschema.Draft202012Validator(schema).iter_errors(run_doc),
                        key=lambda e: list(e.path))
        if errors:
            print("WARNUNG - review_run.json entspricht nicht dem Schema:")
            for e in errors[:5]:
                print("  ", list(e.path), "->", e.message[:160])
        else:
            print("Schema-Validierung: bestanden")
    except ImportError:
        print("Hinweis: jsonschema nicht installiert, Validierung uebersprungen.")

    try:
        import report_renderer
        report_renderer.write_all(run_doc, out_dir, review_root)
        print("Berichte: agent_report.md, contributor_feedback.md, maintainer_handoff.md")
    except Exception as exc:  # pragma: no cover
        print(f"Hinweis: Berichte nicht erzeugt ({exc})")

    print()
    print(f"Artefakt : {run_doc['artifact']['path']}")
    print(f"Lauf     : {run_doc['run_id']}   Provider: {run_doc['audit']['agent']['provider']}")
    print()
    print(gate_engine.summarize(run_doc))
    print()
    print(f"Ergebnis : {out_dir}")

    return 2 if run_doc["audit"]["stage1a"]["hard_stop_triggered"] else 0


if __name__ == "__main__":
    sys.exit(main())
