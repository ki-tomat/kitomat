# Beratungsmodell zur KI-Hardware-Bedarfsanalyse

## Kurzbeschreibung

Dieses Modell hilft KMU und beratenden Personen, KI-Vorhaben vor einer Hardware- oder Architekturentscheidung strukturiert zu klaeren. Es fuehrt von Nutzungsszenario, Datenlage, Betriebsmodell, Governance-Anforderungen, Parallelitaet und Budget zu einer begruendeten Hardware-Zielklasse, einer vorlaeufigen Architektur-Empfehlung, offenen Prueffragen und einem naechsten sinnvollen Entscheidungsschritt.

Das Modell kann manuell, in einem Beratungsgespraech, in einem Workshop oder unterstuetzend durch agentische KI genutzt werden.

## Ziel des Modells

Ziel des Modells ist es, KI-Hardwareentscheidungen nicht mit Geraetelisten oder Einzelprodukten zu beginnen, sondern mit einer nachvollziehbaren Bedarfsanalyse.

Das Modell soll helfen:

- den tatsaechlichen KI-Einsatz zu verstehen,
- technische, organisatorische und regulatorische Anforderungen sichtbar zu machen,
- Fehlkaeufe und Ueberdimensionierung zu vermeiden,
- lokale, hybride und cloudbasierte Optionen vergleichbar zu machen,
- Risiken und offene Punkte vor einer Beschaffung zu dokumentieren,
- eine vorlaeufige Hardware- oder Architektur-Empfehlung vorzubereiten.

## Zielgruppe

Das Modell richtet sich an:

- Geschaeftsfuehrungen und Inhaberinnen/Inhaber von KMU,
- IT-Verantwortliche in kleinen und mittleren Unternehmen,
- KI-Beraterinnen und KI-Berater,
- Projektleitungen fuer KI-Einfuehrungen,
- Fachbereiche, die KI-Anwendungen vorbereiten,
- technische Dienstleister im Discovery- oder Pre-Sales-Prozess.

## Typische Einsatzsituation

Das Modell wird genutzt, wenn ein KI-Vorhaben geplant ist, aber die passende technische Umgebung noch unklar ist.

Typische Situationen sind:

- ein KMU moechte lokale oder hybride KI-Nutzung pruefen,
- ein Team ueberlegt, ob vorhandene Hardware ausreicht,
- Datenschutz oder Vertraulichkeit sprechen gegen eine reine Cloud-Nutzung,
- mehrere Hardwareoptionen stehen im Raum,
- ein Beratender soll eine erste Empfehlung vorbereiten,
- ein KI-Agent soll ein Beratungsgespraech strukturiert unterstuetzen.

## Benoetigte Eingaben

Fuer die Anwendung des Modells werden mindestens folgende Informationen benoetigt:

- kurze Beschreibung des KI-Vorhabens,
- Organisationstyp, Branche und ungefaehre Nutzerzahl,
- Haupt- und Nebenzwecke der KI-Nutzung,
- Datenarten und Datenschutzanforderungen,
- gewuenschtes Betriebsmodell: Cloud, lokal, On-Premise oder hybrid,
- Workload-Typ: Text, RAG, Coding, Medien, Automatisierung oder Fine-Tuning,
- Parallelitaet und erwartetes Lastprofil,
- vorhandene IT, Betriebsreife und Administrationsfaehigkeit,
- Budgetrahmen und Budgetlogik,
- Must-haves, No-Gos und offene Randbedingungen.

## Modelllogik im Ueberblick

Das Modell folgt dieser Grundlogik:

1. Nutzungsszenario verstehen
2. Bedarfe strukturiert aufnehmen
3. Anforderungen auf Bewertungsachsen einordnen
4. passende Zielklasse ableiten
5. Risiken und offene Punkte pruefen
6. vorlaeufige Hardware- oder Architektur-Empfehlung formulieren
7. naechsten Entscheidungsschritt dokumentieren

Die zentrale Leitfrage lautet:

Welche Architektur erfuellt Use Case, Datenrealitaet, Betriebsmodell und Budget mit dem geringsten Fehlentscheidungsrisiko?

## Modellschritte

### Schritt 1: Nutzungsszenario beschreiben

Die geplante KI-Nutzung wird in einfachen Worten beschrieben. Im Mittelpunkt stehen Aufgabe, Nutzergruppe, gewuenschtes Ergebnis und erwarteter Nutzen.

### Schritt 2: Datenlage und Governance klaeren

Es wird geprueft, welche Daten verarbeitet werden, ob personenbezogene oder vertrauliche Informationen betroffen sind und welche Anforderungen an Zugriff, Logging, Rollen, Freigaben oder Nachvollziehbarkeit bestehen.

### Schritt 3: Workload und Lastprofil einordnen

Das Modell unterscheidet zwischen verschiedenen Lasttypen, zum Beispiel Textassistenz, Dokumentenanalyse, RAG, Coding, Bild-/Video-Workflows, lokaler Inferenz, Fine-Tuning oder Mehrnutzerbetrieb.

### Schritt 4: Betrieb, Budget und Rahmenbedingungen pruefen

Es wird geklaert, welche technische Reife vorhanden ist, wer das System betreiben kann, welcher Formfaktor passt, wie laut oder mobil die Loesung sein darf und welcher Budgetrahmen realistisch ist.

### Schritt 5: Bewertungsachsen einschaetzen

Das Vorhaben wird entlang der Bewertungsachsen eingeordnet. Die Einschaetzung dient nicht als starres Rechenmodell, sondern als strukturierte Entscheidungshilfe.

### Schritt 6: Hardware-Zielklasse ableiten

Aus den Eingaben und Bewertungsachsen wird eine vorlaeufige Zielklasse abgeleitet. Bei Unsicherheit werden mehrere moegliche Zielklassen genannt und die offenen Punkte dokumentiert.

### Schritt 7: Empfehlung, offene Punkte und naechsten Schritt dokumentieren

Am Ende werden Hardwaretendenz, Betriebsmodell, Risiken, offene Prueffragen und der naechste sinnvolle Schritt festgehalten. Konkrete Produkte werden nur empfohlen, wenn Zielbild, Budget, Betriebsmodell und aktuelle Quellen ausreichend geklaert sind.

## Bewertungsachsen

Das Modell nutzt neun Bewertungsachsen:

1. Compute-/GPU-Druck: Wie stark sind GPU-Leistung, CUDA, Rendering, Medienproduktion oder schnelle lokale Inferenz relevant?
2. Speicher-/Modellgroessendruck: Wie wichtig sind RAM, Unified Memory, VRAM, grosse lokale Modelle, lange Kontexte oder RAG?
3. Datenschutz- und Datenkritikalitaet: Wie sensibel sind die verarbeiteten Daten und wie stark beeinflusst das die Architektur?
4. Governance- und Auditbedarf: Welche Anforderungen bestehen an Rollen, Freigaben, Logging, Nachvollziehbarkeit oder kontrollierten Betrieb?
5. Parallelitaets- und Mehrnutzerdruck: Wie viele Personen oder Prozesse greifen gleichzeitig auf die KI-Umgebung zu?
6. Betriebs- und Adminreife: Wie gut kann das Unternehmen lokale oder hybride KI-Systeme betreiben, warten und absichern?
7. Mobilitaet, Lautstaerke und Arbeitsplatzrealitaet: Welche Anforderungen bestehen an Formfaktor, Geraeuschentwicklung, Energiebedarf und Mobilitaet?
8. Budgetstaerke: Welcher Investitions- oder Betriebskostenrahmen ist realistisch?
9. Zukunfts- und Ausbaupfad: Soll die Loesung nur ein Pilot sein oder mittelfristig wachsen, mehrere Nutzer bedienen oder komplexere Workloads tragen?

## Zielklassen

Das Modell unterscheidet sechs Zielklassen.

### Klasse 1: Browser-/Cloud-Arbeitsplatz

Geeignet fuer einfache Wissensarbeit, Recherche, Textassistenz, Beratung und geringe lokale Anforderungen. Der Schwerpunkt liegt auf schneller Nutzbarkeit und geringem Betriebsaufwand.

### Klasse 2: Leichter AI-PC

Geeignet fuer Office-nahe KI-Nutzung, kleinere lokale Modelle, Experimente, Demos und einfache lokale Assistenz. Diese Klasse ist ein Einstieg, aber keine Plattform fuer schwere lokale Workloads.

### Klasse 3: Lokaler Datenschutz- oder Shared-Memory-Knoten

Geeignet fuer sensible Daten, lokale Dokumentenanalyse, RAG, groessere lokale Modelle und kleine Teams. Der Schwerpunkt liegt auf Datenkontrolle, viel RAM oder Unified Memory und nachvollziehbarem Betrieb.

### Klasse 4: Prosumer-GPU-System

Geeignet fuer schnelle lokale Inferenz, Coding, Bildgenerierung, erste Medienworkflows und GPU-nahe Einzelplatznutzung. Diese Klasse ist staerker leistungsorientiert, aber noch nicht zwingend Enterprise-Betrieb.

### Klasse 5: Workstation / High-End-GPU-System

Geeignet fuer professionelle Medienproduktion, Fine-Tuning, Modelltests, CUDA-/Engineering-Workloads und anspruchsvolle lokale Entwicklung. Diese Klasse benoetigt hoehere Investition, Kuehlung, Strom und Betriebsdisziplin.

### Klasse 6: Forschungs-, Cluster- oder Hybrid-Modell

Geeignet fuer mehrere schwere Workloads, hohe Parallelitaet, verteilte Architekturen, strategische Skalierung oder gemischte lokale und cloudbasierte KI-Nutzung. Diese Klasse erfordert klare Betriebsverantwortung, Governance und Kostenkontrolle.

## Ergebnis des Modells

Das Ergebnis ist keine automatische Kaufentscheidung, sondern eine dokumentierte Entscheidungsgrundlage.

Am Ende sollten vorliegen:

- ausgefuelltes Bedarfsprofil,
- Einschaetzung der Bewertungsachsen,
- vorlaeufige Hardware-Zielklasse,
- Hardware- oder Architektur-Tendenz,
- Hinweise zu Software- und Betriebsmodell,
- zentrale Risiken,
- offene Prueffragen,
- naechster sinnvoller Entscheidungsschritt,
- Hinweis, ob konkrete Produktauswahl bereits sinnvoll ist.

## Nutzung mit agentischer KI

Das Modell kann durch agentische KI unterstuetzt werden. Ein Berater-Agent darf:

- Informationen aus Freitext strukturieren,
- Rueckfragen stellen,
- Annahmen als bestaetigt, plausibel abgeleitet oder offen kennzeichnen,
- Bewertungsachsen vorbereiten,
- eine vorlaeufige Zielklasse ableiten,
- Risiken und offene Punkte dokumentieren,
- eine Management- oder Beratungszusammenfassung vorbereiten.

Agentische KI darf jedoch keine finale Beschaffungsentscheidung, keine Rechtsberatung, keine Datenschutzfreigabe und keine verbindliche technische Freigabe ersetzen.

## Grenzen und Ausschluesse

Das Modell ist eine Beratungs- und Orientierungshilfe. Es ersetzt nicht:

- eine finale technische Beschaffungspruefung,
- konkrete Lieferantenangebote,
- aktuelle Preis- und Verfuegbarkeitspruefung,
- Rechtsberatung,
- Datenschutzpruefung,
- AI-Act-Einstufung,
- IT-Sicherheitsaudit,
- fachliche Freigabe durch verantwortliche Personen.

Konkrete Produktempfehlungen sind nur sinnvoll, wenn Zielklasse, Budget, Betriebsmodell, Lastprofil und aktuelle Quellen ausreichend geklaert sind.

## Disclaimer

Dieses Modell dient der strukturierten Vorpruefung und Entscheidungsunterstuetzung. Es ist keine Rechtsberatung, keine Datenschutzfreigabe, kein Audit und keine verbindliche Kaufempfehlung. Vor produktiver Nutzung oder Beschaffung muessen Kontext, Daten, Quellen, technische Anforderungen und Ergebnisse durch verantwortliche Personen geprueft werden.
