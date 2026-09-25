# Beispiel 01: Soloberaterin mit Hybrid-Strategie

## Hinweis zum Beispiel

Dieses Beispiel ist synthetisch und anonymisiert. Es enthaelt keine echten Kundendaten, keine personenbezogenen Daten und keine internen Unternehmensinformationen.

Das Beispiel zeigt, wie das Beratungsmodell aus einer freien Beschreibung eine Zielklasse, eine Empfehlungstendenz, offene Prueffragen und einen naechsten Schritt ableitet.

## Ausgangssituation

Eine selbststaendige Beraterin moechte ihre Arbeit mit KI skalieren. Sie arbeitet allein, nutzt bereits Cloud-KI-Dienste und moechte fuer sensible Zwischenstaende, lokale Tests und Workflow-Experimente ergaenzend lokal arbeiten.

Sie nutzt aktuell ein mobiles Notebook mit begrenztem Arbeitsspeicher. Sie moechte lokale Modelle ausprobieren, spaeter Workflows mit Automatisierung oder Agenten aufbauen und mittelfristig eine lokale Wissensbasis testen. Das Investitionsbudget ist begrenzt. Eine vollstaendige Offline-Pflicht besteht noch nicht, sensible Beratungszwischenstaende sollen aber kontrollierter verarbeitet werden.

## Verdichtetes Bedarfsprofil

- Einzelperson / Beratungskontext
- Hybrid-Nutzung: Cloud plus lokale Ergaenzung
- Fokus auf Text, Analyse, Wissensarbeit und Workflow-Experimente
- Datenschutz relevant, aber nicht zwingend vollstaendig offline
- keine Medienproduktion
- keine starke CUDA- oder Fine-Tuning-Anforderung
- leise, kompakte Loesung bevorzugt
- begrenztes Investitionsbudget
- Zukunftspfad mit Automatisierung, Agenten und lokaler Wissensbasis denkbar

## Auszug aus dem Worksheet

| Bereich | Feld | Vorschlag | Status | Begruendung |
|---|---|---|---|---|
| A Organisationsprofil | Organisationsgroesse | 1 Person | bestaetigt | Die Person arbeitet allein |
| B Strategischer Einsatz | Hauptzweck | Textassistenz, Analyse, Beratung, Workflow-Experimente | bestaetigt | Aus der Beschreibung abgeleitet |
| C Daten und Datenschutz | Datenarten | interne und potenziell sensible Beratungszwischenstaende | plausibel abgeleitet | Beratungsarbeit kann vertrauliche Inhalte enthalten |
| C Datenverarbeitung | Betriebsmodell | hybrid | bestaetigt | Cloud wird genutzt, lokale Ergaenzung ist gewuenscht |
| D Modellanforderungen | Modellgroesse | kleine bis mittlere lokale Modelle, offen fuer spaetere Erweiterung | plausibel abgeleitet | Es geht um lokale Tests und Wissensbasis, nicht um Training |
| E Medienworkloads | Medien relevant | nein | bestaetigt | Keine Bild-, Video- oder Audiolast genannt |
| F Infrastruktur | Formfaktor | kompakt und leise | bestaetigt | Ergaenzung zum mobilen Arbeiten gewuenscht |
| G Budget | Budgetrahmen | begrenzt | bestaetigt | Investitionsbudget ist begrenzt |
| H Technische Reife | Betriebskomplexitaet | einfache lokale Tools bevorzugt | plausibel abgeleitet | Kein Plattformbetrieb genannt |
| I Zukunftspfad | Ausbau | Workflows, Agenten, lokale Wissensbasis | bestaetigt | Mittelfristiger Ausbau ist beschrieben |

## Bewertungsmatrix

| Achse | Wert | Begruendung | Status |
|---|---:|---|---|
| Compute-/GPU-Druck | 1 | Keine Medienproduktion, kein Fine-Tuning, keine CUDA-Pflicht | bestaetigt |
| Speicher-/Modellgroessendruck | 2 | Lokale Modelle, Wissensbasis und spaetere Workflows sind relevant | plausibel abgeleitet |
| Datenschutz- und Datenkritikalitaet | 2 | Beratungsinhalte und sensible Zwischenstaende koennen betroffen sein | plausibel abgeleitet |
| Governance- und Auditbedarf | 1 | Einzelperson, noch keine formale Team-Governance | plausibel abgeleitet |
| Parallelitaets- und Mehrnutzerdruck | 0 | Einzelplatznutzung | bestaetigt |
| Betriebs- und Adminreife | 1 | Einfache lokale Tools gewuenscht, kein Plattformbetrieb | plausibel abgeleitet |
| Mobilitaet, Lautstaerke und Arbeitsplatzrealitaet | 2 | Leise, kompakt und ergaenzend zum mobilen Arbeiten | bestaetigt |
| Budgetstaerke | 1 | Begrenztes Investitionsbudget | bestaetigt |
| Zukunfts- und Ausbaupfad | 2 | Ausbau mit Workflows, Agenten und lokaler Wissensbasis geplant | bestaetigt |

## Auswertung

Das Profil ist kein GPU-first-Szenario. Die wichtigsten Treiber sind:

- lokale Kontrolle fuer sensible Zwischenstaende,
- genug Speicher fuer lokale Modelle und Wissensbasis,
- geringe Betriebs-Komplexitaet,
- kompakter und leiser Formfaktor,
- begrenztes Budget,
- spaeterer Ausbaupfad.

Die Kombination aus Speicherbedarf, Datenschutzrelevanz und Zukunftspfad spricht fuer eine leichte Auspraegung von Klasse 3. Das Budget und die begrenzte Betriebsreife sprechen gegen eine ueberdimensionierte Workstation.

## Zielklasse

Empfohlene Zielklasse:

**Klasse 3: Lokaler Datenschutz- oder Shared-Memory-Knoten**, in leichter, kompakter Auspraegung.

Alternative Zielklasse:

**Klasse 2: Leichter AI-PC** als Pilot- oder Uebergangsloesung, falls Budget oder Betriebsaufwand enger sind.

Ampel:

**Gelb**. Die Richtung ist klar, aber konkrete Produkte sollten erst nach aktueller Quellen-, Preis- und Verfuegbarkeitspruefung genannt werden.

## Empfehlungstendenz

- Bestehendes Notebook als mobiles Frontend weiter nutzen.
- Ergaenzend eine kompakte lokale Umgebung fuer sensible Tests und lokale Modelle pruefen.
- Cloud weiterhin fuer allgemeine Aufgaben nutzen.
- Lokale Verarbeitung fuer sensible Zwischenstaende und Experimente verwenden.
- Spaeter Automatisierungs- und Agentenpfad separat planen.

Keine direkte Produktempfehlung an dieser Stelle.

## Risiken und offene Punkte

- Welche Daten sollen wirklich lokal bleiben?
- Ist Mandantentrennung noetig?
- Welche lokalen Modellgroessen sollen realistisch genutzt werden?
- Ist die lokale Umgebung nur Testumgebung oder Teil produktiver Beratung?
- Wie viel technischer Betrieb ist dauerhaft akzeptabel?
- Welche aktuellen Preise und Verfuegbarkeiten gelten zum Entscheidungszeitpunkt?

## Naechster sinnvoller Schritt

Das Worksheet vollstaendig ausfuellen, lokale Datenarten genauer beschreiben und danach eine kleine technische Shortlist fuer Klasse 2 und Klasse 3 vorbereiten. Vor konkreter Produktauswahl aktuelle Quellen und Preise pruefen.

## Warum dieses Beispiel funktioniert

Das Beispiel zeigt, dass das Modell nicht automatisch die staerkste GPU oder eine konkrete Hardware empfiehlt. Es fuehrt zu einer nachvollziehbaren Hybrid-Tendenz: genug lokale Kontrolle fuer sensible Arbeit, aber keine ueberdimensionierte Workstation.
