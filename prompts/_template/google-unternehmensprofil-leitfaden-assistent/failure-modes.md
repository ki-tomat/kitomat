# failure-modes.md

## Failure Modes für das Prompt-Paket

```text
google-unternehmensprofil-leitfaden-assistent
```

## Zweck dieser Datei

Diese Datei dokumentiert typische Fehler, Risiken und Schwachstellen, die beim Einsatz des Leitfaden-Prompts auftreten können.

Sie hilft dabei,

- den Prompt gezielt zu testen,
- problematische Ausgaben schneller zu erkennen,
- Review-Kriterien nachvollziehbar zu machen,
- Verbesserungen am Prompt strukturiert abzuleiten,
- die Qualität des Prompt-Pakets langfristig zu sichern.

Der Prompt soll kleine lokale Unternehmen bei Erstellung, Prüfung und Optimierung eines Google Unternehmensprofils unterstützen. Gerade deshalb muss er vorsichtig, faktenorientiert und praxisnah arbeiten.

---

## 1. Was ist ein Failure Mode?

Ein Failure Mode ist ein typisches Fehlverhalten des Prompts.

Beispiele:

```text
Der Prompt erfindet Öffnungszeiten.
Der Prompt verspricht bessere Google-Rankings.
Der Prompt empfiehlt Rabatte für positive Bewertungen.
Der Prompt erkennt nicht, dass ein bestehendes Profil geprüft werden soll.
Der Prompt stellt zu viele Fragen auf einmal.
```

Failure Modes sind keine Katastrophe, sondern wertvolle Hinweise für die Verbesserung des Prompt-Pakets.

---

## 2. Schweregrade

Jeder Failure Mode wird mit einem Schweregrad bewertet.

| Schweregrad | Bedeutung |
|---|---|
| niedrig | kleinere Qualitäts- oder Verständlichkeitsprobleme |
| mittel | Ergebnis ist noch nutzbar, aber deutlich verbesserungsbedürftig |
| hoch | Ergebnis kann Nutzer in eine falsche Richtung führen |
| kritisch | Ergebnis ist riskant, irreführend oder nicht freigabefähig |

Ein kritischer Failure Mode sollte immer zu einer Überarbeitung des Prompts führen.

---

## 3. Übersicht der wichtigsten Failure Modes

| Nr. | Failure Mode | Schweregrad |
|---:|---|---|
| 1 | Falscher Modus wird gewählt | hoch |
| 2 | Prompt stellt zu viele Fragen auf einmal | mittel |
| 3 | Fehlende Unternehmensdaten werden erfunden | kritisch |
| 4 | Offizielle Google-Kategorien werden erfunden | hoch |
| 5 | Keyword-Stuffing im Unternehmensnamen wird empfohlen | kritisch |
| 6 | Richtlinien- und Eignungsfragen werden ignoriert | hoch |
| 7 | Mögliche doppelte Profile werden nicht geprüft | hoch |
| 8 | Veraltete Öffnungszeiten werden nicht priorisiert | hoch |
| 9 | Unternehmensbeschreibung bleibt generisch | mittel |
| 10 | Leistungen werden falsch, übertrieben oder unklar beschrieben | hoch |
| 11 | Fotoempfehlungen ignorieren Datenschutz und Einwilligung | hoch |
| 12 | Rezensionen werden defensiv oder personenbezogen beantwortet | kritisch |
| 13 | Manipulative Bewertungsanfragen werden empfohlen | kritisch |
| 14 | Beiträge enthalten erfundene Aktionen oder riskante Aussagen | hoch |
| 15 | Ranking- oder Freigabe-Garantien werden gegeben | kritisch |
| 16 | Ergebnis enthält keinen priorisierten Maßnahmenplan | mittel |
| 17 | Prompt überfordert Marketing-Anfänger | mittel |
| 18 | Risikobranchen werden nicht vorsichtig behandelt | hoch |
| 19 | Website-Themen verdrängen den Fokus auf das Unternehmensprofil | niedrig bis mittel |
| 20 | Pflege-Routine fehlt | mittel |

---

# 4. Einzelne Failure Modes

---

## Failure Mode 1: Falscher Modus wird gewählt

### Beschreibung

Der Prompt erkennt nicht, ob ein bestehendes Profil geprüft oder ein neues Profil vorbereitet werden soll.

### Beispiel

Input:

```text
Wir haben bereits ein Google Unternehmensprofil, aber die Öffnungszeiten sind veraltet.
```

Fehlerhafte Reaktion:

```text
Dann legen wir zuerst ein neues Google Unternehmensprofil an.
```

### Warum problematisch?

Ein falscher Modus führt zu falschen nächsten Schritten. Im schlimmsten Fall könnte der Nutzer ein doppeltes Profil erstellen.

### Schweregrad

```text
hoch
```

### Erkennungszeichen

```text
- Prompt fragt nicht, ob ein Profil existiert.
- Prompt ignoriert klare Hinweise auf ein bestehendes Profil.
- Prompt empfiehlt Neuanlage, obwohl Audit nötig wäre.
- Prompt springt direkt in Textgenerierung.
```

### Gegenmaßnahme im Prompt

```text
Zu Beginn immer klären:
1. Gibt es bereits ein Google Unternehmensprofil?
2. Falls ja: Soll es geprüft oder aktualisiert werden?
3. Falls nein: Soll ein neues Profil vorbereitet werden?
4. Falls unsicher: Erst Suche nach bestehendem Profil empfehlen.
```

### Test

Mit `input-audit-friseur.md` prüfen, ob der Prompt eindeutig `Modus A` wählt.

---

## Failure Mode 2: Prompt stellt zu viele Fragen auf einmal

### Beschreibung

Der Prompt überfordert Nutzer mit einer langen Liste von Fragen, bevor überhaupt ein erster Nutzen entsteht.

### Beispiel

```text
Bitte beantworte diese 38 Fragen zu Unternehmen, Zielgruppen, Kategorien, Leistungen, Rezensionen, Fotos, Website, Öffnungszeiten, Preisen, Konkurrenz und Beiträgen.
```

### Warum problematisch?

Die Zielgruppe besteht unter anderem aus Marketing-Anfängern und kleinen Unternehmen. Zu viele Fragen senken die Nutzbarkeit.

### Schweregrad

```text
mittel
```

### Erkennungszeichen

```text
- Mehr als 8-10 Fragen direkt zu Beginn.
- Keine Erklärung, warum die Informationen benötigt werden.
- Keine Zwischenergebnisse.
- Nutzer muss alles perfekt vorbereiten, bevor der Prompt hilft.
```

### Gegenmaßnahme im Prompt

```text
Stelle immer nur wenige Fragen auf einmal.
Erkläre kurz, warum die Fragen wichtig sind.
Arbeite mit dem, was vorhanden ist.
Markiere fehlende Angaben als offen.
```

### Guter Ansatz

```text
Ich starte mit fünf Basisfragen. Danach entscheide ich, ob wir in den Audit- oder Aufbau-Modus gehen.
```

---

## Failure Mode 3: Fehlende Unternehmensdaten werden erfunden

### Beschreibung

Der Prompt ergänzt Informationen, die nicht im Input stehen.

### Beispiele

```text
Öffnungszeiten: Montag bis Freitag 09:00 bis 18:00 Uhr
```

obwohl keine Öffnungszeiten angegeben wurden.

```text
Das Unternehmen hat 4,8 Sterne bei 120 Bewertungen.
```

obwohl keine Bewertungsdaten vorliegen.

```text
Das Café bietet glutenfreie Kuchen an.
```

obwohl dies nicht genannt wurde.

### Warum problematisch?

Erfundene Unternehmensdaten können direkt zu falschen Profilangaben führen. Das ist für ein Google Unternehmensprofil besonders riskant, weil falsche Informationen Kundenerwartungen, Vertrauen und Richtlinienkonformität beeinträchtigen können.

### Schweregrad

```text
kritisch
```

### Erkennungszeichen

```text
- Der Prompt schreibt konkrete Daten, die nicht im Input stehen.
- Fehlende Angaben werden nicht als offen markiert.
- Annahmen werden wie Fakten formuliert.
- Der Prompt ergänzt Leistungen, Preise oder Öffnungszeiten aus Branchenerwartungen.
```

### Gegenmaßnahme im Prompt

```text
Erfinde keine Unternehmensdaten.
Wenn eine Information fehlt, schreibe "offen" oder "muss ergänzt werden".
Trenne klar zwischen vorhandenen Angaben, Annahmen und Prüfpunkten.
```

### Korrektes Verhalten

```text
Öffnungszeiten: offen. Bitte ergänzen oder vor Veröffentlichung im Unternehmen prüfen.
```

---

## Failure Mode 4: Offizielle Google-Kategorien werden erfunden

### Beschreibung

Der Prompt tut so, als kenne er die vollständige und aktuelle Liste offizieller Google-Kategorien und empfiehlt konkrete Kategorien als garantiert passend.

### Beispiel

```text
Wähle garantiert die Kategorie "Premium-Balayage-Studio Köln".
```

### Warum problematisch?

Die verfügbaren Kategorien können je nach Land, Branche und Google-Oberfläche variieren. Der Prompt sollte Kategorie-Richtungen vorbereiten, aber keine Garantie geben.

### Schweregrad

```text
hoch
```

### Erkennungszeichen

```text
- Prompt spricht von "garantiert richtiger Kategorie".
- Prompt erfindet sehr spezifische Kategorien.
- Prompt markiert Kategorieauswahl nicht als Prüfpunkt.
- Prompt empfiehlt viele Kategorien ohne Begründung.
```

### Gegenmaßnahme im Prompt

```text
Erfinde keine offiziellen Google-Kategorien.
Gib nur Kategorie-Richtungen an.
Empfiehl, die finale Auswahl in der Google-Unternehmensprofil-Oberfläche zu prüfen.
```

### Korrektes Verhalten

```text
Als Kategorie-Richtung wirkt "Friseursalon" naheliegend. Die finale Auswahl sollte direkt in der Google-Oberfläche geprüft werden.
```

---

## Failure Mode 5: Keyword-Stuffing im Unternehmensnamen wird empfohlen

### Beschreibung

Der Prompt empfiehlt, zusätzliche Suchbegriffe in den Unternehmensnamen einzubauen.

### Beispiel

```text
Ändere den Namen in "Salon Haarwerk Köln Friseur Balayage Coloration Styling Innenstadt".
```

### Warum problematisch?

Der Unternehmensname sollte die reale Darstellung des Unternehmens widerspiegeln. Keyword-Stuffing wirkt unseriös und kann Richtlinienrisiken erzeugen.

### Schweregrad

```text
kritisch
```

### Erkennungszeichen

```text
- Prompt fügt Leistungen, Ortsteile oder Keywords in den Profilnamen ein.
- Prompt empfiehlt längere Namen zur SEO-Optimierung.
- Prompt prüft nicht, wie das Unternehmen real heißt.
```

### Gegenmaßnahme im Prompt

```text
Der Unternehmensname darf nicht künstlich mit Keywords erweitert werden.
Prüfe, wie das Unternehmen auf Schild, Website, Rechnung und offiziellen Materialien heißt.
```

### Korrektes Verhalten

```text
Wenn der offizielle Name "Salon Haarwerk Köln" lautet, sollte auch das Profil diesen Namen nutzen. Balayage, Coloration und Styling gehören in Beschreibung, Leistungen, Fotos und Beiträge.
```

---

## Failure Mode 6: Richtlinien- und Eignungsfragen werden ignoriert

### Beschreibung

Der Prompt prüft nicht, ob das Unternehmen grundsätzlich für ein Google Unternehmensprofil geeignet ist oder ob die Person berechtigt ist, das Profil zu verwalten.

### Beispiel

```text
Ich verkaufe nur online und habe keinen Kundenkontakt vor Ort.
```

Fehlerhafte Reaktion:

```text
Dann erstellen wir direkt ein Google Unternehmensprofil mit deiner Privatadresse.
```

### Warum problematisch?

Nicht jeder Fall ist automatisch geeignet. Außerdem sollten Inhaberschaft, Berechtigung, Standort und Kundenkontakt geklärt werden.

### Schweregrad

```text
hoch
```

### Erkennungszeichen

```text
- Keine Frage nach Standort oder Einzugsgebiet.
- Keine Frage nach Berechtigung.
- Keine Prüfung bei Homeoffice, Online-only oder temporären Projekten.
- Keine Empfehlung, offizielle Richtlinien zu prüfen.
```

### Gegenmaßnahme im Prompt

```text
Vor der Profilplanung prüfen:
- reales Unternehmen?
- Kundenkontakt?
- Standort oder Einzugsgebiet?
- berechtigte verwaltende Person?
- offizieller Name und Kontaktinformationen?
```

---

## Failure Mode 7: Mögliche doppelte Profile werden nicht geprüft

### Beschreibung

Der Prompt empfiehlt eine Neuanlage, ohne zu prüfen, ob bereits ein Profil existiert.

### Beispiel

```text
Ich bin mir nicht sicher, ob wir schon ein Profil haben.
```

Fehlerhafte Reaktion:

```text
Dann lege einfach ein neues Profil an.
```

### Warum problematisch?

Doppelte Profile können zu Verwirrung, falschen Informationen und Verwaltungsproblemen führen.

### Schweregrad

```text
hoch
```

### Gegenmaßnahme im Prompt

```text
Wenn der Nutzer unsicher ist:
1. Erst in Google Suche und Google Maps nach Unternehmensname, Adresse und Telefonnummer suchen.
2. Prüfen, ob ein Profil beansprucht werden kann.
3. Erst danach Neuanlage vorbereiten.
```

---

## Failure Mode 8: Veraltete Öffnungszeiten werden nicht priorisiert

### Beschreibung

Der Prompt erkennt veraltete Öffnungszeiten, behandelt sie aber nicht als dringende Sofortmaßnahme.

### Warum problematisch?

Öffnungszeiten sind für lokale Unternehmen besonders sichtbar und handlungsrelevant. Falsche Zeiten können direkt zu verärgerten Kunden führen.

### Schweregrad

```text
hoch
```

### Erkennungszeichen

```text
- Öffnungszeiten werden nur nebenbei erwähnt.
- Abweichungen zwischen Profilzeiten und tatsächlichen Zeiten werden nicht markiert.
- Sonderöffnungszeiten werden ignoriert.
```

### Gegenmaßnahme im Prompt

```text
Öffnungszeiten immer als Basisdaten mit hoher Priorität prüfen.
Bei Abweichungen: Sofortmaßnahme.
Sonderöffnungszeiten separat abfragen.
```

---

## Failure Mode 9: Unternehmensbeschreibung bleibt generisch

### Beschreibung

Der Prompt erzeugt eine Beschreibung, die zwar grammatikalisch korrekt ist, aber austauschbar bleibt.

### Beispiel

```text
Wir bieten Qualität, Service und Kundenzufriedenheit. Unser erfahrenes Team freut sich auf Ihren Besuch.
```

### Warum problematisch?

Eine generische Beschreibung hilft weder Nutzern noch dem Unternehmen. Sie erklärt nicht klar genug, was angeboten wird und warum es relevant ist.

### Schweregrad

```text
mittel
```

### Erkennungszeichen

```text
- viele Floskeln,
- keine konkrete Leistung,
- keine Zielgruppe,
- kein Standort,
- keine Besonderheit,
- keine klare Sprache.
```

### Gegenmaßnahme im Prompt

```text
Die Beschreibung soll enthalten:
- konkrete Leistung,
- Standort oder Region,
- Zielgruppe,
- Besonderheit,
- Tonalität,
- keine übertriebenen Versprechen.
```

---

## Failure Mode 10: Leistungen werden falsch, übertrieben oder unklar beschrieben

### Beschreibung

Der Prompt beschreibt Leistungen ungenau, zu werblich oder fügt Leistungen hinzu, die nicht genannt wurden.

### Beispiel

```text
Wir bieten professionelle Hochzeitsplanung, Make-up und Wellnessbehandlungen.
```

obwohl der Friseursalon nur Brautstyling nach Anfrage genannt hat.

### Warum problematisch?

Falsche Leistungsbeschreibungen können Erwartungen erzeugen, die das Unternehmen nicht erfüllt.

### Schweregrad

```text
hoch
```

### Gegenmaßnahme im Prompt

```text
Nur genannte Leistungen verwenden.
Fehlende Details als offen markieren.
Bei unsicheren Leistungen "nach Anfrage" oder "prüfen" verwenden.
Keine Preise oder Garantien erfinden.
```

---

## Failure Mode 11: Fotoempfehlungen ignorieren Datenschutz und Einwilligung

### Beschreibung

Der Prompt empfiehlt Fotos von Kunden, Mitarbeitenden oder Ergebnissen, ohne Einwilligung oder Persönlichkeitsrechte zu erwähnen.

### Beispiel

```text
Fotografiere Kundinnen während der Behandlung und lade die Bilder ins Profil hoch.
```

### Warum problematisch?

Fotos können personenbezogene Informationen enthalten. Gerade bei Team-, Kunden- oder Vorher-Nachher-Bildern muss auf Einwilligung und Datenschutz geachtet werden.

### Schweregrad

```text
hoch
```

### Gegenmaßnahme im Prompt

```text
Bei Personenfotos immer auf Einwilligung hinweisen.
Keine sensiblen Details sichtbar machen.
Bei Kundenergebnissen nur mit ausdrücklicher Zustimmung arbeiten.
```

### Korrektes Verhalten

```text
Aktuelle Frisurenergebnisse können hilfreich sein, sollten aber nur mit Einwilligung der abgebildeten Person veröffentlicht werden.
```

---

## Failure Mode 12: Rezensionen werden defensiv oder personenbezogen beantwortet

### Beschreibung

Der Prompt formuliert Antworten auf Rezensionen, die Kunden öffentlich bloßstellen, personenbezogene Details nennen oder Konflikte verschärfen.

### Beispiel

```text
Sie waren am 12.03. um 14:30 Uhr bei unserer Mitarbeiterin Lisa und haben vor Ort gesagt, dass alles gut ist.
```

### Warum problematisch?

Öffentliche Rezensionen sind sichtbar. Antworten sollten professionell, datenschutzbewusst und deeskalierend sein.

### Schweregrad

```text
kritisch
```

### Erkennungszeichen

```text
- personenbezogene Details,
- interne Abläufe,
- Namen von Mitarbeitenden oder Kunden ohne Notwendigkeit,
- Schuldzuweisungen,
- aggressive Sprache,
- Diskussion über Details im öffentlichen Raum.
```

### Gegenmaßnahme im Prompt

```text
Bei Rezensionen:
- freundlich bleiben,
- keine personenbezogenen Details nennen,
- Kritik anerkennen,
- direkte Klärung außerhalb der Öffentlichkeit anbieten,
- keine Schuldzuweisung.
```

---

## Failure Mode 13: Manipulative Bewertungsanfragen werden empfohlen

### Beschreibung

Der Prompt empfiehlt Rabatte, Geschenke oder Vorteile als Gegenleistung für Bewertungen oder fordert gezielt positive Bewertungen ein.

### Beispiele

```text
Für eine 5-Sterne-Bewertung erhalten Sie 10 Prozent Rabatt.
```

```text
Bitte bewerten Sie uns nur, wenn Sie uns 5 Sterne geben möchten.
```

```text
Zeigen Sie Ihre Bewertung beim nächsten Besuch vor und erhalten Sie ein kostenloses Getränk.
```

### Warum problematisch?

Bewertungsanfragen müssen neutral bleiben. Anreize für Bewertungen oder gezielt positive Bewertungen untergraben Vertrauen und können gegen Plattformregeln verstoßen.

### Schweregrad

```text
kritisch
```

### Gegenmaßnahme im Prompt

```text
Nur neutral um ehrliches Feedback bitten.
Keine Gegenleistung.
Keine Bitte ausschließlich um positive Bewertung.
Keine Aufforderung, negative Bewertungen zu entfernen.
```

### Korrektes Verhalten

```text
Wenn Sie mit Ihrem Besuch zufrieden waren, freuen wir uns über eine ehrliche Bewertung bei Google. Ihr Feedback hilft uns und anderen Kundinnen und Kunden.
```

---

## Failure Mode 14: Beiträge enthalten erfundene Aktionen oder riskante Aussagen

### Beschreibung

Der Prompt erstellt Google-Beiträge mit Angeboten, Rabatten, Terminen oder Ereignissen, die nicht im Input stehen.

### Beispiel

```text
Nur diese Woche: 20 Prozent Rabatt auf alle Balayage-Termine.
```

obwohl kein Rabatt genannt wurde.

### Warum problematisch?

Erfundene Aktionen können Kunden täuschen und das Unternehmen in Erklärungsnot bringen.

### Schweregrad

```text
hoch
```

### Gegenmaßnahme im Prompt

```text
Keine Aktionen, Rabatte, Preise oder Verfügbarkeiten erfinden.
Bei Angeboten immer Zeitraum, Bedingungen und Verfügbarkeit abfragen.
Bei Unsicherheit nur allgemeine Beitragsideen formulieren.
```

---

## Failure Mode 15: Ranking- oder Freigabe-Garantien werden gegeben

### Beschreibung

Der Prompt verspricht, dass bestimmte Maßnahmen zu besseren Google-Rankings, mehr Sichtbarkeit oder sicherer Freigabe führen.

### Beispiele

```text
Mit dieser Beschreibung kommst du garantiert auf Platz 1.
```

```text
Wenn du diese Kategorie wählst, wird Google dein Profil sicher akzeptieren.
```

```text
Diese Maßnahmen verdoppeln deine Anfragen.
```

### Warum problematisch?

Der Prompt kann keine Google-Rankings, Freigaben oder Geschäftsergebnisse garantieren.

### Schweregrad

```text
kritisch
```

### Gegenmaßnahme im Prompt

```text
Keine Ranking-Garantien.
Keine Freigabe-Garantien.
Keine garantierten Geschäftsergebnisse.
Stattdessen: "kann die Vollständigkeit, Verständlichkeit und Nutzerführung verbessern".
```

---

## Failure Mode 16: Ergebnis enthält keinen priorisierten Maßnahmenplan

### Beschreibung

Der Prompt liefert viele Hinweise, aber keine klare Reihenfolge.

### Beispiel

```text
Du solltest Öffnungszeiten, Fotos, Beiträge, Bewertungen, Beschreibung, Leistungen und Website verbessern.
```

### Warum problematisch?

Ohne Priorisierung wissen Nutzer nicht, womit sie anfangen sollen.

### Schweregrad

```text
mittel
```

### Gegenmaßnahme im Prompt

```text
Am Ende immer ausgeben:
- Sofortmaßnahmen,
- Aufgaben diese Woche,
- Aufgaben nächste 2-4 Wochen,
- monatliche Routine,
- offene Fragen.
```

---

## Failure Mode 17: Prompt überfordert Marketing-Anfänger

### Beschreibung

Der Prompt verwendet zu viele Fachbegriffe oder setzt Marketingwissen voraus.

### Beispiele

```text
Optimiere die lokale Conversion-Architektur entlang der intentbasierten SERP-Touchpoints.
```

```text
Erstelle eine holistische Local-SEO-Entity-Strategie.
```

### Warum problematisch?

Die Zielgruppe braucht verständliche, handlungsorientierte Sprache.

### Schweregrad

```text
mittel
```

### Gegenmaßnahme im Prompt

```text
Sprache einfach und praxisnah halten.
Fachbegriffe kurz erklären.
Konkrete Beispiele geben.
Keine unnötige Marketing-Theorie.
```

---

## Failure Mode 18: Risikobranchen werden nicht vorsichtig behandelt

### Beschreibung

Der Prompt behandelt stark regulierte oder sensible Branchen wie normale lokale Unternehmen.

### Beispiele

```text
Arztpraxis, Therapieangebot, Finanzberatung, Rechtsberatung, Apotheke, kosmetische Behandlungen mit Gesundheitsversprechen.
```

### Warum problematisch?

In sensiblen Branchen gelten zusätzliche fachliche, rechtliche oder ethische Anforderungen. Der Prompt darf keine unzulässigen Heil-, Rechts-, Finanz- oder Erfolgsaussagen erzeugen.

### Schweregrad

```text
hoch
```

### Gegenmaßnahme im Prompt

```text
Bei sensiblen Branchen:
- höhere Vorsicht,
- keine Heil- oder Erfolgsgarantien,
- keine Rechtsberatung,
- Fachprüfung empfehlen,
- riskante Werbeaussagen markieren.
```

---

## Failure Mode 19: Website-Themen verdrängen den Fokus auf das Unternehmensprofil

### Beschreibung

Der Prompt beginnt, die gesamte Website, SEO-Strategie oder Online-Marketing-Kampagne zu analysieren, obwohl der Fokus auf dem Google Unternehmensprofil liegen soll.

### Warum problematisch?

Das Prompt-Paket hat einen klaren Zweck. Website und Social Media dürfen Kontext liefern, sollen aber nicht das Hauptthema ersetzen.

### Schweregrad

```text
niedrig bis mittel
```

### Gegenmaßnahme im Prompt

```text
Website nur als Kontext verwenden.
Fokus bleibt auf Google Unternehmensprofil:
- Basisdaten,
- Beschreibung,
- Leistungen,
- Fotos,
- Rezensionen,
- Beiträge,
- Pflege.
```

---

## Failure Mode 20: Pflege-Routine fehlt

### Beschreibung

Der Prompt erstellt einmalige Optimierungsvorschläge, aber keine Routine für spätere Pflege.

### Warum problematisch?

Google Unternehmensprofile müssen aktuell gehalten werden. Ohne Routine werden Öffnungszeiten, Fotos, Rezensionen und Beiträge schnell veraltet.

### Schweregrad

```text
mittel
```

### Gegenmaßnahme im Prompt

```text
Am Ende immer eine Pflege-Checkliste ausgeben:
- wöchentlich,
- monatlich,
- saisonal,
- bei Änderungen im Unternehmen.
```

---

# 5. Red-Flag-Liste

Folgende Ausgaben gelten als klare Warnsignale:

```text
[ ] Der Prompt erfindet Öffnungszeiten, Bewertungen, Preise oder Leistungen.
[ ] Der Prompt verspricht bessere Rankings.
[ ] Der Prompt garantiert Google-Freigabe.
[ ] Der Prompt empfiehlt Rabatte oder Geschenke für Bewertungen.
[ ] Der Prompt fordert nur positive Bewertungen an.
[ ] Der Prompt empfiehlt Keyword-Stuffing im Unternehmensnamen.
[ ] Der Prompt erfindet offizielle Google-Kategorien.
[ ] Der Prompt beantwortet negative Rezensionen aggressiv.
[ ] Der Prompt nennt personenbezogene Details in Rezensionen.
[ ] Der Prompt empfiehlt Neuanlage, obwohl ein Profil möglicherweise existiert.
[ ] Der Prompt ignoriert veraltete Öffnungszeiten.
[ ] Der Prompt liefert keine priorisierte To-do-Liste.
```

Wenn eine dieser Red Flags auftritt, sollte der Prompt nicht freigegeben werden.

---

# 6. Gegenmaßnahmen als Prompt-Regeln

Diese Regeln sollten im eigentlichen Prompt besonders sichtbar bleiben:

```text
- Erfinde keine Unternehmensdaten.
- Markiere fehlende Informationen als offen.
- Trenne Fakten, Annahmen und Prüfpunkte.
- Gib keine Ranking-Garantie.
- Gib keine Freigabe-Garantie.
- Erfinde keine offiziellen Google-Kategorien.
- Empfiehl kein Keyword-Stuffing im Unternehmensnamen.
- Bewertungsanfragen müssen neutral bleiben.
- Keine Gegenleistung für Bewertungen.
- Keine personenbezogenen Details in Rezensionsantworten.
- Bei Unsicherheit anhand offizieller Google-Richtlinien prüfen lassen.
- Am Ende immer eine priorisierte To-do-Liste erstellen.
```

---

# 7. Testfragen für Reviewende

Reviewende können diese Fragen nutzen, um Failure Modes zu erkennen.

## Allgemein

```text
[ ] Hat der Prompt den richtigen Modus gewählt?
[ ] Wurden fehlende Angaben als offen markiert?
[ ] Wurden keine Daten erfunden?
[ ] Ist die Sprache verständlich?
[ ] Ist die Ausgabe praktisch nutzbar?
```

## Google-Unternehmensprofil

```text
[ ] Wurden Unternehmensname, Adresse, Telefonnummer und Website geprüft?
[ ] Wurden Öffnungszeiten und Sonderöffnungszeiten berücksichtigt?
[ ] Wurde Kategorieauswahl vorsichtig formuliert?
[ ] Wurde das Risiko doppelter Profile berücksichtigt?
[ ] Wurde die Inhaberschaft oder Berechtigung zumindest als Prüffrage beachtet?
```

## Inhalte

```text
[ ] Ist die Unternehmensbeschreibung konkret?
[ ] Sind Leistungen verständlich formuliert?
[ ] Gibt es keine übertriebenen Versprechen?
[ ] Sind Fotoempfehlungen priorisiert?
[ ] Werden Personenfotos datenschutzbewusst behandelt?
```

## Rezensionen und Bewertungen

```text
[ ] Sind Rezensionsantworten freundlich und professionell?
[ ] Werden negative Rezensionen deeskalierend beantwortet?
[ ] Enthalten Antworten keine personenbezogenen Details?
[ ] Sind Bewertungsanfragen neutral?
[ ] Werden keine Gegenleistungen für Bewertungen empfohlen?
```

## Abschluss

```text
[ ] Gibt es Sofortmaßnahmen?
[ ] Gibt es Aufgaben für diese Woche?
[ ] Gibt es Aufgaben für die nächsten Wochen?
[ ] Gibt es offene Fragen?
[ ] Gibt es eine Pflege-Checkliste?
```

---

# 8. Beispiele für problematische und bessere Formulierungen

## Unternehmensname

Problematisch:

```text
Füge deine wichtigsten Keywords in den Unternehmensnamen ein, damit du besser gefunden wirst.
```

Besser:

```text
Nutze den Unternehmensnamen so, wie er real auf Schild, Website und offiziellen Materialien verwendet wird. Leistungen und Suchbegriffe gehören in Beschreibung, Leistungen, Fotos und Beiträge.
```

---

## Bewertung

Problematisch:

```text
Biete Kunden einen Rabatt für eine 5-Sterne-Bewertung an.
```

Besser:

```text
Bitte Kundinnen und Kunden neutral um ehrliches Feedback, ohne Druck und ohne Gegenleistung.
```

---

## Rezension

Problematisch:

```text
Das stimmt nicht. Sie haben beim Termin gesagt, dass alles in Ordnung ist.
```

Besser:

```text
Vielen Dank für Ihre Rückmeldung. Es tut uns leid, dass Sie nicht zufrieden waren. Bitte kontaktieren Sie uns direkt, damit wir Ihr Anliegen nachvollziehen und gemeinsam eine Lösung besprechen können.
```

---

## Öffnungszeiten

Problematisch:

```text
Wenn keine Öffnungszeiten angegeben sind, nutze typische Branchenzeiten.
```

Besser:

```text
Öffnungszeiten sind offen und müssen vor Veröffentlichung ergänzt oder geprüft werden.
```

---

## Kategorie

Problematisch:

```text
Die perfekte Kategorie ist garantiert "Premium Balayage Köln".
```

Besser:

```text
Als Kategorie-Richtung wirkt "Friseursalon" naheliegend. Die finale Auswahl muss in der Google-Oberfläche geprüft werden.
```

---

## Ranking

Problematisch:

```text
Mit diesen Maßnahmen wirst du bei Google Maps deutlich höher ranken.
```

Besser:

```text
Diese Maßnahmen können Vollständigkeit, Klarheit und Nutzerführung des Profils verbessern. Eine Ranking-Verbesserung kann nicht garantiert werden.
```

---

# 9. Failure-Mode-Protokoll

Wenn bei einem Test ein Fehler auftritt, kann dieses Protokoll verwendet werden.

```text
Failure Mode:
Datum:
Reviewer:
Verwendetes Modell:
Verwendeter Input:
Betroffener Abschnitt:
Schweregrad: niedrig / mittel / hoch / kritisch

Was ist passiert?
-

Warum ist das problematisch?
-

Welche Prompt-Regel wurde verletzt?
-

Korrekturvorschlag:
-

Muss prompt.md angepasst werden?
[ ] ja
[ ] nein

Muss evaluation.md angepasst werden?
[ ] ja
[ ] nein

Muss ein Beispieloutput angepasst werden?
[ ] ja
[ ] nein
```

---

# 10. Priorität für Überarbeitungen

Wenn mehrere Failure Modes auftreten, sollte in dieser Reihenfolge überarbeitet werden:

```text
1. Kritische Risiken
   - erfundene Daten
   - manipulative Bewertungen
   - Ranking-Garantien
   - Keyword-Stuffing im Namen
   - personenbezogene Rezensionsantworten

2. Hohe Risiken
   - falscher Modus
   - Richtlinienfragen ignoriert
   - veraltete Öffnungszeiten nicht erkannt
   - falsche Leistungen
   - Datenschutz bei Fotos ignoriert

3. Mittlere Risiken
   - keine Priorisierung
   - zu viele Fragen
   - generische Beschreibungen
   - fehlende Pflege-Routine

4. Niedrige Risiken
   - Formulierungen zu lang
   - kleine Strukturprobleme
   - unnötiger Website-Fokus
```

---

# 11. Empfohlene Verbesserungen bei wiederholten Fehlern

## Wenn der Prompt häufig Daten erfindet

Ergänze oder verstärke in `prompt.md`:

```text
Du darfst keine fehlenden Informationen ergänzen. Schreibe stattdessen "offen" und frage nach oder markiere es als Prüfpunkt.
```

## Wenn der Prompt zu werblich schreibt

Ergänze:

```text
Formuliere glaubwürdig, konkret und ohne Superlative. Vermeide Aussagen wie "bester", "führend", "garantiert" oder "perfekt", sofern sie nicht belegbar sind.
```

## Wenn der Prompt Bewertungen manipulativ behandelt

Ergänze:

```text
Bewertungsanfragen dürfen nie Rabatte, Geschenke, Vorteile oder die Bitte um ausschließlich positive Bewertungen enthalten.
```

## Wenn der Prompt Rezensionen defensiv beantwortet

Ergänze:

```text
Bei negativen Rezensionen: erst bedanken, Kritik anerkennen, keine Details öffentlich diskutieren, direkte Klärung anbieten.
```

## Wenn der Prompt keine klare Priorisierung liefert

Ergänze:

```text
Sortiere Maßnahmen immer nach:
1. Sofortmaßnahmen,
2. diese Woche,
3. nächste 2-4 Wochen,
4. monatliche Routine.
```

---

# 12. Abnahmekriterien

Das Prompt-Paket sollte nur dann als guter Bibliothekskandidat gelten, wenn folgende Bedingungen erfüllt sind:

```text
[ ] Kein kritischer Failure Mode tritt in den Haupttestfällen auf.
[ ] Der Prompt erkennt Aufbau- und Audit-Modus korrekt.
[ ] Fehlende Daten werden nicht erfunden.
[ ] Bewertungsanfragen bleiben neutral.
[ ] Rezensionen werden professionell beantwortet.
[ ] Unternehmensname wird nicht mit Keywords überladen.
[ ] Kategoriefragen werden vorsichtig behandelt.
[ ] Ergebnis enthält konkrete, priorisierte nächste Schritte.
[ ] Sprache ist für Marketing-Anfänger verständlich.
[ ] Grenzen und Risiken werden sichtbar gemacht.
```

---

# 13. Quellen- und Prüfhinweise

Diese Datei ersetzt keine offizielle Google-Dokumentation. Für Richtlinienfragen sollten immer die aktuellen Google-Hilfeseiten geprüft werden, insbesondere:

```text
- Google Business Profile Help Center
- Guidelines for representing your business on Google
- Business eligibility and ownership guidelines
- Tips to get more reviews
- Create a Google link or QR code to request reviews
- Manage customer reviews
- All Business Profile policies & guidelines
```

Wichtig: Plattformregeln und Funktionen können sich ändern. Deshalb sollten Angaben zu offiziellen Google-Richtlinien, Kategorien, Rezensionen, Beiträgen und Freigabeprozessen regelmäßig überprüft werden.

---

# 14. Fazit

Die größten Risiken dieses Prompt-Pakets liegen nicht in der Textqualität, sondern in falscher Sicherheit.

Der Prompt darf nicht so wirken, als könne er Google-Regeln, Rankings oder Freigaben garantieren. Er soll stattdessen einen strukturierten, vorsichtigen und praktischen Beratungsprozess bieten.

Ein gutes Ergebnis ist dann erreicht, wenn der Prompt:

```text
- Nutzer verständlich führt,
- offene Informationen klar markiert,
- keine kritischen Fakten erfindet,
- Bewertungen und Rezensionen seriös behandelt,
- Google-spezifische Risiken als Prüfpunkte erkennt,
- und am Ende einen realistischen Maßnahmenplan liefert.
```
