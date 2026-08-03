# KItomat Review-Modul

Automatische Vorprüfung eingereichter Beiträge mit menschlicher Endentscheidung.

> **Der Agent bewertet. Der Mensch entscheidet. Das Gate rechnet.**

Dieser Bereich gehört zur Branch `review/pre-review-wizard` und arbeitet
getrennt von `main`. Er liest aus KItomat und schreibt ausschließlich nach
`review/`.

---

## Schnellstart

```bash
python -m pip install pyyaml jsonschema

# Testsuite
python3 review/tests/run_tests.py --repo .

# Vollständiger Lauf, ohne API-Schlüssel
python3 review/tools/run_review.py . models/kmu-ki-online-marketing-workbook
```

Danach `review/wizard/KItomat_Review_Wizard_v2.html` im Browser öffnen und die
erzeugte `review_run.json` hineinziehen.

---

## Zwei Wege in den Review

**Manuell** — funktioniert sofort, ohne Workflows und ohne Label:

```bash
# Paket nach review/intake/<ordnername>/ legen, dann:
python3 review/tools/run_review.py . review/intake/<ordnername>
```

**Automatisch** — über das Label `review-required` an einem Pull Request.
Die Workflows liegen unter `review/workflows/` und sind bewusst noch nicht
aktiv, siehe `docs/UEBERGABE.md`, Abschnitt 4a.

## Was der Agent tut

```
Beitrag aus review/intake/ oder aus einem Pull Request
  → Phase 0   Sicherheits-Gate, lokal, keine Übertragung
  → Phase 1–6 Prüfung durch den Provider
  → Ampel + review_run.json + drei Berichte
  → E-Mail an die Reviewer-Gruppe
  → Reviewer prüft im Cockpit und gibt jedes Gate frei
  → Maintainer entscheidet über Merge und Status
```

Sieben Phasen, 55 Prüfpunkte, drei Ampelfarben.

| Ampel | Bedeutung | Nächster Schritt |
|---|---|---|
| **rot** | blockierender Befund oder P0 | zurück an die beitragende Person |
| **gelb** | Nacharbeit oder Trust Review nötig | je nach Befund |
| **grün** | keine blockierenden Befunde | Reviewer kann freigeben |

**Grün heißt nicht freigegeben.** Es heißt: bereit zur menschlichen Freigabe.

## Was der Agent nicht tut

Kein Merge. Kein Statuswechsel. Keine Veröffentlichung. Keine Labels im
Hauptrepository. Keine Rechts- oder Auditaussagen. Keine Änderung an
Contributor-Dateien.

Festgeschrieben in `policy/review-checks.yml` unter `not_allowed`, geprüft von
der Testsuite.

---

## Verzeichnis

```
review/
  README.md                  diese Datei
  docs/
    UEBERGABE.md             Stand, Lücken, nächste Schritte   ← hier anfangen
    ARCHITEKTUR.md           wie es funktioniert
    SCHNITTSTELLEN.md        Grenzen zum Hauptprojekt
    BETRIEB.md               ausführen, Provider anbinden, Kosten
    ERKLAERUNG_EINFACH.md    dasselbe ohne Fachsprache
    ANFORDERUNGSNACHWEIS.md  jede Anforderung mit Beleg
    UEBERGABE_ONEPAGER.html  eine Seite Überblick
    KONZEPT_KI_REVIEW_AGENT.pdf  das vom Owner abgenommene Konzept
  policy/
    review-checks.yml        WAS geprüft wird, 55 Punkte mit Quellenangabe
  schemas/
    review_run.schema.json   WIE das Ergebnis aussieht
    review_run.example.json  ausgefülltes Beispiel
  tools/
    stage1a_scan.py          Phase 0, deterministisch
    gate_engine.py           Gate-Bedingungen und Signale
    run_review.py            Steuerung aller Phasen
    report_renderer.py       die drei Markdown-Berichte
    providers/               anbieterneutrale Schicht
  wizard/
    KItomat_Review_Wizard_v2.html    Reviewer-Cockpit, standalone
  tests/
    run_tests.py             End-to-End-Tests
    fixtures/                Beiträge mit bekanntem Sollergebnis
  workflows/                 GitHub Actions zum Kopieren
  intake/                    Eingang für Beiträge ohne Pull Request
  results/                   Ergebnisse je Beitrag und Lauf
```

---

## Grundregeln

1. **Phase 0 läuft vor jedem Modellaufruf.** Bei einem Treffer wird nichts
   übertragen.
2. **Gates öffnen über nachprüfbare Bedingungen**, nie über eine
   Modellbewertung.
3. **Es wird nur nach `review/` geschrieben.** `main`, `prompts/`, `datasets/`
   und `models/` bleiben unberührt.
4. **Prüfregeln ändert man in `review-checks.yml`**, nicht im Code.
5. **Jeder Befund trägt seine Herkunft** — `validator`, `agent` oder `human`.

---

## Sprachmodell: vier Wege, keiner erzwungen

| Provider | Kosten | Datenübertragung |
|---|---|---|
| `mock` (Standard) | keine | **keine** |
| `ollama` — lokal | keine | **keine** |
| `openrouter` | pro Lauf | extern |
| `llm` — beliebiger OpenAI-kompatibler Dienst | je nach Anbieter | extern |

Standard ist der Mock. Er spielt die gesamte Kette durch, ohne etwas zu
übertragen, und gibt Punkte, die echtes Sprachverständnis brauchen, als
`not_assessable` zurück — ehrlicher als ein erfundenes `pass`.

```bash
# lokal, ohne Kosten, ohne Datenübertragung
ollama pull qwen2.5:7b && ollama serve
python3 review/tools/run_review.py . models/<artefakt> --provider ollama
```

Details und weitere Anbieter: `docs/BETRIEB.md`, Abschnitt 4.

---

## Stand

15 der 55 Prüfpunkte sind deterministisch und getestet. Die übrigen 40 laufen
durch die Kette, liefern aber ohne echten Provider kein fachliches Urteil. Die
GitHub-Workflows sind geschrieben, aber noch nie gelaufen.

Vollständige und ehrliche Bestandsaufnahme: **`docs/UEBERGABE.md`**.
