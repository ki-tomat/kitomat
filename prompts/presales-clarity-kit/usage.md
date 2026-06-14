# Usage

## Zweck

Diese Datei beschreibt die professionelle Nutzung des Pre-Sales Clarity Kit.

Sie ergänzt die kurze Anleitung in `README.md`.

## Kurzablauf in ChatGPT

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
6. Zuerst das HTML-Dashboard prüfen.
7. Danach bei Bedarf die Detailanalyse lesen.
8. Vor Versand oder Angebotsableitung durch die bearbeitende Person und bei Bedarf durch die fachlich verantwortliche Stelle im Unternehmen prüfen lassen.

## Welche Dateien müssen für den Prompt-Lauf hochgeladen werden?

Für den eigentlichen Prompt-Lauf werden nur diese Dateien benötigt:

| Datei | Zweck |
|---|---|
| `prompt.md` | Führt die Analyse aus. |
| `context/nutzerprofil.md` | Beschreibt Unternehmen, Leistungen, Grenzen und Tonalität. |
| `context/pre-sales-briefing-framework.md` | Gibt den fachlichen Strukturierungsrahmen. |
| `context/anfragequalifizierungs-checkliste.md` | Definiert Informationsfelder und Sicherheitscheck. |
| `context/html-aktionsdashboard-styleguide.md` | Steuert das kompakte Dashboard. |

## Welche Dateien müssen nicht hochgeladen werden?

Diese Dateien dienen Dokumentation, Prüfung und Governance:

| Datei | Zweck |
|---|---|
| `README.md` | Überblick. |
| `metadata.yml` | Metadaten und Risikoangaben. |
| `sources.md` | Quellen- und Datenlage. |
| `license.md` | Lizenzklärung. |
| `usage.md` | Anwendungshinweise. |
| `evaluation.md` | Bewertungskriterien für Outputs. |
| `failure-modes.md` | Typische Fehler und Grenzen. |
| `examples/input-01.md` | Beispielinput. |
| `examples/output-01.md` | Erwartungsbeispiel. |

## Was vor der Nutzung angepasst werden soll

Vor produktiver Nutzung soll in `context/nutzerprofil.md` vor allem der Abschnitt **1. Unternehmensprofil - bitte anpassen** bearbeitet werden.

- Unternehmensname,
- Unternehmenstyp,
- Kurzprofil,
- Leistungen,
- Nicht-Leistungen,
- Zielkunden,
- typische passende und unpassende Anfragen,
- Tonalität,
- Antwortmail-Stil.

Die allgemeinen Regeln darunter sind neutral formuliert und sollen normalerweise nicht geändert werden.

Der Prompt selbst soll normalerweise ebenfalls nicht angepasst werden.

## Datenschutz vor Eingabe

Vor dem Einfügen echter Kundenanfragen sollen unnötige Daten entfernt oder anonymisiert werden:

- Namen,
- E-Mail-Adressen,
- Telefonnummern,
- Kundennamen,
- vertrauliche Projektinformationen,
- Zugangsdaten,
- interne Kundendaten,
- CRM-Notizen,
- Bewerbungsdaten,
- Gesundheitsdaten,
- vertrauliche Finanzdaten.

## Verhalten bei Risikofällen

Bei sensiblen, vertraulichen oder regulierten Inhalten soll das Paket bremsen.

Besondere Vorsicht gilt bei:

- HR, Recruiting und Bewerberauswahl,
- Gesundheit, Pflege und Medizin,
- Recht, Datenschutz und Compliance,
- Finanzen, Krediten, Steuern und Versicherungen,
- Bildung, Prüfungen und Bewertung von Personen,
- diskriminierungsnahen oder entscheidungsnahen Anfragen.

In solchen Fällen darf die Ausgabe nicht als verbindliche Entscheidung, Beratung oder Angebotsfreigabe genutzt werden.

## Human Review praktisch

Human Review bedeutet: Die KI-Ausgabe wird vor Nutzung durch einen Menschen geprüft.

Verantwortlich ist mindestens die bearbeitende Person, die mit der Kundenanfrage arbeitet. Bei fachlichen, datenschutzrechtlichen, rechtlichen, finanziellen, HR-nahen oder anderen risikobehafteten Fällen muss zusätzlich die fachlich verantwortliche Stelle im Unternehmen eingebunden werden.

Beispiele:

- Projektleitung oder Vertrieb prüft Rückfragen und Antwortmail,
- Fachabteilung prüft fachliche Richtigkeit,
- Datenschutz- oder Rechtsverantwortliche prüfen sensible oder regulierte Fälle,
- Geschäftsführung oder Angebotsverantwortliche prüfen Angebotsnähe, Risiken und Freigaben.

Ohne diese Prüfung darf die Ausgabe nicht als freigegeben gelten.

## Fremdmaterial und Rechteklärung

Wenn Kunden Fremdtexte, Wettbewerberformulierungen, Screenshots, Testimonials, Bilder, interne Unterlagen oder sonstiges Material mit unklarer Herkunft einfügen, darf dieses Material nicht ungeprüft übernommen werden.

Die bearbeitende Person muss Herkunft, Nutzungsrechte, Einwilligungen, Vertraulichkeit und interne Freigaben klären. Bei Unsicherheit ist die fachlich verantwortliche Stelle einzubeziehen.

## Ergebnis verwenden

Die Ausgabe darf genutzt werden als:

- interne Arbeitsstruktur,
- Rückfragenliste,
- Erstgesprächsvorbereitung,
- nicht-bindende Angebotsvorbereitung,
- Entwurf einer kurzen Antwortmail.

Die Ausgabe darf nicht genutzt werden als:

- finales Angebot,
- verbindliche Preis- oder Aufwandsschätzung,
- rechtliche, datenschutzrechtliche, steuerliche oder finanzielle Beratung,
- Entscheidung über Personen,
- Ersatz für fachliche Kontrolle.
