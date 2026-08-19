# Beispielanwendung 01: Synthetisches KMU mit steigenden Cloud- und SaaS-Kosten

## Hinweis

Dieses Beispiel ist vollstaendig synthetisch. Es enthaelt keine echten Kundendaten, keine echten Personen, keine echten E-Mails, keine echten Cloud-Rechnungen und keine vertraulichen Finanzdaten.

## Ausgangssituation

Die fiktive Firma "MusterWerk Digital GmbH" bietet eine B2B-SaaS-Plattform fuer Projektsteuerung an.

Rahmendaten:

- 180 Mitarbeitende
- 35 Personen in Produkt und Engineering
- Cloud-Nutzung bei einem grossen Hyperscaler
- mehrere SaaS-Tools fuer Vertrieb, Support und Entwicklung
- stark wachsende AI-Experimentierkosten
- keine klare Kostenallokation je Produktmodul
- monatliche Cloud-Kosten steigen schneller als Umsatz
- Finance erhaelt Rechnungen, Engineering sieht technische Nutzung, Product sieht Kundennutzen, aber es gibt kein gemeinsames Steuerungsmodell

## Phase 1: Vorbereitung und Anamnese

### Zielklaerung

Die Geschaeftsfuehrung moechte nicht pauschal Kosten senken, sondern verstehen:

- welche Produktmodule welche Kosten verursachen
- ob Kostenanstieg durch Wachstum, Waste oder falsche Architektur entsteht
- wie Forecasts verlaesslicher werden
- welche Teams Verantwortung fuer Kostenentscheidungen uebernehmen
- wie AI- und SaaS-Kosten in die Steuerung integriert werden koennen

### Scope

In Scope:

- Public Cloud
- SaaS-Kernsysteme
- AI-Experimentierkosten
- Kosten je Produktmodul
- Forecasting und Budgeting
- Showback

Out of Scope:

- rechtliche Vertragspruefung
- detaillierte Cloud-Architekturpruefung
- steuerliche Behandlung
- verbindliches Chargeback

### Beteiligte Rollen

- CIO als Sponsor
- Head of Finance
- Cloud Platform Lead
- zwei Product Owner
- Engineering Lead
- Procurement-Verantwortliche
- externer FinOps-Berater

## Phase 2: Analyse und Problemdefinition

### Erkenntnisse aus dem Assessment

| Bereich | Score | Beobachtung |
|---|---:|---|
| Strategie | 2 | FinOps-Zielbild ist grob vorhanden, aber nicht operationalisiert |
| Tagging | 1 | nur technische Tags, keine Produkt- oder Teamzuordnung |
| Allocation | 1 | 45 Prozent der Kosten sind nicht verursachungsgerecht zugeordnet |
| Reporting | 2 | Cloud-Reports existieren, aber nicht zielgruppengerecht |
| Forecasting | 1 | Forecast ist reine Fortschreibung der Vorperiode |
| Optimization | 2 | einzelne Rightsizing-Hinweise, kein priorisierter Backlog |
| Governance | 1 | keine regelmaessige FinOps-Kadenz |
| Enablement | 1 | Engineering kennt Kostenwirkung nur punktuell |

### Problemdefinition

MusterWerk hat kein primaeres Toolproblem, sondern ein Operating-Model-Problem: Kosten, Ownership und Geschaeftswert sind nicht sauber verbunden. Dadurch entstehen Budgetabweichungen, unklare Verantwortlichkeiten und verzoegerte Optimierungsentscheidungen.

## Phase 3: Zielbild und Loesungsentwicklung

### Empfohlenes Operating Model

Fuer MusterWerk wird ein zentrales FinOps-Enablement-Modell mit dezentraler Umsetzung empfohlen.

Rollen:

- FinOps Lead: Head of Cloud Platform
- Finance Owner: Head of Finance
- Product Owner: verantwortlich fuer Produktmodul-Kostenlogik
- Engineering Owner: verantwortlich fuer technische Optimierungsmassnahmen
- Procurement: verantwortlich fuer SaaS-Renewals und Commitments

### Erste KPIs

- Cloud Spend
- Cost per Product Module
- Tagging Coverage
- Untagged Spend
- Budget Variance
- Forecast Accuracy
- Waste Percentage
- Optimization Backlog Value
- Commitment Coverage

### Governance

- monatliches FinOps Board
- 14-taegiges Engineering Optimization Review
- quartalsweises Reifegrad-Review
- Showback an Product Owner
- kein Chargeback in den ersten sechs Monaten

## Phase 4: Umsetzung und Dokumentation

### 30-Tage-Massnahmen

1. FinOps Charter verabschieden
2. Produktmodule als Kosten-Scope definieren
3. Pflicht-Tags festlegen: product, team, environment, owner, cost_center
4. erste Kostenbaseline erstellen
5. Top 10 unklare Kostenpositionen analysieren

### 60-Tage-Massnahmen

1. Showback-Report je Produktmodul erstellen
2. Shared-Cost-Regel fuer Plattformdienste definieren
3. Optimization Backlog starten
4. erste Non-Prod-Scheduling-Massnahmen pruefen
5. Forecast-Review mit Finance und Engineering starten

### 90-Tage-Massnahmen

1. KPI-Dashboard pilotieren
2. erste Optimierungsmassnahmen abschliessen
3. AI-Experimentierkosten separat ausweisen
4. SaaS-Renewal-Kalender erstellen
5. Roadmap fuer sechs Monate bestaetigen

## Phase 5: Evaluation und Nachbereitung

### Review nach 90 Tagen

Prueffragen:

- Sind mindestens 80 Prozent der Cloud-Kosten einem Produktmodul zugeordnet?
- Wird der Showback von Product Ownern verstanden?
- Gibt es einen priorisierten Backlog mit Ownern?
- Hat sich die Forecast-Genauigkeit verbessert?
- Werden Optimierungsmassnahmen umgesetzt?
- Sind AI- und SaaS-Kosten sichtbar?

### Ergebnis

Das Modell ist erfolgreich, wenn MusterWerk nicht nur weniger Kosten sieht, sondern bessere Entscheidungen treffen kann: welche Kosten sinnvoll sind, welche vermeidbar sind und welche Investitionen Geschaeftswert erzeugen.