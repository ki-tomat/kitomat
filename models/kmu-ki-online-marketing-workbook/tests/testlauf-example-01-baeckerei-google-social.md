# Testlauf: example-01

## Test-Metadaten

| Feld | Eintrag |
|---|---|
| Artefakt | KI-Online-Marketing-Beratungsmodell für Kleinstunternehmen |
| Artefakt-ID | kmu-ki-online-marketing-workbook |
| Testdatum | 2026-05-12 |
| Testszenario | Lokale Bäckerei: Google-Beiträge und Social-Media-Entwürfe |
| Testtyp | End-to-End-Test |
| Testdaten | synthetisch / abstrahiert |
| Echte Kundendaten verwendet? | nein |
| Personenbezogene E-Mails verwendet? | nein |
| Interne Kundendokumente verwendet? | nein |
| Ziel | Prüfen, ob das Modell von Anamnese bis Pilotbewertung praktisch nutzbar ist |

## Eingesetzte Dateien

- `model.md`
- `application-guide.md`
- `worksheet/01-erstgespraech-anamnese.md`
- `worksheet/02-use-case-auswahl.md`
- `worksheet/03-pilot-testprotokoll.md`
- `canvas/ki-marketing-routine-canvas.md`
- `examples/example-01.md`
- `failure-modes.md`

## Testregel

Der Test verwendet ausschließlich synthetische oder abstrahierte Angaben. Es werden keine echten Kundendaten, keine personenbezogenen Nachrichten, keine echten Bewertungen mit Namen und keine internen Kundendokumente genutzt.

## Testergebnis

Der Testlauf zeigt, dass das Modell den Anwendungsfall einer lokalen Bäckerei von der Ausgangslage bis zur Pilotbewertung nachvollziehbar führen kann.

Geprüft wurde, ob:

- das Unternehmen und seine Marketinglage verständlich erfasst werden,
- nutzbare und ausgeschlossene Daten getrennt werden,
- ein kleiner KI-Use-Case ausgewählt wird,
- eine konkrete Content-Routine entsteht,
- menschliche Prüfung und Freigabe vorgesehen sind,
- Failure Modes sichtbar werden,
- keine echten Kundendaten erforderlich sind.

## Beobachtungen

| Prüfpunkte | Beobachtung | Bewertung |
|---|---|---|
| Modelllogik | Die sechs Phasen führen schrittweise von Anamnese zu Pilot und Review. | bestanden |
| Zielgruppe | Der Ablauf passt zu einem Kleinstunternehmen mit wenig Zeit und wenig Marketingstruktur. | bestanden |
| Datenrisiko | Das Beispiel arbeitet mit synthetischen und abstrahierten Angaben. | bestanden |
| KI-Routine | Die wöchentliche Content-Routine ist klein genug für einen ersten Pilot. | bestanden |
| Menschliche Freigabe | Prüfung vor Veröffentlichung ist vorgesehen. | bestanden |
| Erfolgsmessung | Einfache KPIs sind möglich, aber im Testlauf noch knapp dokumentiert. | nachbearbeitbar |
| Quellenfreigabe | Kurs- und Modellquellen sind dokumentiert, öffentliche Freigabe ist offen. | nachbearbeitbar |

## Bewertung

Der Testlauf ist für die Modellstruktur positiv validierbar.

Status:

- [x] positiv validierbar für Struktur, Ablauf und praktische Nutzbarkeit
- [x] nachbearbeitbar bei Quellenfreigabe und genauer Erfolgsmessung
- [ ] negativ / nicht nutzbar

## Entscheidung

Das Modell kann auf Basis dieses Testlaufs als `bronze_candidate` empfohlen werden.

Nicht empfohlen:

- `bronze`, solange Quellenfreigabe und Maintainer-Freigabe fehlen.
- `silver_candidate`, solange keine mindestens drei dokumentierten Testfälle oder Cross-Model-Tests vorliegen.

## Nächste Schritte nach dem Test

1. Quellenfreigabe für Kursmaterialien und Sakizli-Referenzen menschlich klären.
2. Für eine spätere Bronze-Freigabe mindestens eine Maintainer-Entscheidung dokumentieren.
3. Für eine spätere Silber-Prüfung zwei weitere Testläufe ergänzen.
