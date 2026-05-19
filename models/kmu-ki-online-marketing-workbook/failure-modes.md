# Failure Modes
## KI-Online-Marketing-Beratungsmodell für Kleinstunternehmen

## 1. Zweck dieses Dokuments

Dieses Dokument beschreibt typische Fehler, Risiken und Grenzen bei der Anwendung des KI-Online-Marketing-Beratungsmodells für Kleinstunternehmen bis 10 Mitarbeitende.

Es hilft dabei:

- unrealistische Erwartungen zu vermeiden,
- Datenschutzrisiken früh zu erkennen,
- schlechte KI-Ergebnisse zu identifizieren,
- falsche Automatisierung zu verhindern,
- menschliche Prüfung sauber einzuplanen,
- das Modell reviewfähig zu machen.

Das Modell ist eine Arbeits- und Orientierungshilfe. Es ersetzt keine fachliche, rechtliche oder datenschutzrechtliche Prüfung.

## 2. Grundannahme

Das Modell arbeitet mit sechs Phasen:

1. Orientierung & Anamnese
2. Daten- & Wissenssammlung
3. Potenzial- & Risikoanalyse
4. Lösungsdesign & KI-Routine
5. Pilot & Szenario-Test
6. Umsetzung, Kontrolle & Weiterentwicklung

Failure Modes können in jeder Phase auftreten. Deshalb werden sie nicht erst am Ende geprüft, sondern begleitend dokumentiert.

## 3. Failure Mode 1: Zu breiter Scope

### Beschreibung

Das KMU möchte zu viele Dinge gleichzeitig verbessern:

- Website
- Google-Unternehmensprofil
- Social Media
- Newsletter
- SEO
- Automationen
- Anzeigen
- CRM
- Kundenservice

### Risiko

- keine klare Priorität,
- Überforderung des Teams,
- zu viele unfertige Routinen,
- keine messbaren Ergebnisse,
- hohe Frustration.

### Gegenmaßnahme

Maximal 1 bis 3 Pilot-Use-Cases auswählen.

### Review-Frage

Wurde ein klar begrenzter erster Pilot ausgewählt?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 4. Failure Mode 2: Zu wenig Unternehmenskontext

### Beschreibung

Die KI bekommt zu wenig Informationen über das Unternehmen. Dann liefert sie generische Standardempfehlungen.

### Risiko

- kein echter Mehrwert,
- austauschbare Ergebnisse,
- falsche Tonalität,
- keine branchentaugliche Anwendung.

### Gegenmaßnahme

Vor jedem KI-Einsatz müssen mindestens diese Informationen vorliegen:

- Branche,
- Angebot,
- Zielgruppe,
- aktuelle Kanäle,
- typische Kundenfragen,
- vorhandene Materialien,
- gewünschtes Ziel,
- No-Gos.

### Review-Frage

Sind genug Unternehmensinformationen vorhanden, damit die KI nicht generisch arbeitet?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 5. Failure Mode 3: Verdeckte Nutzung echter Kundendaten

### Beschreibung

Das KMU bringt echte Kundendaten in den Prozess ein, zum Beispiel:

- Kundennamen,
- E-Mail-Adressen,
- Telefonnummern,
- private Nachrichten,
- Bestellungen,
- Gesundheitsdaten,
- Bewerbungen,
- interne Kundendokumente.

### Risiko

- Datenschutzverstoß,
- Vertrauensverlust,
- ungeeignete Testdaten,
- Ausschluss aus dem MVP-Kontext.

### Gegenmaßnahme

Nur verwenden:

- synthetische Beispieldaten,
- öffentlich sichtbare Inhalte,
- eigene allgemeine Beschreibungen,
- abstrahierte Kundenfragen ohne Personenbezug,
- kurze eigene Zusammenfassungen mit Quellenangabe.

### Review-Frage

Enthält das Modell, Worksheet, Beispiel oder Testszenario echte oder indirekt identifizierbare personenbezogene Daten?

- [ ] nein
- [ ] unklar
- [ ] ja -> blockieren / überarbeiten

## 6. Failure Mode 4: Unklare Quellen oder erfundene Aussagen

### Beschreibung

Die KI erfindet Quellen, Zahlen, Marktannahmen oder fachliche Behauptungen.

### Risiko

- falsche Beratung,
- rechtliche Unsicherheit,
- Vertrauensverlust,
- schlechte Entscheidungsgrundlage.

### Gegenmaßnahme

Jede faktische Aussage muss in eine von drei Kategorien fallen:

| Kategorie | Umgang |
|---|---|
| gesichertes Unternehmenswissen | durch KMU bestätigen lassen |
| öffentliche Quelle | Quelle mit Abrufdatum dokumentieren |
| Annahme | klar als Annahme markieren |

### Review-Frage

Sind Quellen, Annahmen und Unternehmenswissen sauber getrennt?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 7. Failure Mode 5: Falsche Tonalität im Marketing

### Beschreibung

Die KI erzeugt Texte, die nicht zur Marke oder zum Unternehmen passen.

Beispiele:

- zu werblich,
- zu modern,
- zu sachlich,
- zu übertrieben,
- zu generisch,
- nicht regional genug,
- nicht vertrauenswürdig.

### Risiko

- Inhalte wirken künstlich,
- Stammkunden erkennen das Unternehmen nicht wieder,
- Marke verliert Authentizität,
- Veröffentlichung wird abgelehnt.

### Gegenmaßnahme

Vor der Content-Erstellung Tonalitätsangaben erfassen:

- Wie spricht das Unternehmen normalerweise?
- Eher freundlich, sachlich, regional, humorvoll?
- Welche Wörter passen?
- Welche Wörter passen nicht?
- Gibt es Beispieltexte, die als Stilreferenz dienen dürfen?

### Review-Frage

Gibt es eine klare Tonalitätsbeschreibung oder mindestens ein Stilbeispiel?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 8. Failure Mode 6: Automatisierung vor Prozessklärung

### Beschreibung

Das KMU möchte sofort automatisieren, obwohl der zugrunde liegende Prozess noch nicht klar ist.

### Risiko

- schlechter Prozess wird schneller falsch,
- falsche Inhalte werden veröffentlicht,
- Kontrollverlust,
- Datenschutz- oder Reputationsrisiko.

### Gegenmaßnahme

Vor jeder Automation müssen beantwortet sein:

1. Was ist der genaue Input?
2. Was macht die KI?
3. Was prüft der Mensch?
4. Was darf automatisch passieren?
5. Was braucht Freigabe?
6. Wie wird dokumentiert?

### Review-Frage

Ist der Prozess vor der Automation vollständig beschrieben?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 9. Failure Mode 7: Menschliche Freigabe fehlt

### Beschreibung

KI-Ergebnisse werden direkt veröffentlicht oder genutzt, ohne menschliche Prüfung.

### Risiko

- falsche Fakten,
- unpassende Aussagen,
- Datenschutzprobleme,
- rechtlich riskante Formulierungen,
- Vertrauensverlust.

### Gegenmaßnahme

Jede Routine braucht eine Freigabestelle.

Vor Veröffentlichung prüfen:

- [ ] Fakten
- [ ] Tonalität
- [ ] Zielgruppe
- [ ] Datenschutz
- [ ] Quellen
- [ ] keine sensiblen Daten
- [ ] keine erfundenen Aussagen
- [ ] finale Freigabe

### Review-Frage

Ist klar dokumentiert, wer vor Nutzung oder Veröffentlichung freigibt?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 10. Failure Mode 8: Falsche Erfolgsmessung

### Beschreibung

Das KMU führt eine KI-Routine ein, misst aber nicht, ob sie wirkt.

### Risiko

- Nutzen bleibt unklar,
- Routine wird nicht weiterentwickelt,
- KI-Einsatz wird zur Spielerei,
- Zeitersparnis wird nicht nachgewiesen.

### Gegenmaßnahme

Pro Pilot maximal 1 bis 3 einfache KPIs festlegen.

Beispiele:

| Ziel | einfache Kennzahl |
|---|---|
| regelmäßigere Inhalte | Anzahl veröffentlichter Beiträge pro Woche |
| Zeit sparen | Minuten/Stunden pro Woche |
| bessere Sichtbarkeit | Google-Profil-Aufrufe oder Website-Anfragen |
| bessere Kundenkommunikation | Antwortzeit oder Anzahl vorbereiteter FAQ-Antworten |
| mehr Bewertungen | Anzahl neuer Bewertungen pro Monat |

### Review-Frage

Gibt es mindestens eine einfache, realistische Erfolgsmessung?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 11. Failure Mode 9: KI empfiehlt endlos weiter

### Beschreibung

Die KI findet immer neue Optimierungsideen und erzeugt dadurch eine Endlosschleife.

### Risiko

- kein Abschluss,
- Overengineering,
- zu viele Maßnahmen,
- Entscheidungsunsicherheit.

### Gegenmaßnahme

Vor dem Pilot definieren:

- Was ist das Ziel?
- Wann ist das Ergebnis gut genug?
- Was gehört nicht mehr zum Pilot?
- Welche Vorschläge werden auf später verschoben?

### Review-Frage

Gibt es klare Stop-Kriterien für den Pilot?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 12. Failure Mode 10: Tool-Fokus statt Problem-Fokus

### Beschreibung

Das Unternehmen startet mit einer Tool-Idee statt mit einem Problem.

### Risiko

- Tool wird Selbstzweck,
- falsche Lösung,
- unnötige Kosten,
- keine echte Verbesserung.

### Gegenmaßnahme

Immer zuerst fragen:

1. Welches Problem soll gelöst werden?
2. Wie oft tritt es auf?
3. Wer ist betroffen?
4. Was kostet es aktuell Zeit oder Geld?
5. Was wäre ein gutes Ergebnis?

### Review-Frage

Ist der Use Case problemorientiert und nicht nur toolgetrieben?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 13. Failure Mode 11: Keine Szenario-Validierung

### Beschreibung

Das Modell wird beschrieben, aber nicht an einem realitätsnahen Beispiel getestet.

### Risiko

- Modell bleibt abstrakt,
- Fehler werden zu spät erkannt,
- Anwendung ist für KMU unklar,
- keine Reviewfähigkeit.

### Gegenmaßnahme

Mindestens ein Beispiel ausarbeiten:

- fiktiv,
- realitätsnah,
- ohne echte Kundendaten,
- mit Input,
- KI-Aufgabe,
- Output-Erwartung,
- menschlicher Prüfung,
- Bewertung.

### Review-Frage

Gibt es mindestens ein vollständiges Beispiel-Szenario?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 14. Failure Mode 12: Verwechslung von Orientierung und Rechtsberatung

### Beschreibung

Das Modell enthält Hinweise zu Datenschutz, Quellen, KI-Nutzung oder EU-AI-Act-Nähe und wird fälschlich als rechtliche Prüfung verstanden.

### Risiko

- falsche Sicherheit,
- Haftungsrisiko,
- unzulässige Beratungsbehauptung,
- falscher Status im Review.

### Gegenmaßnahme

Immer klarstellen:

- keine Rechtsberatung,
- kein Audit,
- keine automatisierte Entscheidung,
- menschliche Prüfung erforderlich,
- bei unklaren Fällen externe Fachberatung einbeziehen.

### Review-Frage

Ist der Disclaimer klar genug und wird keine Rechtsberatung behauptet?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 15. Failure Mode 13: Unklare Risikoampel

### Beschreibung

Ein Use Case wird als risikoarm dargestellt, obwohl personenbezogene oder vertrauliche Daten möglich sind.

### Risiko

- falsche Review-Stufe,
- zu schwacher Trust Review,
- ungeeignete Pilotfreigabe.

### Gegenmaßnahme

Für dieses Modell wird empfohlen:

```yaml
data_risk: yellow
human_review_required: true
ai_act_proximity: unclear
required_review_level: trust_review
```

### Review-Frage

Ist die Risikoampel plausibel und nicht zu niedrig angesetzt?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 16. Failure Mode 14: Beispiel ist zu personenbezogen

### Beschreibung

Das Beispiel-Szenario verwendet echte oder zu realistische Angaben:

- echte Namen,
- echte Kundenfälle,
- echte Bewertungen,
- echte Anfragen,
- echte Umsatzzahlen,
- interne Dokumente.

### Risiko

- Datenschutzproblem,
- Vertrauensproblem,
- Merge-Blocker im Repository.

### Gegenmaßnahme

Beispiele müssen:

- fiktiv,
- synthetisch,
- abstrahiert,
- nicht rückverfolgbar,
- ohne echte Kundendaten

sein.

### Review-Frage

Ist das Beispiel vollständig synthetisch oder ausreichend abstrahiert?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 17. Failure Mode 15: Modell ist für Anfänger zu kompliziert

### Beschreibung

Das Workbook enthält zu viele Fachbegriffe, zu viele Tabellen oder zu viele Schritte.

### Risiko

- Kleinstunternehmen nutzen es nicht,
- Beratende verlieren den roten Faden,
- Modell wird theoretisch statt praktisch.

### Gegenmaßnahme

Jede Phase muss drei einfache Dinge liefern:

1. Was wird gefragt?
2. Was wird ausgefüllt?
3. Was ist das Ergebnis?

### Review-Frage

Kann ein Kleinstunternehmen ohne KI-Fachwissen das Worksheet verstehen?

- [ ] ja
- [ ] nein
- [ ] nachbearbeiten

## 18. Kompakte Failure-Mode-Tabelle

| Nr. | Failure Mode | Risiko | Gegenmaßnahme |
|---:|---|---|---|
| 1 | Scope zu breit | Überforderung | 1 bis 3 Pilot-Use-Cases |
| 2 | zu wenig Kontext | generische KI-Ausgabe | Anamnesebogen ausfüllen |
| 3 | echte Kundendaten | Datenschutzrisiko | synthetische / abstrahierte Daten |
| 4 | erfundene Quellen | falsche Beratung | Quellenstatus dokumentieren |
| 5 | falsche Tonalität | unpassendes Marketing | Stilvorgaben erfassen |
| 6 | Automation zu früh | Kontrollverlust | Prozess vor Automation klären |
| 7 | keine Freigabe | Qualitätsrisiko | Human Review verpflichtend |
| 8 | keine KPIs | Nutzen unklar | einfache Erfolgsmessung |
| 9 | endlose KI-Empfehlungen | Overengineering | Stop-Kriterien |
| 10 | Tool-Fokus | falsche Lösung | Problem zuerst definieren |
| 11 | kein Szenario-Test | Modell bleibt abstrakt | Beispiel ausarbeiten |
| 12 | Rechtsberatungs-Verwechslung | Haftungsrisiko | Disclaimer |
| 13 | falsche Risikoampel | falscher Review | Trust Layer prüfen |
| 14 | personenbezogenes Beispiel | Merge-Blocker | synthetisches Beispiel |
| 15 | zu kompliziert | nicht nutzbar | Anfängerlogik |
