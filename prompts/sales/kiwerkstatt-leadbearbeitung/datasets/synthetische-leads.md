# Datensatz: Synthetische Leads für KIWerkstatt Leadbearbeitung

Version: v1.0  
Status: synthetischer Testdatensatz  
Gilt für: `prompts/sales/kiwerkstatt-leadbearbeitung/`

---

## Zweck

Dieser Datensatz enthält vier vollständig fiktive Leads für die Evaluation von **Prompt 1: Lead-Qualifizierung & Scoring**.

Die Leads sind so angelegt, dass unterschiedliche Scoring-Situationen getestet werden können:

| Lead | Erwartete Tendenz | Testzweck |
|---|---|---|
| NordBau Service GmbH | Hot Lead / ca. 9 von 10 | starke ICP-Passung, Budgethinweis, Pilotinteresse |
| Fresh Catering GmbH | Warm Lead / ca. 8 von 10 | gute ICP-Passung, aber Budgetrahmen offen |
| Webseitenmagier UG | Cold Lead / ca. 5 von 10 | Teilpassung, aber keine Entscheidungsbefugnis |
| Yogasonne Sonja GbR | No-Fit / ca. 2 von 10 | schwache ICP-Passung, kostenloser Tool-Wunsch, Datenschutzrisiko |

Alle Daten sind synthetisch. Es werden keine echten personenbezogenen Daten verwendet.

---

## Lead 1: NordBau Service GmbH

```yaml
prompt_id: prompt_1_lead_scoring

unternehmen: "NordBau Service GmbH"
branche: "Handwerksbetrieb / Gebäudeservice"
unternehmensgroesse: "80 Mitarbeitende"

ansprechpartner_name: "nicht genannt"
ansprechpartner_rolle: "Geschäftsführer"
entscheidungsbefugnis:
  wert: unklar

leadquelle:
  wert: inbound

ausgangssituation: >
  Viele Anfragen kommen per E-Mail und Telefon rein, werden aber nicht sauber im CRM erfasst.

pain_points:
  - "schlechte CRM-Pflege"
  - "lange Reaktionszeiten"
  - "Vertrieb verliert Übersicht"

positive_kaufsignale:
  - "Budgetrahmen vorhanden"
  - "Geschäftsführer möchte Pilotprojekt"
  - "konkretes Problem benannt"

negative_signale:
  - "nicht genannt"

risiken_und_unsicherheiten:
  - "Datenschutzprüfung notwendig"
  - "interne IT muss eingebunden werden"
  - "konkrete Budgethöhe nicht genannt"

budgethinweis: "Budgetrahmen vorhanden, konkrete Höhe nicht genannt"

genannte_tools:
  - "CRM-System, Name nicht genannt"

datenschutz_check:
  personenbezogene_daten_enthalten: unbekannt
  sensible_daten_enthalten: unbekannt
  datenfreigabe_status: synthetisch

input_source:
  typ: manuell
  system: "nicht zutreffend"
  record_id: "synthetisch-lead-001"
  imported_at: "YYYY-MM-DD"
  mapped_by: manuell
  mapping_confidence: hoch

zusatznotizen: "Testfall für starke ICP-Passung mit Reviewbedarf bei Datenschutz und IT."

human_review_required: true
```

**Erwartung:** Hot Lead, ca. 9/10. Datenschutz und IT sind als Risiken/Unsicherheiten zu markieren, nicht als negative Signale.

---

## Lead 2: Fresh Catering GmbH

```yaml
prompt_id: prompt_1_lead_scoring

unternehmen: "Fresh Catering GmbH"
branche: "Gastronomie / regionaler B2B-Dienstleister"
unternehmensgroesse: "157 Mitarbeitende"

ansprechpartner_name: "nicht genannt"
ansprechpartner_rolle: "Inhaber"
entscheidungsbefugnis:
  wert: unklar

leadquelle:
  wert: outbound

ausgangssituation: >
  Es kommen zu wenig Inbound Leads herein. Der Vertrieb benötigt Unterstützung bei der Identifikation potenzieller B2B-Leads und beim Scoring.

pain_points:
  - "Vertrieb ist überlastet"
  - "zu viel Zeitaufwand für Recherche"
  - "zu wenig Zeit für Outbound-Aktivitäten"

positive_kaufsignale:
  - "konkretes Problem benannt"
  - "Entscheider ist direkter Ansprechpartner"

negative_signale:
  - "nicht genannt"

risiken_und_unsicherheiten:
  - "kein Budgetrahmen genannt"
  - "CRM- oder Prozesslandschaft nicht beschrieben"

budgethinweis: "unbekannt"

genannte_tools:
  - "nicht genannt"

datenschutz_check:
  personenbezogene_daten_enthalten: unbekannt
  sensible_daten_enthalten: unbekannt
  datenfreigabe_status: synthetisch

input_source:
  typ: manuell
  system: "nicht zutreffend"
  record_id: "synthetisch-lead-002"
  imported_at: "YYYY-MM-DD"
  mapped_by: manuell
  mapping_confidence: hoch

zusatznotizen: "Testfall für Outbound-Logik: fehlendes Budget nicht automatisch als Ausschluss werten."

human_review_required: true
```

**Erwartung:** Warm Lead, ca. 8/10. Fehlender Budgetrahmen ist eine Unsicherheit, aber kein automatisches No-Fit-Signal.

---

## Lead 3: Webseitenmagier UG

```yaml
prompt_id: prompt_1_lead_scoring

unternehmen: "Webseitenmagier UG"
branche: "IT / kleine Webagentur"
unternehmensgroesse: "10 Mitarbeitende"

ansprechpartner_name: "nicht genannt"
ansprechpartner_rolle: "Mitarbeiter"
entscheidungsbefugnis:
  wert: nein

leadquelle:
  wert: unbekannt

ausgangssituation: >
  Es gibt keinen echten Vertriebsmitarbeiter. Der Inhaber führt alle Verkaufsgespräche und hat eine schwache Abschlussquote.

pain_points:
  - "unstrukturierte Leadbearbeitung"
  - "schwache Abschlussquote"
  - "fehlender strukturierter Vertriebsprozess"

positive_kaufsignale:
  - "konkretes Problem benannt"

negative_signale:
  - "keine erkennbare Entscheidungsbefugnis des Ansprechpartners"
  - "kein Budgetrahmen in Verbindung mit weiteren Schwächesignalen"

risiken_und_unsicherheiten:
  - "unbekannt, ob der Inhaber offen für externe Unterstützung ist"
  - "Unternehmen liegt am unteren Rand der Zielgröße"

budgethinweis: "nicht genannt"

genannte_tools:
  - "nicht genannt"

datenschutz_check:
  personenbezogene_daten_enthalten: unbekannt
  sensible_daten_enthalten: unbekannt
  datenfreigabe_status: synthetisch

input_source:
  typ: manuell
  system: "nicht zutreffend"
  record_id: "synthetisch-lead-003"
  imported_at: "YYYY-MM-DD"
  mapped_by: manuell
  mapping_confidence: hoch

zusatznotizen: "Testfall für Cold Lead mit Teilpassung, aber fehlender Entscheidungsbefugnis."

human_review_required: true
```

**Erwartung:** Cold Lead, ca. 5/10.

---

## Lead 4: Yogasonne Sonja GbR

```yaml
prompt_id: prompt_1_lead_scoring

unternehmen: "Yogasonne Sonja GbR"
branche: "Gesundheits- und Wellnessbereich"
unternehmensgroesse: "8 Mitarbeitende"

ansprechpartner_name: "nicht genannt"
ansprechpartner_rolle: "Inhaberin"
entscheidungsbefugnis:
  wert: ja

leadquelle:
  wert: unbekannt

ausgangssituation: >
  80 Prozent der Mitglieder bleiben nach der Probezeit nicht und kündigen. Sie sollen durch Telefonaktionen zurückgeholt werden.

pain_points:
  - "schwache Kundenbindung nach Probezeit"
  - "Einwandbehandlung ist schlecht"

positive_kaufsignale:
  - "konkretes Problem benannt"
  - "Inhaberin ist direkte Ansprechpartnerin"

negative_signale:
  - "Tool soll kostenlos sein"
  - "Unternehmen liegt unterhalb der definierten Zielgröße"
  - "Problem passt eher zu Kundenrückgewinnung als zu B2B-Leadbearbeitung"
  - "kein Budgetrahmen in Verbindung mit weiteren Schwächesignalen"

risiken_und_unsicherheiten:
  - "mögliches Datenschutzrisiko bei Gesundheits- oder Mitgliederdaten"
  - "Zahlungsbereitschaft unklar"

budgethinweis: "kein Budgetrahmen genannt; Tool soll kostenlos sein"

genannte_tools:
  - "nicht genannt"

datenschutz_check:
  personenbezogene_daten_enthalten: ja
  sensible_daten_enthalten: unbekannt
  datenfreigabe_status: synthetisch

input_source:
  typ: manuell
  system: "nicht zutreffend"
  record_id: "synthetisch-lead-004"
  imported_at: "YYYY-MM-DD"
  mapped_by: manuell
  mapping_confidence: hoch

zusatznotizen: "Testfall für No-Fit und Datenschutzsensibilität."

human_review_required: true
```

**Erwartung:** No-Fit oder aktuell nicht relevant, ca. 2/10.
