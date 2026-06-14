# Praxisanleitung fuer Anfaenger
## So wendest du das KI-Online-Marketing-Beratungsmodell auf deine Situation an

Diese Anleitung ist fuer Menschen geschrieben, die noch nie mit einem KI-Beratungsmodell gearbeitet haben.

Du brauchst kein technisches Vorwissen. Du brauchst nur:

- dein Unternehmen oder deinen Fall,
- ein KI-System wie ChatGPT, Claude, Gemini oder ein vergleichbares System,
- die Dateien aus diesem Modellordner,
- etwas Zeit,
- und die Bereitschaft, die Ergebnisse der KI selbst zu pruefen.

Wichtig: Diese Anleitung erklaert, wie du das Modell **anwendest**. Wenn du lernen willst, wie man ein solches Modell selbst nachbaut, nutze `step-by-step-nachbau-guide.md`.

## 1. Was du mit diesem Modell erreichen kannst

Das Modell hilft dir, dein Online-Marketing mit KI strukturierter zu verbessern.

Es hilft zum Beispiel bei Fragen wie:

- Was soll meine Website besser leisten?
- Welche Online-Marketing-Aufgaben kosten zu viel Zeit?
- Welche Aufgaben koennte KI vorbereiten?
- Welche Daten darf ich verwenden?
- Welche KI-Routine kann ich klein testen?
- Wie pruefe ich, ob die KI-Ergebnisse brauchbar sind?

Das Modell macht nicht automatisch dein Marketing besser. Es fuehrt dich aber Schritt fuer Schritt zu einem kleinen, pruefbaren Pilotprojekt.

Merksatz:

> Nicht alles automatisieren. Erst verstehen, dann klein testen, dann kontrolliert nutzen.

## 2. Welche KI soll ich oeffnen?

Nutze ein KI-System, in das du laengere Texte einfuegen oder Dateien hochladen kannst.

Geeignet sind zum Beispiel:

- ChatGPT,
- Claude,
- Gemini,
- ein anderes KI-System, das Markdown-Dateien lesen kann.

Wenn du unsicher bist, nimm ChatGPT, weil du dort einfach Dateien hochladen oder Texte kopieren kannst.

Starte einen **neuen Chat**.

Nenne ihn zum Beispiel:

```text
KI-Online-Marketing-Modell fuer mein Unternehmen
```

Warum ein neuer Chat?

Damit die KI nicht durch alte Themen verwirrt wird.

## 3. Ganz wichtig: Diese Daten nicht eingeben

Gib keine echten personenbezogenen oder vertraulichen Daten in die KI.

Nicht eingeben:

- Kundennamen,
- E-Mail-Adressen,
- Telefonnummern,
- private Nachrichten,
- echte Support-Tickets,
- echte Newsletterlisten,
- Bewerbungsdaten,
- Gesundheitsdaten,
- vertrauliche Finanzdaten,
- interne Kundendokumente,
- ganze Datenexporte aus CRM, Newsletter-Tool oder Shopsystem.

Besser:

- allgemeine Beschreibungen,
- synthetische Beispiele,
- ungefaehre Zahlen,
- oeffentlich sichtbare Website-Texte,
- selbst formulierte Kundenfragen ohne Personenbezug.

Beispiel:

```text
Gut:
Viele Kunden fragen, ob wir auch kurzfristige Termine anbieten.

Nicht gut:
Max Mustermann hat am 12.05. per E-Mail gefragt, ob...
```

## 4. Welche Dateien brauchst du zuerst?

Du musst nicht alle Dateien auf einmal hochladen.

Fange einfach an.

### Startpaket fuer die KI

Lade oder kopiere zuerst diese Dateien in den neuen KI-Chat:

1. `model.md`
2. `application-guide.md`
3. `worksheet/01-erstgespraech-anamnese.md`
4. `failure-modes.md`

Warum genau diese Dateien?

| Datei | Warum sie wichtig ist |
|---|---|
| `model.md` | erklaert das eigentliche 6-Phasen-Modell |
| `application-guide.md` | erklaert die praktische Anwendung |
| `worksheet/01-erstgespraech-anamnese.md` | hilft beim Start und beim Sammeln deiner Ausgangslage |
| `failure-modes.md` | warnt vor typischen Fehlern, Datenschutzrisiken und falscher Automatisierung |

Wenn dein KI-System keine Dateien hochladen kann, oeffne die Dateien nacheinander und kopiere den Text in den Chat.

## 5. Erster Prompt: KI auf das Modell einstellen

Nachdem du die Startdateien hochgeladen oder eingefuegt hast, schreibe diesen Prompt:

```text
Ich moechte das hochgeladene KI-Online-Marketing-Beratungsmodell auf meine eigene Situation anwenden.

Bitte lies zuerst die Dateien:
- model.md
- application-guide.md
- worksheet/01-erstgespraech-anamnese.md
- failure-modes.md

Erklaere mir danach in einfachen Worten:
1. Was dieses Modell fuer mich leisten kann.
2. Welche Informationen du von mir brauchst.
3. Welche Daten ich nicht eingeben darf.
4. Wie wir Schritt fuer Schritt starten.

Stelle mir danach maximal 8 einfache Fragen, damit wir Phase 1: Orientierung & Anamnese ausfuellen koennen.
```

Dann wartet die KI wahrscheinlich mit Fragen auf dich.

## 6. Phase 1 ausfuellen: Orientierung & Anamnese

Beantworte die Fragen der KI so einfach wie moeglich.

Du kannst diese Vorlage nutzen:

```text
Unser Unternehmen:

Branche:
Anzahl Mitarbeitende:
Was wir anbieten:
Unsere wichtigsten Kunden:
Unsere aktuellen Marketingkanaele:
Was aktuell nicht gut funktioniert:
Was wir mit Online-Marketing erreichen wollen:
Wie viel Zeit wir pro Woche investieren koennen:
Was die KI auf keinen Fall verwenden oder behaupten darf:
```

Wenn du etwas nicht weisst, schreibe:

```text
Das weiss ich noch nicht.
```

Das ist besser als zu raten.

## 7. Ergebnis von Phase 1 pruefen

Bitte die KI danach:

```text
Fasse meine Angaben als ausgefuelltes Worksheet 01 zusammen.

Bitte nutze diese Struktur:
1. Unternehmensprofil
2. Zielgruppe
3. aktueller Online-Marketing-Stand
4. Hauptproblem
5. Zielbild
6. No-Gos und ausgeschlossene Daten
7. offene Fragen

Markiere alle Annahmen klar als Annahme.
```

Pruefe dann:

- Hat die KI dein Unternehmen richtig verstanden?
- Stimmen Zielgruppe und Angebot?
- Ist das Hauptproblem richtig?
- Sind verbotene Daten klar ausgeschlossen?
- Hat die KI etwas erfunden?

Wenn etwas falsch ist, schreibe:

```text
Bitte korrigiere Punkt X. Richtig ist: ...
```

## 8. Zweites Dateipaket: Use Case auswaehlen

Wenn Phase 1 gut aussieht, lade oder kopiere diese Dateien:

1. `worksheet/02-use-case-auswahl.md`
2. `canvas/ki-marketing-routine-canvas.md`

Dann schreibe:

```text
Nutze jetzt worksheet/02-use-case-auswahl.md und das Canvas.

Hilf mir, 3 bis 5 moegliche KI-Use-Cases fuer mein Online-Marketing zu finden.

Bewerte jeden Use Case nach:
- Nutzen
- Aufwand
- Kosten
- Datenrisiko
- Kontrollbedarf

Empfiehl mir danach maximal 1 bis 3 kleine Pilot-Use-Cases.

Wichtig:
- keine echten Kundendaten,
- keine vollautomatische Veroeffentlichung,
- menschliche Pruefung bleibt Pflicht,
- kleine Schritte statt grosser Automation.
```

## 9. Use Cases verstehen

Die KI koennte zum Beispiel solche Use Cases vorschlagen:

- Social-Media-Posts vorbereiten,
- Google-Unternehmensprofil-Beitraege erstellen,
- haeufige Kundenfragen in FAQ umwandeln,
- Website-Texte verstaendlicher machen,
- Newsletter-Entwuerfe vorbereiten,
- Blogartikel-Briefings aus Kundenproblemen ableiten.

Waehle nicht sofort den spannendsten Use Case.

Waehle den Use Case, der:

- wenig Risiko hat,
- wenig Aufwand braucht,
- schnell getestet werden kann,
- wirklich Zeit spart,
- von einem Menschen leicht geprueft werden kann.

## 10. Dritter Prompt: Einen Pilot auswaehlen

Wenn die KI mehrere Use Cases vorgeschlagen hat, schreibe:

```text
Bitte empfiehl mir einen einzigen Pilot-Use-Case fuer den Start.

Begruende die Empfehlung einfach:
1. Warum dieser Pilot fuer mein Unternehmen sinnvoll ist.
2. Was die KI dabei genau macht.
3. Was der Mensch pruefen muss.
4. Welche Daten erlaubt sind.
5. Welche Daten ausgeschlossen sind.
6. Woran wir nach 4 Wochen erkennen, ob der Pilot hilft.
```

Wichtig:

Starte mit **einem** Pilot. Nicht mit fuenf.

## 11. Drittes Dateipaket: Pilot planen

Wenn ein Pilot ausgewaehlt ist, lade oder kopiere:

1. `worksheet/03-pilot-testprotokoll.md`
2. ein passendes Beispiel aus dem Ordner `examples/`

Nutze das Beispiel, das deinem Fall am naechsten kommt:

| Dein Fall | Passende Beispieldatei |
|---|---|
| lokale Sichtbarkeit, Google, Social Media | `examples/example-01.md` |
| Blogartikel aus Kundenproblemen | `examples/example-02-medienunternehmen-blogartikel.md` |
| Newsletter oder E-Mail-Folge | `examples/example-03-email-folge-leadmagnet.md` |

Dann schreibe:

```text
Nutze worksheet/03-pilot-testprotokoll.md und das passende Beispiel als Orientierung.

Erstelle fuer meinen ausgewaehlten Pilot ein Pilot-Testprotokoll.

Bitte enthalte:
1. Ziel des Piloten
2. erlaubte Eingabedaten
3. ausgeschlossene Daten
4. genaue KI-Aufgabe
5. menschliche Pruefpunkte
6. erwartetes Ergebnis
7. einfache Erfolgsmessung
8. Entscheidungskriterien: uebernehmen, anpassen oder verwerfen

Formuliere alles so, dass ein kleines Unternehmen es versteht.
```

## 12. Was du der KI als Material geben darfst

Geeignet:

- Link zur eigenen Website,
- oeffentlich sichtbare Website-Texte,
- allgemeine Beschreibung deiner Leistungen,
- Liste haeufiger Kundenfragen ohne Namen,
- alte Social-Media-Posts ohne personenbezogene Daten,
- grobe Zahlen, z. B. "ca. 10 Anfragen pro Monat",
- synthetische Beispielkunden,
- deine eigenen Notizen ohne Personenbezug.

Nicht geeignet:

- Export aus Newsletter-Tool,
- echte Kundennachrichten,
- CRM-Daten,
- Support-Tickets,
- Bestelldaten,
- vertrauliche Umsatzzahlen,
- interne Kundendokumente.

Wenn du unsicher bist, frage die KI:

```text
Ich bin unsicher, ob diese Information datenschutzarm genug ist. Bitte pruefe, ob ich sie verwenden darf. Wenn nicht, schlage eine sichere, abstrahierte Formulierung vor.
```

## 13. Einen KI-Output erzeugen lassen

Jetzt darf die KI einen ersten Entwurf machen.

Beispiel fuer Social Media:

```text
Erstelle auf Basis unseres Pilot-Testprotokolls 3 Entwuerfe fuer Google-Unternehmensprofil-Beitraege und 3 Social-Media-Captions.

Nutze nur die erlaubten Informationen.
Erfinde keine Fakten.
Mache keine falschen Versprechen.
Markiere Annahmen.
Schreibe am Ende eine Pruefliste, was ein Mensch vor Veroeffentlichung kontrollieren muss.
```

Beispiel fuer Blogartikel:

```text
Erstelle auf Basis unserer abstrahierten Kundenprobleme 3 Blogartikel-Ideen und ein Artikelbriefing.

Nutze keine personenbezogenen Daten.
Erfinde keine fachlichen Loesungen.
Markiere Punkte, die durch eine Fachperson geprueft werden muessen.
```

Beispiel fuer Newsletter:

```text
Erstelle eine 5-teilige E-Mail-Folge als Entwurf.

Nutze keine echten Newsletterdaten.
Formuliere hilfreich, nicht aufdringlich.
Markiere rechtliche oder datenschutzbezogene Punkte, die vor Versand geprueft werden muessen.
```

## 14. Menschliche Pruefung: Was du kontrollieren musst

Bevor du irgendetwas veroeffentlichst oder nutzt, pruefe:

- Stimmen alle Fakten?
- Passt die Sprache zu deinem Unternehmen?
- Sind keine personenbezogenen Daten enthalten?
- Gibt es keine falschen Versprechen?
- Sind Quellen oder Aussagen plausibel?
- Ist klar, wer freigibt?
- Ist das Ergebnis fuer Kunden verstaendlich?
- Gibt es rechtliche oder datenschutzrechtliche Fragen?

Wenn etwas unklar ist, nicht veroeffentlichen.

## 15. Pilot 4 Wochen testen

Ein Pilot sollte klein und zeitlich begrenzt sein.

Beispiel:

```text
Wir testen 4 Wochen lang eine woechentliche Content-Routine.
```

Dokumentiere jede Woche:

- Was wurde erstellt?
- Wer hat geprueft?
- Wurde etwas veroeffentlicht?
- Wie lange hat es gedauert?
- Was war brauchbar?
- Was musste angepasst werden?
- Gab es Risiken oder Fehler?

## 16. Nach 4 Wochen bewerten

Nutze diesen Prompt:

```text
Ich gebe dir jetzt meine Beobachtungen aus 4 Wochen Pilot.

Bitte bewerte den Pilot nach dem Modell:
1. positiv validierbar,
2. nachbearbeitbar,
3. negativ / nicht nutzbar.

Bitte begruende die Bewertung einfach.
Empfiehl danach:
- uebernehmen,
- anpassen,
- oder verwerfen.

Erstelle ausserdem eine kurze Liste, was wir beim naechsten Durchlauf verbessern sollten.
```

Bewerte ehrlich.

Ein Pilot darf auch scheitern. Das ist besser, als eine schlechte Routine dauerhaft zu nutzen.

## 17. Was du speichern solltest

Speichere am Ende:

- ausgefuelltes Worksheet 01,
- Use-Case-Bewertung aus Worksheet 02,
- Pilot-Testprotokoll,
- KI-Entwuerfe,
- menschliche Pruefnotizen,
- Entscheidung nach 4 Wochen,
- Verbesserungsnotizen.

Du kannst die Ergebnisse als Markdown, Word-Datei oder PDF speichern.

## 18. Einfacher Gesamt-Ablauf

```text
1. Neuen KI-Chat oeffnen
2. model.md, application-guide.md, worksheet 01 und failure-modes.md laden
3. Phase 1 mit der KI ausfuellen
4. worksheet 02 und Canvas laden
5. 1 bis 3 Use Cases bewerten
6. genau einen Pilot auswaehlen
7. worksheet 03 und passendes Beispiel laden
8. Pilot-Testprotokoll erstellen
9. KI-Entwurf erzeugen lassen
10. Menschlich pruefen
11. 4 Wochen klein testen
12. Ergebnis bewerten
13. Routine uebernehmen, anpassen oder verwerfen
```

## 19. Notfallregeln fuer Anfaenger

Wenn du unsicher bist, nutze diese Regeln:

1. Keine echten Kundendaten in die KI.
2. Keine automatische Veroeffentlichung.
3. Immer klein starten.
4. Immer menschlich pruefen.
5. Keine rechtlichen Aussagen von der KI als Wahrheit uebernehmen.
6. Lieber nachfragen als raten.
7. Lieber einen Pilot sauber testen als zehn Ideen anfangen.

## 20. Abschluss-Prompt fuer deinen KI-Chat

Wenn du den ganzen Prozess durchlaufen hast, kannst du am Ende schreiben:

```text
Bitte fasse unseren gesamten Prozess zusammen:

1. Ausgangslage
2. gewaehlter Use Case
3. erlaubte und ausgeschlossene Daten
4. KI-Routine
5. menschliche Pruefpunkte
6. Testergebnis
7. Entscheidung
8. naechste Verbesserung

Formuliere das als kurzes internes Protokoll fuer ein kleines Unternehmen.
```

## 21. Wichtigster Merksatz

Dieses Modell ist kein Zauberknopf.

Es hilft dir, mit KI nicht chaotisch, sondern kontrolliert zu arbeiten:

```text
Verstehen -> vorbereiten -> klein testen -> pruefen -> verbessern
```
