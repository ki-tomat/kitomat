# Workflow

## Zweck

Dieses Dokument beschreibt den empfohlenen Arbeitsablauf fuer das Prompt-Paket `Product Message and Support Alignment Prompt`.

Der Workflow verhindert, dass Rohdokumente direkt in Produkttexte umgewandelt werden. Stattdessen werden Informationen zuerst aufgenommen, bewertet, strukturiert und erst danach fuer CMS/PIM, Produktseite, FAQ, Supportantworten und Claim-Check genutzt.

## Fuer wen ist dieser Workflow gedacht?

Der Workflow ist fuer KMU, Produktmanager, Support-Teams und Online-Shop-Verantwortliche gedacht, die technische Produkte beschreiben muessen, ohne jedes Produkt vollstaendig selbst getestet zu haben.

Typische Eingaben sind:

- Bedienungsanleitungen
- Datenblaetter
- Hersteller-Sheets
- technische Zeichnungen
- Produktseiten
- Werbetexte
- bereinigte interne Produktnotizen

## Schnelluebersicht

```text
Rohdokumente
↓
1. Dokumentenaufnahme
   Informationen extrahieren, Quellen markieren, offene Punkte erkennen
↓
2. Strukturierte Produktdatenvorlage
   Produktdaten, Attribute, Quellenvertrauen, Widersprueche und Pruefpunkte ordnen
↓
3. Hauptprompt
   CMS-/PIM-Output, Produktseite, FAQ, Supportantworten und Claim-Check erzeugen
↓
4. Menschliche Pruefung
   technische Angaben, Grenzen, Sicherheit, Claims und nicht freigegebene Inhalte pruefen
```

## Wichtigste Regel

Der Prompt darf fehlende technische Daten nicht erfinden.

Wenn eine Angabe fehlt, widerspruechlich ist oder nur aus einem Werbetext stammt, muss sie als `pruefen`, `unklar` oder `nicht verwenden` markiert werden.

## Schritt 1: Dokumentenaufnahme

Wenn Produktinformationen nur als PDF, DOCX, Markdown-Datei, Herstellerseite, Manual, Datenblatt, technisches Sheet, technische Zeichnung oder Werbetext vorliegen, muessen diese zuerst in eine strukturierte Eingabe ueberfuehrt werden.

Dieser Schritt erzeugt noch keine finale Produktbeschreibung. Er dient dazu, Informationen zu extrahieren, Quellen zu markieren, offene Pruefpunkte sichtbar zu machen und die Daten fuer `prompt.md` vorzubereiten.

### Pflichtangabe pro Dokument

Der Nutzer muss fuer jedes Dokument eine Quellenvertrauensstufe angeben:

| Stufe | Bedeutung | Beispiele |
|---|---|---|
| offiziell | direkt vom Hersteller oder offiziell dokumentiert | offizielles Datenblatt, offizielles Manual, technische Zeichnung, Konformitaetserklaerung |
| werbetext | Herstellerkommunikation mit Marketingcharakter | Herstellerwebsite, Broschuere, Produktclaim, Werbetext |
| extern | externe oder nutzergenerierte Erfahrung | Rezensionen, Community-Hinweise, Foren, Reddit |
| unklar | nicht belegte, widerspruechliche oder nicht eindeutig zuordenbare Angabe | unbekannte Quelle, widerspruechliche Daten, unvollstaendiger Auszug |

Wenn keine Stufe angegeben ist, wird das Dokument als `unklar` behandelt. Es darf dann nicht als belastbare technische Quelle verwendet werden.

### Quellenprioritaet

Bei Widerspruechen gilt grundsaetzlich:

```text
offizielles Manual / offizielles Datenblatt
>
offizielles Hersteller-Sheet
>
Hersteller-Werbetext
>
externe Hinweise
>
unklare Quellen
```

Diese Regel ersetzt keine fachliche Pruefung. Sicherheits-, Montage-, Elektro-, Kompatibilitaets- und Einsatzgrenzen muessen vor Veroeffentlichung geprueft werden.

## Schritt 2: Strukturierte Produktdatenvorlage

Nach der Dokumentenaufnahme werden die Informationen in eine Produktdatenvorlage ueberfuehrt.

Diese Vorlage enthaelt:

- Produktidentitaet
- Klassifikation
- technische Hauptdaten
- kategoriespezifische Attribute
- offizielle Dokumente
- Kompatibilitaeten
- Einsatzbereiche
- Grenzen
- Sicherheits- und Warnhinweise
- Marketingclaims
- Widersprueche
- offene Pruefpunkte

## Schritt 3: Hauptprompt

Der Hauptprompt erzeugt aus der strukturierten Produktdatenvorlage:

- CMS-/PIM-Feldvorschlag
- Produktbotschaft
- Kernnutzenversprechen
- Produktbeschreibung
- Shop-Kurztext
- Bulletpoints fuer Haendlerplattformen
- FAQ mit 5 haeufigen Kundenfragen
- 5 Support-Antworten
- Claim-Check
- Nicht-veroeffentlichen-ohne-Pruefung-Block

## Schritt 4: Menschliche Pruefung

Vor der Uebernahme in CMS, PIM oder Produktseite muss eine fachkundige Person pruefen:

- technische Angaben
- Kompatibilitaeten
- Sicherheits- und Warnhinweise
- Montage- und Einsatzgrenzen
- Quellenvertrauensstufen
- widerspruechliche Angaben
- nicht belegte Claims
- Abschnitt `Nicht veroeffentlichen ohne Pruefung`

## Wann muss der Workflow bremsen?

Der Output darf nicht als finale Produktseite ausgegeben werden, wenn:

- zentrale Pflichtattribute fehlen,
- offizielle Dokumente fehlen oder unklar sind,
- Werbetext und Datenblatt einander widersprechen,
- Sicherheits-, Montage-, Outdoor-, Leistungs- oder Kompatibilitaetsclaims nicht belegt sind,
- ein Produktbild eine Nutzung suggeriert, die technisch nicht belegt ist,
- Angaben nur aus `extern` oder `unklar` stammen.

In diesen Faellen wird nur ein neutraler Zwischenstand erzeugt und der Rest in `Nicht veroeffentlichen ohne Pruefung` abgelegt.

## Dokumentenaufnahme-Prompt

```markdown
# Dokumentenaufnahme fuer technische Produktinformationen

## Rolle

Du bist ein vorsichtiger Produktdaten-Extraktionsassistent fuer erklaerungsbeduerftige technische Produkte im KMU-E-Commerce.

Deine Aufgabe ist es, Informationen aus bereitgestellten Produktdokumenten zu extrahieren und in eine strukturierte Produktdatenvorlage zu ueberfuehren.

Du erzeugst noch keine finale Produktbeschreibung, keinen Shoptext und keine Supportantworten. Du bereitest nur die Datenbasis fuer den Hauptprompt vor.

## Moegliche Eingaben

Der Nutzer kann bereitstellen:

- Herstellerdatenblatt
- Bedienungsanleitung
- technische Zeichnung
- Produkt-PDF
- DOCX-Dokument
- Markdown-Datei
- kopierte Herstellerbeschreibung
- technische Tabelle
- Produktseite
- bereinigte interne Produktnotizen

## Pflichtangabe pro Dokument

Der Nutzer muss fuer jedes Dokument eine Quellenvertrauensstufe angeben:

- offiziell
- werbetext
- extern
- unklar

Wenn keine Stufe angegeben ist, markiere das Dokument als `unklar` und fordere die Einordnung nach.

## Regeln

- Erfinde keine fehlenden Daten.
- Uebernehme Marketingclaims nicht ungeprueft als technische Fakten.
- Trenne belegte Angaben, abgeleitete Aussagen, Annahmen und offene Pruefpunkte.
- Markiere die Quelle jeder wichtigen Angabe.
- Markiere die Quellenvertrauensstufe jeder wichtigen Angabe.
- Wenn Dokumente widerspruechlich sind, markiere den Widerspruch.
- Wenn Angaben sicherheitsrelevant sind, markiere sie als fachlich zu pruefen.
- Verwende keine echten personenbezogenen Daten.
- Wenn Kundendaten, E-Mails oder Supporttickets enthalten sind, weise darauf hin, dass diese entfernt oder synthetisiert werden muessen.

## Ausgabeformat

# Extrahierte Produktdaten

## 1. Dokumentenuebersicht

| Dokument | Typ | Quellenvertrauensstufe | Quelle | Nutzungsstatus |
|---|---|---|---|---|
| ... | ... | offiziell / werbetext / extern / unklar | ... | nutzbar / pruefen / nicht verwenden |

## 2. Produktidentitaet

| Feld | Wert | Quelle | Quellenvertrauensstufe | Status |
|---|---|---|---|---|
| Produktname | ... | ... | ... | belegt / pruefen / fehlt |
| Marke | ... | ... | ... | belegt / pruefen / fehlt |
| Modell | ... | ... | ... | belegt / pruefen / fehlt |
| MPN | ... | ... | ... | belegt / pruefen / fehlt |
| GTIN/EAN | ... | ... | ... | belegt / pruefen / fehlt |

## 3. Klassifikation

- Hauptkategorie:
- Unterkategorie:
- Produkttyp:
- typische Einsatzbereiche:

## 4. Technische Hauptdaten

| Eigenschaft | Wert | Einheit | Quelle | Quellenvertrauensstufe | Status |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | belegt / pruefen / fehlt |

## 5. Kategorie-spezifische Attribute

### Lichttechnik

- LED-Anzahl:
- LED-Leistung:
- Farbmischung:
- DMX-Kanaele:
- DMX-Modi:
- DMX-Anschluss:
- Steuerprotokolle:
- IP-Schutzart:
- Montageart:
- Sicherungspunkt:
- Stromanschluss:
- Kuehlung:
- offizielle Dokumente:

### PA / Audio

- aktiv / passiv:
- Treiberkonfiguration:
- Verstaerkerklasse:
- RMS / Dauerleistung:
- Peak-Leistung:
- Max-SPL:
- Eingaenge / Ausgaenge:
- Mechanik:
- Strom und Umwelt:
- offizielle Dokumente:

### Video / Broadcast

- Videoeingaenge:
- Videoausgaenge:
- Aufloesungen:
- Frameraten:
- Progressive / Interlaced:
- Farbraum:
- Codecs:
- Farbabtastung:
- Netzwerkprotokolle:
- Software / Firmware:
- Strom und Mechanik:
- offizielle Dokumente:

## 6. Widerspruchspruefung

| Thema | Quelle A | Quelle B | Widerspruch | Empfehlung |
|---|---|---|---|---|
| ... | ... | ... | ... | pruefen / nicht veroeffentlichen / Quelle priorisieren |

## 7. Kompatibilitaeten und Voraussetzungen

| Aussage | Quelle | Quellenvertrauensstufe | Status | Pruefpunkte |
|---|---|---|---|---|
| ... | ... | offiziell / werbetext / extern / unklar | belegt / pruefen / unklar | ... |

## 8. Grenzen und Nicht-Einsatzbereiche

- ...
- ...
- ...

## 9. Sicherheits- und Warnhinweise

- ...
- ...
- ...

## 10. Marketingclaims

| Claim | Quelle | Quellenvertrauensstufe | Bewertung | Empfehlung |
|---|---|---|---|---|
| ... | ... | offiziell / werbetext / extern / unklar | belegt / abgeleitet / pruefen / nicht verwenden | ... |

## 11. Nicht veroeffentlichen ohne Pruefung

| Information / Claim | Grund | Quelle / Vertrauensstufe | Erforderliche Pruefung |
|---|---|---|---|
| ... | widerspruechlich / sicherheitsrelevant / unklar / nicht belegt | ... | Produktmanagement / Technik / Support / Recht |

## 12. Uebergabe an Hauptprompt

Erstelle am Ende eine bereinigte Eingabevorlage fuer den Hauptprompt `Product Message and Support Alignment Prompt`.
```

## Haeufige Stolperstellen fuer Anwender

- Eine IP-Schutzart ist keine pauschale Outdoor-Freigabe.
- Ein Produktbild ist kein technischer Beleg.
- Ein Werbetext ist keine technische Quelle.
- Fehlende Pflichtattribute duerfen nicht geraten werden.
- Externe Hinweise duerfen nicht als technische Fakten uebernommen werden.
- Sicherheitskritische Montage-, Strom- oder Kompatibilitaetsangaben gehoeren in die menschliche Pruefung.
