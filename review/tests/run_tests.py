#!/usr/bin/env python3
"""
End-to-End-Tests fuer den KItomat Review-Agenten.

Der Projektowner hat harte Gates gefordert, die durch Tests belegt sind. Diese
Suite prueft genau das: Jede Fixture hat ein festgelegtes Sollergebnis, und der
Lauf muss es treffen.

Was hier geprueft wird
----------------------
Ausschliesslich die deterministischen Anteile: Sicherheits-Gate, Pflichtdateien,
Gate-Bedingungen, Schema-Konformitaet, Berichtserzeugung. Sprachmodellausgaben
sind nicht deterministisch - Tests, die auf exakte Formulierungen prueften,
wuerden zufaellig fehlschlagen und die Suite unglaubwuerdig machen. Fuer den
Agentenanteil wird nur die Struktur geprueft, nicht der Inhalt.

Aufruf
------
    python3 review/tests/run_tests.py
    python3 review/tests/run_tests.py --repo /pfad/zu/kitomat   # zusaetzlich echte Beitraege
"""
from __future__ import annotations

import argparse
import json
import shutil
import sys
import tempfile
from pathlib import Path

REVIEW_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REVIEW_ROOT / "tools"))

import gate_engine  # noqa: E402
import report_renderer  # noqa: E402
import run_review  # noqa: E402
from stage1a_scan import scan  # noqa: E402

FIXTURES = REVIEW_ROOT / "tests" / "fixtures"

GREEN, RED, YELLOW, RESET = "\033[32m", "\033[31m", "\033[33m", "\033[0m"


class Results:
    def __init__(self) -> None:
        self.passed = 0
        self.failed: list[str] = []

    def check(self, name: str, condition: bool, detail: str = "") -> None:
        if condition:
            self.passed += 1
            print(f"  {GREEN}PASS{RESET}  {name}")
        else:
            self.failed.append(name)
            print(f"  {RED}FAIL{RESET}  {name}" + (f"  -> {detail}" if detail else ""))


# ---------------------------------------------------------------------------
def fixture_repo(fixture_name: str, artifact_type_dir: str) -> tuple[Path, str]:
    """Baut ein temporaeres Repository mit genau einer Fixture.

    Die Fixtures liegen unter review/tests/fixtures/, also ausserhalb von
    prompts/, datasets/ und models/. Der Scanner erwartet aber die uebliche
    Struktur - deshalb wird sie hier nachgebildet.
    """
    tmp = Path(tempfile.mkdtemp(prefix="kitomat-test-"))
    target = tmp / artifact_type_dir / fixture_name
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(FIXTURES / fixture_name, target)
    return tmp, f"{artifact_type_dir}/{fixture_name}"


# ---------------------------------------------------------------------------
def test_hard_stop(r: Results) -> None:
    """Ein Beitrag mit echten Kontaktdaten muss blockieren - und nichts uebertragen."""
    print("\nSicherheits-Gate: Beitrag mit PII muss stoppen")
    tmp, rel = fixture_repo("tf-pii-must-block", "prompts")
    try:
        s1a = scan(tmp, rel, REVIEW_ROOT)
        f = s1a["findings"]
        r.check("Hard Stop ausgeloest", s1a["hard_stop_triggered"])
        r.check("Gate blockiert", s1a["gate"] == "blocked", s1a["gate"])
        labels = {h["label"] for h in f["pii_blocking"]}
        r.check("E-Mail erkannt", "email" in labels, str(labels))
        r.check("IBAN erkannt", "iban_like" in labels, str(labels))

        run = run_review.run(tmp, rel, REVIEW_ROOT, "mock", "p99", strict=False)
        r.check("Gesamtampel rot", run["overall"]["review_signal"] == "red",
                run["overall"]["review_signal"])
        r.check("Handoff zurueck an Contributor",
                run["overall"]["handoff"] == "return_to_contributor",
                run["overall"]["handoff"])
        r.check("Statusempfehlung draft",
                run["overall"]["status_suggestion"] == "draft")

        later = run["phases"][1:]
        r.check("Phasen 1-6 uebersprungen", all(p.get("skipped") for p in later))
        r.check("Keine Datei an den Agenten uebertragen",
                all(not p.get("checks") for p in later))
        r.check("Phase-0-Gate blockiert",
                run["phases"][0]["gate"]["status"] == "blocked",
                run["phases"][0]["gate"]["status"])
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def test_false_positives(r: Results) -> None:
    """Datum, DOI und Zahlenspanne duerfen nicht blockieren."""
    print("\nVorfilter: korrekte Angaben duerfen nicht blockieren")
    tmp, rel = fixture_repo("tf-clean-must-pass", "models")
    try:
        s1a = scan(tmp, rel, REVIEW_ROOT)
        f = s1a["findings"]
        r.check("Kein Hard Stop", not s1a["hard_stop_triggered"],
                str(f["pii_blocking"][:2]))
        r.check("Gate offen", s1a["gate"] == "open")
        r.check("Vorfilter hat Treffer entfernt", f["false_positives_removed"] > 0,
                f"entfernt={f['false_positives_removed']}")
        r.check("Pflichtdateien vollstaendig", not f["missing_required_files"],
                str(f["missing_required_files"]))
        r.check("Teilnehmercode erkannt", f["maintainer_is_code"])
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def test_missing_files(r: Results) -> None:
    """Fehlende Pflichtdateien muessen auffallen, aber nicht das Gate sprengen."""
    print("\nPflichtdateien: fehlende Datei muss auffallen")
    tmp, rel = fixture_repo("tf-missing-files", "prompts")
    try:
        s1a = scan(tmp, rel, REVIEW_ROOT)
        missing = s1a["findings"]["missing_required_files"]
        r.check("Fehlende Dateien erkannt", len(missing) >= 2, str(missing))
        r.check("evaluation.md als fehlend gemeldet", "evaluation.md" in missing, str(missing))
        r.check("Kein Hard Stop deswegen", not s1a["hard_stop_triggered"])
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def test_gate_engine(r: Results) -> None:
    """Die Gate-Bedingungen einzeln, ohne Dateisystem."""
    print("\nGate-Engine: Bedingungen greifen einzeln")

    def phase(checks, signed=None):
        p = {"id": "phase-1", "name": "Test", "checks": checks, "gate": {}}
        if signed:
            p["gate"]["signed_by"] = signed
        return p

    p = phase([{"id": "a", "result": "pass", "produced_by": "agent"}])
    r.check("Alles pass -> open", gate_engine.gate_status(p) == "open", gate_engine.gate_status(p))
    r.check("Signal gruen", gate_engine.phase_signal(p) == "green")

    p = phase([{"id": "a", "result": "block", "produced_by": "validator"}])
    r.check("block -> blocked", gate_engine.gate_status(p) == "blocked")
    r.check("block -> Signal rot", gate_engine.phase_signal(p) == "red")

    p = phase([{"id": "a", "result": "fail", "severity": "P0", "produced_by": "agent"}])
    r.check("P0 -> blocked", gate_engine.gate_status(p) == "blocked")

    p = phase([{"id": "a", "result": "warn", "produced_by": "agent",
                "human_mandatory": True, "human_ack": False}])
    r.check("Unbestaetigte Pflicht -> closed", gate_engine.gate_status(p) == "closed")

    p = phase([{"id": "a", "result": "warn", "produced_by": "agent",
                "human_mandatory": True, "human_ack": True}])
    r.check("Bestaetigt -> open", gate_engine.gate_status(p) == "open")

    p = phase([{"id": "a", "result": "pass", "produced_by": "agent"}], signed="p04")
    r.check("Unterschrieben -> passed", gate_engine.gate_status(p) == "passed")

    # Uebersteuerung entkraeftet einen Blocker
    p = phase([{"id": "a", "result": "block", "severity": "P0", "produced_by": "agent",
                "override": {"result": "pass", "reason": "Synthetisches Beispiel, geprueft.",
                             "by": "p04", "at": "2026-08-01T10:00:00Z"}}])
    r.check("Uebersteuerung hebt Blocker auf", gate_engine.gate_status(p) == "open",
            gate_engine.gate_status(p))
    r.check("Uebersteuerung entfernt Schweregrad",
            gate_engine.check_severity(p["checks"][0]) is None)

    # Uebersteuerung in die andere Richtung
    p = phase([{"id": "a", "result": "pass", "produced_by": "agent",
                "override": {"result": "block", "reason": "Enthaelt doch echte Daten.",
                             "by": "p04", "at": "2026-08-01T10:00:00Z"}}])
    r.check("Reviewer kann verschaerfen", gate_engine.gate_status(p) == "blocked")

    # Nichtwissen darf nicht blockieren. Sonst blockiert jeder Lauf ohne
    # angebundenes Sprachmodell, weil der Mock fast alles offen laesst.
    p = phase([{"id": "a", "result": "not_assessable", "severity": "P0",
                "produced_by": "agent", "human_mandatory": True, "human_ack": False}])
    r.check("not_assessable blockiert nicht trotz P0",
            gate_engine.gate_status(p) == "closed", gate_engine.gate_status(p))
    r.check("not_assessable ergibt gelb, nicht rot",
            gate_engine.phase_signal(p) == "yellow", gate_engine.phase_signal(p))
    r.check("not_assessable traegt keinen Schweregrad",
            gate_engine.check_severity(p["checks"][0]) is None)

    # Ein Hinweis ist kein Mangel
    p = phase([{"id": "a", "result": "warn", "severity": "P0", "produced_by": "agent"}])
    r.check("warn blockiert nicht trotz P0", gate_engine.gate_status(p) == "open",
            gate_engine.gate_status(p))

    # Ein echter Durchfall mit P0 blockiert weiterhin
    p = phase([{"id": "a", "result": "fail", "severity": "P0", "produced_by": "agent"}])
    r.check("fail mit P0 blockiert weiterhin", gate_engine.gate_status(p) == "blocked")


def test_schema_and_reports(r: Results) -> None:
    """Der erzeugte Lauf muss dem Schema entsprechen und Berichte liefern."""
    print("\nSchema und Berichte")
    tmp, rel = fixture_repo("tf-clean-must-pass", "models")
    out = Path(tempfile.mkdtemp(prefix="kitomat-out-"))
    try:
        run = run_review.run(tmp, rel, REVIEW_ROOT, "mock", "p04", strict=False)

        try:
            import jsonschema
            schema = json.loads((REVIEW_ROOT / "schemas" / "review_run.schema.json")
                                .read_text(encoding="utf-8"))
            errors = list(jsonschema.Draft202012Validator(schema).iter_errors(run))
            r.check("review_run.json entspricht dem Schema", not errors,
                    "; ".join(f"{list(e.path)}: {e.message[:80]}" for e in errors[:3]))
        except ImportError:
            print(f"  {YELLOW}SKIP{RESET}  Schema-Validierung (jsonschema fehlt)")

        r.check("Sieben Phasen vorhanden", len(run["phases"]) == 7, str(len(run["phases"])))
        r.check("human_decision_required immer true",
                run["audit"]["human_decision_required"] is True)

        allowed = {"draft", "bronze_candidate", "bronze_ready_for_human_decision", "post_mvp"}
        r.check("Kein finaler Status vergeben",
                run["overall"]["status_suggestion"] in allowed,
                run["overall"]["status_suggestion"])

        by = {c["produced_by"] for p in run["phases"] for c in p["checks"]}
        r.check("Herkunft jedes Befunds gesetzt", by <= {"validator", "agent", "human"}, str(by))
        r.check("Deterministische Befunde vorhanden", "validator" in by)

        files = report_renderer.write_all(run, out)
        for name, path in files.items():
            r.check(f"Bericht {name} erzeugt", path.exists() and path.stat().st_size > 200)

        handoff = (out / "maintainer_handoff.md").read_text(encoding="utf-8")
        r.check("Handoff nennt die Grenzen des Agenten",
                "nicht geprueft" in handoff.lower() or "nicht geprüft" in handoff.lower())
        feedback = (out / "contributor_feedback.md").read_text(encoding="utf-8")
        r.check("Feedback enthaelt den Disclaimer", "keine Freigabe" in feedback)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
        shutil.rmtree(out, ignore_errors=True)


def test_intake(r: Results) -> None:
    """Der Weg ohne GitHub: Beitrag liegt in review/intake/.

    Dort gibt es die Ordner prompts/, datasets/ und models/ nicht. Der Typ
    muss deshalb aus metadata.yml kommen, und der kuenftige Zielpfad wird
    daraus abgeleitet.
    """
    print("\nIntake: Beitrag ohne Content-Ordnerstruktur")
    tmp = Path(tempfile.mkdtemp(prefix="kitomat-intake-"))
    try:
        ziel = tmp / "intake" / "abgabe-p07"
        ziel.parent.mkdir(parents=True)
        shutil.copytree(FIXTURES / "tf-clean-must-pass", ziel)

        s1a = scan(tmp, "intake/abgabe-p07", REVIEW_ROOT)
        r.check("Typ aus metadata.yml erkannt", s1a["artifact_type"] == "model",
                s1a["artifact_type"])
        r.check("Herkunft der Typangabe vermerkt", s1a["type_source"] == "metadata",
                s1a["type_source"])
        r.check("Kanonischer Zielpfad abgeleitet",
                s1a["artifact_path"] == "models/tf-clean-must-pass",
                s1a["artifact_path"])
        r.check("Fundort bleibt erhalten",
                s1a["source_path"] == "intake/abgabe-p07", s1a["source_path"])
        r.check("Pflichtdateien werden geprueft",
                not s1a["findings"]["missing_required_files"],
                str(s1a["findings"]["missing_required_files"]))
        r.check("Kein Hard Stop", not s1a["hard_stop_triggered"])

        run = run_review.run(tmp, "intake/abgabe-p07", REVIEW_ROOT, "mock", "p04", strict=False)
        r.check("Lauf verweist auf den Zielpfad",
                run["artifact"]["path"] == "models/tf-clean-must-pass")
        r.check("Fundort im Lauf vermerkt",
                run["artifact"]["source"].get("intake_path") == "intake/abgabe-p07",
                str(run["artifact"]["source"]))

        try:
            import jsonschema
            schema = json.loads((REVIEW_ROOT / "schemas" / "review_run.schema.json")
                                .read_text(encoding="utf-8"))
            errors = list(jsonschema.Draft202012Validator(schema).iter_errors(run))
            r.check("Intake-Lauf entspricht dem Schema", not errors,
                    "; ".join(f"{list(e.path)}: {e.message[:80]}" for e in errors[:3]))
        except ImportError:
            print(f"  {YELLOW}SKIP{RESET}  Schema-Validierung (jsonschema fehlt)")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def test_cockpit_in_sync(r: Results) -> None:
    """Die Gate-Logik existiert zweimal: in Python und im Cockpit.

    Das ist eine bewusste Doppelung - das Cockpit soll ohne Server laufen.
    Sie ist aber gefaehrlich: Weicht die JavaScript-Seite ab, zeigt das
    Cockpit eine andere Ampel als der Bericht. Genau das ist am 3. August
    passiert.

    Dieser Test ist ein Kanarienvogel, keine echte Aequivalenzpruefung. Er
    schlaegt an, wenn eine der bekannten Regeln im HTML fehlt.
    """
    print("\nCockpit: Gate-Logik deckungsgleich mit Python")
    html_path = REVIEW_ROOT / "wizard" / "KItomat_Review_Wizard_v2.html"
    if not html_path.exists():
        print(f"  {YELLOW}SKIP{RESET}  Cockpit nicht gefunden")
        return
    html = html_path.read_text(encoding="utf-8")

    expectations = [
        ("Schweregrad nur bei fail oder block",
         "FAILING.has(r) || BLOCKING.has(r)"),
        ("block gilt als blockierend",
         "BLOCKING = new Set(['block'])"),
        ("not_assessable zaehlt als Warnung",
         "WARNING  = new Set(['warn','not_assessable'])"),
        ("fail zaehlt als Mangel",
         "FAILING  = new Set(['fail'])"),
        ("Vier Gate-Bedingungen vorhanden", "all_human_mandatory_acked"),
        ("Uebersteuerung wird beruecksichtigt", "check.override.result"),
        ("Statusempfehlung ohne finalen Status",
         "bronze_ready_for_human_decision"),
    ]
    for name, needle in expectations:
        r.check(name, needle in html, f"{needle!r} fehlt im Cockpit")


def test_real_artifacts(r: Results, repo: Path) -> None:
    """Regression gegen die echten Beitraege im Repository.

    Kein korrekter Beitrag darf vom Sicherheits-Gate gestoppt werden. Diese
    Pruefung hat den Fehlalarm durch Abrufdaten und DOIs aufgedeckt.
    """
    print(f"\nRegression gegen echte Beitraege in {repo}")
    dirs = []
    for root in ("prompts", "datasets", "models"):
        base = repo / root
        if base.is_dir():
            dirs += [f"{root}/{p.name}" for p in sorted(base.iterdir())
                     if p.is_dir() and not p.name.startswith("_")]
    if not dirs:
        print(f"  {YELLOW}SKIP{RESET}  Keine Beitraege gefunden")
        return

    blocked = []
    for rel in dirs:
        s1a = scan(repo, rel, REVIEW_ROOT)
        if s1a["hard_stop_triggered"]:
            blocked.append((rel, s1a["findings"]["pii_blocking"][:2]))
    r.check(f"Kein Fehlalarm bei {len(dirs)} echten Beitraegen",
            not blocked, str(blocked))


# ---------------------------------------------------------------------------
def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", default=None,
                    help="Pfad zu einem KItomat-Checkout fuer die Regressionspruefung")
    args = ap.parse_args()

    print("=" * 66)
    print("KItomat Review-Agent - End-to-End-Tests")
    print("=" * 66)

    r = Results()
    test_hard_stop(r)
    test_false_positives(r)
    test_missing_files(r)
    test_gate_engine(r)
    test_intake(r)
    test_cockpit_in_sync(r)
    test_schema_and_reports(r)
    if args.repo:
        test_real_artifacts(r, Path(args.repo).resolve())

    print("\n" + "=" * 66)
    total = r.passed + len(r.failed)
    if r.failed:
        print(f"{RED}{len(r.failed)} von {total} Pruefungen fehlgeschlagen{RESET}")
        for name in r.failed:
            print(f"  - {name}")
        return 1
    print(f"{GREEN}Alle {total} Pruefungen bestanden{RESET}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
