#!/usr/bin/env python3
"""
Vorfuehrung des Review-Agenten an zwei Beitraegen.

    Beitrag A  laeuft erfolgreich durch und wird zur Freigabe empfohlen
    Beitrag B  wird gestoppt und geht zurueck an die beitragende Person

Aufruf:

    python3 review/demo/run_demo.py

Beide Beitraege sind erfunden. Beitrag B enthaelt absichtlich eine
Kontaktadresse und eine Telefonnummer in einer Beispieldatei - der typische
Fehler, wenn jemand eine echte Kundenmail als Beispiel einfuegt.
"""
from __future__ import annotations

import shutil
import sys
import tempfile
from pathlib import Path

REVIEW_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REVIEW_ROOT / "tools"))

import gate_engine  # noqa: E402
import report_renderer  # noqa: E402
import run_review  # noqa: E402

DEMO_REPO = REVIEW_ROOT / "demo" / "artefakte"
OUT_ROOT = REVIEW_ROOT / "demo" / "ergebnisse"

G, R, Y, B, RESET = "\033[32m", "\033[31m", "\033[33m", "\033[1m", "\033[0m"
FARBE = {"green": G, "yellow": Y, "red": R}
AMPEL = {"green": "GRUEN", "yellow": "GELB", "red": "ROT"}


def linie(zeichen: str = "=") -> None:
    print(zeichen * 74)


def titel(text: str) -> None:
    print()
    linie()
    print(f"{B}{text}{RESET}")
    linie()


def zeige_lauf(run: dict) -> None:
    """Phasenuebersicht mit Ampeln und Gates."""
    print()
    for phase in run["phases"]:
        farbe = FARBE[phase["signal"]]
        gate = phase["gate"].get("status", "?")
        marke = {"passed": "frei", "open": "bereit", "closed": "zu", "blocked": "STOPP"}.get(gate, gate)
        print(f"   {phase['id']}  {farbe}{AMPEL[phase['signal']]:<6}{RESET}  "
              f"{marke:<7}  {phase['name']}")

    o = run["overall"]
    farbe = FARBE[o["review_signal"]]
    print()
    print(f"   Gesamtampel      : {farbe}{B}{AMPEL[o['review_signal']]}{RESET}")
    print(f"   Empfehlung       : {o['handoff']}")
    print(f"   Statusvorschlag  : {o.get('status_suggestion', '-')}")
    print(f"   Blockierende     : {o.get('blocking_findings', 0)}")
    print(f"   Offene Bestaetigungen: {len(o.get('open_human_decisions', []))}")


def zaehle(run: dict) -> dict:
    zaehler: dict[str, int] = {}
    for phase in run["phases"]:
        for check in phase["checks"]:
            r = gate_engine.effective_result(check)
            zaehler[r] = zaehler.get(r, 0) + 1
    return zaehler


def reviewer_arbeitet(run: dict, code: str) -> dict:
    """Simuliert, was ein Reviewer im Cockpit tut.

    Er bestaetigt die Punkte, die der Agent offengelassen hat, und gibt
    anschliessend jedes Gate frei. Genau diese Schritte macht sonst ein
    Mensch per Klick - hier automatisiert, damit die Vorfuehrung ohne
    Handarbeit bis zum Ende laeuft.

    Wichtig: Der Reviewer kann nur bestaetigen, was nicht blockiert ist. Ein
    harter Befund laesst sich so nicht wegklicken.
    """
    bestaetigt = 0
    for phase in run["phases"]:
        for check in phase["checks"]:
            if check.get("human_mandatory") and not check.get("human_ack"):
                check["human_ack"] = True
                bestaetigt += 1
    gate_engine.recompute(run)

    freigegeben = 0
    for phase in run["phases"]:
        if phase["gate"]["status"] == "open":
            phase["gate"]["signed_by"] = code
            phase["gate"]["signed_at"] = "2026-08-03T14:00:00Z"
            phase["gate"]["comment"] = "Vorfuehrung: Befunde gesichtet und bestaetigt."
            freigegeben += 1
            gate_engine.recompute(run)

    print(f"\n   {bestaetigt} Punkte bestaetigt, {freigegeben} Gates freigegeben.")
    return run


def lauf(artefakt: str, reviewer: str, name: str) -> dict:
    out = OUT_ROOT / name
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)

    run = run_review.run(DEMO_REPO, artefakt, REVIEW_ROOT, "mock", reviewer, strict=False)
    (out / "review_run.json").write_text(
        __import__("json").dumps(run, ensure_ascii=False, indent=2), encoding="utf-8")
    report_renderer.write_all(run, out)
    return run


# ---------------------------------------------------------------------------
def demo_a() -> dict:
    titel("BEITRAG A  -  Angebotstexte fuer Handwerksbetriebe")
    print("\nEin sorgfaeltig erstelltes Prompt-Paket. Vollstaendig, mit "
          "Szenario-Triade,\nExpertenfeedback und klaren Grenzen.")

    run = lauf("prompts/demo-angebotstexte-handwerk", "p04", "A_erfolgreich")

    print(f"\n{B}Schritt 1 - Der Agent prueft{RESET}")
    zeige_lauf(run)
    z = zaehle(run)
    print(f"\n   Ergebnisse: " + ", ".join(f"{v}x {k}" for k, v in sorted(z.items())))
    print("\n   Das Sicherheits-Gate ist offen: keine personenbezogenen Daten.")
    print("   Alle Pflichtdateien sind da, die Szenario-Triade ist vollstaendig.")
    print("   Was der Mock nicht beurteilen kann, legt er dem Menschen vor.")

    print(f"\n{B}Schritt 2 - Der Reviewer entscheidet{RESET}")
    print("   (im Cockpit per Klick, hier automatisiert)")
    run = reviewer_arbeitet(run, "p04")
    zeige_lauf(run)

    out = OUT_ROOT / "A_erfolgreich"
    (out / "review_run.json").write_text(
        __import__("json").dumps(run, ensure_ascii=False, indent=2), encoding="utf-8")
    report_renderer.write_all(run, out)

    print(f"\n   {G}Ergebnis: Alle sieben Gates freigegeben.{RESET}")
    print(f"   Der Beitrag geht mit Empfehlung an den Maintainer.")
    print(f"   Ablage: {out}")
    return run


def demo_b() -> dict:
    titel("BEITRAG B  -  Kundenmails auswerten")
    print("\nJemand hat eine echte Kundenmail als Beispiel eingefuegt - mit "
          "Adresse und\nTelefonnummer. Ein haeufiger und gut gemeinter Fehler.")

    run = lauf("prompts/demo-kundenmails-auswerten", "p04", "B_zurueck")

    print(f"\n{B}Der Agent stoppt sofort{RESET}")
    zeige_lauf(run)

    phase0 = run["phases"][0]
    treffer = next((c for c in phase0["checks"] if c["id"] == "safety.pii_scan"), None)
    if treffer and treffer.get("evidence"):
        print("\n   Gefunden in Phase 0:")
        for ev in treffer["evidence"]:
            print(f"      {ev['file']}:{ev.get('line','?')}   {ev.get('quote','')}")

    uebertragen = sum(1 for f in run["artifact"]["files"] if f.get("sent_to_agent"))
    print(f"\n   {R}Kein Byte wurde an ein Sprachmodell uebertragen.{RESET}")
    print(f"   Phasen 1 bis 6 wurden nicht ausgefuehrt.")
    print(f"   Dateien zur Uebertragung vorgemerkt: {uebertragen} - tatsaechlich gesendet: 0")

    print(f"\n{B}Kann der Reviewer das wegklicken?{RESET}")
    run_kopie = __import__("json").loads(__import__("json").dumps(run))
    reviewer_arbeitet(run_kopie, "p04")
    status = run_kopie["phases"][0]["gate"]["status"]
    if status == "blocked":
        print(f"   {G}Nein.{RESET} Das Gate bleibt {R}blockiert{RESET}. "
              "Ein harter Befund laesst sich nicht bestaetigen.")
        print("   Nur die beitragende Person kann das beheben.")
    else:
        print(f"   Unerwartet: Gate-Status {status}")

    out = OUT_ROOT / "B_zurueck"
    print(f"\n   {R}Ergebnis: Zurueck an die beitragende Person.{RESET}")
    print(f"   Ablage: {out}")
    print(f"   Die Rueckmeldung nennt die betroffenen Stellen, "
          f"siehe contributor_feedback.md")
    return run


def main() -> int:
    print()
    linie()
    print(f"{B}   KItomat Review-Agent  -  Vorfuehrung{RESET}")
    print("   Zwei Beitraege, zwei Ausgaenge")
    linie()

    a = demo_a()
    b = demo_b()

    titel("ZUSAMMENFASSUNG")
    print()
    print(f"   {'':22} {'Beitrag A':<22} {'Beitrag B'}")
    print(f"   {'-'*66}")
    rows = [
        ("Sicherheits-Gate", "offen", "BLOCKIERT"),
        ("An Modell uebertragen", "ja", "nein"),
        ("Gesamtampel", AMPEL[a['overall']['review_signal']],
         AMPEL[b['overall']['review_signal']]),
        ("Empfehlung", a['overall']['handoff'], b['overall']['handoff']),
        ("Statusvorschlag", a['overall'].get('status_suggestion', '-'),
         b['overall'].get('status_suggestion', '-')),
        ("Gates freigegeben",
         f"{sum(1 for p in a['phases'] if p['gate']['status']=='passed')} von 7",
         f"{sum(1 for p in b['phases'] if p['gate']['status']=='passed')} von 7"),
    ]
    for label, va, vb in rows:
        print(f"   {label:<22} {va:<22} {vb}")

    print()
    print("   In beiden Faellen gilt:")
    print("   Der Agent hat keinen Status vergeben, nichts gemergt und nichts")
    print("   freigegeben. Er hat geprueft und empfohlen. Entschieden hat der Mensch.")
    print()
    print(f"   Ergebnisse und Berichte: {OUT_ROOT}")
    print()
    return 0


if __name__ == "__main__":
    sys.exit(main())
