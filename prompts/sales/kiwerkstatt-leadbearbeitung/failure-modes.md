# Failure Modes: KIWerkstatt Leadbearbeitung

Version: v1.0  
Status: Bronze-Kandidat mit Input-Layer  
Gilt für: `prompts/sales/kiwerkstatt-leadbearbeitung/`

---

## 1. Zweck dieser Datei

Diese Datei beschreibt typische Fehler, Grenzen und Risikosituationen des Prompt-Pakets „Effektive Leadbearbeitung für die KIWerkstatt Hamburg GmbH“.

Sie gilt für den gesamten Arbeitsbaustein:

```text
Input-Layer
  → standardisierte Input-Karte
    → Prompt-Ausführung
      → Output
        → Human Review
```

Ziel ist nicht, alle Fehler vollständig auszuschließen. Ziel ist, Fehler früh sichtbar zu machen, klare Gegenmaßnahmen zu definieren und die menschliche Prüfung verbindlich zu halten.

---

## 2. Grundannahme

Das Prompt-Paket ist ein Assistenzsystem für Leadbearbeitung im B2B-Vertrieb.

Es darf:

- Eingaben strukturieren,
- Leads vorbewerten,
- CRM-Entwürfe vorbereiten,
- Einwandbehandlung vorbereiten,
- Risiken und Unsicherheiten sichtbar machen.

Es darf nicht:

- finale Vertriebsentscheidungen treffen,
- Leads automatisch aussortieren,
- CRM-Einträge ungeprüft freigeben,
- externe Kommunikation ohne menschliche Prüfung erzeugen,
- Rabatte, ROI-Zahlen, Referenzen oder Fallstudien erfinden,
- sensible Daten ungeprüft verarbeiten.

---

## 3. Paketweite Failure Modes

| ID | Failure Mode | Risiko | Gegenmaßnahme | Kritikalität |
|---|---|---|---|---|
| FM-00-01 | KI behandelt Output als finale Entscheidung | Leads werden falsch priorisiert oder aussortiert | Human-Review-Hinweis in jedem Modul, Status bleibt Entwurf / Vorbewertung | hoch |
| FM-00-02 | Fehlende Informationen werden erfunden | Falsche CRM-Daten, falsche Scores, falsche Gesprächsstrategie | Pflichtfeldprüfung, `unbekannt` als zulässiger Wert, Faktenbindung | hoch |
| FM-00-03 | Unsicherheiten werden als Fakten formuliert | Fehlentscheidungen im Vertrieb oder CRM | Eigene Abschnitte für Unsicherheiten und Review-Punkte | hoch |
| FM-00-04 | Datenschutzrisiken werden übersehen | Verarbeitung sensibler oder nicht freigegebener Daten | Datenschutzcheck in jeder Input-Karte | hoch |
| FM-00-05 | Human Review wird übersprungen | Ungeprüfte CRM- oder Kundennutzung | `human_review_required: true` und Review-Status sichtbar halten | hoch |
| FM-00-06 | Freitext wird ungeordnet in Prompts eingefügt | Prompt muss zu viel interpretieren | Nutzung der standardisierten Input-Karten | mittel |
| FM-00-07 | Automatisiertes Mapping fügt falsche Felder ein | Falscher Kontext oder falsche Bewertung | Mapping-Konfidenz dokumentieren, Feldmapping prüfen | mittel |
| FM-00-08 | Öffentliche Beispiele enthalten echte Daten | Datenschutz- und Vertrauensproblem | Nur synthetische oder freigegebene Daten verwenden | hoch |

---

## 4. Failure Modes des Input-Layers

### FM-IL-01: Leere Pflichtfelder werden nicht erkannt

**Beschreibung:**  
Eine Input-Karte enthält leere Pflichtfelder, aber die Analyse startet trotzdem.

**Risiko:**  
Die KI muss fehlenden Kontext interpretieren und kann falsche Schlüsse ziehen.

**Beispiele:**

- `branche:` bleibt leer.
- `genannter_einwand:` bleibt leer.
- `gespraechsdaten.text:` bleibt leer.

**Gegenmaßnahme:**  
Der Preflight-Check stoppt die Analyse und gibt eine Liste fehlender Pflichtfelder aus.

**Akzeptables Verhalten:**

```markdown
## Fehlende Pflichtinformationen

Die Analyse kann noch nicht zuverlässig durchgeführt werden.

Bitte ergänze:

- Branche
- Gesprächsdaten / Transkript

Wenn eine Information nicht bekannt ist, schreibe „unbekannt“.
```

---

### FM-IL-02: `unbekannt` wird wie ein Fehler behandelt

**Beschreibung:**  
Ein Nutzer trägt bei einem Pflichtfeld bewusst `unbekannt` ein. Die KI stoppt trotzdem oder fordert unnötig Nachbesserung.

**Risiko:**  
Nutzer werden dazu verleitet, Informationen zu erfinden.

**Gegenmaßnahme:**  
Regel in allen Prompts: `unbekannt`, `nicht genannt`, `nicht vorhanden` und `noch zu klären` sind zulässige Werte.

**Akzeptables Verhalten:**  
Die Analyse läuft weiter, aber die Unsicherheit wird im Ergebnis sichtbar markiert.

---

### FM-IL-03: Datenschutzcheck wird leer oder unklar übernommen

**Beschreibung:**  
Die Felder im Datenschutzcheck fehlen oder bleiben unklar.

**Risiko:**  
Personenbezogene oder sensible Daten könnten unbewusst verarbeitet oder in Beispiele übernommen werden.

**Gegenmaßnahme:**  
Datenschutzcheck ist Pflichtbestandteil jeder Input-Karte.

**Kritische Felder:**

```yaml
personenbezogene_daten_enthalten: ja | nein | unbekannt
sensible_daten_enthalten: ja | nein | unbekannt
datenfreigabe_status: synthetisch | anonymisiert | freigegeben | unbekannt
```

Wenn `sensible_daten_enthalten: ja` oder `datenfreigabe_status: unbekannt`, muss der Output deutlich als prüfpflichtig markiert werden.

---

### FM-IL-04: Automatisiertes Mapping interpretiert statt nur zu übertragen

**Beschreibung:**  
Ein CRM-, Formular- oder Workflow-System füllt nicht nur Felder, sondern bewertet den Lead bereits automatisch.

**Risiko:**  
Die Automatisierung übernimmt eine fachliche Entscheidung, die dem Menschen vorbehalten ist.

**Nicht erlaubt:**

- automatische Lead-Kategorie vergeben,
- automatische CRM-Freigabe setzen,
- Antwortstrategie final auswählen,
- Budgetbereitschaft aus unklaren Daten ableiten.

**Gegenmaßnahme:**  
Automatisiertes Mapping darf nur normalisieren und muss `mapping_confidence` dokumentieren.

---

## 5. Failure Modes Modul 1: Lead-Qualifizierung & Scoring

### FM-P1-01: Fehlender Budgetrahmen wird automatisch als No-Fit bewertet

**Beschreibung:**  
Die KI bewertet einen Lead stark negativ, nur weil kein Budgetrahmen genannt wurde.

**Risiko:**  
Gerade Outbound-Leads können zu früh abgewertet werden.

**Gegenmaßnahme:**  
Leadquelle berücksichtigen. Fehlendes Budget ist bei Outbound kein automatisches Ausschlusskriterium.

**Erwartetes Verhalten:**  
Budget als Unsicherheit markieren, nicht als finale Absage.

---

### FM-P1-02: Entscheidungsbefugnis wird aus Rolle überinterpretiert

**Beschreibung:**  
Die KI nimmt an, dass eine Person final entscheiden darf, nur weil sie eine leitende Rolle hat.

**Risiko:**  
Falsche Priorisierung oder falscher nächster Schritt.

**Gegenmaßnahme:**  
Unterscheiden zwischen:

- Rolle genannt,
- Entscheidungsbefugnis belegt,
- Entscheidungsbefugnis unklar.

**Erwartetes Verhalten:**  
Bei Geschäftsführung oder Inhaber: Entscheidungsbefugnis kann naheliegend sein, muss aber als nicht vollständig bestätigt markiert werden, wenn keine Freigabelogik genannt ist.

---

### FM-P1-03: Risiken werden mit negativen Kaufsignalen verwechselt

**Beschreibung:**  
Datenschutzprüfung, IT-Einbindung oder technische Machbarkeit werden als starke Contra-Signale bewertet.

**Risiko:**  
Gute Leads werden unnötig abgewertet.

**Gegenmaßnahme:**  
Trennung zwischen:

- negativer ICP-Passung,
- operativen Umsetzungsrisiken,
- offenen Prüfpunkten.

**Beispiel:**  
„Datenschutzprüfung notwendig“ ist kein No-Fit-Signal, sondern ein Review- und Umsetzungsrisiko.

---

### FM-P1-04: Score wirkt präziser als die Datenlage erlaubt

**Beschreibung:**  
Die KI gibt einen Score aus, obwohl zentrale Daten unbekannt sind, ohne Unsicherheit zu markieren.

**Risiko:**  
Scheinpräzision im Vertrieb.

**Gegenmaßnahme:**  
Score immer mit Begründung, Unsicherheiten und Human-Review-Hinweis ausgeben.

**Erwartetes Verhalten:**  
Bei dünner Datenlage eher vorsichtig bewerten und Nachqualifizierung empfehlen.

---

## 6. Failure Modes Modul 2: CRM-Zusammenfassung

### FM-P2-01: CRM-Entwurf wird als fertiger CRM-Eintrag formuliert

**Beschreibung:**  
Der Output klingt so, als könne er direkt produktiv übernommen werden.

**Risiko:**  
Falsche, unvollständige oder sensible Daten landen im CRM.

**Gegenmaßnahme:**  
Status immer sichtbar halten:

```text
Entwurf - nicht geprüft
```

---

### FM-P2-02: Nicht genannte Informationen werden ergänzt

**Beschreibung:**  
Die KI ergänzt Budget, Follow-up, Verantwortliche oder nächste Schritte, obwohl sie im Gespräch nicht genannt wurden.

**Risiko:**  
CRM enthält erfundene Fakten.

**Gegenmaßnahme:**  
Fehlende Angaben immer als `Nicht im Gespräch genannt.` oder `unbekannt` markieren.

---

### FM-P2-03: Terminlogik wird falsch übernommen

**Beschreibung:**  
Relative Termine wie „nächste Woche Donnerstag“ werden falsch in ein konkretes Datum überführt.

**Risiko:**  
Falsche Wiedervorlage oder falscher Follow-up-Termin im CRM.

**Gegenmaßnahme:**  
Relative Termine nur übernehmen, wenn Gesprächsdatum und Kontext eine plausible Ableitung erlauben. Sonst als Unsicherheit markieren.

---

### FM-P2-04: Gesprächsstimmung oder Kaufwahrscheinlichkeit wird als Fakt übernommen

**Beschreibung:**  
Die KI schreibt Einschätzungen als objektive Tatsachen ins CRM.

**Risiko:**  
Subjektive Interpretationen beeinflussen spätere Vertriebsentscheidungen.

**Gegenmaßnahme:**  
Trennung zwischen Fakten, Einschätzungen und Unsicherheiten.

**Erwartetes Verhalten:**  
„Kaufwahrscheinlichkeit hoch“ nur als Einschätzung markieren, nicht als Fakt.

---

### FM-P2-05: Sensible personenbezogene Details werden übernommen

**Beschreibung:**  
Private, gesundheitliche, finanzielle oder andere sensible Informationen werden in CRM-Felder übernommen.

**Risiko:**  
Datenschutz- und Vertrauensproblem.

**Gegenmaßnahme:**  
Sensible Details nicht ungeprüft in CRM-Felder übernehmen. Stattdessen Datenschutzrisiko markieren und Human Review verlangen.

---

## 7. Failure Modes Modul 3: Budget-, Preis- und Prioritätseinwände

### FM-P3-01: KI erfindet Rabatte oder Sonderangebote

**Beschreibung:**  
Die KI schlägt Preisnachlass, Sonderkonditionen oder zusätzliche Paketvarianten vor, obwohl diese nicht erlaubt sind.

**Risiko:**  
Falsche Erwartung beim Kunden, wirtschaftlicher oder rechtlicher Schaden.

**Gegenmaßnahme:**  
`erlaubte_angebote` und `nicht_erlaubt` sind Pflichtfelder der Input-Karte.

**Nicht erlaubt:**

- Rabatt erfinden,
- ROI-Zahlen erfinden,
- Referenzen erfinden,
- Fallstudien erfinden,
- künstlichen Zeitdruck erzeugen.

---

### FM-P3-02: Budgeteinwand wird manipulativ behandelt

**Beschreibung:**  
Die KI versucht, den Kunden zu drängen oder den Einwand abzuwerten.

**Risiko:**  
Unprofessionelle Vertriebskommunikation und Vertrauensverlust.

**Gegenmaßnahme:**  
Antworten müssen ruhig, sachlich, respektvoll und nicht drängend bleiben.

**Erwartetes Verhalten:**  
Ein respektvoller Rückzug bleibt eine echte Option.

---

### FM-P3-03: Einwand wird zu eng kategorisiert

**Beschreibung:**  
Die KI erkennt nur „kein Budget“, übersieht aber Timing-, Prioritäts-, Vertrauens- oder Freigabethemen.

**Risiko:**  
Falsche Antwortstrategie.

**Gegenmaßnahme:**  
Einwände dürfen mehreren Kategorien zugeordnet werden.

**Beispiel:**  
„Wir haben aktuell kein festes Budget eingeplant und müssen sehen, ob wir das dieses Quartal unterbekommen“ kann Budget- und Timing-Einwand zugleich sein.

---

### FM-P3-04: Hypothesen werden als Kundenwahrheit formuliert

**Beschreibung:**  
Die KI behauptet, warum der Kunde zögert, ohne dass es belegt ist.

**Risiko:**  
Falsche Gesprächsführung.

**Gegenmaßnahme:**  
Mögliche Hintergründe immer als Hypothesen markieren.

**Akzeptable Formulierung:**  
„Mögliche Hypothese: Hinter dem Einwand könnte Unsicherheit über den konkreten Nutzen stehen.“

---

### FM-P3-05: Datenschutz- oder IT-Bedenken werden kleingeredet

**Beschreibung:**  
Die KI versucht, Bedenken zu relativieren, statt sie ernst zu nehmen.

**Risiko:**  
Vertrauensverlust und fachlich unsaubere Beratung.

**Gegenmaßnahme:**  
Datenschutz- und IT-Bedenken immer respektvoll aufnehmen und als Klärungspunkt behandeln.

---

## 8. Failure Modes bei Beispielen und Datensätzen

| ID | Failure Mode | Risiko | Gegenmaßnahme |
|---|---|---|---|
| FM-DATA-01 | Synthetische Daten wirken wie echte Kundendaten | Datenschutz- und Vertrauensproblem | Alle Beispiele klar als synthetisch markieren |
| FM-DATA-02 | Testfälle decken nur Positivszenarien ab | Fehler bleiben unsichtbar | Positive, nachbearbeitbare und negative Testfälle dokumentieren |
| FM-DATA-03 | No-Fit-Fälle fehlen | Prompt wirkt zu optimistisch | Mindestens ein No-Fit- oder Negativfall nutzen |
| FM-DATA-04 | CRM-Test enthält keine Unsicherheiten | Prompt wird nicht auf Grenzen geprüft | Testdaten mit fehlenden oder unklaren Angaben verwenden |
| FM-DATA-05 | Budgeteinwand-Test enthält nur einfache Preisfrage | Kategorisierung wird nicht ausreichend geprüft | Kombinierte Budget-, Timing- und Vertrauenseinwände testen |

---

## 9. Review-Checkliste

Vor Veröffentlichung oder Merge prüfen:

- [ ] Sind alle Pflichtdateien vorhanden?
- [ ] Ist `metadata.yml` vollständig?
- [ ] Ist `data_risk: yellow` nachvollziehbar?
- [ ] Ist `human_review_required: true` gesetzt?
- [ ] Sind alle Beispiele synthetisch oder freigegeben?
- [ ] Gibt es mindestens einen Testfall pro Modul?
- [ ] Werden leere Pflichtfelder korrekt gestoppt?
- [ ] Wird `unbekannt` als zulässiger Wert akzeptiert?
- [ ] Werden CRM-Ausgaben als Entwurf markiert?
- [ ] Werden Rabatte, ROI-Zahlen, Referenzen und Fallstudien nicht erfunden?
- [ ] Gibt es eine echte Rückzugsoption bei Einwänden?
- [ ] Sind Datenschutz- und IT-Risiken sichtbar?
- [ ] Ist Peer Review noch offen oder abgeschlossen?
- [ ] Ist Trust Review noch offen oder abgeschlossen?

---

## 10. Definition of Done für Failure-Mode-Abdeckung

Die Failure-Mode-Abdeckung ist für Bronze ausreichend, wenn:

- paketweite Failure Modes dokumentiert sind,
- der Input-Layer eigene Failure Modes enthält,
- jedes der drei Module eigene Failure Modes enthält,
- Datenschutz- und Human-Review-Risiken klar beschrieben sind,
- Gegenmaßnahmen konkret benannt sind,
- die Datei mit `evaluation.md` zusammen genutzt werden kann.

Für Silber sollte zusätzlich ergänzt werden:

- dokumentierte Testoutputs zu mindestens drei Failure Modes,
- Review durch eine zweite fachliche Person,
- Modellvergleich oder Hinweise zu Unterschieden zwischen ChatGPT, Claude, Gemini oder lokalen Modellen,
- dokumentierte Nachbesserungen aus echten Tests.
