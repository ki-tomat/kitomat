# Beispieloutput 01: Gekuerztes Websiteanalysekonzept

Dies ist ein gekuerzter Beispieloutput zum synthetischen Beispielinput. In einer echten Nutzung sollte die KI weitere Rueckfragen stellen und das Konzept detaillierter ausarbeiten.

## 1. Kurzdiagnose

Das vermutete Kernproblem liegt nicht beim Traffic, sondern im Uebergang vom Interesse zur Kaufhandlung. Es gibt Produktseitenaufrufe und Warenkorb-Starts, aber der Abschluss im Checkout ist deutlich niedriger.

Gesicherte Informationen:

- GA4 ist vorhanden.
- Es gibt aggregierte Funnel-Werte.
- Mobile Nutzung ist hoch.
- Budget und Zeit sind begrenzt.

Annahmen:

- Die angegebenen Kennzahlen sind korrekt eingerichtet.
- Warenkorb-Start, Checkout-Start und Kauf werden als Ereignisse sauber gemessen.
- Es gibt keine groesseren technischen Fehler im Shopsystem.

## 2. Zielsystem der Website

| Ebene | Beschreibung |
|---|---|
| Hauptziel | Mehr abgeschlossene Kaeufe |
| Nebenziele | Warenkorb-Abbrueche senken, Vertrauen erhoehen, mobile Nutzung verbessern |
| Zielgruppe | Menschen oder kleine Unternehmen, die nachhaltige Bueroartikel kaufen |
| wichtigste Handlung | Kaufabschluss |
| geschaeftlicher Nutzen | Mehr Umsatz aus vorhandenem Traffic |

## 3. Customer-Journey-Sicht

| Phase | Nutzerfrage | Websiteaufgabe | moegliche Kennzahl | typisches Risiko |
|---|---|---|---|---|
| Aufmerksamkeit | Bin ich hier richtig? | Relevanten Einstieg bieten | Sitzungen nach Kanal | Falscher Traffic |
| Orientierung | Finde ich passende Produkte? | Produktauswahl verstaendlich machen | Produktseitenaufrufe | Nutzer finden nicht das richtige Produkt |
| Vertrauen | Kann ich hier sicher kaufen? | Versand, Rueckgabe, Zahlung und Anbieter klar zeigen | Warenkorb-Start zu Checkout-Start | Zweifel vor dem Checkout |
| Handlung | Ist der Kauf einfach? | Checkout kurz und klar halten | Checkout-Start zu Kauf | Formular, Kosten oder Pflichtfelder bremsen |
| Nachfassen | Bleibe ich in Kontakt? | Newsletter oder Wiederkauf anregen | Newsletter-Anmeldung | Kein Folgekontakt |

## 4. Fragen-Daten-Aktions-Matrix

| Analysefrage | benoetigte Daten | passende Kennzahl | wo pruefen | moegliche Wenn-dann-Aktion |
|---|---|---|---|---|
| Wo verlieren wir die meisten Nutzer? | Funnel-Schritte | Produktseite > Warenkorb > Checkout > Kauf | GA4 Funnel Exploration | Wenn groesster Verlust vor Checkout liegt, Produktseite und Warenkorb pruefen |
| Ist der mobile Checkout ein Problem? | Geraetekategorie je Funnel-Schritt | Conversionrate mobil vs. desktop | GA4 Vergleich nach Device | Wenn mobil deutlich schlechter ist, mobile Formularlaenge und Ladezeit pruefen |
| Fehlt Vertrauen vor dem Kauf? | Klicks/Ansichten im Warenkorb, qualitative Pruefung | Checkout-Start-Rate | Warenkorbseite und UX-Check | Wenn viele im Warenkorb stoppen, Versand, Rueckgabe, Zahlung und Trust-Elemente sichtbarer machen |
| Kommen die richtigen Besucher? | Trafficquelle und Kaufabschluss | Kaeufe je Kanal | GA4 Traffic Acquisition | Wenn ein Kanal viel Traffic, aber kaum Kaeufe bringt, Anzeigenversprechen und Zielseite pruefen |

## 5. KPI- und Trackingplan

| Ziel | KPI | benoetigtes Ereignis oder Datenpunkt | Status | Pruefhinweis |
|---|---|---|---|---|
| Warenkorb besser verstehen | Warenkorb-Start-Rate | add_to_cart oder vergleichbares Ereignis | unklar | Pruefen, ob Ereignis korrekt und einheitlich erfasst wird |
| Checkout verbessern | Checkout-zu-Kauf-Rate | begin_checkout und purchase | unklar | Pruefen, ob beide Ereignisse sauber eingerichtet sind |
| Mobile Probleme erkennen | Kaufabschluss nach Geraet | Device-Kategorie je Funnel-Schritt | vorhanden/unklar | Mobile und Desktop getrennt auswerten |

## 6. Erste Hypothesen

| Hypothese | erwarteter Effekt | Aufwand | Risiko | Prioritaet | naechster Test |
|---|---|---|---|---|---|
| Versandkosten oder Lieferzeit sind zu spaet sichtbar | mittel bis hoch | niedrig | niedrig | hoch | Versand- und Rueckgabehinweise frueher anzeigen |
| Mobile Checkout-Felder sind zu lang oder unklar | hoch | mittel | mittel | hoch | Checkout mobil auf 3 echten Testgeraeten pruefen |
| Vertrauenselemente fehlen im Warenkorb | mittel | niedrig | niedrig | mittel | Zahlungsarten, Siegel, Kontakt und Rueckgabe sichtbar ergaenzen |

## 7. Low-Budget-Massnahmenplan

Sofort umsetzbar:

- Mobile Checkout-Strecke manuell testen.
- Versandkosten, Lieferzeit und Rueckgabe vor dem Checkout klar anzeigen.
- Warenkorbseite um kurze Vertrauenselemente ergaenzen.

Innerhalb von 2 bis 4 Wochen:

- GA4 Funnel Exploration fuer Produktseite, Warenkorb, Checkout und Kauf einrichten.
- Mobile und Desktop getrennt vergleichen.
- Eine kleine Textvariante fuer Call-to-Action und Vertrauenselemente testen.

Spaeter oder optional:

- Checkout technisch vereinfachen.
- A/B-Test einrichten, falls genug Traffic vorhanden ist.

## 8. 30/60/90-Tage-Plan

| Zeitraum | Ziel | konkrete Schritte | Messpunkt | Entscheidung |
|---|---|---|---|---|
| 30 Tage | Messbarkeit klaeren | Funnel pruefen, Tracking-Luecken notieren, mobile Strecke testen | Funnel-Schritte sichtbar | Welche Stelle ist der groesste Engpass? |
| 60 Tage | Erste Verbesserungen testen | Trust- und Versandhinweise ergaenzen, Checkout-Texte vereinfachen | Checkout-Start zu Kauf | Beibehalten, anpassen oder verwerfen |
| 90 Tage | Lernen und systematisieren | Ergebnisse bewerten, naechste Hypothese testen | Kaufabschlussrate und Umsatz | Welche Optimierung wird Standard? |

## 9. Human-Review-Checkliste

- Sind die Daten wirklich aggregiert?
- Sind die Ereignisse in GA4 korrekt eingerichtet?
- Stimmen die Annahmen mit der echten Website ueberein?
- Sind Datenschutz- und Consent-Fragen geklaert?
- Sind die Massnahmen mit dem vorhandenen Budget machbar?
