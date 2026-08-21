# 04 - Datensaetze und Downloads

## Grundregel

Kleine Beispiele bleiben im Repo. Groessere Dateien werden als GitHub Release Assets bereitgestellt.

Das haelt das Repo leicht, reviewfaehig und sauber.

## Direkt ins Repo duerfen

- kleine Markdown-Beispiele
- kleine synthetische Beispieldaten
- Quellenlisten
- Checklisten
- Vorlagen
- kurze eigene Zusammenfassungen
- Metadaten
- Nutzungshinweise

## Als GitHub Release Asset

Groessere Dateien:

- `.zip`
- `.csv`
- `.xlsx`
- `.pdf`
- `.docx`
- mehrere MB grosse Datensatzpakete
- gebuendelte Quellen- oder Beispielpakete

## Pflichtinfos fuer jedes Download-Paket

Dokumentiere:

- Dateiname
- Version
- Dateigroesse
- SHA-256-Pruefsumme
- Download-URL
- Lizenz
- Lizenzstatus
- Quellenstatus
- Datenrisiko
- menschlicher Review-Status

## Was ist eine SHA-256-Pruefsumme?

Eine Pruefsumme ist ein digitaler Fingerabdruck einer Datei. Damit kann man spaeter pruefen, ob eine Datei veraendert wurde.

Beispiel:

```bash
shasum -a 256 dateiname.zip
```

## Nicht veroeffentlichen

Keine Downloads mit:

- echten personenbezogenen Daten
- Kundendaten
- internen Dokumenten
- Gesundheitsdaten
- vertraulichen Finanzdaten
- Bewerbungsunterlagen echter Personen
- unklarer Herkunft
- unklarem Lizenzstatus
- kopierten Volltexten ohne klare Rechte

## Was mache ich als Teilnehmer?

Wenn du groessere Dateien hast:

1. Datei nicht direkt ins Repo committen.
2. In deinem Paket beschreiben, was die Datei enthaelt.
3. Herkunft, Lizenz und Datenrisiko dokumentieren.
4. Dozent/Maintainer entscheidet nach Review, ob sie als Release Asset hochgeladen wird.

