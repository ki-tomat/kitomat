# Positiv-Szenario: FUTURELIGHT IP PLB-420 Moving Head Beam

## Zweck des Szenarios

Dieses Szenario zeigt, wie das Prompt- und Quellenpaket mit mehreren Quellenvertrauensstufen arbeitet und daraus einen bereinigten, CMS-/PIM-nahen Produktoutput sowie einen Produktseitentext erzeugt.

Der Fall ist ein Positiv-Szenario, weil:

- offizielle Herstellerdokumente vorhanden sind,
- technische Kerndaten aus offiziellen Quellen ableitbar sind,
- ein Werbetext als nachrangige Quelle sinnvoll eingeordnet wird,
- widerspruechliche oder nicht belegte Angaben erkannt und bereinigt werden,
- eine menschliche Fachpruefung die finalen Entscheidungen trifft.

## Testprodukt

FUTURELIGHT IP PLB-420 Moving Head Beam

Produktart:

- wetterfester Beam-Moving-Head
- Lichttechnik / Moving Head / Beam
- professionelle Veranstaltungstechnik

## Eingesetzte Quellen

| Datei / Quelle | Typ | Quellenvertrauensstufe | Nutzung |
|---|---|---|---|
| Steinigke/Futurelight Produktseite und verlinktes Manual | Bedienungsanleitung / Manual | offiziell | Hauptquelle fuer Sicherheit, Installation, Bedienung, DMX, Wartung und technische Daten |
| Steinigke/Futurelight Produktseite und technische Spezifikationen | Hersteller-Sheet / Produktuebersicht | offiziell | Quelle fuer Artikelnummer, GTIN, Features und Kurzuebersicht |
| synthetisierte Kurs-/Briefing-Unterlage | Werbetext | werbetext | nachrangige Formulierungs- und Vergleichsquelle, kein Volltext im Repo |

## Quellenprioritaet

Bei Widerspruechen gilt:

```text
Manual > offizielles Produkt-Sheet > Werbetext
```

## Dokumentenaufnahme: zentrale extrahierte Daten

| Feld | Wert | Quelle | Vertrauensstufe | Status |
|---|---|---|---|---|
| Produktname | FUTURELIGHT IP PLB-420 Moving Head Beam | Manual / Sheet | offiziell | belegt |
| Marke | Futurelight | Manual / Sheet | offiziell | belegt |
| Modell | IP PLB-420 | Manual / Sheet | offiziell | belegt |
| Artikelnummer | 51838830 | Manual / Sheet | offiziell | belegt |
| GTIN | 4026397704969 | Hersteller-Sheet | offiziell | belegt |
| Produktart | Beam-Moving-Head | Manual / Sheet | offiziell | belegt |
| Lichtquelle | USHIO NSL420S Entladungslampe | Manual / Sheet | offiziell | belegt |
| Leistungsaufnahme | 420 W | Manual / Sheet | offiziell | belegt |
| Schutzart | IP65 | Manual / Sheet | offiziell | belegt |
| DMX-Kanaele | 18 | Manual / Sheet | offiziell | belegt |
| Abstrahlwinkel | 1° | Manual / Sheet | offiziell | belegt |
| Gewicht | 39,50 kg | Manual | offiziell | belegt |
| Steuerung | Standalone, Master/Slave, DMX, RDM, CRMX by LumenRadio, ArtNet, sACN, Musiksteuerung | Manual / Sheet | offiziell | belegt |

## Widerspruchs- und Claim-Pruefung

| Thema | Auffaelligkeit | Entscheidung |
|---|---|---|
| Frostfilter | nur im Werbetext genannt, nicht in offiziellen Dokumenten belegt | komplett entfernen, nicht im Output verwenden |
| Gewicht | Manual nennt 39,50 kg, Werbetext nennt 39,70 kg | Manual priorisieren, 39,50 kg verwenden |
| Regen-Formulierung | Werbetext sagt sinngemaess "problemlos sogar im Regen" | nicht verwenden, zu pauschal |
| IP65 / wetterfest | IP65 offiziell belegt | neutral formulieren: "wetterfest im Rahmen der IP65-Klassifizierung" |
| XLR-Kabel im Lieferumfang | im Review menschlich bestaetigt | in Lieferumfang aufnehmen |
| Omega-Halter | offizielle Schreibweise aus Manual verwenden | "2 Schnellverschluss-Omega-Halter mit klappbaren Klammern" |
| Montage ueber Personen | sicherheitskritisch | nicht im Marketing-/Shopoutput erwaehnen |

## Bereinigter CMS-/PIM-Feldvorschlag

| CMS-/PIM-Feld | Inhalt | Quelle / Vertrauensstufe | Status | Uebernahme |
|---|---|---|---|---|
| Produktname | FUTURELIGHT IP PLB-420 Moving Head Beam | offiziell | belegt | uebernehmen |
| Marke | Futurelight | offiziell | belegt | uebernehmen |
| Modell | IP PLB-420 | offiziell | belegt | uebernehmen |
| Artikelnummer / SKU | 51838830 | offiziell | belegt | uebernehmen |
| GTIN/EAN | 4026397704969 | offiziell | belegt | uebernehmen |
| Kategorie | Lichttechnik > Moving Heads > Beam Moving Heads | abgeleitet | pruefen | uebernehmen nach Kategoriepruefung |
| Kurzbeschreibung | Wetterfester Beam-Moving-Head mit IP65-Klassifizierung, 420-W-USHIO-Entladungslampe, engem 1°-Beam und Steuerung ueber DMX, CRMX, RDM, ArtNet und sACN. | offiziell / abgeleitet | belegt / abgeleitet | uebernehmen |
| technische Bulletpoints | IP65, 420 W, USHIO NSL420S, 1° Beam, 18 DMX-Kanaele, CRMX, RDM, ArtNet, sACN, 2x RJ45, 3-pol DMX IP, 39,50 kg | offiziell | belegt | uebernehmen |
| Einsatzbereich | professionelle Veranstaltungstechnik, Innen- und Aussenbereich gemaess Manual | offiziell | belegt | uebernehmen |
| Nicht geeignet fuer | Raumbeleuchtung in Haushalten | offiziell | belegt | uebernehmen |
| Lieferumfang | Moving Head, Bedienungsanleitung, Netzkabel/Stromkabel, XLR-Kabel, 2 Schnellverschluss-Omega-Halter mit klappbaren Klammern | offiziell / menschlich geprueft | belegt / geprueft | uebernehmen |
| Nicht veroeffentlichen ohne Pruefung | Frostfilter, pauschale Regenformulierung, 39,70 kg, sicherheitskritische Montageclaims | gemischt | nicht verwenden | nicht uebernehmen |

## Bereinigte Produktbotschaft

Der FUTURELIGHT IP PLB-420 ist ein wetterfester Beam-Moving-Head im Rahmen der IP65-Klassifizierung mit 420-W-Entladungslampe, engem 1°-Beam und flexibler Steuerung ueber DMX, CRMX, RDM, ArtNet und sACN.

## Bereinigter Kurztext fuer Website oder Shop

Der FUTURELIGHT IP PLB-420 ist ein wetterfester Beam-Moving-Head mit IP65-Klassifizierung, 420-W-USHIO-Entladungslampe und engem 1°-Abstrahlwinkel. Mit Farbrad, Goborad, zwei rotierenden Prismen, motorischem Fokus, 18 DMX-Kanaelen sowie Steuerung ueber DMX, CRMX, RDM, ArtNet und sACN eignet er sich fuer professionelle Show- und Buehneneffekte im Innen- und Aussenbereich.

## Bereinigte Langbeschreibung

Der FUTURELIGHT IP PLB-420 Moving Head Beam ist ein professioneller Beam-Moving-Head fuer dekorative Licht- und Showeffekte in der Veranstaltungstechnik. Das Geraet ist nach IP65 klassifiziert und laut Hersteller fuer den Innen- und Aussenbereich vorgesehen. Als Lichtquelle kommt eine USHIO NSL420S-Entladungslampe zum Einsatz, die bereits ab Werk installiert und justiert ist.

Mit seinem engen Abstrahlwinkel von 1° erzeugt der PLB-420 klar definierte Beams. Zur Effektgestaltung stehen ein Farbrad mit 13 dichroitischen Farben plus offen, ein Goborad mit 14 statischen Gobos plus offen, ein rotierendes 8-fach-Prisma, ein rotierendes Honigwaben-Prisma, ein motorischer Fokus sowie Strobe-, Puls- und Rainbow-Effekte zur Verfuegung.

Fuer die Steuerung unterstuetzt das Geraet Standalone-Betrieb, Master/Slave, DMX, RDM, CRMX by LumenRadio, ArtNet, sACN und Musiksteuerung ueber Mikrofon. Die DMX-Steuerung erfolgt im 18-Kanal-Modus. Zusaetzlich verfuegt das Geraet ueber 3-polige IP-DMX-Anschluesse, zwei RJ45-Anschluesse und einen USB-Anschluss fuer Software-Updates.

Das Gehaeuse ist schwarz ausgefuehrt, das Geraet wiegt laut Herstellerangabe 39,50 kg und wird mit zwei Schnellverschluss-Omega-Haltern mit klappbaren Klammern geliefert. Zum Lieferumfang gehoeren ausserdem Bedienungsanleitung, Netzkabel/Stromkabel und XLR-Kabel.

## Bereinigte technische Bulletpoints

- IP65-klassifizierter Beam-Moving-Head
- 420-W-USHIO-NSL420S-Entladungslampe
- sehr enger Abstrahlwinkel von 1°
- 18 DMX-Kanaele
- Steuerung ueber Standalone, Master/Slave, DMX, RDM, CRMX by LumenRadio, ArtNet und sACN
- Farbrad mit 13 dichroitischen Farben plus offen
- Goborad mit 14 statischen Gobos plus offen
- rotierendes Honigwaben-Prisma und rotierendes 8-fach-Prisma
- motorischer Fokus
- temperaturgeregelter Luefter
- 3-polige IP-DMX-Ein- und Ausgaenge
- 2 x RJ45-Anschluesse
- Stromversorgung: 100-240 V AC, 50/60 Hz
- Gewicht: 39,50 kg
- inklusive 2 Schnellverschluss-Omega-Halter mit klappbaren Klammern

## Bereinigter Lieferumfang

- 1 x FUTURELIGHT IP PLB-420 Moving Head Beam
- 1 x Bedienungsanleitung
- 1 x Netzkabel / Stromkabel
- 1 x XLR-Kabel
- 2 x Schnellverschluss-Omega-Halter mit klappbaren Klammern

## Aktualisierter Claim-Check

| Aussage | Bewertung | Entscheidung |
|---|---|---|
| IP65 | belegt | uebernehmen |
| wetterfest im Rahmen der IP65-Klassifizierung | vorsichtig aus offizieller Angabe abgeleitet | uebernehmen |
| problemlos sogar im Regen | Werbeformulierung | nicht verwenden |
| Frostfilter | nicht offiziell belegt | entfernen |
| Gewicht 39,70 kg | widerspricht Manual | nicht verwenden |
| Gewicht 39,50 kg | offiziell belegt | uebernehmen |
| XLR-Kabel im Lieferumfang | menschlich geprueft | uebernehmen |
| sicherheitskritische Montageclaims | sicherheitskritisch | aus Produkttext/Shopoutput entfernen |
| Schnellverschluss-Omega-Halter mit klappbaren Klammern | offiziell belegt | uebernehmen |

## Nicht veroeffentlichen ohne Pruefung

| Information / Claim | Grund | Entscheidung |
|---|---|---|
| Frostfilter | nur im Werbetext genannt | komplett entfernen |
| "problemlos sogar im Regen" | zu pauschale Werbeaussage | nicht verwenden |
| 39,70 kg | widerspricht Manual | nicht verwenden |
| sicherheitskritische Montageclaims | nicht marketinggeeignet und fachlich pruefpflichtig | nicht in Produktseite uebernehmen |

## Warum dieses Szenario positiv ist

Das Szenario zeigt, dass das Paket:

- offizielle Quellen priorisiert,
- Werbetext nicht ungeprueft uebernimmt,
- Widersprueche erkennt,
- Claims bereinigt,
- einen CMS-/PIM-nahen Output erzeugt,
- einen nutzbaren Produktseitentext erzeugt,
- menschliche Fachentscheidungen sauber in den finalen Output ueberfuehrt.
