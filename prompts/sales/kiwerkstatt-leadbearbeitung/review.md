# Review-Checkliste: KIWerkstatt Leadbearbeitung

Version: v1.0  
Status: Review-Vorlage fuer Bronze-Freigabe  
Paket: `prompts/sales/kiwerkstatt-leadbearbeitung/`

---

## 1. Zweck dieser Review-Datei

Diese Datei dient als strukturierte Pruefung fuer das Prompt-Paket **Effektive Leadbearbeitung fuer die KIWerkstatt Hamburg GmbH**.

Sie soll klaeren, ob das Paket als `bronze_candidate` in den Status `bronze` ueberfuehrt werden kann.

Der Review prueft nicht nur, ob Dateien vorhanden sind, sondern ob das Paket:

- fachlich nachvollziehbar ist,
- fuer Nutzer verstaendlich dokumentiert ist,
- mit synthetischen Beispielen getestet wurde,
- Trust Layer und Human Review sichtbar macht,
- keine echten personenbezogenen Daten enthaelt,
- keine unzulaessige Vertriebsautomatisierung nahelegt.

---

## 2. Review-Rollen

| Rolle | Aufgabe | Status |
|---|---|---|
| Autor / Maintainer | Paket erstellt und Dateien gepflegt | offen |
| Peer Reviewer | Fachliche Lesbarkeit, Nutzbarkeit und Beispiele pruefen | offen |
| Trust Reviewer | Datenschutz, Human Review, Failure Modes und Grenzen pruefen | offen |
| Maintainer / Merge-Verantwortlicher | Statusentscheidung treffen | offen |

---

## 3. Artefakt-Vollstaendigkeit

| Pruefpunkt | Erwartung | Status | Kommentar |
|---|---|---|---|
| `README.md` vorhanden | Zweck, Zielgruppe, Module, Nutzung und Grenzen beschrieben | offen |  |
| `metadata.yml` vorhanden | Status, Kategorie, Trust Layer, Inputs, Outputs und Review-Felder beschrieben | offen |  |
| `workflow.md` vorhanden | Prozess von Input-Layer bis Human Review beschrieben | offen |  |
| `evaluation.md` vorhanden | Testlogik und Bewertungskriterien dokumentiert | offen |  |
| `failure-modes.md` vorhanden | typische Fehler, Risiken und Gegenmassnahmen dokumentiert | offen |  |
| Input-Layer vorhanden | Konzept, Preflight, Schemas und Mapping vorhanden | offen |  |
| drei Prompt-Dateien vorhanden | Prompt 1, Prompt 2 und Prompt 3 vorhanden | offen |  |
| Beispiele vorhanden | je Modul mindestens ein Input und ein Output vorhanden | offen |  |
| Datensaetze vorhanden | synthetische Leads, CRM-Gespraech und Budgeteinwaende vorhanden | offen |  |

---

## 4. Input-Layer-Review

| Pruefpunkt | Erwartung | Status | Kommentar |
|---|---|---|---|
| Pflichtfelder sichtbar | Jede Input-Karte benennt Pflichtfelder | offen |  |
| `unbekannt` erlaubt | Fehlende Informationen muessen nicht erfunden werden | offen |  |
| leere Pflichtfelder stoppen Analyse | Preflight-Regel vorhanden | offen |  |
| unbekannte Pflichtfelder erlauben Analyse | Unsicherheit wird markiert | offen |  |
| Datenschutzcheck enthalten | Alle Input-Karten enthalten Datenschutzfelder | offen |  |
| Human Review enthalten | `human_review_required: true` sichtbar | offen |  |
| Automatisierung vorbereitet | Mapping fuer CRM, Formular, Transkript, CSV oder E-Mail vorhanden | offen |  |
| Keine fachliche Entscheidung im Input-Layer | Input-Layer normalisiert nur Daten | offen |  |

---

## 5. Prompt-1-Review: Lead-Qualifizierung & Scoring

| Pruefpunkt | Erwartung | Status | Kommentar |
|---|---|---|---|
| ICP-Passung nachvollziehbar | Branche, Groesse, Rolle, Pain Points und Kaufsignale werden geprueft | offen |  |
| Score begruendet | Score 1-10 ist nachvollziehbar, nicht willkuerlich | offen |  |
| Lead-Kategorie plausibel | Hot, Warm, Cold oder No-Fit passt zur Begruendung | offen |  |
| Outbound-Regel beruecksichtigt | fehlender Budgetrahmen bei Outbound nicht automatisch No-Fit | offen |  |
| Entscheidungsbefugnis sichtbar | Rolle und Entscheidungslogik werden markiert | offen |  |
| Risiken getrennt von Negativsignalen | Datenschutz- oder IT-Pruefung wird nicht falsch als schlechter Lead gewertet | offen |  |
| keine finale Entscheidung | KI liefert Vorbewertung, keine finale Priorisierung | offen |  |

---

## 6. Prompt-2-Review: CRM-Zusammenfassung

| Pruefpunkt | Erwartung | Status | Kommentar |
|---|---|---|---|
| nur genannte Informationen | Keine erfundenen CRM-Felder, Budgets, Termine oder naechsten Schritte | offen |  |
| Fakten / Einschaetzungen / Unsicherheiten getrennt | Unsichere Angaben werden markiert | offen |  |
| fehlende Angaben korrekt markiert | `Nicht im Gespraech genannt` oder vergleichbare Markierung | offen |  |
| Terminlogik geprueft | relative Termine werden nur plausibel uebernommen | offen |  |
| Datenschutzrisiken sichtbar | sensible oder personenbezogene Angaben werden markiert | offen |  |
| CRM-Status bleibt Entwurf | Keine produktive CRM-Freigabe | offen |  |
| Human Review sichtbar | Uebernahme ins CRM muss menschlich geprueft werden | offen |  |

---

## 7. Prompt-3-Review: Budget-, Preis- und Prioritaetseinwaende

| Pruefpunkt | Erwartung | Status | Kommentar |
|---|---|---|---|
| Einwand korrekt kategorisiert | Budget, Timing, Vertrauen oder Freigabe werden unterschieden | offen |  |
| Hintergruende als Hypothesen | Keine Vermutungen als Fakten | offen |  |
| Antwortoptionen respektvoll | sachlich, ruhig, nicht manipulativ | offen |  |
| keine Rabatte erfunden | keine nicht belegten Preiszugestaendnisse | offen |  |
| keine ROI-Zahlen erfunden | keine unbelegten Nutzenzahlen | offen |  |
| keine Referenzen erfunden | keine erfundenen Kunden, Fallstudien oder Quellen | offen |  |
| kein Druckaufbau | kein kuenstlicher Zeitdruck, kein Abschlusszwang | offen |  |
| Rueckzug als echte Option | respektvoller Rueckzug vorhanden | offen |  |

---

## 8. Trust-Layer-Review

| Pruefpunkt | Erwartung | Status | Kommentar |
|---|---|---|---|
| Datenrisiko korrekt | `data_risk: yellow` ist plausibel | offen |  |
| personenbezogene Daten moeglich | `personal_data_possible: true` gesetzt | offen |  |
| Human Review verpflichtend | `human_review_required: true` gesetzt | offen |  |
| AI-Act-Naehe realistisch | `ai_act_proximity: transparency` plausibel | offen |  |
| keine Echtdaten in Beispielen | Beispiele sind synthetisch | offen |  |
| verbotene Daten benannt | echte Kundendaten, sensible Daten und vertrauliche CRM-Daten ausgeschlossen | offen |  |
| verbotene Outputs benannt | finale Entscheidungen, ungepruefte CRM-Eintraege, erfundene Nachweise ausgeschlossen | offen |  |
| Disclaimer vorhanden | fachlicher und rechtlicher Hinweis vorhanden | offen |  |

---

## 9. Beispiel- und Datensatz-Review

| Pruefpunkt | Erwartung | Status | Kommentar |
|---|---|---|---|
| Lead-Beispiel Prompt 1 | Input und Output vorhanden, synthetisch, plausibel | offen |  |
| CRM-Beispiel Prompt 2 | Input und Output vorhanden, synthetisch, pruefbar | offen |  |
| Einwand-Beispiel Prompt 3 | Input und Output vorhanden, synthetisch, pruefbar | offen |  |
| Datensatz `synthetische-leads.md` | mehrere Lead-Typen vorhanden | offen |  |
| Datensatz `synthetisches-crm-gespraech.md` | CRM-Testfall vorhanden | offen |  |
| Datensatz `budgeteinwaende.md` | Einwandkategorien und Testfall vorhanden | offen |  |
| Beispiele passen zum Input-Layer | Eingaben nutzen standardisierte Input-Karten | offen |  |

---

## 10. Bronze-Entscheidung

### Mindestkriterien fuer Bronze

- [ ] Alle Pflichtdateien sind vorhanden.
- [ ] `metadata.yml` ist vorhanden und syntaktisch valide.
- [ ] Zweck und Zielgruppe sind klar.
- [ ] Die drei Prompts sind nutzbar.
- [ ] Input-Layer ist dokumentiert.
- [ ] Mindestens ein Beispielinput und Beispieloutput pro Modul ist vorhanden.
- [ ] Trust Layer ist vorhanden.
- [ ] Keine echten personenbezogenen Daten sind enthalten.
- [ ] Failure Modes sind dokumentiert.
- [ ] Peer Review ist abgeschlossen.
- [ ] Trust Review ist abgeschlossen.

### Entscheidung

| Entscheidung | Bedeutung |
|---|---|
| `bronze freigeben` | Paket kann von `bronze_candidate` auf `bronze` gesetzt werden |
| `bronze mit kleinen Auflagen` | Paket ist grundsaetzlich freigabefaehig, kleine Anpassungen noetig |
| `weiter nachbearbeiten` | Paket bleibt `bronze_candidate` |
| `nicht freigeben` | wesentliche Qualitaets- oder Trust-Layer-Probleme |

Aktuelle Empfehlung vor externem Review:

```text
weiter nachbearbeiten / Review offen
```

Begruendung:

Das Paket ist strukturell reviewfaehig und weitgehend Bronze-nah. Der Status sollte aber erst nach Peer Review und Trust Review von `bronze_candidate` auf `bronze` geaendert werden.

---

## 11. Review-Protokoll

| Datum | Reviewer | Rolle | Ergebnis | offene Punkte |
|---|---|---|---|---|
| YYYY-MM-DD | tbd | Peer Review | offen |  |
| YYYY-MM-DD | tbd | Trust Review | offen |  |
| YYYY-MM-DD | tbd | Maintainer | offen |  |

---

## 12. Naechste Schritte nach Review

Wenn der Review positiv ist:

1. Offene Kommentare einarbeiten.
2. `metadata.yml` aktualisieren.
3. `review.review_status` von `pending` auf `passed` setzen.
4. `status` von `bronze_candidate` auf `bronze` setzen.
5. Paket fuer Repository-PR vorbereiten.

Wenn der Review Nacharbeit ergibt:

1. Blocker in `review.md` dokumentieren.
2. Betroffene Datei aktualisieren.
3. Beispiel oder Testfall erneut pruefen.
4. Review-Status auf `changes_requested` setzen.


## PR-Vorbereitung

- [x] `PR_DESCRIPTION.md` vorhanden
- [ ] PR-Beschreibung in GitHub übernommen
- [ ] Review-Kommentare dokumentiert
