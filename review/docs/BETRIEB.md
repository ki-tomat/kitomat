# Betrieb des Review-Agenten

## 1. Voraussetzungen

- Python 3.11
- `pyyaml` und `jsonschema`

```bash
python -m pip install pyyaml jsonschema
```

Sonst nichts. Kein Build, kein Node, keine Datenbank, kein API-Schlüssel.

---

## 2. Lokal ausführen

Aus dem Wurzelverzeichnis eines KItomat-Checkouts:

```bash
# Nur die deterministische Vorprüfung
python3 review/tools/stage1a_scan.py . models/kmu-ki-online-marketing-workbook

# Vollständiger Lauf mit Mock-Provider
python3 review/tools/run_review.py . models/kmu-ki-online-marketing-workbook

# Testsuite
python3 review/tests/run_tests.py --repo .
```

Das Ergebnis landet unter:

```
review/results/<artefakt-id>/<run-id>/
    review_run.json
    agent_report.md
    contributor_feedback.md
    maintainer_handoff.md
```

Anschließend `review/wizard/KItomat_Review_Wizard_v2.html` im Browser öffnen
und die `review_run.json` hineinziehen.

**Exit-Codes:** `0` = Gate offen, `2` = Sicherheits-Gate hat gestoppt.

---

## 3. In GitHub aktivieren

### Schritt 1 — Label anlegen

Einstellungen → Labels → `review-required`

Ohne dieses Label passiert nichts. Beide Workflows prüfen darauf.

### Schritt 2 — Workflows einspielen

```
review/workflows/review-agent-collect.yml  →  .github/workflows/
review/workflows/review-agent-run.yml      →  .github/workflows/
```

Beide sind so gebaut, dass sie ohne Label nichts tun. Sie können gefahrlos
eingespielt werden, bevor über den Provider entschieden ist.

### Schritt 3 — Testlauf

Einen Pull Request mit einem Beitrag öffnen, Label `review-required` setzen.
Der Agent läuft mit dem Mock, schreibt das Ergebnis in die Review-Branch und
kommentiert den Pull Request mit dem Kurzstatus.

### Schritt 4 (optional) — E-Mail

Vier Secrets anlegen:

| Secret | Inhalt |
|---|---|
| `MAIL_SERVER` | SMTP-Server, EU-gehostet empfohlen |
| `MAIL_USERNAME` | SMTP-Benutzer |
| `MAIL_PASSWORD` | SMTP-Passwort |
| `REVIEWER_MAIL_GROUP` | Verteileradresse der Reviewer-Gruppe |

Fehlen sie, wird der Schritt übersprungen und der Lauf gilt trotzdem als
erfolgreich.

---

## 4. Provider anbinden

Vier Provider sind eingebaut:

| Name | Was | Kosten | Datenübertragung |
|---|---|---|---|
| `mock` | Platzhalter, Stichwortabgleich | keine | **keine** |
| `ollama` | Modell läuft lokal | keine | **keine** |
| `openrouter` | ein Zugang, viele Modelle | pro Lauf | ja, extern |
| `llm` | beliebiger OpenAI-kompatibler Dienst | je nach Anbieter | ja, extern |

Standard ist `mock`. Umgestellt wird über `--provider <name>` oder die
Umgebungsvariable `KITOMAT_REVIEW_PROVIDER`.

### Ollama — lokal, ohne Kosten, ohne Datenübertragung

Für dieses Projekt die naheliegendste Wahl: Die Beiträge verlassen den
Rechner nicht, damit entfällt die Anbieterfrage beim Datenschutz vollständig.

```bash
ollama pull qwen2.5:7b
ollama serve

python3 review/tools/run_review.py . models/<artefakt> --provider ollama
```

Optional: `OLLAMA_MODEL` und `OLLAMA_HOST` setzen.

Ein 7B-Modell reicht für Formprüfungen. Für die inhaltlichen Phasen 1 und 4
liefert ein größeres Modell spürbar bessere Befunde.

### OpenRouter

```bash
set OPENROUTER_API_KEY=sk-or-...
set OPENROUTER_MODEL=mistralai/mistral-small-latest

python3 review/tools/run_review.py . models/<artefakt> --provider openrouter
```

**Wichtig:** Für den Dauerbetrieb eine feste Modellversion wählen, keinen
Alias wie `:latest`. Sonst ändert sich das Prüfverhalten unbemerkt. Der
Adapter protokolliert immer die Version, die der Dienst tatsächlich
zurückmeldet — nicht die angefragte.

### Beliebiger anderer Dienst

Die meisten Anbieter sprechen die OpenAI-Schnittstelle, darunter Mistral
direkt:

```bash
set LLM_BASE_URL=https://api.mistral.ai/v1
set LLM_MODEL=mistral-small-2506
set LLM_API_KEY=...

python3 review/tools/run_review.py . models/<artefakt> --provider llm
```

Kein Code nötig.

### Einen Anbieter mit eigener Schnittstelle anbinden

**1. Datei anlegen:** `review/tools/providers/<name>.py`

```python
from .base import CheckResult, PhaseRequest, ProviderResult

class MeinProvider:
    name = "meinprovider"
    model_id = "modell-2026-05-01"   # versioniert, nicht "latest"

    def review_phase(self, request: PhaseRequest) -> ProviderResult:
        ...
        return ProviderResult(phase_id=request.phase_id, checks=[...])
```

**2. Eintragen** in `providers/registry.py`, Wörterbuch `_BUILDERS`.

**3. Aufrufen:** `--provider meinprovider`.

### Anforderungen an jeden Provider

| Anforderung | Warum |
|---|---|
| Zustandsloser Endpunkt | Keine Speicherung beim Anbieter |
| Versionierte Modell-ID | Reproduzierbare Abnahmetests. `latest` verbietet sich |
| Strukturierte Antwort je Prüfpunkt | Kein Zurückparsen aus Fließtext |
| Schlüssel nur aus der Umgebung | Nie im Code, nie in einer `.env` im Build |
| `not_assessable` bei Unsicherheit | Ein erfundenes `pass` ist gefährlicher als ein Eingeständnis |
| Keine Statusvergabe | Ausdrücklich verboten in `openclaw-agent.yml` |

Jede Antwort läuft durch `validate_provider_result()`. Unbekannte
Prüfpunkt-IDs, doppelte Einträge und unzulässige Ergebniswerte werden
abgewiesen.

---

## 5. Kosten

Ohne Provider: **null.** Der Mock ruft nichts auf.

Mit Provider entstehen Kosten pro Lauf. Steuerungsmöglichkeiten, die bereits
eingebaut sind:

| Maßnahme | Wo | Wirkung |
|---|---|---|
| Label-Trigger | Workflow | Läuft nur auf ausdrückliche Anforderung, nicht bei jedem Push |
| `MAX_FILE_CHARS` = 40.000 | `run_review.py` | Begrenzt einzelne Dateien |
| `MAX_TOTAL_CHARS` = 200.000 | `run_review.py` | Begrenzt den Gesamtumfang eines Laufs |
| Hard Stop in Phase 0 | `stage1a_scan.py` | Blockierte Beiträge kosten nichts |

**Noch nicht eingebaut:** ein Cache nach Commit-SHA. Wird ein Pull Request
mehrfach mit dem Label versehen, läuft der Agent erneut. Für den MVP
vertretbar, für den Dauerbetrieb nachrüsten — siehe `UEBERGABE.md`.

---

## 6. Grenzen im Betrieb

**Der Browser kann nicht ins Repository schreiben.** Der Reviewer exportiert
die `review_run.json` und legt sie unter `review/results/` ab, oder ein
Workflow übernimmt das. Beides ist vorgesehen.

**Der Agent verifiziert keine Quellen.** Er prüft, ob Herkunft und Abrufdatum
angegeben sind — nicht, ob die Quelle existiert oder das aussagt, was
behauptet wird. Diese Punkte sind als `human_mandatory` markiert.

**Fachliche Richtigkeit** in einer Spezialdomäne kann er nicht beurteilen.
Das steht so auch in jedem erzeugten Bericht.

**Rechtliche Aussagen** sind ausdrücklich verboten.

---

## 7. Fehlersuche

| Symptom | Ursache | Lösung |
|---|---|---|
| „Artefaktordner nicht gefunden" | Pfad relativ zum Repo-Wurzelverzeichnis erwartet | `models/xyz` statt `./models/xyz/` |
| Alle Prüfpunkte `not_assessable` | Mock-Provider aktiv | Normal. Echter Provider nötig |
| Gate bleibt `closed` | Pflichtbestätigungen offen | Im Cockpit bestätigen |
| Gate `blocked` trotz sauberem Beitrag | Fehlalarm im PII-Muster | Treffer prüfen; ggf. Vorfilter in `review-checks.yml` ergänzen |
| Schema-Warnung nach dem Lauf | `review_run.json` weicht ab | Meldung nennt den Pfad im Dokument |
| Workflow läuft nicht | Label fehlt oder Pfad nicht betroffen | Label setzen; Workflow reagiert nur auf `prompts/`, `datasets/`, `models/` |
| Fork-PR ohne Ergebnis | Zwei-Workflow-Kette unterbrochen | Beide Workflows müssen eingespielt sein |

---

## 8. Wartung

**Wenn sich KItomat ändert:** siehe `SCHNITTSTELLEN.md`, Abschnitt 1. Dort
steht je Lesestelle, was bei einer Änderung nachzuziehen ist.

**Wenn eine Prüfregel sich ändert:** `policy/review-checks.yml` bearbeiten und
`ruleset_version` erhöhen. Der Code bleibt unverändert. Jeder Lauf
protokolliert die verwendete Version.

**Nach jeder Änderung:**

```bash
python3 review/tests/run_tests.py --repo .
```

Die Regressionsprüfung gegen die echten Beiträge ist der wichtigste Teil —
sie hat den Fehlalarm durch Abrufdaten und DOI-Fragmente aufgedeckt, der
sonst erst im Produktivbetrieb aufgefallen wäre.
