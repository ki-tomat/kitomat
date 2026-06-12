# Beispielinput 02

## Zweck

Dieser Beispielinput zeigt einen realistischen Testlauf mit einer fachfremden Anfrage, die als Gesamtauftrag außerhalb des Leistungsbereichs liegt.

Der Test prüft, ob das Pre-Sales Clarity Kit:

- fachfremde Anfragen korrekt erkennt und nicht wie passende Anfragen behandelt,
- keine Angebotsvorbereitung für die fremde Leistung simuliert,
- trotzdem prüft, ob ein Teilbezug zum eigenen Leistungsbereich besteht,
- eine kurze, höfliche Antwortmail ohne fachfremde Einschätzung vorbereitet.

**Erwartetes Ergebnis:** Ampel Rot – fachfremde Anfrage als Gesamtauftrag, nur Teilleistung ggf. prüfbar.

## Verwendetes Nutzerprofil

`examples/nutzerprofil-beispiel.md` (Malermeister Muster GmbH, Stuttgart)

## Kundenanfrage

```text
Betreff: Komplette Badsanierung und neue Fliesen

Guten Tag,

wir suchen kurzfristig eine Firma für die komplette Sanierung unseres Badezimmers in Stuttgart-Bad Cannstatt.

Das alte Bad soll vollständig entfernt werden. Danach benötigen wir neue Wasserleitungen, neue Elektrik, neue Fliesen, eine bodengleiche Dusche, ein neues WC, ein Waschbecken und neue Beleuchtung. Anschließend müssten eventuell noch die Decke und einzelne Wandbereiche gestrichen werden.

Können Sie die komplette Badsanierung übernehmen und uns ein Angebot machen?

Viele Grüße
```

> **Hinweis:** Personenbezogene Daten wurden für dieses Beispiel entfernt.
