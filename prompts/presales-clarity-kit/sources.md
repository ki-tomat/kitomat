# Sources

## Zweck

Diese Datei dokumentiert die Quellen- und Datenlage des Pre-Sales Clarity Kit.

Sie soll transparent machen, ob externe Quellen, echte Daten oder synthetische Beispiele verwendet wurden.

## Quellenstatus

`sources_status: provided`

Die Quellenlage ist in dieser Datei dokumentiert.

## Verwendete Quellen

Für die fachlichen Inhalte des Prompt-Pakets wurden keine externen Fachquellen, keine Kundendaten und keine fremden Volltexte verwendet.

Die Inhalte wurden als eigenes Prompt-, Kontext- und Bewertungsartefakt erstellt.

## Paketstruktur und Qualitätsanforderungen

Das Paket folgt diesen Qualitätsgrundsätzen:

- Pflichtdateien eines Prompt-Pakets: `prompt.md`, `README.md`, `metadata.yml`, `evaluation.md`, `failure-modes.md` und Beispiel-Dateien,
- klare Trennung zwischen Prompt, Kontextdateien, Beispielen und Werkzeugen,
- fiktive Testdaten statt echter Kunden- oder Personendaten,
- Human Review bei fachlichen, datenschutzrechtlichen, rechtlichen oder risikobehafteten Fällen.

## Testbasierte Beispiele

Die Beispieldateien im Ordner `examples/` basieren auf echten Testläufen des Pakets:

- `examples/nutzerprofil-beispiel.md`: Fiktives Beispielprofil (Malermeister Muster GmbH, Stuttgart), erstellt über das mitgelieferte WebUI-Formular und für beide Testläufe eingesetzt.
- `examples/input-01.md` + `examples/output-01.md`: Testlauf 1 – passende Anfrage, Ampel Gelb (Bürorenovierung).
- `examples/input-02.md` + `examples/output-02.md`: Testlauf 2 – fachfremde Anfrage, Ampel Rot (Badsanierung).

Alle Namen, Unternehmen und Beispiele sind fiktiv. Personenbezogene Daten aus den Testläufen wurden entfernt oder anonymisiert. Testergebnisse sind in `TESTPROTOKOLL.md` dokumentiert.

## Nicht enthalten

Das Paket enthält nicht:

- echte Kundenanfragen,
- personenbezogene Echtdaten,
- interne Unternehmensdaten,
- echte CRM-Notizen,
- Bewerbungsdaten,
- Gesundheitsdaten,
- Zugangsdaten,
- vertrauliche Finanzdaten,
- kopierte fremde Fachtexte,
- Wettbewerbermaterial,
- Screenshots aus internen Systemen,
- ungeprüfte Testimonials.

## Professionelle Einordnung

Das Paket ist eine Arbeits- und Strukturierungshilfe.

Es ersetzt keine fachliche, datenschutzrechtliche, rechtliche, steuerliche, finanzielle oder vertragliche Prüfung.

Bei echten Daten oder regulierten Kontexten ist Human Review erforderlich.

Wenn Nutzer im eigenen Einsatz Fremdtexte, Wettbewerbermaterial, Screenshots, Testimonials, Bilder oder interne Materialien einfügen, müssen Herkunft, Nutzungsrechte, Einwilligungen, Vertraulichkeit und interne Freigaben außerhalb des Prompt-Pakets geprüft werden.
