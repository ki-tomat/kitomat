# Anforderungsnachweis

Jede Anforderung, wo sie umgesetzt ist und womit sie belegt ist.
Stand: 3. August 2026

---

## A. Anforderungen des Projektowners

### A1 — „Ein KI-Agent soll die komplette Review-Prüfung machen"

| | |
|---|---|
| **Umgesetzt** | 7 Phasen, 55 Prüfpunkte. Jeder Punkt nennt seine Quelle in den Projektunterlagen — nichts hinzuerfunden. |
| **Wo** | `review/policy/review-checks.yml`, `review/tools/run_review.py` |
| **Belegt durch** | Testsuite „Sieben Phasen vorhanden", Vorführung `run_demo.py` |
| **Einschränkung** | 15 Prüfpunkte deterministisch und getestet. 40 laufen durch die Kette, liefern aber erst mit angebundenem Sprachmodell ein fachliches Urteil. |

### A2 — „…und vergibt einen Ampelstatus"

| | |
|---|---|
| **Umgesetzt** | `review_signal`: rot / gelb / grün. Nicht neu erfunden, sondern abgeleitet aus den `output_statuses`, die `agents/openclaw-precheck/openclaw-agent.yml` bereits definiert. |
| **Wo** | `review/tools/gate_engine.py`, Funktion `phase_signal` |
| **Belegt durch** | Tests „block → Signal rot", „not_assessable ergibt gelb, nicht rot", „Signal gruen" |
| **Namenswahl** | Bewusst `review_signal`, nicht `data_risk` — `data_risk` ist eine Eigenschaft des Artefakts, `review_signal` das Prüfergebnis. Gleiche Farbwerte, verschiedene Bedeutung. |

### A3 — „Der HITL macht die letzte Anpassung und gibt den nächsten Schritt frei"

| | |
|---|---|
| **Umgesetzt** | Reviewer-Cockpit. Jeder Befund übersteuerbar (mit Pflichtbegründung), jedes Gate einzeln freizugeben. |
| **Wo** | `review/wizard/KItomat_Review_Wizard_v2.html` |
| **Belegt durch** | Tests „Uebersteuerung hebt Blocker auf", „Reviewer kann verschaerfen", „Unterschrieben → passed" |
| **Nachweis in der Vorführung** | Beitrag A: 28 Punkte bestätigt, 7 Gates freigegeben |

### A4 — „Harte Gates, mit End-to-End-Tests angebunden. Erst grün, dann nächste Phase"

| | |
|---|---|
| **Umgesetzt** | Vier Bedingungen je Gate: kein blockierender Befund, kein P0, alle Pflichtbestätigungen erteilt, Reviewer hat unterschrieben. |
| **Wo** | `review/tools/gate_engine.py`, Funktion `gate_conditions` |
| **Belegt durch** | 12 Einzeltests der Gate-Logik plus 7 Tests, ob das Cockpit dieselbe Logik nutzt |
| **Kernpunkt** | Die Gate-Prüfung enthält **keinen einzigen Modellaufruf**. Eine KI kann ein Gate nicht öffnen. |

### A5 — „Trigger: bei Status ‚review required' Mail an die Reviewer-Gruppe, Agent startet"

| | |
|---|---|
| **Umgesetzt** | Zwei GitHub-Workflows. Auslöser ist das Label `review-required`. E-Mail an einen Verteiler, Kurzstatus als PR-Kommentar. |
| **Wo** | `review/workflows/review-agent-collect.yml`, `review-agent-run.yml` |
| **Belegt durch** | **Nichts. Die Workflows sind geschrieben, aber nie gelaufen.** |
| **Nicht aktiv** | Die Dateien liegen bewusst unter `review/workflows/` statt `.github/workflows/`. Dort würden sie sofort greifen. Auch das Label existiert im Repository noch nicht. Aktuell startet der Agent ausschließlich von Hand. |
| **Klärungsbedarf** | Der native GitHub-Status „Review required" aus der Branch-Protection lässt sich technisch nicht als Auslöser verwenden. Ein Label schon. Diese Auslegung wurde am 2. August festgelegt. |

#### A5a — Abweichung bei der Reihenfolge

Der Owner formulierte: *„…sollte eine Mail an die Reviewer-Gruppe gehen und
der Agent kicked off."* — also erst Mail, dann Agent.

**Umgesetzt ist die umgekehrte Reihenfolge:**

```
Label gesetzt  →  Agent prüft  →  E-Mail mit dem Ergebnis
```

**Begründung:** So enthält die Mail bereits den Ampelstatus. Der Reviewer
sieht sofort, ob es eilt und ob sich das Öffnen lohnt. In der ursprünglichen
Reihenfolge käme eine Mail „es ist etwas angekommen", und das Ergebnis
müsste separat nachgesehen werden.

**Rückbaubar:** Wer die ursprüngliche Reihenfolge möchte, ergänzt einen
zweiten Mail-Schritt am Anfang von `review-agent-run.yml`. Etwa zehn Zeilen,
sonst ändert sich nichts.

Diese Abweichung ist beim Übergabetermin anzusprechen.

### A6 — „Der Agent holt das Paket, durchläuft den Review, meldet zurück"

| | |
|---|---|
| **Umgesetzt** | Sammel-Workflow legt die betroffenen Artefaktordner ab, Prüf-Workflow holt sie, führt den Agenten aus, schreibt nach `review/results/`, kommentiert den PR, schickt die Mail. |
| **Wo** | beide Workflows |
| **Belegt durch** | lokal vollständig erprobt, in GitHub nicht |

---

## B. Regeln aus dem Projektbestand

### B1 — Der Agent darf nichts freigeben, mergen oder veröffentlichen

Quelle: `agents/openclaw-precheck/openclaw-agent.yml`, Abschnitt `not_allowed`

| | |
|---|---|
| **Umgesetzt** | `status_suggestion` kennt nur `draft`, `bronze_candidate`, `bronze_ready_for_human_decision`, `post_mvp`. Ein finaler Status ist im Schema nicht darstellbar. Der Agent schreibt ausschließlich nach `review/`. |
| **Belegt durch** | Test „Kein finaler Status vergeben", Test „human_decision_required immer true" |

### B2 — Keine echten personenbezogenen Daten

Quelle: `README.md` des Hauptrepos, `hard_stops` in der Agenten-Policy

| | |
|---|---|
| **Umgesetzt** | Phase 0 läuft vollständig lokal, vor jedem Modellaufruf. Bei einem Treffer endet der Lauf. |
| **Belegt durch** | Test „Keine Datei an den Agenten uebertragen", Vorführung Beitrag B: „5 Dateien vorgemerkt, 0 gesendet" |
| **Verschärfung** | Im Hauptrepo warnt `pii_heuristic.py` nur und lässt den PR durch. Im Review-Prozess blockiert die Prüfung. Diese Verschärfung gilt **nur bei uns** — an `main` wurde nichts geändert. |

### B3 — Grün heißt nicht freigegeben

Quelle: `agents/openclaw-precheck/handoff-flow.md`

| | |
|---|---|
| **Umgesetzt** | Wortlaut unverändert übernommen. Im Cockpit steht bei jedem Statusvorschlag „Empfehlung, keine Vergabe". Jeder Bericht endet mit dem Disclaimer. |
| **Belegt durch** | Test „Feedback enthaelt den Disclaimer" |

### B4 — No-Impact: keine Änderung an Web-GUI und Bibliothek

Quelle: Beschluss des Review-Teams vom 7. Juli 2026

| | |
|---|---|
| **Umgesetzt** | Kein Ordner außerhalb von `review/` wurde angefasst. Die PII-Muster werden aus dem bestehenden Validator **importiert**, nicht kopiert — beide bleiben automatisch synchron. |
| **Belegt durch** | `git status` bzw. der Diff des Commits |

### B5 — Risikostufen steuern die Prüftiefe

Quelle: `04_GITHUB_KURS_WORKFLOW.md`, Abschnitt 9

| | |
|---|---|
| **Umgesetzt** | Bei `data_risk: yellow` oder `red` lautet die Empfehlung automatisch `start_trust_review`. Trust- und Quellenprüfungen werden zwingend menschlich bestätigt. |
| **Wo** | `gate_engine.py`, Funktion `_handoff`; `run_review.py`, Funktion `_risk_triggers` |
| **Belegt durch** | Echter Lauf gegen `models/kmu-ki-online-marketing-workbook` (`data_risk: yellow`) ergibt `start_trust_review` |

### B6 — Syntaxfehler blockieren nicht

Quelle: `04_GITHUB_KURS_WORKFLOW.md`, Abschnitt 6

| | |
|---|---|
| **Umgesetzt** | Platzhalter und Formfehler sind P2/P3 und halten kein Gate auf. Blockierend sind nur Sicherheitsbefunde. |
| **Belegt durch** | Test „Kein Hard Stop deswegen" bei fehlenden Pflichtdateien |

---

## C. Was ausdrücklich nicht erfüllt ist

| Punkt | Stand | Aufwand |
|---|---|---|
| Sprachmodell gegen echten Dienst erprobt | Adapter für Ollama, OpenRouter und beliebige OpenAI-kompatible Dienste sind gebaut, aber nie gegen einen laufenden Endpunkt getestet | 1–2 Stunden |
| GitHub-Workflows erprobt | geschrieben, nie gelaufen | ein halber Tag |
| Fork-Beiträge getestet | konstruiert, nicht erprobt | in obigem enthalten |
| E-Mail-Versand getestet | nie gelaufen (keine Zugangsdaten) | 1 Stunde |
| Kosten-Cache nach Commit-SHA | nicht gebaut | 2 Stunden |
| Automatische Übernahme aus `review/intake/` nach `prompts/`, `datasets/` oder `models/` nach bestandenem Review | nicht gebaut — der Eingang selbst funktioniert, die Übernahme macht bislang ein Mensch | halber Tag |

Alle Punkte stehen mit Begründung in `review/docs/UEBERGABE.md`.

---

## D. Testabdeckung

53 Prüfungen, alle grün.

| Bereich | Prüfungen | Was belegt wird |
|---|---|---|
| Sicherheits-Gate | 10 | PII stoppt, nichts wird übertragen, Phasen brechen ab |
| Vorfilter | 5 | Abrufdaten und DOI blockieren nicht |
| Pflichtdateien | 3 | Fehlende Datei fällt auf, blockiert aber nicht |
| Gate-Logik | 17 | Jede Bedingung einzeln, Übersteuerung in beide Richtungen |
| Cockpit-Gleichlauf | 7 | JavaScript rechnet wie Python |
| Schema und Berichte | 10 | Format gültig, drei Berichte erzeugt, Grenzen benannt |
| Regression | 1 | Kein Fehlalarm bei 7 echten Beiträgen |

**Vier Fehler wurden dadurch gefunden**, die im Betrieb Vertrauen gekostet
hätten: Abrufdaten als Telefonnummern, Nichtwissen als Blocker, Disclaimer
als Rechtsberatung, Cockpit gegen Bericht.
