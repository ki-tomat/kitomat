# Evaluation: Auftragsklärung mit SCS und Coverdale-Zielscheibe

## Bewertungskriterien

### Phase 1 — SCS-Analyse

| Kriterium | Prüffrage | Bestanden wenn… |
|---|---|---|
| Trennschärfe S/C | Sind Situation und Complication klar voneinander getrennt? | Complication benennt einen strukturellen Treiber, keine bloße Schwierigkeit |
| Complication-Qualität | Ist die eigentliche Herausforderung benannt (nicht nur ein Symptom)? | Die Frage „Was passiert wenn nichts getan wird?" ist beantwortet |
| Solution-Präzision | Ist der Lösungsweg konkret formuliert? | Output und übergeordnetes Ziel sind erkennbar getrennt |
| Länge | Hält jeder Abschnitt 2–4 Sätze? | Kein Abschnitt ist ein Einzeiler oder ein Absatz-Block |

### Phase 2 — Coverdale-Zielscheibe

| Kriterium | Prüffrage | Bestanden wenn… |
|---|---|---|
| Stakeholder-Vollständigkeit | Sind strategische und operative Ebene unterschieden? | Mindestens 2 Stakeholder-Gruppen benannt |
| Sinn/Zweck-Tiefe | Geht der Zweck über „wir wollen X erreichen" hinaus? | Motivation oder Konsequenz der Untätigkeit ist sichtbar |
| Endergebnis-Messbarkeit | Ist das Ergebnis konkret und zeitlich verankert? | Datum/Zeitraum und mind. 1 messbarer Output |
| Kriterien-Vollständigkeit | Sind mind. 3 der 4 Kategorien abgedeckt? | Qualität, Ressourcen, Zeit, Gestaltung — mind. 3 |
| Cross-Check-Qualität | Ist eine echte Inkonsistenz oder Lücke benannt? | Nicht nur „alles ist konsistent" ohne Begründung |

### Gesamtbewertung

| Ziel | Erfüllt wenn… |
|---|---|
| Actionability | Output kann direkt in Kick-off-Meeting eingebracht werden, ohne Nacharbeit |
| Konsistenz | SCS-Analyse und Zielscheibe widersprechen sich nicht |
| Keine Platzhalter | Alle Felder ausgefüllt, kein `[TBD]` in Pflichtfeldern des Outputs |
| Quellenintegrität | Coverdale-Zielscheibe ist korrekt referenziert |

## Bekannte Schwachstelle im Prompt

Der Prompt liefert bei sehr kurzem oder vagem Input (unter 3 Sätzen) oberflächliche Ergebnisse. In diesem Fall: Prompt erneut ausführen mit erweitertem Kurzbrief.

---

## Szenario-Triade

### Positives Szenario

Nutzer gibt einen konkreten Kurzbrief mit 4–6 Sätzen, klarem Kontext und einer erkennbaren Complication. Der Prompt liefert eine trennscharte SCS-Analyse mit konkreter Solution sowie eine vollständige Coverdale-Zielscheibe mit mindestens zwei Stakeholder-Gruppen, messbarem Endergebnis und drei Kriterien. Cross-Check identifiziert eine reale Lücke. Output ist direkt im Kick-off-Meeting einsetzbar ohne Nacharbeit.

**Expertenfeedback:** Das Beispiel (Innovationstag Bank) zeigt den Kern: Die Coverdale-Lücke (fehlende Bereichsleiter-Freistellung in den Kriterien) ist im Output präzise benannt und direkt adressierbar. Das ist der Mehrwert gegenüber einem freien Brainstorming.

### Nachbearbeitbares Szenario

Nutzer gibt einen vagen Input mit 1–2 Sätzen ohne Complication ("Wir wollen ein Projekt starten"). Der Prompt generiert eine Struktur, aber Complication und Stakeholder bleiben generisch. Solution ist eine Leerformel.

**Expertenfeedback:** Die Struktur ist korrekt — der Inhalt braucht menschliche Schärfung. Handlungsempfehlung: Prompt mit erweitertem Kurzbrief erneut ausführen. Der Berater muss die Complication vorher herausarbeiten, z.B. per Leitfragengespräch.

### Negatives Szenario

Nutzer beschreibt ein Szenario, das rechtliche oder personalrechtliche Entscheidungen erfordert ("Soll ich dem Mitarbeitenden kündigen?" oder "Ist dieses Vorgehen rechtlich zulässig?"). Das Auftragsklärungswerkzeug ist ein Analyse-Rahmen, kein Entscheidungsersatz.

**Expertenfeedback:** Kein Output aus diesem Prompt darf ohne menschliche Fachprüfung in rechtlich relevante oder personenbezogene Entscheidungen fließen. Das Artefakt hilft, einen Auftrag zu schärfen — nicht, ihn zu beschließen.
