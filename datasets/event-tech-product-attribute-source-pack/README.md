# Event Tech Product Attribute Source Pack

## Kurzbeschreibung

Dieses Quellen-/Datensatzpaket liefert wiederverwendbare Attributlisten, Checklisten, Templates und synthetische Szenarien fuer erklaerungsbeduerftige Produkte aus der Eventtechnik.

Der Schwerpunkt liegt auf:

- Lichttechnik
- PA / Audio
- Video / Broadcast
- Quellenvertrauensstufen
- Dokumentenaufnahme
- CMS-/PIM-nahe Produktdatenfelder
- Claim-Check
- Widerspruchspruefung
- menschlichen Review-Gates

Das Paket ist als Begleitpaket zum Prompt-Paket `product-message-support-alignment` gedacht. Es ist keine technische Freigabe, keine Sicherheitspruefung, keine Normenpruefung und keine Rechtsberatung.

## Enthaltene Inhalte

```text
checklists/
  claim-check-template.md
  contradiction-checklist.md
  lighting-attribute-checklist.md
  official-documents-checklist.md
  pa-audio-attribute-checklist.md
  product-identity-required-fields.md
  technical-claims-handling-checklist.md
  video-broadcast-attribute-checklist.md

templates/
  cms-pim-field-template.md
  document-intake-template.md
  source-trust-template.md

scenarios/
  positive-active-speaker.md
  positive-futurelight-ip-plb-420.md
  review-needed-atem-mini-extreme-iso-g2.md
  review-needed-dmx-controller.md
  negative-truss-safety-claim.md
```

## Nutzung

Nutze dieses Paket, um Produktinformationen vor der Textgenerierung zu strukturieren:

1. Produktidentitaet und Pflichtfelder erfassen.
2. Kategorie passende Attributcheckliste auswaehlen.
3. Quellenvertrauensstufe pro Dokument setzen.
4. technische Claims gegen offizielle Quellen pruefen.
5. Widersprueche und offene Pruefpunkte dokumentieren.
6. riskante Aussagen in `Nicht veroeffentlichen ohne Pruefung` verschieben.

## Quellen- und Lizenzgrenzen

Die Checklisten, Templates und synthetischen Szenarien sind eigene Ausarbeitungen fuer die Kursabgabe. Externe Herstellerdokumente werden nur als Referenzen in `sources.md` genannt und nicht als Volltext in dieses Paket uebernommen.

Wenn dieses Paket in ein oeffentliches Repo uebernommen wird, muessen lokale Hersteller-PDFs, DOCX-Dateien und unklare Volltexte ausgeschlossen bleiben.

## Datenrisiko

Dieses Paket enthaelt keine echten personenbezogenen Daten und keine echten Supporttickets. Die Szenarien sind synthetisch oder zusammenfassende Testfaelle. Nutzer duerfen keine Kundendaten, internen Dokumente oder personenbezogenen Supportfaelle in abgeleitete Beispiele uebernehmen.

## Status

Arbeitsstand: `bronze_candidate` vorbereitet, mit offenen Reviewpunkten fuer Quellen-URLs, Abrufdaten, Lizenzstatus, Peer Review, Trust Review und Maintainer-Freigabe.
