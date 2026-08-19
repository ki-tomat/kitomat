# CRM- und Quellen-Mapping für den Input-Layer

Dieses Mapping beschreibt, wie manuelle oder automatisierte Eingaben in die standardisierten Input-Karten übertragen werden.

Die Automatisierung darf nur Daten übertragen, normalisieren und markieren. Sie darf keine fachliche Bewertung, finale Priorisierung oder CRM-Freigabe vornehmen.

---

## 1. Allgemeines Quellen-Mapping

| Quelle | Typischer Feldname | Ziel im Input-Layer | Hinweis |
|---|---|---|---|
| CRM | Company Name | `unternehmen` | Human Review erforderlich |
| CRM | Industry | `branche` | Falls leer: `unbekannt` |
| CRM | Employees | `unternehmensgroesse` | Falls Schätzung: als Unsicherheit markieren |
| CRM | Lead Source | `leadquelle.wert` | Werte normalisieren |
| CRM | Contact Role | `ansprechpartner_rolle` | Wichtig für Entscheidungsbefugnis |
| CRM | Notes | `ausgangssituation` oder `gespraechsdaten.text` | Nicht interpretieren, nur übertragen |
| Formular | Hauptproblem | `pain_points` | Mehrere Pain Points als Liste |
| Formular | Budget bekannt? | `budgethinweis` | Nicht als Freigabe interpretieren |
| Formular | Datenschutzrelevanz | `datenschutz_check` | Falls unklar: `unbekannt` |
| Meeting-Transkript | Vollständiger Text | `gespraechsdaten.text` | Prompt 2 |
| E-Mail | Nachrichtentext | `ausgangssituation` oder `gespraechsdaten.text` | Kontextabhängig |
| Tabelle / CSV | Zeile je Lead | Input-Karte Prompt 1 | Mapping dokumentieren |

---

## 2. Prompt-1-Mapping: Lead-Scoring

| Quelle | Ziel-Feld | Pflicht? | Human Review? |
|---|---|---:|---:|
| Unternehmen / Company | `unternehmen` | ja | ja |
| Branche / Industry | `branche` | ja | ja |
| Mitarbeitendenzahl | `unternehmensgroesse` | ja | ja |
| Ansprechpartnerrolle | `ansprechpartner_rolle` | ja | ja |
| Leadquelle | `leadquelle.wert` | ja | ja |
| Beschreibung / Notiz | `ausgangssituation` | ja | ja |
| Hauptproblem | `pain_points` | ja | ja |
| Budget | `budgethinweis` | nein | ja |
| CRM / Tools | `genannte_tools` | nein | ja |
| Risiken | `risiken_und_unsicherheiten` | nein | ja |
| Datenschutzhinweis | `datenschutz_check` | ja | ja |

---

## 3. Prompt-2-Mapping: CRM-Zusammenfassung

| Quelle | Ziel-Feld | CRM-Zielfeld | Pflicht? | Human Review? |
|---|---|---|---:|---:|
| Unternehmen | `unternehmen` | Leadname / Unternehmen | ja | ja |
| Ansprechpartner | `ansprechpartner` | Ansprechpartner | ja | ja |
| Rolle | `rolle` | Rolle des Ansprechpartners | ja | ja |
| Gesprächsdatum | `gespraechsdatum` | Gesprächsdatum | ja | ja |
| Anlass | `gespraechsanlass` | Gesprächsanlass | ja | ja |
| Notiz / Transkript | `gespraechsdaten.text` | Gesprächsnotiz | ja | ja |
| Follow-up | `bekannte_pflichtfelder.follow_up_datum` | Follow-up-Datum | nein | ja |
| Verantwortliche Person | `bekannte_pflichtfelder.verantwortliche_person` | Verantwortliche Person | nein | ja |
| CRM-System | `crm_system` | Genannte Tools/Systeme | nein | ja |
| Datenschutzhinweis | `datenschutz_check` | Datenschutzprüfung | ja | ja |

---

## 4. Prompt-3-Mapping: Budgeteinwand

| Quelle | Ziel-Feld | Pflicht? | Human Review? |
|---|---|---:|---:|
| Unternehmen | `unternehmen` | ja | ja |
| Branche | `branche` | ja | ja |
| Ansprechpartnerrolle | `ansprechpartner_rolle` | ja | ja |
| bisheriger Leadstatus | `lead_status` | nein | ja |
| bisheriger Score | `bisheriger_score` | nein | ja |
| Gesprächsnotiz | `bisheriger_gespraechskontext` | ja | ja |
| Einwand | `genannter_einwand` | ja | ja |
| Gesprächsphase | `gespraechsphase.wert` | ja | ja |
| Vertriebsziel | `ziel_des_vertriebsmitarbeiters` | ja | ja |
| Angebotsgrenzen | `erlaubte_angebote` | ja | ja |
| Verbote / Sicherheitsregeln | `nicht_erlaubt` | ja | ja |
| Datenschutz-/IT-Bedenken | `datenschutz_oder_it_bedenken` | nein | ja |
| Datenschutzcheck | `datenschutz_check` | ja | ja |

---

## 5. Mapping-Regeln

1. Fehlende Felder werden nicht erfunden.
2. Unklare Felder werden als `unbekannt` markiert.
3. Automatisiertes Mapping darf keine Lead-Kategorie vergeben.
4. Automatisiertes Mapping darf keine CRM-Freigabe setzen.
5. Automatisiertes Mapping darf keine Antwortstrategie auswählen.
6. Datenschutz- und Human-Review-Felder bleiben sichtbar.
7. Die finale Prüfung liegt bei einer verantwortlichen Person.

---

## 6. Beispiel: Normalisierung CRM → Prompt 1

```yaml
input_source:
  typ: crm
  system: "Beispiel-CRM"
  record_id: "synthetisch-001"
  imported_at: "YYYY-MM-DD"
  mapped_by: automation
  mapping_confidence: mittel

normalized_input:
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

  ausgangssituation: "Viele Anfragen kommen per E-Mail und Telefon rein, werden aber nicht sauber im CRM erfasst."

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

  budgethinweis: "Budgetrahmen vorhanden, konkrete Höhe nicht genannt"

  genannte_tools:
    - "CRM-System, Name nicht genannt"

  datenschutz_check:
    personenbezogene_daten_enthalten: unbekannt
    sensible_daten_enthalten: unbekannt
    datenfreigabe_status: synthetisch

  zusatznotizen: "Beispieldaten sind synthetisch."

  human_review_required: true
```
