# Pre-Sales Clarity Kit

## Kurzbeschreibung

Das **Pre-Sales Clarity Kit** hilft, unklare Kundenanfragen in eine strukturierte Grundlage für Rückfragen, Erstgespräch und spätere Angebotsvorbereitung zu verwandeln.

Es erstellt kein finales Angebot und keine verbindliche Preis-, Datenschutz-, Rechts-, Steuer-, Finanz- oder Vertragsbewertung.

## Nutzung in ChatGPT

1. Neuen Chat öffnen.
2. Diese fünf Dateien hochladen oder einfügen:
   - `prompt.md`
   - `context/nutzerprofil.md`
   - `context/pre-sales-briefing-framework.md`
   - `context/anfragequalifizierungs-checkliste.md`
   - `context/html-aktionsdashboard-styleguide.md`
3. Diese Startnachricht senden:

```text
Bitte führe den Prompt aus und nutze die mitgelieferten Kontextdateien. Die Kundenanfrage füge ich im nächsten Schritt ein.
```

4. Die kurze Startantwort abwarten.
5. Bereinigte Kundenanfrage einfügen.
6. Zuerst das HTML-Dashboard prüfen, danach bei Bedarf die Detailanalyse lesen.

Die weiteren Dateien müssen für den Prompt-Lauf nicht hochgeladen werden. Sie dokumentieren Quellenlage, Lizenz, Nutzung, Bewertung und Grenzen.

## Was Nutzer anpassen

Nur `context/nutzerprofil.md`.

Dort können angepasst werden:

- Unternehmensname und Unternehmenstyp,
- eigene Leistungen,
- Leistungsgrenzen,
- typische passende und unpassende Anfragen,
- gewünschter Output,
- Tonalität,
- Antwortmail-Stil.

In `context/nutzerprofil.md` ist dafür der Abschnitt **1. Unternehmensprofil - bitte anpassen** vorgesehen. Die allgemeinen Regeln darunter sind neutral formuliert und müssen normalerweise nicht geändert werden.

Der Prompt selbst wird nicht angepasst.

### Nutzerprofil komfortabel ausfüllen

Das mitgelieferte Werkzeug `tools/nutzerprofil-erstellen.html` öffnen Sie einfach im Browser. Dort füllen Sie alle Felder aus und laden das fertige Nutzerprofil als `nutzerprofil.md` herunter. Alle Daten werden lokal verarbeitet – keine Daten werden übertragen.

Ein vollständig ausgefülltes Beispiel finden Sie in `examples/nutzerprofil-beispiel.md`.

## Datenschutz

Vor dem Einfügen echter Kundenanfragen unnötige personenbezogene, vertrauliche oder sensible Daten entfernen oder anonymisieren.

Die KI-Ausgabe ersetzt keine fachliche, datenschutzrechtliche oder rechtliche Kontrolle.

Bei sensiblen, regulierten oder entscheidungsnahen Anfragen muss die Ausgabe besonders kritisch geprüft werden. Dazu zählen insbesondere personenbezogene Daten, interne Kundendaten, HR-/Bewerbungsthemen, Gesundheit, Recht, Compliance, Finanzen, Steuern und Bildung.

Human Review erfolgt mindestens durch die bearbeitende Person. Bei fachlichen, datenschutzrechtlichen, rechtlichen, finanziellen, HR-nahen oder anderen risikobehafteten Fällen ist zusätzlich die fachlich verantwortliche Stelle im Unternehmen einzubeziehen.

## Projektdateien

| Datei | Zweck |
|---|---|
| `README.md` | Überblick und Nutzung. |
| `metadata.yml` | Metadaten, Risiko- und Nutzungshinweise. |
| `prompt.md` | Direkt ausführbarer Prompt. |
| `sources.md` | Quellen- und Datenlage. |
| `license.md` | Lizenzklärung. |
| `usage.md` | Ausführlichere Anwendungshinweise. |
| `evaluation.md` | Kriterien zur Kontrolle der Ausgabe. |
| `failure-modes.md` | Typische Fehlerbilder und Grenzen. |
| `examples/input-01.md` | Testlauf 1: passende Anfrage (Ampel Gelb). |
| `examples/output-01.md` | Testlauf 1: vollständiger Output inkl. HTML-Dashboard. |
| `examples/input-02.md` | Testlauf 2: fachfremde Anfrage (Ampel Rot). |
| `examples/output-02.md` | Testlauf 2: Abgrenzung und Antwortmail. |
| `examples/nutzerprofil-beispiel.md` | Ausgefülltes Beispielprofil aus Testlauf (fiktiv). |
| `tools/nutzerprofil-erstellen.html` | Lokales Formular zum Ausfüllen des Nutzerprofils. |
| `TESTPROTOKOLL.md` | Dokumentation beider Testläufe mit Bewertung. |

## Dateien für die Nutzung

Diese vier Dateien werden zusammen mit `prompt.md` genutzt:

| Datei | Zweck |
|---|---|
| `context/nutzerprofil.md` | Dauerhafte Angaben zu Leistung, Output, Grenzen und Tonalität. |
| `context/pre-sales-briefing-framework.md` | Fachlicher Klärungsrahmen. |
| `context/anfragequalifizierungs-checkliste.md` | Informationsfelder und Sicherheitscheck. |
| `context/html-aktionsdashboard-styleguide.md` | Vorgaben für das kompakte HTML-Dashboard. |
