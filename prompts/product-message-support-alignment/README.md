# Product Message and Support Alignment Prompt

## Kurzbeschreibung

Dieses Prompt-Paket hilft KMU, Shopbetreibern, Produktmanagern und Support-/Marketing-Teams dabei, aus technischen Produktinformationen einen verstaendlichen und pruefbaren Produktoutput zu erzeugen.

Der Output verbindet:

- CMS-/PIM-nahe Produktdatenstruktur
- Produktseite und Shoptext
- FAQ
- Supportantworten zu haeufigen Kundenfragen
- Claim-Check
- offene Pruefpunkte
- Abschnitt `Nicht veroeffentlichen ohne Pruefung`

## Wofuer ist das Prompt-Paket gedacht?

Das Paket ist besonders geeignet fuer erklaerungsbeduerftige technische Produkte, zum Beispiel:

- Lichttechnik
- PA / Audio
- Video / Broadcast
- Event- und Veranstaltungstechnik
- technische Hardware mit vielen Attributen, Grenzen und Kompatibilitaeten

## Wann verwenden?

Nutze das Paket, wenn Produktinformationen aus mehreren Quellen zu einem klareren Produktoutput verarbeitet werden sollen.

Geeignet bei:

- Herstellerdatenblaettern
- Bedienungsanleitungen
- technischen Produkt-PDFs
- DOCX- oder Markdown-Produkttexten
- zu werblichen Herstellertexten
- fehlenden oder uneinheitlichen Produkteigenschaften
- Produkten mit Kompatibilitaets-, Einsatz- oder Sicherheitsgrenzen

## Nicht verwenden bei

Dieses Prompt-Paket ersetzt keine fachliche Freigabe.

Nicht geeignet als Ersatz fuer:

- technische Freigaben
- Sicherheitsbewertungen
- Normenpruefungen
- Statik- oder Traglastbewertungen
- elektrische Sicherheitsfreigaben
- Rechtsberatung
- Garantie- oder Haftungszusagen

Bei sicherheitsrelevanten Aussagen muss immer eine fachkundige Person pruefen.

## Vier-Schritt-Prozess

```text
1. Dokumentenaufnahme
2. Strukturierte Produktdatenvorlage
3. Hauptprompt mit CMS-/PIM-Output und Produktseite
4. Menschliche Pruefung
```

Wenn Rohdokumente wie PDF, DOCX, Manual, Datenblatt, technische Zeichnung oder Werbetext vorliegen, sollten sie zuerst mit dem Dokumentenaufnahme-Schritt aus `workflow.md` verarbeitet werden.

## Benötigte Eingaben

Der Prompt funktioniert am besten mit folgenden Informationen:

- Produktname
- Marke
- Modell
- Produktkategorie
- Hersteller-MPN, falls vorhanden
- GTIN/EAN, falls vorhanden
- Zielgruppe und Einsatzsituationen
- Herstellerbeschreibung
- technische Hauptdaten
- Anschluesse und Schnittstellen
- Protokolle und Standards
- Kompatibilitaeten
- Voraussetzungen fuer die Nutzung
- Lieferumfang
- Zubehoer oder Ersatzteile
- Software- oder Firmware-Abhaengigkeiten
- Dokumente, Manuals, Datenblaetter oder Konformitaetserklaerungen
- Montage- oder Installationshinweise
- Pflege, Wartung oder Reinigung
- bekannte Grenzen
- nicht geeignete Einsatzsituationen
- Sicherheits- oder Warnhinweise
- haeufige Kundenfragen
- Quellenbasis
- gewuenschter Ton
- Aussagen, die nicht behauptet werden duerfen

## Quellenvertrauensstufen

Jede Datei oder Quelle soll einer Stufe zugeordnet werden:

| Stufe | Bedeutung |
|---|---|
| `offiziell` | offizielles Datenblatt, offizielles Manual, technische Zeichnung, Konformitaetserklaerung |
| `werbetext` | Herstellerwebsite, Broschuere, Produktclaim, Marketingtext |
| `extern` | Rezensionen, Community-Hinweise, Foren |
| `unklar` | nicht belegte, widerspruechliche oder nicht eindeutig zuordenbare Angaben |

## Ergebnis

Der Prompt erzeugt:

1. Kurzurteil zur Informationslage
2. Dokumentenaufnahme und Quellenuebersicht
3. strukturierte Produktdatenvorlage
4. CMS-/PIM-Feldvorschlag
5. Produktbotschaft in einem Satz
6. Kernnutzenversprechen
7. Zielgruppen- und Einsatzargumentation
8. Produktbeschreibung als Langtext
9. Kurztext fuer Website oder Shop
10. Bulletpoints fuer Haendlerplattformen
11. FAQ mit 5 haeufigen Kundenfragen
12. 5 Supportantworten zu haeufigen Kundenfragen oder Pruefpunkten
13. Warnhinweise gegen Ueberversprechen
14. Claim-Check
15. Abschnitt `Nicht veroeffentlichen ohne Pruefung`
16. offene Pruefpunkte fuer Produktmanagement, Technik oder Support

## Szenario-Kategorien

| Kategorie | Bedeutung | Beispiel |
|---|---|---|
| Positiv | gute Quellenlage, Output kann nach Review weitgehend uebernommen werden | `examples/positive-scenario-futurelight-ip-plb-420.md` |
| Nachbearbeitbar | offizielle Quelle vorhanden, aber wichtige CMS-/PIM-Daten fehlen | `examples/review-needed-scenario-atem-mini-extreme-iso-g2.md` |
| Negativ | widerspruechliche oder riskante Quellenlage, der Prompt muss bremsen | `examples/negative-scenario-lightstage-wash-18-ip20-outdoor-claim.md` |

## Datenregeln

Im MVP duerfen keine echten personenbezogenen Daten verwendet werden.

Nicht verwenden:

- echte Kundennamen
- echte E-Mail-Adressen
- echte Supporttickets
- aufgezeichnete Kundengespraeche mit Personenbezug
- interne Unternehmensdokumente
- vertrauliche Herstellerinformationen
- urheberrechtlich unklare Volltexte
- kopierte Foren- oder Reddit-Beitraege als Volltext

Erlaubt sind:

- synthetische Produktbeispiele
- selbst formulierte Erfahrungsregeln
- zusammengefasste oeffentliche Erkenntnisse
- Herstellerangaben mit Link und Abrufdatum
- technische Datenblaetter, wenn Nutzung und Quellenstatus geklaert sind
- synthetische Supportfaelle

## Typische Stolperstellen fuer Anwender

1. **Rohdokumente nicht direkt als Produkttext ausgeben.**  
   Erst Dokumentenaufnahme, dann strukturierte Produktdaten, dann Produktoutput.

2. **Werbetext darf technische Fakten nicht ueberstimmen.**  
   Offizielle Dokumente haben Vorrang vor Marketingtexten.

3. **Fehlende Daten offen markieren.**  
   MPN, GTIN/EAN, Gewicht, Schutzart, Lieferumfang oder Kompatibilitaeten duerfen nicht erfunden werden.

4. **Riskante Claims blockieren.**  
   Aussagen wie `universell kompatibel`, `wetterfest`, `lizenzfrei`, `garantiert sicher` oder `fuer alle Anwendungen geeignet` muessen belegt oder entfernt werden.

5. **CMS-/PIM-Output ist ein Vorschlag.**  
   Er muss vor Veroeffentlichung fachlich geprueft werden.

## Status

Arbeitsstand: `bronze_candidate` vorbereitet, mit offenen menschlichen Reviewpunkten.

## Finaler Abgabehinweis

Dieses Paket wurde fuer die Kursabgabe vorbereitet. Vor einer oeffentlichen Repo-Uebernahme muessen Quellenangaben, Lizenzstatus, Peer Review und Trust Review final geprueft werden.

Vor Veröffentlichung von erzeugten Produkttexten gilt:

- Quellenvertrauensstufe pro Dokument setzen.
- Offizielle Quellen vor Werbetexten priorisieren.
- Keine personenbezogenen oder sensiblen Daten eingeben.
- Unsichere, widersprüchliche oder sicherheitskritische Aussagen nicht veröffentlichen.
- Abschnitt `Nicht veröffentlichen ohne Prüfung` immer fachlich prüfen.
- Dieses Paket ersetzt keine technische Freigabe, Sicherheitsprüfung, Normenprüfung oder Rechtsberatung.

Weitere Hinweise stehen in `DATA-PRIVACY-TRUST.md`, `failure-modes.md` und `sources.md`.
