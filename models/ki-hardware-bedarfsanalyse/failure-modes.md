# Failure Modes

## Zweck

Diese Datei dokumentiert typische Fehlanwendungen des Beratungsmodells zur KI-Hardware-Bedarfsanalyse. Sie soll verhindern, dass das Modell zu sicher wirkt, zu frueh konkrete Hardware empfiehlt oder Governance-, Datenschutz- und Betriebsfragen uebersieht.

## Typische Fehlanwendungen

### 1. Zu fruehe Produktempfehlung

Problem: Konkrete Hardware wird genannt, bevor Zielklasse, Budget, Datenlage und Betriebsmodell klar sind.

Risiko: Fehlkauf, falsche Architektur oder nicht pruefbare Empfehlung.

Gegenmassnahme: Ampel beachten. Bei Gelb nur Tendenz nennen, bei Rot keine konkrete Hardware empfehlen.

### 2. Cloud-only trotz Datenschutzdruck

Problem: Sensible oder vertrauliche Daten werden uebersehen und eine reine Cloud-Loesung wird empfohlen.

Risiko: Ungeklaerte Datenuebertragung, Datenschutzrisiken und fehlende Kontrollmoeglichkeit.

Gegenmassnahme: Datenresidenz, Cloud-Policy, lokale Verarbeitung und Zugriffskontrolle pruefen.

### 3. Ueberdimensionierte GPU-Empfehlung

Problem: Eine GPU-Workstation wird empfohlen, obwohl Text, RAG, Datenschutz oder Speicherbedarf dominieren.

Risiko: Unnoetige Kosten, Lautstaerke, Strombedarf und Betriebsaufwand.

Gegenmassnahme: Compute-Druck getrennt von Speicher-, Datenschutz- und Betriebsachsen bewerten.

### 4. RAM-/Kontextbedarf unterschaetzt

Problem: Grosse lokale Modelle, RAG, lange Kontexte oder mehrere Nutzer werden auf zu kleine Systeme geplant.

Risiko: schlechte Performance, instabile Nutzung oder falsche Zielklasse.

Gegenmassnahme: Speicher-/Modellgroessendruck, Parallelitaet und KV-Cache-Risiko explizit bewerten.

### 5. Betriebsfaehigkeit ignoriert

Problem: Lokale oder hybride Systeme werden empfohlen, obwohl keine technische Betreuung vorhanden ist.

Risiko: Sicherheitsluecken, fehlende Updates, keine Backups und unklare Verantwortung.

Gegenmassnahme: Betriebs- und Adminreife als Gate nutzen. Bei niedriger Reife einfache Loesungen bevorzugen.

### 6. Governance wird als Nebensache behandelt

Problem: Rollen, Rechte, Logging, Freigaben, Mandantentrennung und Verantwortlichkeiten fehlen.

Risiko: unkontrollierte Nutzung, fehlende Nachvollziehbarkeit und unklare Verantwortung.

Gegenmassnahme: Bei Governance-Wert >= 2 Rollen, Rechte, Logging und Betriebsverantwortung dokumentieren.

### 7. Juristische Scheinsicherheit

Problem: DSGVO oder KI-VO / AI Act werden verbindlich eingeordnet.

Risiko: Das Modell wirkt wie Rechtsberatung oder formale Freigabe.

Gegenmassnahme: Nur Pruefpunkte und Risiken nennen. Externe rechtliche oder Datenschutzpruefung markieren.

### 8. Preis- und Verfuegbarkeitsdaten werden als stabil behandelt

Problem: Hardwarepreise, Lieferbarkeit oder technische Spezifikationen werden als dauerhaft gueltig behandelt.

Risiko: veraltete Empfehlung und falsche Beschaffungsgrundlage.

Gegenmassnahme: Konkrete Produktauswahl nur nach aktueller Quellen-, Preis- und Verfuegbarkeitspruefung.

### 9. Annahmen werden nicht gekennzeichnet

Problem: Abgeleitete Informationen wirken wie bestaetigte Fakten.

Risiko: falsche Sicherheit im Beratungsergebnis.

Gegenmassnahme: Alle wichtigen Angaben als bestaetigt, plausibel abgeleitet oder offen markieren.

### 10. Agentische KI handelt zu autonom

Problem: Ein Berater-Agent trifft finale Beschaffungs-, Rechts-, Datenschutz- oder Freigabeentscheidungen.

Risiko: fehlende menschliche Verantwortung und unkontrollierte Automatisierung.

Gegenmassnahme: Agentische KI darf nur strukturieren, rueckfragen, vorbereiten und dokumentieren. Finale Entscheidungen bleiben bei verantwortlichen Personen.

### 11. Mehrnutzerbetrieb wird wie Einzelplatz behandelt

Problem: Ein Team- oder API-Szenario wird wie ein einzelner Arbeitsplatz geplant.

Risiko: Parallelitaet, KV-Cache, Session-Management, Netzwerk und Betrieb werden unterschaetzt.

Gegenmassnahme: Parallelitaets- und Mehrnutzerdruck bewerten. Bei E >= 2 Betriebsmodell und Mehrnutzerlast dokumentieren.

### 12. Sensible Daten in Beispielen oder Tests

Problem: Echte Kunden-, Personal-, Finanz-, Gesundheits- oder interne Daten werden fuer Beispiele genutzt.

Risiko: Datenschutzverletzung, Vertrauensverlust und unklare Nutzungsrechte.

Gegenmassnahme: Nur synthetische oder anonymisierte Musterfaelle ohne Echtdaten verwenden.

## Stopp- und Gegenmassnahmen

Keine konkrete Hardwareempfehlung geben, wenn:

- Budget unklar ist,
- Cloud-Policy unklar ist,
- Datenlage bei sensiblen Daten unklar ist,
- Nutzerzahl oder Parallelitaet kritisch, aber unbekannt ist,
- Workload widerspruechlich ist,
- keine verantwortliche Person fuer Betrieb erkennbar ist,
- rechtliche oder Datenschutzfragen offen sind.

In diesen Faellen:

- Ampel auf Rot setzen,
- maximal drei Rueckfragen stellen,
- offene Punkte dokumentieren,
- externe Pruefung benennen,
- keine konkrete Produktempfehlung geben.

## Ausschluesse

Das Modell darf nicht genutzt werden als:

- Rechtsberatung,
- Datenschutzfreigabe,
- IT-Sicherheitsaudit,
- finale Beschaffungsentscheidung,
- Garantie fuer Preise, Verfuegbarkeit oder Produkttauglichkeit,
- automatische Entscheidung ueber Menschen oder kritische Geschaeftsprozesse.
