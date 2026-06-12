# Beispielinput 01

## Zweck

Dieser Beispielinput zeigt einen realistischen Testlauf mit einer gut verständlichen, aber noch nicht angebotsreifen Kundenanfrage.

Der Test prüft, ob das Pre-Sales Clarity Kit:

- den Leistungsfit zur im Nutzerprofil beschriebenen Leistung korrekt erkennt,
- die Anfrage nicht überinterpretiert,
- keine Preise, Fristen oder Zusagen erfindet,
- fehlende Informationen sichtbar macht,
- Rückfragen priorisiert,
- eine kurze Antwortmail ohne langes Rebriefing vorbereitet,
- ein kompaktes HTML-Dashboard erzeugt.

**Erwartetes Ergebnis:** Ampel Gelb – passende Anfrage, Rückfragen nötig, kein finales Angebot.

## Verwendetes Nutzerprofil

`examples/nutzerprofil-beispiel.md` (Malermeister Muster GmbH, Stuttgart)

## Startablauf

Zuerst werden diese Dateien geladen:

- `prompt.md`
- `context/nutzerprofil.md` (eigenes oder Beispielprofil)
- `context/pre-sales-briefing-framework.md`
- `context/anfragequalifizierungs-checkliste.md`
- `context/html-aktionsdashboard-styleguide.md`

Dann wird diese Startnachricht gesendet:

```text
Bitte führe den Prompt aus und nutze die mitgelieferten Kontextdateien. Die Kundenanfrage füge ich im nächsten Schritt ein.
```

Erwartete erste Antwort:

```text
Der Arbeitskontext ist ausreichend. Bitte fügen Sie jetzt die bereinigte Kundenanfrage ein.

Bitte entfernen oder anonymisieren Sie vor dem Einfügen unnötige personenbezogene, vertrauliche, sensible oder interne Informationen. Die KI-Ausgabe ersetzt keine fachliche, datenschutzrechtliche oder rechtliche Kontrolle.
```

## Kundenanfrage

Danach wird diese bereinigte Kundenanfrage eingefügt:

```text
Guten Tag,

wir möchten unsere Büroräume in Stuttgart-Mitte renovieren lassen und bitten um ein Angebot.

Es handelt sich um ca. 160 m² Bürofläche mit 6 Büroräumen, einem Besprechungsraum, Flur und kleinem Empfangsbereich. Die Wände sollen überwiegend weiß gestrichen werden, im Empfangsbereich wünschen wir uns eventuell eine farbige Akzentwand. Kleinere Bohrlöcher und Gebrauchsspuren müssten vorher ausgebessert werden.

Die Arbeiten sollten möglichst innerhalb der nächsten 4 bis 6 Wochen stattfinden. Da unser Büro werktags genutzt wird, wäre auch eine Ausführung am Wochenende oder abschnittsweise interessant.

Können Sie uns mitteilen, welche Informationen Sie für ein Angebot benötigen und ob ein Besichtigungstermin sinnvoll wäre?

Freundliche Grüße
```
