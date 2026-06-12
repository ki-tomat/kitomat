# Datensatz: Budget-, Preis- und Prioritätseinwände

Version: v1.0  
Status: synthetischer Testdatensatz  
Gilt für: `prompts/sales/kiwerkstatt-leadbearbeitung/`

---

## Zweck

Dieser Datensatz enthält synthetische Budget-, Preis-, Timing-, Prioritäts-, Vertrauens- und Freigabeeinwände für **Prompt 3: Umgang mit Budget-, Preis- und Prioritätseinwänden**.

Der Datensatz soll prüfen, ob der Prompt:

- Einwände korrekt kategorisiert,
- mögliche Hintergründe als Hypothesen markiert,
- keine Rabatte, ROI-Zahlen, Referenzen oder Fallstudien erfindet,
- nicht manipulativ formuliert,
- Datenschutz- und IT-Bedenken nicht kleinredet,
- einen respektvollen Rückzug als echte Option anbietet.

Alle Beispiele sind fiktiv und synthetisch.

---

## Typische Einwände

### Kategorie A: Echter Budgeteinwand

- „Wir haben aktuell kein Budget dafür eingeplant."
- „Das ist uns für einen ersten Test zu teuer."
- „Wir brauchen erst ein günstigeres Einstiegsangebot."

### Kategorie B: Prioritäts- und Timing-Einwand

- „Wir haben gerade andere Prioritäten."
- „Melden Sie sich nächstes Quartal wieder."
- „Wir stecken gerade mitten im Tagesgeschäft."

### Kategorie C: Unsicherheits- und Vertrauenseinwand

- „Wir wissen noch nicht, ob sich das für uns lohnt."
- „Wir machen das erstmal selbst mit ChatGPT."
- „Wir hatten schon mal einen Berater, das hat nichts gebracht."

### Kategorie D: Entscheidungs- und Freigabeeinwand

- „Ich muss das erst intern abstimmen."
- „Das entscheide nicht ich alleine."
- „Für KI-Themen wollen wir aktuell kein Geld ausgeben, da gibt es intern noch Skepsis."

---

## Testfall 1: NordBau Budget- und Timing-Einwand

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

**Erwartung:** Kategorie A und B, mögliche Kategorie C als Hypothese. Antwortoption 4 sollte als erste Klärungsoption plausibel sein.
