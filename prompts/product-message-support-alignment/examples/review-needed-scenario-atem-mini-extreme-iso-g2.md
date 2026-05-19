# Nachbearbeitbares Szenario: Blackmagicdesign ATEM Mini Extreme ISO G2

## Zweck des Szenarios

Dieses Szenario zeigt einen Videotechnik-Fall mit offizieller, aber modelluebergreifender Dokumentation.

Der Fall ist ein nachbearbeitbares Szenario, weil:

- ein offizielles Manual vorhanden ist,
- das Manual mehrere ATEM-Mini-Modelle beschreibt,
- der Test sich nur auf den ATEM Mini Extreme ISO G2 beziehen soll,
- viele Funktionsdaten belegbar sind,
- einige CMS-/PIM-relevante Produktdaten noch aus einem separaten Datenblatt oder Hersteller-Sheet geprueft werden sollten,
- riskante Claims wie 4K-Switching, universelle Kompatibilitaet oder latenzfreie Nutzung nicht uebernommen werden duerfen.

## Testprodukt

Blackmagicdesign ATEM Mini Extreme ISO G2

Produktart:

- Live-Produktionsmischer
- Video-Switcher
- Streaming-Switcher
- Videotechnik / Broadcast / Streaming / Live-Produktion

## Quellenlage

| Datei / Quelle | Typ | Quellenvertrauensstufe | Nutzung |
|---|---|---|---|
| Blackmagic Design ATEM Mini Installation and Operation Manual | Bedienungsanleitung / Installation and Operation Manual | offiziell | offizielles Manual fuer mehrere ATEM-Mini-Modelle, inklusive ATEM Mini Extreme ISO G2 |

## Wichtige Einschränkung

Das Manual gilt fuer mehrere Modelle. Fuer den Output muessen daher allgemeine ATEM-Mini-Funktionen, Funktionen der Extreme-/ISO-Modelle und spezifische Angaben zum ATEM Mini Extreme ISO G2 sauber getrennt werden.

Fuer eine finale CMS-/PIM-Freigabe waere ein zusaetzliches offizielles Datenblatt oder Hersteller-Sheet sinnvoll.

## Quellenprioritaet

```text
offizielles Manual
↓
fehlendes offizielles Datenblatt / Hersteller-Sheet
↓
fehlender Werbetext
```

## Dokumentenaufnahme

### Produktidentitaet

| Feld | Wert | Quelle | Vertrauensstufe | Status |
|---|---|---|---|---|
| Produktname | ATEM Mini Extreme ISO G2 | Manual | offiziell | belegt |
| Marke / Hersteller | Blackmagicdesign | Manual | offiziell | belegt |
| Produktart | Live-Produktionsmischer / Video-Switcher / Streaming-Switcher | Manual | offiziell / abgeleitet | belegt |
| Produktfamilie | ATEM Mini | Manual | offiziell | belegt |
| Kategorie | Videotechnik / Broadcast / Streaming / Live-Produktion | abgeleitet | offiziell / abgeleitet | plausibel |

## Strukturierte Produktdatenvorlage

### Videoeingänge und Videoausgänge

| Attribut | Wert | Prioritaet | Quelle | Status |
|---|---|---|---|---|
| HDMI-Eingänge | mehrere HDMI-Quellen; exakte Anzahl fuer Shopdaten aus Datenblatt pruefen | Pflicht | offiziell | pruefen |
| HDMI-Ausgänge | 3 dedizierte HDMI-Ausgaenge beim ATEM Mini Extreme ISO G2 | Pflicht | offiziell | belegt |
| frei zuweisbare HDMI-Ausgänge | Ausgang 1 und 2 ueber dedizierte Output-Source-Tasten, Ausgang 3 ueber ATEM Software Control | Pflicht | offiziell | belegt |
| USB-Webcam-Ausgang | beide USB-Ausgaenge koennen beim ATEM Mini Extreme ISO G2 als Webcam-Ausgang genutzt werden | Pflicht | offiziell | belegt |
| Thunderbolt | vorhanden, fuer DaVinci Resolve Replay Workflow nutzbar | Empfohlen | offiziell | belegt |
| Ethernet | fuer Direct Streaming, Netzwerksteuerung und Cloud-Workflows relevant | Pflicht | offiziell | belegt |

### Formate und Signalqualität

| Attribut | Wert | Prioritaet | Quelle | Status |
|---|---|---|---|---|
| unterstuetzte HD-Formate | 720p, 1080p und 1080i in mehreren Bildraten | Pflicht | offiziell | belegt |
| automatische Formatkonvertierung | HDMI-Quellen werden auf das eingestellte Switcher-Format angepasst | Pflicht | offiziell | belegt |
| 4K/UHD-Schalten | nicht belegt | kritisch | offiziell | nicht behaupten |
| Farbraum / Farbabtastung / Bit-Tiefe | nicht als vollstaendiges Produktdatenfeld extrahiert | Optional | offen | pruefen |

### Streaming und Recording

| Attribut | Wert | Prioritaet | Quelle | Status |
|---|---|---|---|---|
| USB-Webcam-Streaming | Computer erkennt ATEM Mini als Webcam | Pflicht | offiziell | belegt |
| Direct Streaming via Ethernet | unterstuetzt | Pflicht | offiziell | belegt |
| Aufnahme auf USB-C-Datentraeger | unterstuetzt | Pflicht | offiziell | belegt |
| Aufnahme auf CFexpress | beim ATEM Mini Extreme ISO G2 moeglich | Pflicht | offiziell | belegt |
| ISO-Aufzeichnung | ISO-Modelle koennen isolierte Eingangsdateien, Audiodateien und DaVinci-Resolve-Projektdateien erzeugen | Pflicht | offiziell | belegt |
| H.264 Recording | Aufzeichnung mit H.264-Kompression beschrieben | Empfohlen | offiziell | belegt |

### Audio

| Attribut | Wert | Prioritaet | Quelle | Status |
|---|---|---|---|---|
| XLR/TRS-Kombi-Eingänge | 2 Kombinationseingaenge, 3-pol XLR / TRS 1/4 Zoll | Pflicht | offiziell | belegt |
| Line/Mic-Umschaltung | unterstuetzt | Pflicht | offiziell | belegt |
| +48 V Phantomspeisung | unterstuetzt | Pflicht | offiziell | belegt |
| HDMI-Audio | HDMI-Audioquellen koennen gemischt werden | Pflicht | offiziell | belegt |
| MADI-Kanaele | Audio-Monitor zeigt 16 MADI-Kanaele | Empfohlen | offiziell | belegt |
| Fairlight Audio | EQ, Dynamics, Gate, Compressor und Limiter beschrieben | Empfohlen | offiziell | belegt |

### Bedienung und Produktionsfunktionen

| Attribut | Wert | Prioritaet | Quelle | Status |
|---|---|---|---|---|
| Cut / Auto Transition | unterstuetzt | Pflicht | offiziell | belegt |
| Faderbar | beim ISO-G2-Layout vorhanden | Empfohlen | offiziell | belegt |
| Multiview | vorhanden | Pflicht | offiziell | belegt |
| SuperSource | fuer Extreme-Modelle beschrieben | Empfohlen | offiziell | belegt |
| Makros | unterstuetzt | Empfohlen | offiziell | belegt |
| Upstream Keyer / Downstream Keyer | unterstuetzt | Empfohlen | offiziell | belegt |
| Media Player / Still Graphics | unterstuetzt | Empfohlen | offiziell | belegt |
| Kamera-Kontrolle | Blackmagic-Kamera-Kontrolle ueber HDMI / kompatible Kameras | Optional / Empfohlen | offiziell | belegt |

### Replay und DaVinci Resolve

| Attribut | Wert | Prioritaet | Quelle | Status |
|---|---|---|---|---|
| DaVinci Resolve Replay Workflow | speziell fuer ATEM Mini Extreme ISO G2 beschrieben | Empfohlen | offiziell | belegt |
| Thunderbolt-Anbindung | fuer Zugriff auf Medien und Fill/Key im Replay-Workflow beschrieben | Empfohlen | offiziell | belegt |
| Replay-Tasten | Cue, Run, Dump | Empfohlen | offiziell | belegt |
| CFexpress / USB-Disk Zugriff | fuer Replay-Workflow relevant | Empfohlen | offiziell | belegt |

## Widerspruchs- und Claim-Pruefung

Da nur eine offizielle Quelle vorliegt, gibt es keine echten Quellenwidersprueche zwischen Manual, Datenblatt und Werbetext. Trotzdem duerfen folgende Claims nicht ueberzogen werden.

| Potenzieller Claim | Bewertung | Entscheidung |
|---|---|---|
| 4K-Switcher | nicht belegt; Manual beschreibt HD-Formate | nicht verwenden |
| fuer jede Streaming-Plattform geeignet | zu breit | konkrete Funktionen und Beispiele nennen |
| latenzfrei | nicht belegt | nicht verwenden |
| universell kompatibel mit allen Kameras | nicht belegt | nicht verwenden |
| professionelles Broadcast-Studio in einem Geraet | zu pauschal | neutraler formulieren |
| alle Eingaenge werden als ISO aufgenommen | ISO-Funktion ist belegt, Details modell- und setupbezogen formulieren | vorsichtig formulieren |
| Blackmagic Cloud automatisch immer verfuegbar | setzt Internet, Account und Setup voraus | nur mit Voraussetzungen formulieren |
| Replay funktioniert ohne Zusatzsetup | zu vereinfacht | nicht verwenden |

## Nicht veroeffentlichen ohne Pruefung

| Information / Claim | Grund | Entscheidung |
|---|---|---|
| 4K/UHD-Switching | nicht belegt | nicht uebernehmen |
| universelle Kompatibilitaet mit allen Kameras | zu breit | nicht uebernehmen |
| latenzfrei | nicht belegt | nicht uebernehmen |
| fuer jede Plattform | zu breit | konkrete Plattformen/Funktionen nennen |
| exakte Masse / Gewicht / Lieferumfang | im Manual nicht als finale Shopdaten extrahiert | Datenblatt nachfordern |
| EAN / GTIN / MPN | nicht aus Manual ermittelt | Datenblatt / Herstellerseite nachfordern |
| genaue Anzahl aller physischen Anschluesse | fuer Shopdaten besser aus Datenblatt uebernehmen | pruefen |
| Replay sofort einsatzbereit | Setup mit DaVinci Resolve und Thunderbolt erforderlich | nicht verwenden |

## CMS-/PIM-Feldvorschlag

| CMS-/PIM-Feld | Inhalt | Status | Uebernahme |
|---|---|---|---|
| Produktname | Blackmagicdesign ATEM Mini Extreme ISO G2 | belegt | uebernehmen |
| Marke | Blackmagicdesign | belegt | uebernehmen |
| Produktart | Live-Produktionsmischer / Streaming-Switcher | belegt / abgeleitet | uebernehmen |
| Kategorie | Videotechnik > Broadcast / Streaming > Video-Switcher | plausibel | pruefen |
| Kurzbeschreibung | kompakter Live-Produktionsmischer fuer HDMI-Produktionen, Streaming, Recording, Multiview, ISO-Aufzeichnung und DaVinci-Resolve-Workflows | belegt / abgeleitet | uebernehmen nach Review |
| Videoeingänge | HDMI-Quellen; genaue Anzahl aus Datenblatt pruefen | teilweise belegt | pruefen |
| Videoausgänge | 3 dedizierte HDMI-Ausgaenge | belegt | uebernehmen |
| Streaming | USB-Webcam und Direct Streaming via Ethernet | belegt | uebernehmen |
| Recording | USB-C-Datentraeger und CFexpress, ISO-Aufzeichnung | belegt | uebernehmen |
| Audio | 2 XLR/TRS-Kombi-Eingaenge mit Line/Mic und +48 V, HDMI-Audio, MADI-Kanaele, Fairlight-Funktionen | belegt | uebernehmen |
| unterstuetzte Formate | 720p, 1080p, 1080i in diversen Bildraten | belegt | uebernehmen |
| Software | ATEM Software Control, DaVinci Resolve Integration | belegt | uebernehmen |
| Nicht veroeffentlichen ohne Pruefung | 4K-Switching, latenzfrei, universell kompatibel, exakte Masse/Gewicht/Lieferumfang | kritisch/offen | nicht uebernehmen |

## Nachbearbeitbarer Produktseiten-Entwurf

### Produktbotschaft

Der Blackmagicdesign ATEM Mini Extreme ISO G2 ist ein kompakter Live-Produktionsmischer fuer HDMI-basierte Produktionen, Streaming, Recording und ISO-Workflows. Das Geraet verbindet Hardware-Steuerung, Multiview, Direct Streaming, USB-Webcam-Ausgabe, Fairlight-Audiofunktionen und DaVinci-Resolve-Integration in einem mobilen Produktionssystem.

### Kurztext fuer Website oder Shop

Der ATEM Mini Extreme ISO G2 ist ein kompakter Live-Produktionsmischer fuer Streaming, Recording und Multikamera-Produktionen. Er unterstuetzt HD-Videoformate bis 1080p60, bietet 3 HDMI-Ausgaenge, USB-Webcam-Ausgabe, Direct Streaming via Ethernet, Aufnahme auf USB-C-Datentraeger oder CFexpress sowie ISO-Aufzeichnung fuer die Nachbearbeitung in DaVinci Resolve. Fuer Audio stehen unter anderem XLR/TRS-Kombi-Eingaenge mit Line/Mic-Umschaltung und +48-V-Phantomspeisung sowie Fairlight-Audiofunktionen zur Verfuegung.

## FAQ im nachbearbeitbaren Szenario

### Frage 1: Ist der ATEM Mini Extreme ISO G2 ein 4K-Switcher?

Aus dem vorliegenden Manual sollte das nicht behauptet werden. Die im Test extrahierten Videoformate beziehen sich auf HD-Formate bis 1080p60 beziehungsweise 1080i60.

### Frage 2: Kann das Geraet direkt streamen?

Ja. Das Manual beschreibt Direct Streaming via Ethernet sowie die Nutzung als USB-Webcam fuer Streaming-Software. Beim ATEM Mini Extreme ISO G2 koennen beide USB-Ausgaenge als Webcam-Ausgang genutzt werden.

### Frage 3: Kann der ATEM Mini Extreme ISO G2 ISO-Dateien aufnehmen?

Ja. Das Manual beschreibt bei ISO-Modellen die Aufzeichnung isolierter Eingangsdateien, Audiodateien und einer DaVinci-Resolve-Projektdatei. Beim Extreme ISO G2 wird ausserdem die Aufnahme auf CFexpress beschrieben.

### Frage 4: Welche Audioanschluesse hat das Geraet?

Fuer den ATEM Mini Extreme ISO G2 nennt das Manual zwei kombinierte 3-pol-XLR-/TRS-1/4-Zoll-Eingaenge, umschaltbar zwischen Line- und Mic-Level, mit Unterstuetzung fuer +48-V-Phantomspeisung.

### Frage 5: Ist Replay mit DaVinci Resolve moeglich?

Ja, das Manual beschreibt einen eigenen Replay-Workflow fuer den ATEM Mini Extreme ISO G2 in Verbindung mit DaVinci Resolve. Dafuer sind jedoch Setup-Schritte erforderlich, unter anderem ueber Thunderbolt und DaVinci Resolve.

## Warum dieses Szenario nachbearbeitbar ist

Das Szenario ist nicht negativ, weil eine offizielle Quelle vorhanden ist und viele Funktionen belegt werden koennen.

Es ist aber auch noch nicht voll positiv, weil:

- das Manual modelluebergreifend ist,
- ein offizielles Produktdatenblatt fuer finale Shop-/CMS-Felder fehlt,
- EAN/GTIN, MPN, Masse, Gewicht und Lieferumfang nicht final gepflegt sind,
- einzelne Anschluss- und Formatdetails fuer einen PIM-Import besser gegen ein Datenblatt geprueft werden sollten,
- Claims wie 4K, latenzfrei oder universell kompatibel blockiert werden muessen.

## Empfohlene Nachbearbeitung

Vor finaler Veroeffentlichung sollten ergaenzt werden:

- offizielles Produktdatenblatt
- Hersteller-Sheet
- EAN / GTIN
- MPN
- exakte Masse
- Gewicht
- Lieferumfang
- offizielle Anschlussuebersicht
- ggf. offizieller Produktseitentext des Herstellers

## Kurzfazit

Der Videotechnik-Zweig funktioniert in diesem Test gut. Das Paket erkennt, dass die offizielle Quelle stark ist, aber fuer einen finalen CMS-/PIM-Output noch ein Datenblatt oder Hersteller-Sheet benoetigt wird.

Der korrekte Status lautet daher:

```text
nachbearbeitbares Szenario
```
