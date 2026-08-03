# Maintainer-Handoff

**Artefakt:** `prompts/demo-kundenmails-auswerten`  
**Typ:** prompt_package  
**Lauf:** `rev-20260803-001`  
**Datum:** 2026-08-03T09:50:17Z  
**Regelwerk:** 1.0.0  
**Provider:** none

## Entscheidungsgrundlage

| Punkt | Wert |
|---|---|
| Ampel | **rot** |
| Empfehlung | Zurueck an die beitragende Person |
| Statusvorschlag | `draft` |
| Deklarierter Status | `bronze` |
| Datenrisiko | `green` |
| Blockierende Befunde | 1 |
| Sicherheits-Gate | BLOCKIERT |
| Gepruefte Dateien | 5 |

## Blockierende Befunde

| Schwere | Pruefpunkt | Befund |
|---|---|---|
| P0 | Keine eindeutigen PII-Treffer im Beitrag | 3 Rohtreffer, 0 vom Vorfilter entfernt, 2 blockierend. |

## Trust, Quellen und Lizenz

| Ergebnis | Pruefpunkt | Befund |
|---|---|---|
| `block` | Keine eindeutigen PII-Treffer im Beitrag | 3 Rohtreffer, 0 vom Vorfilter entfernt, 2 blockierend. |
| `warn` | Auffaellige Zahlenfolgen zur menschlichen Sichtung | 1 telefonaehnliche Zahlenfolgen gefunden. Erfahrungsgemaess DOIs, Kennnummern oder Zahlenspannen. |

## Menschliche Entscheidung noetig zu

- Auffaellige Zahlenfolgen zur menschlichen Sichtung (phase-0)

## Was der Agent nicht geprueft hat

- Ob die angegebenen Quellen existieren und das aussagen, was behauptet wird
- Fachliche Richtigkeit in der jeweiligen Domaene
- Rechtliche oder Compliance-Fragen

---

_Dieser Bericht ist keine Freigabe, kein Merge, keine Veroeffentlichung und keine rechtliche, technische oder datenschutzrechtliche Pruefung. Die Entscheidung trifft ein Mensch._
