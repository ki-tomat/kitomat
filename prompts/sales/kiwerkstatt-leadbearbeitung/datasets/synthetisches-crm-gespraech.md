# Datensatz: Synthetisches CRM-Gespräch NordBau

Version: v1.0  
Status: synthetischer Testfall  
Gilt für: `prompts/sales/kiwerkstatt-leadbearbeitung/`

---

## Zweck

Dieser Datensatz dient als Testfall für **Prompt 2: Gesprächs- und Meetingzusammenfassung für CRM**.

Der Test prüft, ob die KI:

- Hauptproblem und Bedarf trennt,
- Einwände erkennt,
- keine nicht genannten Informationen erfindet,
- Follow-up und Terminlogik sauber verarbeitet,
- Datenschutz- und IT-Prüfbedarf markiert,
- den CRM-Output als Entwurf belässt.

Alle Angaben sind fiktiv und synthetisch.

---

## Standardisierte Input-Karte

```yaml
prompt_id: prompt_2_crm_summary

unternehmen: "NordBau Service GmbH"
ansprechpartner: "Herr Berger"
rolle: "Geschäftsführer"
gespraechsdatum: "2026-05-12"
gespraechsanlass: "Erstgespräch zur möglichen KI-Unterstützung in der Leadbearbeitung"

quelle:
  typ: telefonnotiz

gespraechsdaten:
  text: |
    Vertrieb: Guten Tag Herr Berger, danke für Ihre Zeit. Ich möchte besser verstehen, wo bei Ihnen aktuell die größten Engpässe in der Leadbearbeitung liegen.
    Kunde: Wir bekommen viele Anfragen per Telefon und E-Mail, aber unser Team trägt nicht alles sauber ins CRM ein.
    Vertrieb: Was passiert dann mit diesen Anfragen?
    Kunde: Ein Teil wird zu spät beantwortet. Manchmal weiß niemand, wer zuständig ist.
    Vertrieb: Was wäre für Sie ein sinnvolles Ziel für einen ersten KI-Piloten?
    Kunde: Wir bräuchten zuerst eine bessere Übersicht und eine saubere Zusammenfassung der Anfragen. Automatisch an Kunden antworten wollen wir erstmal nicht.
    Vertrieb: Welche Systeme nutzen Sie aktuell?
    Kunde: Ein einfaches CRM, Outlook und viele Telefonnotizen. Das CRM wird aber nicht konsequent gepflegt.
    Vertrieb: Gibt es aus Ihrer Sicht Datenschutz- oder IT-Themen, die wir früh einbeziehen sollten?
    Kunde: Ja, unsere interne IT und der Datenschutzbeauftragte müssten draufschauen, bevor irgendetwas produktiv läuft.
    Vertrieb: Gibt es bereits einen Budgetrahmen für ein Pilotprojekt?
    Kunde: Grob ist Budget vorhanden, aber die genaue Höhe muss ich intern noch klären.
    Vertrieb: Was wäre der nächste sinnvolle Schritt?
    Kunde: Schicken Sie mir bitte eine kurze Pilot-Skizze. Dann können wir nächste Woche Donnerstag, am 21.05.2026, noch einmal sprechen.

bekannte_pflichtfelder:
  follow_up_datum: "2026-05-21"
  verantwortliche_person: "Lena Hoffmann"

crm_system: "einfaches CRM, Name nicht genannt; Outlook; Telefonnotizen"

datenschutzrelevanz_vorbekannt: "personenbezogene Kundenanfragen möglich; IT und Datenschutzbeauftragter müssen eingebunden werden"

datenschutz_check:
  personenbezogene_daten_enthalten: ja
  sensible_daten_enthalten: unbekannt
  datenfreigabe_status: synthetisch

weitere_beteiligte_personen:
  - "interne IT, nicht namentlich genannt"
  - "Datenschutzbeauftragter, nicht namentlich genannt"

input_source:
  typ: manuell
  system: "nicht zutreffend"
  record_id: "synthetisch-crm-001"
  imported_at: "YYYY-MM-DD"
  mapped_by: manuell
  mapping_confidence: hoch

zusatznotizen: "Der Testfall enthält einen Budgethinweis, Datenschutz-/IT-Prüfbedarf und einen konkreten Follow-up-Termin."

human_review_required: true
```

---

## Erwartung

Der CRM-Entwurf soll insbesondere enthalten:

- Hauptproblem: Anfragen werden nicht sauber im CRM erfasst und zu spät bearbeitet.
- Bedarf: bessere Übersicht und Zusammenfassung der Anfragen.
- Einwand / Grenze: keine automatische Kundenantwort im ersten Schritt; Datenschutz und IT müssen prüfen.
- Nächster Schritt: kurze Pilot-Skizze senden.
- Follow-up: 2026-05-21, mit Review-Hinweis zur Terminübernahme.
- Datenschutzrelevanz: personenbezogene Kundenanfragen möglich; Human Review nötig.
