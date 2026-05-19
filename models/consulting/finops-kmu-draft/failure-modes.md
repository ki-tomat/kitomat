# Failure Modes des FinOps-Einfuehrungsmodells

## 1. FinOps wird als reines Sparprogramm verstanden

### Ursache

Management formuliert nur ein Einsparziel, ohne Business Value, Produktkontext oder Technologieentscheidungen einzubeziehen.

### Auswirkung

Engineering blockt ab, Qualitaet oder Resilienz koennen leiden, und sinnvolle Investitionen werden als Kostenproblem missverstanden.

### Gegenmassnahme

FinOps-Zielbild auf Wertsteuerung ausrichten. KPIs wie Unit Cost, Cost per Product, Forecast Accuracy und Business-Kontext ergaenzen.

---

## 2. Dashboard-first statt Operating Model

### Ursache

Es wird zuerst ein Tool oder Dashboard gebaut, ohne Rollen, Entscheidungsrechte und Governance zu klaeren.

### Auswirkung

Reports entstehen, aber niemand handelt. Kosten bleiben sichtbar, aber nicht steuerbar.

### Gegenmassnahme

Vor Tooling immer Scope, RACI, Governance-Kadenz und Entscheidungsprozesse klaeren.

---

## 3. Keine belastbare Baseline

### Ursache

Optimierung wird gestartet, bevor historische Kosten, Scope, Allokation und Datenqualitaet geklaert sind.

### Auswirkung

Savings koennen nicht serioes gemessen werden. Massnahmen werden politisch angreifbar.

### Gegenmassnahme

Baseline vor Einsparungszielen erstellen. Unsicherheiten sichtbar dokumentieren.

---

## 4. Unklare Ownership

### Ursache

Kosten sind technisch sichtbar, aber keinem Team, Produkt oder Owner zugeordnet.

### Auswirkung

Optimierungsmassnahmen bleiben liegen. Finance und Engineering schieben Verantwortung hin und her.

### Gegenmassnahme

Tagging Policy, Allocation Model und RACI verbindlich festlegen.

---

## 5. Zu fruehes Chargeback

### Ursache

Kosten werden intern verrechnet, bevor Allokation, Accounting-Logik und Akzeptanz stabil sind.

### Auswirkung

Fachbereiche verlieren Vertrauen in Zahlen. Diskussionen drehen sich um Verteilung statt Verbesserung.

### Gegenmassnahme

Mit Showback starten. Chargeback nur nach Finance-/Accounting-Pruefung und stabiler Datenqualitaet.

---

## 6. Usage und Rate Optimization werden vermischt

### Ursache

Rightsizing, Abschaltung, Reservierungen, Commitments und Rabatte werden in einem Topf betrachtet.

### Auswirkung

Potenziale werden doppelt gezaehlt. Commitments koennen falsch dimensioniert werden.

### Gegenmassnahme

Usage Optimization und Rate Optimization getrennt analysieren und erst danach kombinieren.

---

## 7. Tooling wird zu frueh gekauft

### Ursache

Die Organisation glaubt, ein FinOps-Tool loese fehlende Rollen, Datenlogik und Governance.

### Auswirkung

Toolkosten steigen, aber Verhalten und Entscheidungsqualitaet aendern sich nicht.

### Gegenmassnahme

Tooling erst nach Capability-Gap-Analyse und Zielbildentscheidung bewerten.

---

## 8. Engineering wird beschuldigt statt befaehigt

### Ursache

Reports werden als Kontrollinstrument genutzt, nicht als gemeinsame Entscheidungsgrundlage.

### Auswirkung

Widerstand, Schattenprozesse und geringe Adoption.

### Gegenmassnahme

Showback als Lern- und Steuerungsformat einsetzen. Playbooks, Schulungen und konkrete Handlungsmoeglichkeiten bereitstellen.

---

## 9. Vertrauliche Daten werden in KI-Tools kopiert

### Ursache

Echte Rechnungen, Kundendaten, interne Finanzdaten oder Vertraege werden ungeprueft in KI-Systeme eingegeben.

### Auswirkung

Datenschutz-, Compliance- und Vertraulichkeitsrisiken.

### Gegenmassnahme

Nur synthetische oder freigegebene Daten verwenden. Echte Daten nur in geprueften Unternehmensumgebungen und nach interner Freigabe verarbeiten.

---

## 10. Einsparungen werden garantiert

### Ursache

Beratung verspricht pauschale Prozentwerte ohne Baseline und Kontext.

### Auswirkung

Falsche Erwartungen, Vertrauensverlust und fachlich schwache Entscheidungen.

### Gegenmassnahme

Keine Savings-Zusage ohne Baseline, Scope, Datenqualitaet und fachliche Validierung.

---

## 11. Kubernetes- und Plattformkosten ohne Shared-Cost-Regel

### Ursache

Cluster-, Namespace- und Plattformkosten werden gemessen, aber nicht verursachungsgerecht auf Teams, Anwendungen oder Produkte verteilt. Geteilte Komponenten (Control Plane, Ingress, Logging, Monitoring, Storage) werden entweder ignoriert oder pauschal umgelegt.

### Auswirkung

Teams sehen Kosten, die sie nicht beeinflussen koennen, oder es entsteht Streit ueber Zuordnungslogik. Plattformteams werden kostenmaessig "bestraft", obwohl sie geteilte Wertbeitraege liefern. Rightsizing- und Autoscaling-Entscheidungen werden auf falscher Basis getroffen.

### Gegenmassnahme

Shared-Cost-Regel explizit definieren und dokumentieren. Workload-Metadaten (Pflicht-Labels fuer team, product, environment, cost_center) durchsetzen. Cluster-Kosten in eine Sicht je Namespace, Workload und geteilter Plattformanteil aufteilen. Plattform-Governance und FinOps gemeinsam betreiben.

---

## 12. AI- und Modellkosten skalieren unkontrolliert

### Ursache

AI-Experimentierkosten (Inferenz, Embeddings, Vektor-Datenbanken, GPU-Stunden, Model-API-Aufrufe) werden in derselben Logik gesteuert wie klassische Cloud-Workloads. Es gibt keine Trennung zwischen Experimentier-, Produktiv- und Nutzungsphase, keine Cost-per-Request-Sicht und keinen Owner pro Anwendungsfall.

### Auswirkung

Kosten skalieren mit Nutzerwachstum oder Promptlaenge, nicht mit Geschaeftswert. Forecasts werden unzuverlaessig. Einzelne Anwendungsfaelle erzeugen Kostensprunge, die Finance und Engineering nicht erklaeren koennen. Optimierungspotenziale (Modellwechsel, Caching, Prompt-Verkuerzung, Quantisierung) bleiben ungenutzt.

### Gegenmassnahme

AI-Kosten als eigenen Scope behandeln. Unit Cost je Anwendungsfall definieren (z. B. Cost per Request, Cost per Document, Cost per Active User). Trennung von Experiment, Beta und Produktion. Owner pro Use Case benennen. Modellwahl, Caching und Prompt-Effizienz in den Optimization Backlog aufnehmen. AI-Spending separat im Showback ausweisen.