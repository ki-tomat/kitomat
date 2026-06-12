# Application Guide: Beratungsmodell zur KI-Hardware-Bedarfsanalyse

## Zweck dieses Guides

Dieser Guide beschreibt, wie das Beratungsmodell zur KI-Hardware-Bedarfsanalyse praktisch angewendet wird. Er fuehrt durch Freitext-Einstieg, strukturierte Bedarfsaufnahme, Vorbefuellung des Worksheets, Bewertung der Matrix, Ableitung einer Zielklasse und Dokumentation der offenen Pruefpunkte.

Das Ergebnis ist eine Entscheidungsvorbereitung, keine finale Kauf- oder Freigabeentscheidung.

## Wann das Modell genutzt wird

Das Modell eignet sich fuer:

- fruehe Discovery vor einer Hardwarebeschaffung,
- Beratungsgespraeche mit KMU,
- Workshops mit Geschaeftsfuehrung, IT oder Fachbereichen,
- Vorqualifizierung eines KI-Vorhabens,
- Pruefung der Frage Cloud, lokal, On-Premise oder hybrid,
- Vorbereitung einer technischen Architekturentscheidung,
- kontrollierte Nutzung durch einen Berater-Agenten.

## Rollen und Verantwortlichkeiten

| Rolle | Verantwortung |
|---|---|
| KMU / Nutzer | Beschreibt Bedarf, Datenlage, Budget, Einschraenkungen und Zielbild |
| Beratende Person | Moderiert, erklaert Begriffe, dokumentiert Annahmen und offene Punkte |
| IT / Datenschutz / Recht / Einkauf | Prueft Spezialfragen vor produktiver Nutzung oder Beschaffung |
| Berater-Agent | Strukturiert Freitext, schlaegt Rueckfragen vor und bereitet die Matrix vor |
| Verantwortliche Person | Trifft finale Entscheidung und Freigabe |

## Grundprinzipien der Anwendung

- Nicht mit Geraeten beginnen.
- Erst Nutzungsszenario, dann Betriebsrealitaet, dann Technik.
- Unsicherheit ist normal.
- Freitext ist wertvoll.
- Annahmen muessen sichtbar markiert werden.
- Nie mehr als drei Rueckfragen gleichzeitig stellen.
- Hardware erst nennen, wenn das Zielbild stabil ist.
- Datenschutz, Governance und Betrieb gehoeren in die Erstaufnahme.

## Anwendungsmodi

### Modus A: Direkte Selbstausfuellung

Geeignet fuer technisch versierte Personen oder klare Szenarien. Die Person fuellt das Worksheet eigenstaendig aus und nutzt die Matrix zur ersten Einordnung.

### Modus B: Moderierte Ausfuellung

Geeignet fuer Beratungsgespraeche, Workshops, Geschaeftsfuehrung und Fachbereiche. Eine beratende Person fuehrt durch Fragen, erklaert Begriffe und dokumentiert Antworten.

### Modus C: Iterative Freitext-Ausarbeitung

Geeignet fuer unscharfe Ausgangslagen. Der Nutzer beschreibt sein Vorhaben frei. Danach werden fehlende Informationen schrittweise ergaenzt.

### Modus D: LLM- oder agentisch unterstuetzte Vorbefuellung

Geeignet, wenn ein Berater-Agent Freitext strukturiert, Annahmen markiert, Rueckfragen priorisiert und eine erste Zielklasse vorbereitet.

## Schritt-fuer-Schritt-Anwendung

### Schritt 1: Freitext-Einstieg aufnehmen

Beginne mit einer offenen Beschreibung.

Empfohlene Einstiegsfrage:

> Beschreiben Sie bitte in 5 bis 15 Saetzen, wofuer Sie KI konkret einsetzen moechten, mit welchen Daten Sie arbeiten, ob eher Text oder auch Bilder/Video/Audio relevant sind, ob lokale Verarbeitung wichtig ist und ob Sie allein oder im Team arbeiten.

### Schritt 2: Signale erfassen

Ordne die freie Beschreibung in Signalgruppen:

- Rolle und Umfeld
- Aufgabenprofil
- Daten und Datenschutz
- Modell- und Infrastrukturbedarf
- Medienlast
- Engineering-Tiefe
- Betriebs- und Supportreife
- Budget und Zukunftsplanung

### Schritt 3: Worksheet vorbefuellen

Trage die Antworten in die Bereiche A bis I des Worksheets ein:

- Organisations- und Nutzerprofil
- strategischer KI-Einsatz
- Daten, Datenschutz und Governance
- LLM- und Modellanforderungen
- Medien- und Kreativ-Workloads
- Infrastruktur, Formfaktor und Betrieb
- Budget und Betriebsmodell
- technische Reife und Software-Stack
- Prioritaeten, Must-haves und Ausschluesse

### Schritt 4: Offene Punkte markieren

Kennzeichne wichtige Informationen sichtbar:

| Status | Bedeutung |
|---|---|
| bestaetigt | Nutzer hat die Information ausdruecklich genannt |
| plausibel abgeleitet | Information wurde aus dem Szenario sinnvoll abgeleitet |
| offen | Information fehlt oder ist widerspruechlich |

### Schritt 5: Maximal drei Rueckfragen stellen

Stelle nie mehr als drei Rueckfragen in einem Block.

Prioritaet 1:

- Nutzen Sie KI primaer beruflich oder privat?
- Arbeiten Sie mit sensiblen oder personenbezogenen Daten?
- Haben Sie einen groben Budgetrahmen?

Prioritaet 2:

- Muessen Modelle lokal auf dem eigenen System laufen?
- Geht es nur um Text oder auch um Bild, Video oder Audio?
- Arbeiten Sie allein oder sollen mehrere Personen gleichzeitig zugreifen?

Prioritaet 3:

- Planen Sie mittelfristig Fine-Tuning, LoRA oder eigene Modellanpassungen?
- Haben Sie eine Betriebssystempraeferenz?
- Ist Mobilitaet wichtiger als maximale Leistung?

### Schritt 6: Bewertungsmatrix ausfuellen

Bewerte die neun Achsen mit 0 bis 3 Punkten. Begruende jede Bewertung kurz und markiere, ob sie bestaetigt, plausibel abgeleitet oder offen ist.

### Schritt 7: Zielklasse und Ampel ableiten

Leite aus der Matrix eine Zielklasse ab. Wenn mehrere Zielklassen plausibel sind, dokumentiere die bevorzugte Klasse und eine Alternative.

Setze ausserdem die Ampel fuer konkrete Produktauswahl:

- Gruen: konkrete Produktauswahl kann nach aktueller Quellenpruefung vorbereitet werden.
- Gelb: nur Hardwaretendenz nennen, offene Punkte dokumentieren.
- Rot: keine konkrete Hardware empfehlen, erst Rueckfragen und Pruefung dokumentieren.

### Schritt 8: Ergebnis dokumentieren

Dokumentiere:

- verdichtetes Bedarfsprofil,
- Matrixwerte und Begruendungen,
- Zielklasse und Alternative,
- Empfehlungstendenz,
- Risiken,
- offene Prueffragen,
- benoetigte externe Pruefung,
- naechsten sinnvollen Schritt.

## Nutzung mit agentischer KI

Ein Berater-Agent kann das Modell unterstuetzen, indem er:

- Freitext analysiert,
- Antworten fuer das Worksheet vorschlaegt,
- Annahmen kennzeichnet,
- Rueckfragen priorisiert,
- die Matrix vorbereitet,
- eine vorlaeufige Zielklasse ableitet,
- Risiken und offene Punkte dokumentiert,
- eine Management- oder Beratungszusammenfassung vorbereitet.

Der Agent darf keine finale Beschaffung, Rechtsbewertung, Datenschutzfreigabe oder technische Freigabe ersetzen.

Regeln fuer agentische Nutzung:

- Nie mehr als drei Rueckfragen gleichzeitig.
- Annahmen sichtbar markieren.
- Bei Gelb oder Rot keine konkreten Produkte nennen.
- Vor konkreter Hardwareauswahl aktuelle Quellen pruefen.
- Zielklasse, Architektur und Produktauswahl sauber trennen.

## Stopp- und Rueckfrage-Regeln

Keine konkrete Hardwareempfehlung geben, wenn:

- Budget unklar ist,
- Datenlage bei sensiblen Daten unklar ist,
- lokale vs. Cloud-Policy unklar ist,
- Nutzerzahl oder Parallelitaet kritisch, aber unbekannt ist,
- Workload widerspruechlich ist,
- Betrieb lokaler Systeme nicht verantwortet werden kann,
- rechtliche oder Datenschutzfragen offen sind.

Dann wird dokumentiert:

- Was ist bekannt?
- Was ist offen?
- Welche drei Fragen muessen zuerst geklaert werden?
- Welcher naechste Schritt ist sinnvoll?

## Ergebnispruefung

Vor Uebergabe des Ergebnisses pruefen:

- Zweck des KI-Vorhabens ist klar.
- Datenarten und Cloud-Policy sind dokumentiert.
- Pflichtbereiche A bis I im Worksheet sind zumindest grob gefuellt.
- Annahmen sind sichtbar als bestaetigt, plausibel abgeleitet oder offen markiert.
- Matrixwerte sind begruendet.
- Zielklasse und Alternative sind dokumentiert.
- Ampelstatus ist gesetzt.
- Bei Gelb oder Rot wurde keine konkrete Produktempfehlung gegeben.
- Bei Datenschutz, Governance oder KI-VO-Naehe wurde menschliche Pruefung genannt.
- Naechster Schritt ist klar.

## Uebergang zur Hardware- oder Architekturentscheidung

Moegliche naechste Schritte:

- offene Fragen mit IT, Datenschutz oder Recht klaeren,
- technische Shortlist vorbereiten,
- aktuelle Quellen und Preise pruefen,
- Anbieterangebote einholen,
- Pilotumgebung definieren,
- Workshop-Ergebnis durch verantwortliche Personen freigeben lassen.

Das Modell endet mit einer nachvollziehbaren Empfehlungstendenz und offenen Pruefpunkten, nicht mit einer automatischen Kaufentscheidung.
