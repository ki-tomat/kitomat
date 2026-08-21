# FinOps-Einfuehrungsmodell

## Kurzdefinition

Das FinOps-Einfuehrungsmodell ist ein flexibles 5-Phasen-Beratungsmodell, das Organisationen dabei unterstuetzt, Technologieausgaben transparent, steuerbar und wertorientiert zu managen.

Es verbindet:

- FinOps-Strategie
- Kosten- und Nutzungsdaten
- Rollen und Governance
- KPI- und Reporting-Struktur
- Optimierungsroadmap
- Enablement und kontinuierliche Verbesserung

## Modelllogik

Das Modell folgt fuenf Phasen:

1. Vorbereitung und FinOps-Anamnese
2. Analyse und Problemdefinition
3. Zielbild und Loesungsentwicklung
4. Umsetzung und Dokumentation
5. Evaluation und kontinuierliche Verbesserung

Diese Phasen sind bewusst flexibel. Sie koennen fuer kleine KMU schlank angewendet oder fuer groessere Organisationen mit Multi-Cloud, SaaS, Lizenzen, Kubernetes oder AI-Kosten erweitert werden.

---

## Phase 1: Vorbereitung und FinOps-Anamnese

### Ziel

Ein gemeinsames Verstaendnis schaffen, warum FinOps eingefuehrt wird, welche Scopes betrachtet werden und welche Rollen beteiligt sind.

### Leitfragen

- Warum soll FinOps eingefuehrt werden?
- Geht es um Transparenz, Kostenkontrolle, Forecasting, Governance, Business Value oder alles zusammen?
- Welche Technologieausgaben sind im Scope?
- Nur Public Cloud?
- Auch SaaS, Lizenzen, AI, Private Cloud, Kubernetes oder Rechenzentrum?
- Wer ist Sponsor?
- Wer ist fachlich verantwortlich?
- Welche Entscheidungen sollen durch FinOps besser werden?

### Typische Inputs

- Cloud-/SaaS-/Lizenzkosten auf grober Ebene
- bestehende Reports
- Budget- und Forecast-Unterlagen
- Organigramm oder Teamstruktur
- Cloud-/Plattformuebersicht
- vorhandene Tagging- oder Kostenstellenlogik
- aktuelle Pain Points aus Finance, Engineering und Business

### Methoden

- Executive Alignment Workshop
- Stakeholder Mapping
- Scope Canvas
- FinOps-Zielbild in einem Satz
- erste Daten- und Quelleninventur

### Output

- FinOps-Charter
- definierter Scope
- Sponsor und Kernteam
- erste Problemhypothesen
- Liste offener Daten- und Governance-Fragen

### Entscheidungspunkt

Die Phase ist abgeschlossen, wenn klar ist:

- wofuer FinOps eingefuehrt wird
- welche Kostenbereiche betrachtet werden
- wer Entscheidungen treffen darf
- welche Datenbasis fuer Phase 2 genutzt wird

---

## Phase 2: Analyse und Problemdefinition

### Ziel

Die tatsaechlichen Ursachen fuer Kosten-, Transparenz-, Forecasting- oder Governance-Probleme identifizieren.

### Analysebereiche

1. Strategie und Zielbild
2. Kosten- und Nutzungsdaten
3. Tagging und Allokation
4. Reporting und Showback
5. Forecasting und Budgeting
6. Usage Optimization
7. Rate Optimization und Commitments
8. Rollen und Governance
9. Tooling und Datenarchitektur
10. Kultur und Enablement

### Leitfragen

- Welche Kosten sind heute ueberhaupt sichtbar?
- Welche Kosten sind Produkten, Teams oder Anwendungen zugeordnet?
- Wie hoch ist der Anteil nicht zuordenbarer Kosten?
- Welche Forecasts existieren und wie genau sind sie?
- Welche Optimierungsmoeglichkeiten sind bekannt, aber nicht umgesetzt?
- Wer entscheidet ueber Commitments, Reservierungen oder Rabatte?
- Wo gibt es Reibung zwischen Finance, Engineering und Business?
- Gibt es bereits Showback oder Chargeback?
- Welche Entscheidungen werden heute auf Basis unvollstaendiger Daten getroffen?

### Methoden

- FinOps-Reifegrad-Assessment
- Capability Heatmap
- SWOT-Analyse
- Datenqualitaetscheck
- Tagging-/Allocation-Review
- Interviewleitfaden fuer Finance, Engineering, Product und Leadership
- Risiko-/Wert-Matrix

### Output

- Assessment Scorecard
- Reifegrad-Heatmap
- Problemdefinition
- Daten- und Governance-Luecken
- priorisierte Handlungsfelder
- Quick-Win-Liste

### Entscheidungspunkt

Die Phase ist abgeschlossen, wenn die Organisation weiss:

- welche Probleme wirklich wesentlich sind
- welche Capabilities zuerst verbessert werden
- welche Risiken sofort adressiert werden muessen
- welche Datenluecken die naechste Phase begrenzen

---

## Phase 3: Zielbild und Loesungsentwicklung

### Ziel

Ein passendes FinOps Target Operating Model entwickeln, das zur Groesse, Reife, Tool-Landschaft und Kultur der Organisation passt.

### Loesungsbausteine

#### 1. FinOps Operating Model

Moegliche Organisationsformen:

- zentrales FinOps-Team
- dezentrales Modell
- foederiertes Hub-and-Spoke-Modell
- Integration in Cloud Center of Excellence
- Kombination mit Finance, Procurement oder ITAM

Empfehlungslogik:

- Kleine Organisation: zentraler FinOps Owner
- Mittelstand: zentrales Enablement plus klare Product-/Engineering-Schnittstellen
- Grossunternehmen: foederiertes Modell
- reguliertes Umfeld: staerkere Governance- und Finance-Anbindung
- SaaS-/Lizenz-lastig: staerkere Procurement-/ITAM-Einbindung
- Kubernetes-lastig: starke Plattformrolle und Namespace-/Workload-Kostensicht

#### 2. Rollenmodell

Kernrollen:

- FinOps Lead
- FinOps Practitioner
- Finance / Controlling
- Cloud / Platform Engineering
- Product Owner / Application Owner
- Procurement / Einkauf
- Security / Governance
- IT-Leitung / CIO / CTO

#### 3. Governance-Modell

Festzulegen sind:

- Entscheidungsgremien
- Review-Kadenz
- Eskalationslogik
- Budget- und Forecast-Reviews
- Optimierungsboard
- Regeln fuer Showback oder Chargeback
- Policy- und Ausnahmeprozesse

#### 4. KPI- und Reporting-Modell

Typische KPIs:

- Cloud Spend
- Cost per Application
- Cost per Product
- Unit Cost
- Budget Variance
- Forecast Accuracy
- Tagging Coverage
- Untagged Spend
- Commitment Coverage
- Commitment Utilization
- Savings Realized
- Waste Percentage
- Optimization Backlog Value
- Showback Accuracy

#### 5. Optimierungsmodell

Trennung von:

- Usage Optimization: Nutzung reduzieren oder verbessern
- Rate Optimization: Preis je Einheit senken
- Architektur-Optimierung: technische Struktur verbessern
- Governance-Optimierung: bessere Regeln und Entscheidungsprozesse
- Procurement-Optimierung: Vertraege, Commitments, Rabatte, Lizenzen

### Methoden

- Target Operating Model Design
- RACI-Matrix
- KPI Dictionary
- Value/Effort-Matrix
- Roadmap Workshop
- Governance Design Workshop
- Tooling Capability Mapping

### Output

- Target Operating Model
- RACI
- KPI-Katalog
- Reporting-Design
- Governance-Kadenz
- priorisierter Optimization Backlog
- 30/60/90/180/360-Roadmap

### Entscheidungspunkt

Die Phase ist abgeschlossen, wenn klar ist:

- wie FinOps organisatorisch verankert wird
- welche KPIs steuern
- wer welche Verantwortung traegt
- welche Massnahmen zuerst umgesetzt werden
- welche Tool- und Datenentscheidungen notwendig sind

---

## Phase 4: Umsetzung und Dokumentation

### Ziel

Das Zielbild in konkrete Arbeitsroutinen, Reports, Backlogs, Governance-Zyklen und Enablement-Massnahmen ueberfuehren.

### Arbeitsstraenge

#### Workstream 1: Baseline und Reporting

- Kostenbaseline erstellen
- Tagging- und Allocation-Modell anwenden
- Showback-Reports erstellen
- Dashboard-Struktur aufbauen
- Datenqualitaet messen

#### Workstream 2: Governance und Rollen

- FinOps Board starten
- RACI verbindlich machen
- Review-Termine festlegen
- Eskalationslogik definieren
- Budget-/Forecast-Zyklus etablieren

#### Workstream 3: Optimierung

- Waste und Idle Resources identifizieren
- Rightsizing pruefen
- Non-Prod-Scheduling pruefen
- Commitment-Moeglichkeiten bewerten
- Optimization Backlog umsetzen

#### Workstream 4: Enablement

- Engineering-Teams schulen
- Finance und Product Owner in KPI-Logik einfuehren
- Playbooks erstellen
- Wins sichtbar machen
- Anti-Patterns erklaeren

#### Workstream 5: Tooling und Automatisierung

- native Cloud-Tools pruefen
- Datenexporte definieren
- FOCUS-/Datenmodell pruefen
- Automatisierung von Alerts und Reports vorbereiten
- Drittanbieter-Tooling nur nach Capability-Gap bewerten

### Output

- Umsetzungspaket
- Backlog mit Ownern und Fristen
- Governance-Kalender
- Reporting-Templates
- Playbooks
- Schulungsunterlagen
- Entscheidungsprotokolle

### Entscheidungspunkt

Die Phase ist abgeschlossen, wenn FinOps nicht mehr nur Konzept ist, sondern in wiederkehrenden Arbeitsroutinen sichtbar wird.

---

## Phase 5: Evaluation und kontinuierliche Verbesserung

### Ziel

FinOps als laufende Praxis verankern und regelmaessig verbessern.

### Review-Fragen

- Haben sich Transparenz, Forecasting und Budgetsteuerung verbessert?
- Werden Optimierungsmassnahmen umgesetzt?
- Werden KPIs verstanden und genutzt?
- Gibt es bessere Entscheidungen durch FinOps?
- Sind Showback oder Chargeback akzeptiert?
- Ist die Datenqualitaet ausreichend?
- Welche Capability soll als Naechstes verbessert werden?
- Welche Scopes sollen erweitert werden?

### Review-Kadenz

- monatlich: operative FinOps-Reviews
- quartalsweise: Reifegrad- und Roadmap-Review
- halbjaehrlich: Operating-Model-Review
- jaehrlich: strategische Neupriorisierung

### Output

- aktualisierte Scorecard
- KPI-Trendbericht
- Lessons Learned
- neue Roadmap-Version
- aktualisierte Governance-Regeln
- Entscheidung ueber Scope-Erweiterung

### Entscheidungspunkt

Die Phase ist erfolgreich, wenn FinOps dauerhaft in Management-, Finance- und Engineering-Routinen integriert ist.