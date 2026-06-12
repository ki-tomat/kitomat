# Beispielinput 03: Budgeteinwand NordBau

Gilt für: `prompts/prompt-3-budgeteinwaende.md`

---

```yaml
prompt_id: prompt_3_budget_objection

unternehmen: "NordBau Service GmbH"
branche: "Handwerksbetrieb / Gebäudeservice"
ansprechpartner_rolle: "Geschäftsführer"

lead_status: "Hot Lead"
bisheriger_score: "9/10"

bisheriger_gespraechskontext: >
  Im Erstgespräch wurden konkrete Probleme in der Leadbearbeitung genannt: viele Anfragen per E-Mail und Telefon,
  schlechte CRM-Pflege, lange Reaktionszeiten und fehlende Zuständigkeit. Der Geschäftsführer zeigte grundsätzliches
  Interesse an einer Pilot-Skizze. Datenschutzbeauftragter und interne IT müssen eingebunden werden.

genannter_einwand: >
  Klingt interessant, aber wir haben aktuell doch kein festes Budget dafür eingeplant.
  Ich muss erstmal sehen, ob wir das dieses Quartal überhaupt unterbekommen.

gespraechsphase:
  wert: follow_up

ziel_des_vertriebsmitarbeiters: >
  Den Hintergrund des Einwands klären und prüfen, ob ein späteres Follow-up, ein Klärungsgespräch oder ein kleiner Einstieg sinnvoll ist.

budgethinweis: "Budget grundsätzlich möglich, konkrete Höhe und Quartalsfreigabe unklar"

erlaubte_angebote:
  - 4-wochen-ki-einstiegspaket
  - klaerungsgespraech
  - follow-up
  - respektvoller_rueckzug

nicht_erlaubt:
  - rabatt_erfinden
  - roi_zahlen_erfinden
  - referenzen_erfinden
  - fallstudien_erfinden
  - druck_aufbauen
  - kuenstlichen_zeitdruck_erzeugen
  - datenschutz_oder_it_bedenken_kleinreden

datenschutz_oder_it_bedenken: "interne IT und Datenschutzbeauftragter müssen vor produktiver Nutzung prüfen"

datenschutz_check:
  personenbezogene_daten_enthalten: unbekannt
  sensible_daten_enthalten: unbekannt
  datenfreigabe_status: synthetisch

input_source:
  typ: manuell
  system: "nicht zutreffend"
  record_id: "synthetisch-einwand-001"
  imported_at: "YYYY-MM-DD"
  mapped_by: manuell
  mapping_confidence: hoch

zusatznotizen: "Dieser Einwand liegt zwischen Budget, Timing und möglicher Nutzenunsicherheit."

human_review_required: true
```
