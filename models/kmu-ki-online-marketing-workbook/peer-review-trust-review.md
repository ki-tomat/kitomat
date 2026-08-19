# Peer Review und Trust Review

## Review-Metadaten

| Feld | Eintrag |
|---|---|
| Artefakt | KI-Online-Marketing-Beratungsmodell für Kleinstunternehmen |
| Artefakt-ID | kmu-ki-online-marketing-workbook |
| Review-Datum | 2026-05-14 |
| Review-Art | Peer Review + Trust Review |
| Reviewer | Codex als vorbereitender Review-Agent |
| Maintainer | p99 |
| Status vor Review | draft |
| Status nach Review | bronze_candidate |

## Peer-Review-Ergebnis

Das Modell ist als KMU-/Branchenmodell nachvollziehbar aufgebaut. Zweck, Zielgruppe, Phasen, Worksheets, Canvas, Beispiele, Failure Modes und Quellen sind vorhanden.

Bewertung:

- Zweck und Zielgruppe sind klar.
- Die sechs Phasen sind logisch und für Kleinstunternehmen verständlich.
- Die Worksheets und das Canvas machen das Modell praktisch anwendbar.
- Die Beispiele zeigen realitätsnahe, synthetische Szenarien.
- Der Testlauf zur Bäckerei validiert die Modellstruktur positiv mit Auflagen.
- Begleitartefakte sind in README und FILELIST eingeordnet.

## Trust-Review-Ergebnis

Die konservative Trust-Layer-Einstufung ist plausibel:

```yaml
data_risk: yellow
human_review_required: true
ai_act_proximity: unclear
required_review_level: trust_review
```

Begründung:

- Online-Marketing kann Bewertungen, Kontaktanfragen, Newsletter-Kontexte und Supportwissen berühren.
- Personenbezogene oder vertrauliche Daten sind möglich, auch wenn das Modell sie ausdrücklich ausschließt.
- Menschliche Prüfung vor Nutzung oder Veröffentlichung ist notwendig.
- Das Modell behauptet keine Rechtsberatung, kein Datenschutz-Audit und keine automatische Freigabe.

## Offene Punkte vor Bronze

1. Quellenfreigabe für Kursmaterialien, Transkripte und Sakizli-Referenzen klären.
2. Maintainer-Freigabe ausdrücklich dokumentieren.
3. Prüfen, ob öffentliche Veröffentlichung nur mit Kurzreferenzen statt lokalen Kursquellen erfolgen soll.

## Status-Empfehlung

Empfohlen:

```yaml
status: bronze_candidate
```

Nicht empfohlen:

- `bronze`, solange Quellenfreigabe und Maintainer-Freigabe fehlen.
- `silver_candidate`, solange keine drei dokumentierten Testfälle oder Cross-Model-Tests vorliegen.

## Entscheidung

Das Artefakt ist reviewfähig und kann als `bronze_candidate` geführt werden. Eine Freigabe als `bronze` ist noch nicht erfolgt.
