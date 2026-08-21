#!/usr/bin/env python3
"""
Erzeugt die drei Klartextberichte aus einem `review_run.json`.

    agent_report.md          vollstaendiger Befundbericht, alle Phasen
    contributor_feedback.md  kurz, sachlich, hoechstens drei naechste Schritte
    maintainer_handoff.md    entscheidungsorientiert

Formulierungsregel
------------------
Die Berichte liegen oeffentlich im Repository. Sie bewerten Artefakte, nicht
Personen. Der Renderer erzeugt daher keine Wertungen ueber die beitragende
Person und uebernimmt Befundtexte unveraendert aus dem Lauf.

Keine externen Abhaengigkeiten - bewusst reines Python, damit das Paket auch
ohne Template-Engine laeuft.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

SIGNAL_LABEL = {"green": "gruen", "yellow": "gelb", "red": "rot"}

SEVERITY_ORDER = {"P0": 0, "P1": 1, "P2": 2, "P3": 3, None: 4}

HANDOFF_TEXT = {
    "return_to_contributor": "Zurueck an die beitragende Person",
    "start_peer_review": "Peer Review starten",
    "start_trust_review": "Trust Review starten",
    "ready_for_human_eval": "Bereit fuer die menschliche Bewertung",
    "post_mvp_recommended": "Fuer Post-MVP vormerken",
}

DISCLAIMER = (
    "Dieser Bericht ist keine Freigabe, kein Merge, keine Veroeffentlichung und "
    "keine rechtliche, technische oder datenschutzrechtliche Pruefung. "
    "Die Entscheidung trifft ein Mensch."
)


# ---------------------------------------------------------------------------
def _effective(check: dict) -> str:
    override = check.get("override")
    if override and override.get("result"):
        return override["result"]
    return check.get("result", "not_assessable")


def _findings(run: dict, results: set[str]) -> list[tuple[dict, dict]]:
    """Alle Pruefpunkte mit den gesuchten Ergebnissen, nach Schweregrad sortiert."""
    out = []
    for phase in run.get("phases", []):
        for check in phase.get("checks", []):
            if _effective(check) in results:
                out.append((phase, check))
    out.sort(key=lambda pc: SEVERITY_ORDER.get(pc[1].get("severity"), 4))
    return out


def _header(run: dict, title: str) -> list[str]:
    art = run["artifact"]
    return [
        f"# {title}",
        "",
        f"**Artefakt:** `{art['path']}`  ",
        f"**Typ:** {art['artifact_type']}  ",
        f"**Lauf:** `{run['run_id']}`  ",
        f"**Datum:** {run['created_at']}  ",
        f"**Regelwerk:** {run.get('ruleset_version', 'unbekannt')}  ",
        f"**Provider:** {run['audit']['agent']['provider']}",
        "",
    ]


# ---------------------------------------------------------------------------
def render_agent_report(run: dict) -> str:
    overall = run["overall"]
    lines = _header(run, "Review-Bericht")

    lines += [
        "## Gesamtergebnis",
        "",
        f"**Ampel: {SIGNAL_LABEL[overall['review_signal']].upper()}**  ",
        f"**Empfehlung:** {HANDOFF_TEXT.get(overall['handoff'], overall['handoff'])}  ",
        f"**Statusvorschlag:** `{overall.get('status_suggestion', '-')}` "
        "(Empfehlung, keine Vergabe)",
        "",
        overall.get("summary", ""),
        "",
        "## Phasen",
        "",
        "| Phase | Ampel | Gate | Titel |",
        "|---|---|---|---|",
    ]
    for phase in run["phases"]:
        lines.append(
            f"| `{phase['id']}` | {SIGNAL_LABEL[phase['signal']]} | "
            f"{phase['gate'].get('status', '-')} | {phase['name']} |"
        )
    lines.append("")

    for phase in run["phases"]:
        lines += [f"### {phase['name']}", ""]
        if phase.get("skipped"):
            lines += [f"_Uebersprungen: {phase.get('skip_reason', '-')}_", ""]
            continue
        if phase.get("narrative"):
            lines += [phase["narrative"], ""]

        lines += ["| Ergebnis | Schwere | Pruefpunkt | Befund |", "|---|---|---|---|"]
        for check in phase["checks"]:
            res = _effective(check)
            mark = "**uebersteuert**" if check.get("override") else ""
            finding = (check.get("finding") or "").replace("|", "\\|").replace("\n", " ")
            lines.append(
                f"| `{res}` {mark} | {check.get('severity', '-')} | "
                f"{check['label']} | {finding[:220]} |"
            )
        lines.append("")

    if overall.get("open_human_decisions"):
        lines += ["## Offene menschliche Bestaetigungen", ""]
        lines += [f"- {d}" for d in overall["open_human_decisions"]]
        lines.append("")

    lines += ["---", "", f"_{DISCLAIMER}_", ""]
    return "\n".join(lines)


# ---------------------------------------------------------------------------
def render_contributor_feedback(run: dict, max_steps: int = 3) -> str:
    """Rueckmeldung an die beitragende Person.

    Bewusst knapp. Der Katalog begrenzt auf hoechstens drei naechste Schritte -
    eine lange Maengelliste hilft niemandem weiter.
    """
    overall = run["overall"]
    art = run["artifact"]
    lines = [
        "# Rueckmeldung zum Review",
        "",
        f"Beitrag: `{art['path']}`  ",
        f"Lauf: `{run['run_id']}`",
        "",
    ]

    if run["audit"]["stage1a"]["hard_stop_triggered"]:
        lines += [
            "## Der Review wurde gestoppt",
            "",
            "Die automatische Vorpruefung hat Muster gefunden, die auf echte "
            "personenbezogene Daten hindeuten. Der Beitrag wurde deshalb nicht "
            "weiter geprueft und nicht an ein Sprachmodell uebertragen.",
            "",
            "Bitte pruefe die unten genannten Stellen und ersetze echte Daten "
            "durch synthetische Beispiele.",
            "",
        ]
        for phase, check in _findings(run, {"block"}):
            lines.append(f"**{check['label']}**")
            lines.append("")
            for ev in check.get("evidence", []):
                loc = f"{ev['file']}:{ev.get('line', '?')}"
                lines.append(f"- `{loc}` - {ev.get('quote', '')}")
            lines.append("")
        lines += ["---", "", f"_{DISCLAIMER}_", ""]
        return "\n".join(lines)

    blockers = _findings(run, {"block", "fail"})
    warnings = _findings(run, {"warn"})
    unclear = _findings(run, {"not_assessable"})

    lines += [
        "## Kurzfassung",
        "",
        f"Ampel: **{SIGNAL_LABEL[overall['review_signal']]}**. "
        f"{overall.get('summary', '')}",
        "",
    ]

    if blockers:
        lines += ["## Das sollte zuerst geklaert werden", ""]
        for _, check in blockers[:max_steps]:
            lines.append(f"**{check['label']}**  ")
            if check.get("finding"):
                lines.append(check["finding"])
            if check.get("recommendation"):
                lines.append(f"→ {check['recommendation']}")
            lines.append("")

    remaining = max_steps - len(blockers[:max_steps])
    if warnings and remaining > 0:
        lines += ["## Hinweise", ""]
        for _, check in warnings[:remaining]:
            lines.append(f"- **{check['label']}** — {check.get('finding', '')}")
            if check.get("recommendation"):
                lines.append(f"  → {check['recommendation']}")
        lines.append("")

    if unclear:
        lines += [
            "## Punkte, die eine Person pruefen muss",
            "",
            "Diese Punkte konnte die automatische Pruefung nicht entscheiden. "
            "Das ist kein Mangel an deinem Beitrag.",
            "",
        ]
        for _, check in unclear[:5]:
            lines.append(f"- {check['label']}")
        lines.append("")

    if not blockers and not warnings:
        lines += ["Es wurden keine blockierenden Punkte gefunden.", ""]

    lines += [
        "## Wie es weitergeht",
        "",
        f"{HANDOFF_TEXT.get(overall['handoff'], overall['handoff'])}.",
        "",
        "---",
        "",
        f"_{DISCLAIMER}_",
        "",
    ]
    return "\n".join(lines)


# ---------------------------------------------------------------------------
def render_maintainer_handoff(run: dict) -> str:
    """Entscheidungsvorlage fuer den Maintainer."""
    overall = run["overall"]
    art = run["artifact"]
    audit = run["audit"]

    blockers = _findings(run, {"block", "fail"})
    trust = [
        (p, c) for p, c in _findings(run, {"warn", "fail", "block", "not_assessable"})
        if c.get("category") in {"data_risk", "trust_layer", "license", "sources", "human_review"}
    ]

    lines = _header(run, "Maintainer-Handoff")
    lines += [
        "## Entscheidungsgrundlage",
        "",
        "| Punkt | Wert |",
        "|---|---|",
        f"| Ampel | **{SIGNAL_LABEL[overall['review_signal']]}** |",
        f"| Empfehlung | {HANDOFF_TEXT.get(overall['handoff'], overall['handoff'])} |",
        f"| Statusvorschlag | `{overall.get('status_suggestion', '-')}` |",
        f"| Deklarierter Status | `{art.get('declared_status', '-')}` |",
        f"| Datenrisiko | `{art.get('data_risk', '-')}` |",
        f"| Blockierende Befunde | {overall.get('blocking_findings', 0)} |",
        f"| Sicherheits-Gate | {'BLOCKIERT' if audit['stage1a']['hard_stop_triggered'] else 'offen'} |",
        f"| Gepruefte Dateien | {len(art.get('files', []))} |",
        "",
    ]

    if art.get("data_risk") in {"yellow", "red"}:
        lines += [
            "> **Trust Review erforderlich.** Das Datenrisiko ist "
            f"`{art['data_risk']}`. Laut Kursworkflow ist damit ein Trust Review "
            "Pflicht" + (", bei `red` zusaetzlich eine zweite Freigabe durch die "
                         "Kursleitung." if art["data_risk"] == "red" else "."),
            "",
        ]

    if blockers:
        lines += ["## Blockierende Befunde", "", "| Schwere | Pruefpunkt | Befund |", "|---|---|---|"]
        for _, check in blockers:
            finding = (check.get("finding") or "").replace("|", "\\|").replace("\n", " ")
            lines.append(f"| {check.get('severity', '-')} | {check['label']} | {finding[:200]} |")
        lines.append("")
    else:
        lines += ["## Blockierende Befunde", "", "Keine.", ""]

    if trust:
        lines += ["## Trust, Quellen und Lizenz", "", "| Ergebnis | Pruefpunkt | Befund |", "|---|---|---|"]
        for _, check in trust[:12]:
            finding = (check.get("finding") or "").replace("|", "\\|").replace("\n", " ")
            lines.append(f"| `{_effective(check)}` | {check['label']} | {finding[:200]} |")
        lines.append("")

    if overall.get("open_human_decisions"):
        lines += ["## Menschliche Entscheidung noetig zu", ""]
        lines += [f"- {d}" for d in overall["open_human_decisions"]]
        lines.append("")

    overrides = [
        (p, c) for p in run["phases"] for c in p.get("checks", []) if c.get("override")
    ]
    if overrides:
        lines += ["## Uebersteuerungen durch den Reviewer", "",
                  "| Pruefpunkt | Neu | Begruendung | Von |", "|---|---|---|---|"]
        for _, check in overrides:
            ov = check["override"]
            reason = ov["reason"].replace("|", "\\|").replace("\n", " ")
            lines.append(f"| {check['label']} | `{ov['result']}` | {reason[:160]} | {ov.get('by', '-')} |")
        lines.append("")

    lines += [
        "## Was der Agent nicht geprueft hat",
        "",
        "- Ob die angegebenen Quellen existieren und das aussagen, was behauptet wird",
        "- Fachliche Richtigkeit in der jeweiligen Domaene",
        "- Rechtliche oder Compliance-Fragen",
        "",
        "---",
        "",
        f"_{DISCLAIMER}_",
        "",
    ]
    return "\n".join(lines)


# ---------------------------------------------------------------------------
def write_all(run: dict, out_dir: Path, review_root: Path | None = None) -> dict[str, Path]:
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    written = {
        "agent_report": out_dir / "agent_report.md",
        "contributor_feedback": out_dir / "contributor_feedback.md",
        "maintainer_handoff": out_dir / "maintainer_handoff.md",
    }
    written["agent_report"].write_text(render_agent_report(run), encoding="utf-8")
    written["contributor_feedback"].write_text(render_contributor_feedback(run), encoding="utf-8")
    written["maintainer_handoff"].write_text(render_maintainer_handoff(run), encoding="utf-8")
    return written


def main() -> int:
    if len(sys.argv) < 2:
        print("Aufruf: python3 report_renderer.py <review_run.json> [zielverzeichnis]")
        return 2
    run_path = Path(sys.argv[1])
    run = json.loads(run_path.read_text(encoding="utf-8"))
    out_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else run_path.parent
    written = write_all(run, out_dir)
    for name, path in written.items():
        print(f"{name}: {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
