# Architektur des Review-Agenten

## 1. Das Grundprinzip

```
Der Agent bewertet.  Der Mensch entscheidet.  Das Gate rechnet.
```

Diese drei Rollen sind technisch getrennt. Ein Gate öffnet niemals, weil ein
Sprachmodell „grün" gesagt hat, sondern nur, wenn nachprüfbare Bedingungen
erfüllt sind. Das ist keine Zusage in einem Dokument, sondern Code in
`tools/gate_engine.py` — eine Datei ohne jeden Modellaufruf.

---

## 2. Ablauf eines Laufs

```
Pull Request mit Label review-required
        │
        ▼
┌───────────────────────────────────────────────┐
│ PHASE 0 — Sicherheits-Gate                    │
│ deterministisch, lokal, keine Übertragung     │
│                                               │
│  Dateien hashen und einfrieren                │
│  PII-Vorfilter (Datum, DOI, Zahlenspanne)     │
│  PII-Abgleich: E-Mail, IBAN, Steuer-ID        │
│  Pflichtdateien, Platzhalter, Teilnehmercode  │
└───────────────────────────────────────────────┘
        │
        ├── Treffer ──► ROT. Lauf endet. Nichts wurde übertragen.
        │
        ▼ sauber
┌───────────────────────────────────────────────┐
│ PHASE 1–6 — Provider                          │
│                                               │
│  1  Potenzial, Grenzfälle, blinde Flecken     │
│  2  Pflichtdateien und Struktur               │
│  3  Metadaten, Lizenz, Trust Layer            │
│  4  Peer Review                               │
│  5  Szenario-Triade und Tests                 │
│  6  Rückmeldung und Statusvorschlag           │
└───────────────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────────────────┐
│ Gate-Engine                                   │
│  Signale je Phase, Gate-Bedingungen, Gesamt   │
└───────────────────────────────────────────────┘
        │
        ▼
   review_run.json  +  drei Markdown-Berichte
        │
        ├──► E-Mail an die Reviewer-Gruppe
        └──► Reviewer-Cockpit: prüfen, übersteuern, freigeben
```

Die Phasenreihenfolge stammt aus dem bestehenden Codex-Peer-Review-Prompt des
Projekts. Dass die inhaltliche Einschätzung (Phase 1) **vor** der
Formalprüfung kommt, ist Absicht: Zuerst beurteilen, ob der Beitrag trägt,
dann Dateilisten abhaken.

---

## 3. Warum der automatische Start vertretbar ist

Das ursprüngliche Konzept sah vor, dass ein Mensch den Modellaufruf per Label
freigibt, bevor Daten das Projekt verlassen. Der Projektowner wollte einen
automatischen Start. Beides gleichzeitig geht nicht.

Die Lösung: **Nicht ein Mensch ist das Gate, sondern Phase 0.** Sie läuft
vollständig lokal in GitHub Actions, ohne dass ein Byte an einen externen
Dienst geht. Erst wenn sie sauber durchläuft, startet die Prüfung durch den
Provider — automatisch.

Gedeckt ist das durch `agents/openclaw-precheck/openclaw-agent.yml`, das
bereits neun `hard_stops` für genau diesen Zweck definiert.

---

## 4. Die vier Gate-Bedingungen

Ein Gate öffnet, wenn **alle vier** erfüllt sind:

| Bedingung | Prüfung |
|---|---|
| `no_blocking_results` | kein Prüfpunkt mit Ergebnis `block` |
| `no_p0_findings` | kein Befund mit Schweregrad `P0` |
| `all_human_mandatory_acked` | alle Pflichtbestätigungen erteilt |
| `reviewer_signed` | der Reviewer hat unterschrieben |

Daraus ergibt sich der Zustand:

- **blocked** — harte Bedingung verletzt, ohne Nacharbeit der beitragenden
  Person nicht lösbar
- **closed** — noch nicht erfüllt, aber erfüllbar
- **open** — alles erfüllt, nur die Unterschrift fehlt
- **passed** — freigegeben

Die Logik existiert **zweimal**: in `tools/gate_engine.py` (Python) und im
Cockpit (JavaScript). Beide müssen identisch bleiben. Wer eine ändert, muss
die andere mitziehen — die Testsuite prüft die Python-Seite, die
JavaScript-Seite ist im HTML kommentiert.

---

## 5. Die Ampel

Sie ist keine Erfindung, sondern eine Darstellung der Status, die
`openclaw-agent.yml` bereits kennt:

| Ampel | Auslöser | Handoff |
|---|---|---|
| **rot** | `block` oder `P0` | zurück an die beitragende Person |
| **gelb** | `fail`, `warn`, `not_assessable` oder `P1` | Nacharbeit oder Trust Review |
| **grün** | alles übrige | Reviewer kann freigeben |

**Grün heißt nicht freigegeben.** Der Wortlaut steht in
`handoff-flow.md` des Hauptrepos und wurde unverändert übernommen: `ready_for_human_eval`
bedeutet, dass der Beitrag strukturell prüfbar erscheint — nicht: freigegeben,
gemergt, veröffentlicht, rechtlich geprüft oder final `bronze`.

Das Feld heißt `review_signal`, nicht `data_risk`. `data_risk` ist eine
Eigenschaft des Artefakts aus `metadata.yml`, `review_signal` das Ergebnis der
Prüfung. Gleiche Farbwerte, verschiedene Bedeutung.

---

## 6. Herkunft jedes Befunds

Jeder Prüfpunkt trägt `produced_by`:

| Wert | Bedeutung | In Tests |
|---|---|---|
| `validator` | deterministisch, aus dem Dateisystem | exakt prüfbar |
| `agent` | Sprachmodell, immer mit `confidence` | nur strukturell prüfbar |
| `human` | Reviewer-Eingabe | — |

Das ist der Grund, warum die Testsuite überhaupt sinnvoll sein kann.
Sprachmodellausgaben sind nicht deterministisch; ein Test auf exakte
Formulierungen würde zufällig fehlschlagen. Getestet wird deshalb der
`validator`-Anteil exakt und der `agent`-Anteil nur auf Struktur.

Aktuell: 15 deterministische, 40 agentengestützte Prüfpunkte.

---

## 7. Provider-Schicht

```
run_review.py  ──►  providers/registry.py  ──►  providers/mock.py
   (Regeln)              (Auswahl)               (kein Netzaufruf)
                                          └────►  providers/<neu>.py
```

Der Orchestrator kennt die Review-Regeln, Gates und Statusübergänge. Ein
Provider kennt ausschließlich die Kommunikation mit einem Modell. Deshalb
lässt sich der Anbieter wechseln, ohne den Prozess umzubauen.

**Der Mock ist der Standard.** Er ruft nichts auf und überträgt nichts. Was
echtes Sprachverständnis braucht, gibt er als `not_assessable` mit
`confidence: low` zurück — ehrlicher als ein erfundenes `pass` und im Cockpit
sofort sichtbar.

Jede Provider-Antwort läuft durch `validate_provider_result()`, bevor sie in
den Lauf übernommen wird. Ein Modell ist nicht vertrauenswürdig, nur weil es
antwortet: Unbekannte Prüfpunkt-IDs, doppelte Einträge und unzulässige
Ergebniswerte werden abgewiesen.

---

## 8. Warum kein localStorage im Cockpit

Die Projektunterlagen weisen `localStorage` ausdrücklich als ungeeigneten
Audit-Speicher zurück. Der Lauf bleibt deshalb im Arbeitsspeicher und wird
ausdrücklich exportiert. Der Browser warnt beim Verlassen der Seite, falls es
ungespeicherte Änderungen gibt.

Das ist unbequemer, aber ehrlicher: Ein Review-Protokoll, das still im Browser
liegt, ist kein Protokoll.

---

## 9. Zwei Workflows statt einem

Bei Pull Requests aus einem **Fork** stellt GitHub keine Repository-Secrets
bereit. Ein einziger Workflow mit API-Schlüssel liefe bei genau den Beiträgen
nicht, für die der Agent gedacht ist — den externen.

Deshalb:

1. **`review-agent-collect.yml`** — ohne Secrets, ohne erhöhte Rechte. Sammelt
   nur die geänderten Artefaktordner als Artifact.
2. **`review-agent-run.yml`** — startet über `workflow_run`, läuft im Kontext
   des Zielrepositorys, hat Zugriff auf Secrets.

**Der Code aus dem Pull Request wird niemals ausgeführt.** Er wird nur als
Datei gelesen. Ausgeführt wird ausschließlich Code aus der vertrauenswürdigen
Review-Branch.

---

## 10. Dateien und Zuständigkeiten

| Datei | Zuständig für |
|---|---|
| `policy/review-checks.yml` | **Was** geprüft wird — 55 Punkte mit Quellenangabe |
| `schemas/review_run.schema.json` | **Wie** das Ergebnis aussieht |
| `tools/stage1a_scan.py` | Phase 0, deterministisch |
| `tools/gate_engine.py` | Gate-Bedingungen, Signale, Handoff |
| `tools/run_review.py` | Steuerung aller Phasen |
| `tools/providers/` | Anbindung an Sprachmodelle |
| `tools/report_renderer.py` | die drei Markdown-Berichte |
| `wizard/…v2.html` | Reviewer-Cockpit |
| `workflows/` | Trigger und Benachrichtigung |
| `tests/` | Belege, dass die Gates greifen |

Wer eine Prüfregel ändern will, ändert `review-checks.yml` — nicht den Code.
Das ist der Sinn der Trennung.
