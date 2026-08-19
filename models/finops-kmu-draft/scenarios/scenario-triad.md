# Szenario-Triade fuer das FinOps-Einfuehrungsmodell

## Zweck

Diese Szenario-Triade macht sichtbar, wann das Modell gut funktioniert, wann Expertenkorrektur noetig ist und wann es nicht eingesetzt werden sollte.

---

## 1. Positives Szenario

### Situation

Ein mittelstaendisches SaaS-Unternehmen moechte Cloud-Kosten, SaaS-Kosten und AI-Experimentierkosten transparenter steuern. Es liegen synthetisierte Kostenuebersichten, Rolleninformationen und grobe Budgetdaten vor. Management, Finance und Engineering nehmen gemeinsam an Workshops teil.

### Eingaben

- grobe Kosten je Technologie-Kategorie
- Teamstruktur
- aktueller Budgetprozess
- vorhandene Cloud-Reports
- bekannte Pain Points
- Ziel: Showback, Forecasting und Optimierungsroadmap

### Erwartetes Ergebnis

Das Modell erzeugt:

- klaren Scope
- FinOps Charter
- Reifegrad-Assessment
- priorisierte Roadmap
- KPI-Katalog
- Rollen- und Governance-Modell
- erste Quick Wins

### Expertenfeedback

Das Szenario funktioniert, weil FinOps als Operating Model verstanden wird und nicht als isolierte Tool- oder Sparmassnahme. Die beteiligten Rollen sind ausreichend breit aufgestellt, und die vorhandenen Daten reichen fuer eine erste Baseline.

### Trust-Einschaetzung

- data_risk: yellow
- human_review_required: true
- echte Daten: nicht im Artefakt verwenden
- fachliche Pruefung: Finance, IT, Engineering

---

## 2. Nachbearbeitbares Szenario

### Situation

Ein Unternehmen moechte sofort ein FinOps-Dashboard und eine Einsparungsquote. Es gibt jedoch keine klare Tagging-Struktur, keine Produktzuordnung und keine abgestimmte Forecast-Logik.

### Eingaben

- Cloud-Rechnung auf hoher Ebene
- keine saubere Kostenallokation
- keine klare Owner-Struktur
- Ziel: "20 Prozent sparen"

### Erwartetes Ergebnis

Das Modell kann eine erste Problemstruktur und Discovery-Roadmap liefern, aber keine belastbare Einsparungszusage und kein sauberes KPI-System.

### Was fehlt?

- belastbare Baseline
- Tagging-/Allocation-Regeln
- Scope-Definition
- Owner pro Kostenbereich
- Abstimmung mit Finance
- Entscheidung, ob Showback oder Chargeback gewuenscht ist

### Expertenfeedback

Ein FinOps-Experte wuerde hier bremsen: Ohne Baseline und Allocation darf keine Einsparungsquote versprochen werden. Zuerst muessen Transparenz, Datenqualitaet und Ownership hergestellt werden.

### Trust-Einschaetzung

- data_risk: yellow
- human_review_required: true
- offene Datenqualitaet klar markieren
- keine Savings-Versprechen

---

## 3. Negatives Szenario

### Situation

Ein Berater erhaelt echte Cloud-Rechnungen, interne Finanzdaten, Kundennamen und personenbezogene Nutzungsdaten und soll daraus automatisiert Kostenverantwortung, Teamleistung und Budgetkuerzungen ableiten.

### Eingaben

- echte Kundendaten
- echte interne Finanzdaten
- personenbezogene Nutzungsdaten
- interne Vertraege
- Ziel: automatische Entscheidung ueber Budgetkuerzungen oder Teamleistung

### Erwartetes Ergebnis

Das Modell darf so nicht verwendet werden.

### Warum scheitert das Szenario?

- Es nutzt echte und vertrauliche Daten.
- Es kann personenbezogene oder interne Informationen offenlegen.
- Es verwechselt FinOps-Steuerung mit automatisierter Leistungsbewertung.
- Budget- oder Personalentscheidungen duerfen nicht ungeprueft automatisiert werden.
- Rechtliche, arbeitsrechtliche, datenschutzrechtliche und Governance-Fragen waeren ungeklaert.

### Expertenfeedback

Ein Fachmensch muesste das Projekt stoppen und erst Datenminimierung, Datenschutz, Legal/Compliance, Betriebsrat/HR-Kontext und Governance klaeren. Fuer Prompt Commons DACH ist dieses Szenario nicht zulaessig.

### Trust-Einschaetzung

- data_risk: red
- human_review_required: true
- nicht reviewfaehig im MVP
- echte Daten entfernen
- nur synthetische oder freigegebene Beispieldaten verwenden