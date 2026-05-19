# Peer Review Fragen fuer das FinOps-Einfuehrungsmodell

## Hinweis fuer Reviewer

Diese Fragen helfen dabei, das Artefakt strukturiert zu pruefen. Bitte beantworte sie kurz und ehrlich. Markiere Unsicherheiten klar als offen. Das Ergebnis dient als Vorbereitung fuer das Trust Review und die Maintainer-Entscheidung.

Reviewer ist nicht verpflichtet, fachliche Freigaben zu erteilen. Ziel ist ein nachvollziehbarer, reviewfaehiger Stand.

---

## 1. Verstaendlichkeit

- Ist der Zweck des Modells nach dem Lesen von `README.md` klar?
- Versteht eine fremde Person ohne FinOps-Vorwissen, wann das Modell eingesetzt wird?
- Sind die Phasen in `model.md` nachvollziehbar?
- Ist die Sprache durchgaengig sachlich und ohne Marketing-Floskeln?

## 2. Zielgruppe und Anwendung

- Ist die Zielgruppe konkret beschrieben?
- Ist klar, wann das Modell nicht angewendet werden soll?
- Ist der `application-guide.md` praxistauglich, also direkt nutzbar?
- Sind die fuenf Anwendungspfade (KMU, Mittelstand, Enterprise, SaaS, Kubernetes) plausibel abgegrenzt?

## 3. Inhaltliche Qualitaet

- Ist das 5-Phasen-Modell konsistent mit der FinOps-Foundation-Logik (Inform / Optimize / Operate)?
- Werden Usage Optimization und Rate Optimization sauber getrennt?
- Sind die KPIs steuerungsrelevant oder nur "nice to have"?
- Gibt es offensichtliche fachliche Luecken?
- Wird zwischen Showback und Chargeback sauber unterschieden?

## 4. Beispiel und Szenarien

- Ist `examples/example-01.md` vollstaendig synthetisch (keine echten Firmen, Personen, Daten)?
- Ist die Szenario-Triade nachvollziehbar?
- Sind positives, nachbearbeitbares und negatives Szenario klar voneinander abgegrenzt?
- Ist das Expertenfeedback je Szenario plausibel?

## 5. Failure Modes

- Sind die zehn Failure Modes praxisrelevant?
- Sind die Gegenmassnahmen konkret und nicht generisch?
- Fehlen wichtige Failure Modes (z. B. zu engineering-lastige FinOps-Sicht ohne Finance-Anbindung)?

## 6. Worksheets und Canvas

- Sind die Worksheets ohne weitere Erklaerung ausfuellbar?
- Sind die Skalen und KPI-Definitionen verstaendlich?
- Wuerdest du als Berater diese Vorlagen in einem echten Workshop einsetzen?

## 7. Daten- und Quellenrisiken

- Enthaelt das Artefakt echte personenbezogene Daten? (sollte nein sein)
- Enthaelt das Artefakt echte Kundendaten, Cloud-Rechnungen oder Vertragsdaten? (sollte nein sein)
- Sind die Quellen in `sources.md` nachvollziehbar?
- Sind die offenen Quellenfragen klar markiert?

## 8. Trust Layer

- Ist `data_risk` in `metadata.yml` realistisch gesetzt?
- Ist `human_review_required` gerechtfertigt?
- Ist der `legal_disclaimer` klar formuliert?
- Ist `ai_act_proximity` realistisch eingeschaetzt?

## 9. Failure Modes des Reviews

- Habe ich als Reviewer das Modell wirklich verstanden, oder nur ueberflogen?
- Habe ich Annahmen gemacht, die ich besser als offene Frage markieren sollte?
- Gibt es etwas, das nur ein Senior FinOps Practitioner final beurteilen kann?

## 10. Statusentscheidung

- Ist `draft` oder `bronze_candidate` der angemessene Status?
- Welche fuenf Verbesserungen wuerden die Qualitaet am staerksten heben?
- Was muss vor einer eventuellen `bronze`-Vergabe noch passieren?

---

## Reviewer-Notiz

```text
Reviewer:
Datum:
Eingesetzter Aufwand (grob):
Empfohlener Status nach Review:
Wichtigste Blocker:
Wichtigste Verbesserungsvorschlaege:
Offene fachliche Fragen:
```
