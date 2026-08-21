# FinOps KPI Worksheet

## Ziel

Dieses Worksheet hilft, steuerungsrelevante FinOps-KPIs zu definieren.

## KPI-Regel

Ein KPI wird nur aufgenommen, wenn klar ist:

- wofuer er genutzt wird
- wer ihn versteht
- wer ihn verantwortet
- wie er berechnet wird
- wie oft er reviewed wird
- welche Entscheidung daraus folgt

## KPI-Katalog

| KPI | Zweck | Formel / Logik | Zielgruppe | Owner | Review-Kadenz | Datenquelle | Entscheidung |
|---|---|---|---|---|---|---|---|
| Cloud Spend | Gesamtausgaben verstehen | Summe Kosten je Scope | Leadership, Finance |  | monatlich |  | Budget-/Trendentscheidung |
| Cost per Application | App-Kosten steuern | allokierte Kosten je Anwendung | App Owner |  | monatlich |  | App-Wirtschaftlichkeit |
| Cost per Product | Produktkosten steuern | allokierte Kosten je Produkt | Product, Finance |  | monatlich |  | Produkt-/Portfolioentscheidung |
| Unit Cost | Kosten je Business-Einheit verstehen | Kosten / Einheit | Product, Leadership |  | monatlich |  | Skalierungsentscheidung |
| Budget Variance | Budgetabweichung erkennen | Ist minus Budget | Finance |  | monatlich |  | Eskalation oder Anpassung |
| Forecast Accuracy | Planbarkeit messen | 1 - Abweichung Forecast/Ist | Finance, FinOps |  | monatlich |  | Forecast-Verbesserung |
| Tagging Coverage | Datenqualitaet messen | tagged spend / relevanter spend | FinOps, Platform |  | monatlich |  | Tagging-Governance |
| Untagged Spend | Zuordnungsluecken erkennen | ungetaggter Spend | FinOps, Leadership |  | monatlich |  | Ownership-Eskalation |
| Commitment Coverage | Rabattabdeckung messen | committed eligible spend / eligible spend | FinOps, Procurement |  | monatlich |  | Commitment-Entscheidung |
| Commitment Utilization | Commitment-Leerlauf vermeiden | genutztes / gekauftes Commitment | Procurement, Finance |  | monatlich |  | Anpassung Commitment-Strategie |
| Waste Percentage | vermeidbare Kosten erkennen | vermeidbarer Spend / Total Spend | Engineering |  | monatlich |  | Backlog-Priorisierung |
| Savings Realized | realisierte Wirkung messen | Baseline minus Ist nach Massnahme | Leadership |  | monatlich |  | Nutzenbeleg |
| Optimization Backlog Value | Massnahmenwert steuern | Summe offener Potenziale | FinOps, Engineering |  | 14-taegig |  | Priorisierung |
| Showback Accuracy | Vertrauen in Allokation pruefen | allokierter/reconciled Spend | Finance, FinOps |  | monatlich |  | Reporting-Korrektur |

## KPI-Auswahl fuer Startphase

Empfohlen fuer die ersten 90 Tage:

1. Cloud Spend
2. Tagging Coverage
3. Untagged Spend
4. Budget Variance
5. Forecast Accuracy
6. Waste Percentage
7. Optimization Backlog Value

## Nicht tun

- keine KPI-Liste ohne Owner
- keine Savings-KPI ohne Baseline
- keine Unit Economics ohne klare Einheit
- keine Chargeback-KPI ohne Accounting-Abstimmung
- keine Dashboard-Flut ohne Entscheidungskontext