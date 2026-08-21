#!/usr/bin/env python3
"""
Erzeugt review_run.example.json aus einem echten Beitrag.

Die Phase-0-Befunde stammen aus der tatsaechlichen Stufe-1a-Pruefung. Die
Befunde der Phasen 1 bis 6 sind Platzhalter in realistischer Form - sie zeigen,
wie ein Agentenlauf aussieht, sind aber nicht von einem Sprachmodell erzeugt.

Aufruf:
    python3 build_example_run.py <repo-root> <artefakt-pfad>
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import jsonschema

sys.path.insert(0, str(Path(__file__).resolve().parent))
from stage1a_scan import scan  # noqa: E402

NOW = "2026-08-01T18:20:00Z"


def c(cid, label, cat, result, by, **kw):
    return {"id": cid, "label": label, "category": cat, "result": result, "produced_by": by, **kw}


def gate(status, blocking=True, p0=True, acked=True, signed=False, **kw):
    return {
        "status": status,
        "conditions": {
            "no_blocking_results": blocking,
            "no_p0_findings": p0,
            "all_human_mandatory_acked": acked,
            "reviewer_signed": signed,
        },
        **kw,
    }


def build(repo_root: Path, artifact_rel: str, review_root: Path) -> dict:
    s1a = scan(repo_root, artifact_rel, review_root)
    f = s1a["findings"]
    meta = s1a["metadata"]
    notice = len(f["pii_notice"])

    phase0_checks = [
        c("artifact.located", "Artefaktordner gefunden und eindeutig", "scope", "pass", "validator"),
        c("artifact.type_detected", "Artefakttyp erkannt", "scope", "pass", "validator",
          finding=f"Pfad, artifact_type und Inhalt stimmen ueberein: {s1a['artifact_type']}."),
        c("artifact.scope_lock", "Scope-Sperre gesetzt", "scope", "pass", "validator",
          finding=f"{len(s1a['files'])} Dateien mit SHA-256 eingefroren."),
        c("safety.pii_scan", "Keine eindeutigen PII-Treffer im Beitrag", "data_risk",
          "block" if f["pii_blocking"] else "pass", "validator",
          finding=(f"{f['pii_raw_count']} Rohtreffer, davon {f['false_positives_removed']} vom "
                   f"Vorfilter als Datum, DOI oder Zahlenspanne entfernt. "
                   f"{len(f['pii_blocking'])} blockierende Treffer.")),
        c("safety.forbidden_file_types", "Keine unklaren lokalen Datei-Uploads", "data_risk", "pass", "validator"),
        c("safety.no_real_names", "Kein Klarname statt Teilnehmercode", "data_risk",
          "pass" if f["maintainer_is_code"] else "warn", "validator",
          severity="P1", finding=f"maintainer={meta.get('maintainer')!r}"),
    ]
    if notice:
        phase0_checks.append(
            c("safety.number_pattern_notice", "Auffaellige Zahlenfolgen zur menschlichen Sichtung",
              "data_risk", "warn", "validator", severity="P2",
              human_mandatory=True, human_ack=False,
              finding=f"{notice} telefonaehnliche Zahlenfolgen. Erfahrungsgemaess DOIs oder Kennnummern.",
              recommendation="Im Cockpit bestaetigen, dass keine echten Kontaktdaten enthalten sind.",
              evidence=[{"file": h["file"], "line": h["line"], "quote": h["value"]}
                        for h in f["pii_notice"][:3]]))

    phases = [
        {"id": "phase-0", "name": "Orientierung und Sicherheits-Gate",
         "signal": "red" if f["pii_blocking"] else ("yellow" if notice else "green"),
         "narrative": ("Genau ein Artefaktordner betroffen. Dateiliste eingefroren und gehasht. "
                       "Der PII-Vorfilter entfernte Abrufdaten und DOI-Fragmente vor dem Abgleich."),
         "checks": phase0_checks,
         "gate": gate("passed", acked=True, signed=True, signed_by="p04", signed_at=NOW,
                      comment="Sicherheits-Gate offen. Uebertragung an den Agenten freigegeben.")},

        {"id": "phase-1", "name": "Potenzial, Grenzfaelle und blinde Flecken", "signal": "yellow",
         "narrative": ("Failure Map: Erstgespraech und Use-Case-Auswahl funktionieren gut. "
                       "Der Pilot-Testteil funktioniert nur mit Nachbearbeitung, weil Abbruchkriterien fehlen."),
         "checks": [
             c("potential.purpose_derivable", "Zweck und Einsatzgrenzen ableitbar", "potential", "pass", "agent", confidence="high"),
             c("potential.realistic_scope", "Realistisches Potenzial benannt", "potential", "pass", "agent", confidence="high"),
             c("potential.blind_spots", "Blinde Flecken geprueft", "potential", "warn", "agent",
               severity="P2", confidence="medium",
               finding="Das Modell setzt voraus, dass ein Betrieb sein Marketingziel kennt, fragt es aber nicht ab.",
               recommendation="Eine Zeile im Erstgespraech-Worksheet ergaenzen."),
             c("potential.edge_cases", "Grenzfaelle durchgespielt", "potential", "warn", "agent",
               severity="P2", confidence="medium",
               finding="Bei widerspruechlichem Input glaettet das Modell, statt den Widerspruch zu markieren."),
             c("potential.failure_map", "Failure Map erstellt", "potential", "pass", "agent", confidence="medium"),
             c("potential.overconfidence", "Beitrag klingt nicht zu sicher", "false_assurance", "pass", "agent", confidence="medium")],
         "gate": gate("open", signed=False)},

        {"id": "phase-2", "name": "Pflichtdateien und Struktur", "signal": "green",
         "checks": [
             c("files.required_present", "Alle Pflichtdateien vorhanden", "required_files", "pass", "validator",
               finding="Vollstaendig, canvas/ vorhanden."),
             c("files.no_placeholders", "Keine Platzhalter im Inhalt", "required_files", "pass", "validator"),
             c("files.extension_convention", "Metadatendatei heisst metadata.yml", "file_consistency", "pass", "validator"),
             c("files.declared_vs_actual", "Dateiliste und Verweise stimmen ueberein", "file_consistency", "pass", "agent", confidence="high"),
             c("files.foreign_content", "Keine fachfremden Dateien", "file_consistency", "pass", "agent", confidence="medium"),
             c("files.companion_artifacts", "Begleitartefakte eingeordnet", "companion_artifact", "warn", "agent",
               severity="P2", confidence="medium",
               finding="Zwei HTML-Dateien liegen im Paket. Eine ist im README benannt, die andere nicht.",
               recommendation="Zweite HTML-Datei im README als Begleitartefakt benennen oder entfernen.")],
         "gate": gate("closed", signed=False)},

        {"id": "phase-3", "name": "Metadaten, Lizenz und Trust Layer", "signal": "yellow",
         "checks": [
             c("meta.fields_present", "Alle 15 Pflichtfelder vorhanden", "trust_layer", "pass", "validator"),
             c("meta.enums_valid", "Feldwerte innerhalb der Enums", "trust_layer", "pass", "validator"),
             c("meta.status_allowed", "Status im Kurs zulaessig", "trust_layer", "pass", "validator",
               finding=f"status={meta.get('status')}"),
             c("meta.status_not_overclaimed", "Kein zu hoch behaupteter Status", "trust_layer", "pass", "agent", confidence="medium"),
             c("trust.data_risk_plausible", "data_risk plausibel", "data_risk", "pass", "agent",
               confidence="medium", human_mandatory=True, human_ack=False,
               finding=f"data_risk={meta.get('data_risk')} ist plausibel."),
             c("trust.human_review_correct", "human_review_required korrekt", "human_review", "pass", "agent", confidence="high"),
             c("trust.ai_act_plausible", "ai_act_proximity plausibel", "trust_layer", "pass", "agent", confidence="medium"),
             c("trust.disclaimer_present", "Disclaimer vorhanden", "trust_layer", "pass", "agent", confidence="high"),
             c("trust.sensitive_domain", "Sensible Bereiche eingeordnet", "data_risk", "pass", "agent",
               confidence="medium", human_mandatory=True, human_ack=False),
             c("license.status_honest", "Lizenzstatus ehrlich", "license", "pass", "agent",
               confidence="high", finding=f"license_status={meta.get('license_status')}"),
             c("sources.declared", "Quellen mit Herkunft und Abrufdatum", "sources", "pass", "agent",
               confidence="medium", human_mandatory=True, human_ack=False,
               finding="Quellen mit Abrufdatum vorhanden. Der Agent kann nicht pruefen, ob sie existieren "
                       "und das aussagen, was behauptet wird."),
             c("sources.strong_claims_backed", "Starke Behauptungen belegt", "sources", "not_assessable", "agent",
               severity="P2", confidence="low", human_mandatory=True, human_ack=False,
               finding="Nicht ohne Aufruf der Quellen entscheidbar. Menschliche Pruefung erforderlich."),
             c("sources.no_full_text", "Keine unklaren Volltexte", "license", "pass", "agent", confidence="high")],
         "gate": gate("closed", acked=False, signed=False,
                      comment="Vier Punkte erfordern menschliche Bestaetigung, bevor dieses Gate oeffnen kann.")},

        {"id": "phase-4", "name": "Peer Review", "signal": "green",
         "checks": [
             c("use.problem_concrete", "Problem ist konkret", "usability", "pass", "agent", confidence="high"),
             c("use.target_group_clear", "Zielgruppe klar", "usability", "pass", "agent", confidence="high"),
             c("use.instructions_usable", "Anleitung nutzbar", "usability", "pass", "agent", confidence="high"),
             c("use.two_minute_test", "Nutzen in zwei Minuten verstaendlich", "usability", "pass", "agent", confidence="medium"),
             c("examples.present_and_synthetic", "Beispiele synthetisch", "examples", "pass", "agent", confidence="high"),
             c("examples.input_output_match", "Input und Output passen", "examples", "pass", "agent", confidence="high"),
             c("model.logic_sound", "Modelllogik nachvollziehbar", "usability", "pass", "agent", confidence="high"),
             c("model.worksheet_present", "Worksheet anwendbar", "usability", "pass", "agent", confidence="high"),
             c("prompt.structure_complete", "Master Prompts strukturiert", "usability", "warn", "agent",
               severity="P2", confidence="medium", finding="Abbruchkriterien fehlen in den Prompts."),
             c("limits.failure_modes_concrete", "Failure Modes konkret", "usage_risk", "pass", "agent", confidence="high"),
             c("limits.no_legal_advice", "Keine Rechtsberatungssprache", "false_assurance", "pass", "agent", confidence="high"),
             c("limits.recency_risk", "Aktualitaetsrisiko markiert", "recency_risk", "warn", "agent",
               severity="P3", confidence="medium",
               finding="Plattformfunktionen aendern sich haeufig; im Beitrag fehlt ein Hinweis darauf."),
             c("limits.no_automated_decisions", "Keine automatisierte Entscheidung ueber Menschen", "usage_risk", "pass", "agent", confidence="high")],
         "gate": gate("closed", signed=False)},

        {"id": "phase-5", "name": "Szenario-Triade und Tests", "signal": "yellow",
         "checks": [
             c("scenario.positive_present", "Positives Szenario vorhanden", "scenario_triad", "pass", "validator"),
             c("scenario.reworkable_present", "Nachbearbeitbares Szenario vorhanden", "scenario_triad", "pass", "validator"),
             c("scenario.negative_present", "Negatives Szenario vorhanden", "scenario_triad", "pass", "validator"),
             c("scenario.expert_feedback", "Expertenfeedback dokumentiert", "scenario_triad", "warn", "agent",
               severity="P1", confidence="medium",
               finding="Die Szenarien sind vorhanden, das Expertenfeedback bleibt aber knapp. Es wird nicht "
                       "deutlich, was eine Fachperson besser beurteilt als ein Sprachmodell.",
               recommendation="Zu jedem Szenario zwei Saetze ergaenzen: woran erkennt eine Fachperson Qualitaet?"),
             c("scenario.honest", "Szenarien ehrlich und pruefbar", "scenario_triad", "pass", "agent", confidence="low"),
             c("scenario.synthetic_only", "Testdaten synthetisch", "data_risk", "pass", "agent", confidence="high"),
             c("tests.documented_if_claimed", "Behauptete Tests dokumentiert", "scenario_triad", "pass", "agent", confidence="high")],
         "gate": gate("closed", signed=False)},

        {"id": "phase-6", "name": "Rueckmeldung und Statusvorschlag", "signal": "yellow",
         "checks": [
             c("report.contributor_feedback", "Contributor-Feedback erzeugt", "scope", "pass", "agent", confidence="high"),
             c("report.maintainer_handoff", "Maintainer-Handoff erzeugt", "scope", "pass", "agent", confidence="high"),
             c("report.status_suggestion", "Statusvorschlag als Empfehlung markiert", "scope", "pass", "agent",
               confidence="high", human_mandatory=True, human_ack=False,
               finding="Empfehlung: bronze_candidate halten. Kein finaler Status durch den Agenten."),
             c("report.human_decision_named", "Menschliche Entscheidung benannt", "human_review", "pass", "agent", confidence="high")],
         "gate": gate("closed", acked=False, signed=False)},
    ]

    return {
        "schema_version": "1.0.0",
        "run_id": "rev-20260801-001",
        "created_at": NOW,
        "ruleset_version": "1.0.0",
        "artifact": {
            "id": meta.get("id", artifact_rel.split("/")[-1]),
            "title": meta.get("title"),
            "artifact_type": s1a["artifact_type"],
            "artifact_type_declared": meta.get("artifact_type"),
            "path": artifact_rel,
            "declared_status": meta.get("status"),
            "data_risk": meta.get("data_risk"),
            "source": {"repository": "ki-tomat/kitomat", "trigger": "label",
                       "trigger_label": "review-required"},
            "files": s1a["files"],
        },
        "reviewer": {"code": "p04", "role": "peer_reviewer"},
        "phases": phases,
        "overall": {
            "review_signal": "yellow",
            "handoff": "start_trust_review",
            "status_suggestion": "bronze_candidate",
            "post_mvp_recommended": False,
            "blocking_findings": 0,
            "open_human_decisions": [
                "Existenz und Aussage der angegebenen Quellen pruefen",
                f"data_risk {meta.get('data_risk')} bestaetigen",
                "Trust Review durchfuehren",
            ],
            "summary": ("Formal vollstaendig und gut nutzbar. Zwei Punkte halten das Ergebnis auf gelb: "
                        "das Expertenfeedback zur Szenario-Triade bleibt zu knapp, und die Quellen sind "
                        "maschinell nicht pruefbar."),
        },
        "reports": {
            "agent_report": "agent_report.md",
            "contributor_feedback": "contributor_feedback.md",
            "maintainer_handoff": "maintainer_handoff.md",
        },
        "audit": {
            "human_decision_required": True,
            "agent": {"provider": "<konfigurierbar>", "model_id": "<versioniert>",
                      "prompt_version": "pre_review_system_v1",
                      "started_at": NOW, "finished_at": "2026-08-01T18:23:00Z"},
            "stage1a": {
                "validators": [
                    {"name": "validate_metadata", "exit_code": 0, "findings": 0},
                    {"name": "validate_completeness", "exit_code": 0, "findings": 0},
                    {"name": "pii_heuristic_scoped", "exit_code": 0, "findings": len(f["pii_blocking"])},
                ],
                "hard_stop_triggered": s1a["hard_stop_triggered"],
            },
            "notes": (f"Vorfilter entfernte {f['false_positives_removed']} Falschtreffer "
                      f"(Abrufdaten, DOI-Fragmente, Zahlenspannen) vor dem PII-Abgleich."),
        },
    }


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    review_root = Path(__file__).resolve().parents[1]
    run = build(Path(sys.argv[1]).resolve(), sys.argv[2].strip("/"), review_root)

    schema = json.loads((review_root / "schemas" / "review_run.schema.json").read_text(encoding="utf-8"))
    jsonschema.Draft202012Validator.check_schema(schema)
    errors = sorted(jsonschema.Draft202012Validator(schema).iter_errors(run), key=lambda e: list(e.path))
    if errors:
        for e in errors[:10]:
            print("SCHEMA-FEHLER:", list(e.path), "->", e.message[:200])
        return 1

    out = review_root / "schemas" / "review_run.example.json"
    out.write_text(json.dumps(run, ensure_ascii=False, indent=2), encoding="utf-8")
    total = sum(len(p["checks"]) for p in run["phases"])
    print(f"Schema gueltig. {total} Pruefpunkte ueber {len(run['phases'])} Phasen.")
    print("Gates:", {p["id"]: p["gate"]["status"] for p in run["phases"]})
    print("Signale:", {p["id"]: p["signal"] for p in run["phases"]})
    print("Geschrieben:", out.name)
    return 0


if __name__ == "__main__":
    sys.exit(main())
