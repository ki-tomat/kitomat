#!/usr/bin/env python3
"""
Gate-Engine: entscheidet deterministisch, ob ein Gate oeffnen darf.

Das ist das Herzstueck der Zusage an den Projektowner. Ein Gate oeffnet
niemals, weil ein Sprachmodell "gruen" gesagt hat, sondern nur, wenn
nachpruefbare Bedingungen erfuellt sind:

    1. kein Pruefpunkt mit Ergebnis "block"
    2. kein Befund mit Schweregrad P0
    3. alle als human_mandatory markierten Punkte sind bestaetigt
    4. der Reviewer hat unterschrieben

Damit ist die Bewertung des Agenten eine Eingabe, nie das Gate selbst.
Diese Datei enthaelt bewusst keinerlei Modellaufruf und keine Heuristik.
"""
from __future__ import annotations

# Ergebnisse, die eine Weiterarbeit verhindern
BLOCKING_RESULTS = {"block"}
# Ergebnisse, die als Mangel gelten und einen Schweregrad tragen
FAILING_RESULTS = {"fail"}
# Ergebnisse, die das Signal auf gelb ziehen, aber nicht blockieren
WARNING_RESULTS = {"warn", "not_assessable"}

SIGNAL_ORDER = {"green": 0, "yellow": 1, "red": 2}


def effective_result(check: dict) -> str:
    """Das geltende Ergebnis eines Pruefpunkts.

    Eine Uebersteuerung durch den Reviewer hat Vorrang vor dem Agentenbefund.
    Sie ist im Schema nur mit Begruendung zulaessig.
    """
    override = check.get("override")
    if override and override.get("result"):
        return override["result"]
    return check.get("result", "not_assessable")


def check_severity(check: dict) -> str | None:
    """Schweregrad eines Pruefpunkts, sofern er tatsaechlich greift.

    Der Katalog nennt das Feld `severity_if_failed`. Der Schweregrad gilt
    also nur, wenn ein Punkt wirklich durchfaellt - bei `fail` oder `block`.

    Ausdruecklich nicht bei:

      warn            ein Hinweis ist kein Mangel
      not_assessable  der Agent konnte es nicht beurteilen. Nichtwissen darf
                      kein Blocker sein, sonst blockiert jeder Lauf ohne
                      angebundenes Sprachmodell. Stattdessen erzwingt dieses
                      Ergebnis eine menschliche Bestaetigung.
      pass            bestanden
      not_applicable  gilt nicht fuer diesen Artefakttyp

    Eine Uebersteuerung durch den Reviewer wirkt hier mit, weil
    `effective_result` sie beruecksichtigt.
    """
    if effective_result(check) in FAILING_RESULTS | BLOCKING_RESULTS:
        return check.get("severity")
    return None


def phase_signal(phase: dict) -> str:
    """Ampelfarbe einer Phase, abgeleitet aus ihren Pruefpunkten.

    rot    - mindestens ein block oder ein P0
    gelb   - mindestens ein fail, warn oder not_assessable
    gruen  - alles uebrige
    """
    if phase.get("skipped"):
        # Eine uebersprungene Phase behaelt ihr gesetztes Signal. Nach einem
        # Hard Stop ist das rot, bei einem risikobedingten Auslassen gruen.
        return phase.get("signal", "green")

    signal = "green"
    for check in phase.get("checks", []):
        result = effective_result(check)
        severity = check_severity(check)

        if result in BLOCKING_RESULTS or severity == "P0":
            return "red"
        if result in FAILING_RESULTS or result in WARNING_RESULTS:
            signal = "yellow"
        if severity == "P1":
            signal = "yellow"
    return signal


def gate_conditions(phase: dict) -> dict:
    """Die vier Bedingungen eines Gates, jede einzeln nachpruefbar."""
    checks = phase.get("checks", [])

    no_blocking = not any(effective_result(c) in BLOCKING_RESULTS for c in checks)
    no_p0 = not any(check_severity(c) == "P0" for c in checks)
    acked = all(
        c.get("human_ack") is True
        for c in checks
        if c.get("human_mandatory") and effective_result(c) != "not_applicable"
    )
    signed = bool(phase.get("gate", {}).get("signed_by"))

    return {
        "no_blocking_results": no_blocking,
        "no_p0_findings": no_p0,
        "all_human_mandatory_acked": acked,
        "reviewer_signed": signed,
    }


def gate_status(phase: dict) -> str:
    """Der Zustand eines Gates.

    blocked - harte Bedingung verletzt, ohne Nacharbeit nicht loesbar
    closed  - Bedingungen noch nicht erfuellt, aber erfuellbar
    open    - alles erfuellt, nur die Unterschrift fehlt
    passed  - Reviewer hat freigegeben
    """
    if phase.get("skipped"):
        # Nach einem Hard Stop bleibt das Gate blockiert, nicht "passed".
        return phase.get("gate", {}).get("status", "passed")

    cond = gate_conditions(phase)

    if not cond["no_blocking_results"] or not cond["no_p0_findings"]:
        return "blocked"
    if not cond["all_human_mandatory_acked"]:
        return "closed"
    if cond["reviewer_signed"]:
        return "passed"
    return "open"


def recompute(run: dict) -> dict:
    """Rechnet Signale und Gates des gesamten Laufs neu.

    Wird nach jeder Aenderung durch den Reviewer aufgerufen. Die Funktion
    veraendert `run` an Ort und Stelle und gibt ihn zurueck.
    """
    for phase in run.get("phases", []):
        phase["signal"] = phase_signal(phase)
        gate = phase.setdefault("gate", {})
        gate["conditions"] = gate_conditions(phase)
        gate["status"] = gate_status(phase)

    run["overall"] = _overall(run)
    return run


def _overall(run: dict) -> dict:
    """Gesamtergebnis aus den Phasen."""
    overall = dict(run.get("overall", {}))
    phases = run.get("phases", [])

    worst = "green"
    for phase in phases:
        if SIGNAL_ORDER[phase["signal"]] > SIGNAL_ORDER[worst]:
            worst = phase["signal"]
    overall["review_signal"] = worst

    blocking = sum(
        1
        for p in phases
        for c in p.get("checks", [])
        if effective_result(c) in BLOCKING_RESULTS or check_severity(c) == "P0"
    )
    overall["blocking_findings"] = blocking

    open_decisions = [
        f"{c['label']} ({p['id']})"
        for p in phases
        for c in p.get("checks", [])
        if c.get("human_mandatory") and not c.get("human_ack")
    ]
    overall["open_human_decisions"] = open_decisions

    overall["handoff"] = _handoff(run, worst, blocking)
    overall.setdefault("status_suggestion", _status_suggestion(worst, blocking))
    return overall


def _handoff(run: dict, signal: str, blocking: int) -> str:
    """Empfehlung, wer als naechstes am Zug ist.

    Bildet die handoff_statuses aus dem Standard-Review-Paket ab.
    """
    if blocking:
        return "return_to_contributor"

    data_risk = run.get("artifact", {}).get("data_risk")
    if data_risk in {"yellow", "red"}:
        return "start_trust_review"

    if signal == "red":
        return "return_to_contributor"
    if signal == "yellow":
        return "start_peer_review"
    return "ready_for_human_eval"


def _status_suggestion(signal: str, blocking: int) -> str:
    """Statusempfehlung - niemals eine Vergabe.

    Der Agent darf laut Policy keinen finalen Status setzen. Zulaessig sind
    nur diese drei Empfehlungen.
    """
    if blocking or signal == "red":
        return "draft"
    if signal == "yellow":
        return "bronze_candidate"
    return "bronze_ready_for_human_decision"


def summarize(run: dict) -> str:
    """Kurzer Textstand fuer Konsole und Berichte."""
    lines = []
    for phase in run.get("phases", []):
        gate = phase.get("gate", {})
        lines.append(
            f"  {phase['id']}  {phase['signal']:<6}  Gate: {gate.get('status', '?'):<8}  {phase['name']}"
        )
    overall = run.get("overall", {})
    lines.append("")
    lines.append(f"  Gesamt: {overall.get('review_signal')}  ->  {overall.get('handoff')}")
    lines.append(f"  Statusempfehlung: {overall.get('status_suggestion')}")
    if overall.get("open_human_decisions"):
        lines.append(f"  Offene menschliche Bestaetigungen: {len(overall['open_human_decisions'])}")
    return "\n".join(lines)
