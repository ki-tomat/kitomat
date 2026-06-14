# Review Guide  
## Produkt-Marketing-Support-Kit  
### Prompt-Paket + Datensatz-/Quellenpaket

**Bearbeiter:** dAIvid-lehmann

## 1. Zweck

Dieser Review Guide unterstützt Peer-Reviewer, Dozenten oder Projektbeteiligte dabei, das Prompt-Paket und das Datensatz-/Quellenpaket strukturiert zu prüfen.

Geprüft werden sollen:

- Verständlichkeit des Workflows
- Nachvollziehbarkeit der Quellenlogik
- Qualität der Attributstruktur
- Erkennung riskanter Claims
- Nutzbarkeit des CMS-/PIM-Outputs
- Sichtbarkeit menschlicher Prüfpunkte
- Datenschutz-, Quellen- und Trust-Hinweise

Das Paket ersetzt keine technische Freigabe, Sicherheitsprüfung, Normenprüfung oder Rechtsberatung.

## 2. Zu prüfende Pakete

### Prompt-Paket: `product-message-support-alignment`

Erzeugt aus strukturierten Produktinformationen Produktbotschaft, CMS-/PIM-Feldvorschlag, Produktbeschreibung, Shop-Kurztext, technische Bulletpoints, FAQ, Supportantworten, Claim-Check, Widerspruchsprüfung und `Nicht veröffentlichen ohne Prüfung`.

### Datensatz-/Quellenpaket: `event-tech-product-attribute-source-pack`

Liefert Attributlisten, Quellenvertrauensstufen, Dokumentenaufnahme, CMS-/PIM-Template, Claim-Check, Widerspruchscheck und Szenarien.

## 3. Empfohlener Review-Ablauf

```text
1. README lesen
2. Workflow.md bzw. usage.md lesen
3. DATA-PRIVACY-TRUST.md lesen
4. sources.md lesen
5. failure-modes.md lesen
6. Attributchecklisten ansehen
7. Szenarien prüfen
8. Beispiel-Test durchführen
9. Ergebnis bewerten
```

## 4. Prüffragen

### Verständlichkeit

- Ist der Zweck des Pakets klar?
- Ist die Trennung zwischen Prompt-Paket und Quellenpaket nachvollziehbar?
- Ist der Vier-Schritt-Prozess verständlich?
- Ist klar, welche Rolle die menschliche Prüfung hat?

### Quellenstatus

- Ist erkennbar, welche Inhalte eigene Ausarbeitung sind?
- Ist erkennbar, welche Inhalte synthetisch sind?
- Ist erkennbar, welche Szenarien auf externen offiziellen Herstellerquellen basieren?
- Werden externe Quellen nur zusammengefasst und nicht als Volltext weiterveröffentlicht?
- Ist klar, dass keine echten Kundendaten enthalten sind?

### Datenschutz und Trust

- Wird darauf hingewiesen, keine personenbezogenen Daten einzugeben?
- Wird erklärt, dass Supportbeispiele anonymisiert oder synthetisch sein müssen?
- Wird deutlich, dass menschliche Prüfung Pflicht ist?
- Wird deutlich, dass keine technische oder rechtliche Freigabe ersetzt wird?

### Fachliche Struktur

- Sind die Attributgruppen sinnvoll?
- Sind Pflichtfelder, optionale Felder und sicherheitskritische Felder nachvollziehbar?
- Sind Lichttechnik, PA/Audio und Video/Broadcast ausreichend abgedeckt?

### Claim-Check

- Werden riskante Claims erkannt?
- Werden unbelegte Claims blockiert?
- Werden Werbeaussagen neutralisiert?
- Werden technische Grenzen sichtbar?

### CMS-/PIM-Output

- Ist der Feldvorschlag brauchbar?
- Sind Produktidentität, Klassifikation und technische Daten sauber getrennt?
- Sind offene Prüfpunkte klar markiert?
- Ist erkennbar, welche Felder übernommen, geprüft oder nicht übernommen werden sollen?

## 5. Szenarien

| Kategorie | Beispiel | Erwartetes Verhalten |
|---|---|---|
| Positiv | FUTURELIGHT IP PLB-420 | Output kann nach Review weitgehend übernommen werden |
| Nachbearbeitbar | Blackmagicdesign ATEM Mini Extreme ISO G2 | Output möglich, aber Datenblatt/Shopdaten müssen ergänzt werden |
| Negativ | LightStage WASH-18 RGBW Bar | Prompt muss bremsen und riskante Claims blockieren |

## 6. Bewertungsskala

| Punktzahl | Bedeutung |
|---|---|
| 1 | unklar oder nicht nutzbar |
| 2 | teilweise verständlich, aber größere Probleme |
| 3 | grundsätzlich nutzbar, aber Nachbesserungsbedarf |
| 4 | gut nutzbar, kleinere Verbesserungen möglich |
| 5 | sehr gut nutzbar und klar nachvollziehbar |

| Bereich | Punkte 1-5 | Kommentar |
|---|---:|---|
| README-Verständlichkeit |  |  |
| Workflow |  |  |
| Datenschutz / Trust |  |  |
| Quellenstatus |  |  |
| Quellenlogik |  |  |
| Attributstruktur |  |  |
| CMS-/PIM-Output |  |  |
| Claim-Check |  |  |
| Bremslogik |  |  |
| Szenarien |  |  |
| Gesamtbewertung |  |  |

## 7. Reviewer-Kommentarvorlage

```markdown
# Review-Kommentar

## Getestetes Produkt

Produkt:
Kategorie:
Genutzte Quellen:
Quellenvertrauensstufen:
Datenschutz geprüft: ja / nein

## Kurzfazit

Was funktioniert gut?

-

Was ist unklar?

-

Was sollte verbessert werden?

-

## Bewertung

| Bereich | Punkte 1-5 | Kommentar |
|---|---:|---|
| Verständlichkeit |  |  |
| Workflow |  |  |
| Datenschutz / Trust |  |  |
| Quellenstatus |  |  |
| Quellenlogik |  |  |
| Attributstruktur |  |  |
| CMS-/PIM-Output |  |  |
| Claim-Check |  |  |
| Gesamtbewertung |  |  |

## Empfehlung

- [ ] Paket ist abgabefähig
- [ ] Paket ist nutzbar, aber kleinere Anpassungen empfohlen
- [ ] Paket braucht weitere Überarbeitung
```

## 8. Kurzfazit

Der Review soll prüfen, ob technische Produktinformationen quellenbewusst, datenschutzsensibel, strukturiert und reviewfähig in CMS-/PIM-nahe Produktdaten, Produkttexte, FAQ und Claim-Checks überführt werden.
