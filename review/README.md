# KItomat Review Workspace

Dieser Bereich gehoert zur Branch `review/pre-review-wizard`.

Hier arbeitet die Reviewer-Gruppe getrennt von `main`.

## Struktur

- `review/wizard/` - Review Wizard und lokale UI-Dateien
- `review/intake/` - durch Maintainer vorgepruefte Review-Kandidaten
- `review/results/` - Ergebnisse aus dem Review Wizard
- `review/schemas/` - Strukturdefinitionen fuer Review-Protokolle
- `review/docs/` - Ablauf- und Prozessdokumentation

## Ablauf

1. Maintainer macht eine erste Vorpruefung des Contributor-Pakets.
2. Review-Kandidat wird fuer die Reviewer-Gruppe bereitgestellt.
3. Reviewer startet den Review Wizard.
4. Wizard erzeugt formale Bewertung und Review-Berichte.
5. Ergebnis wird unter `review/results/` abgelegt.
6. Maintainer entscheidet final ueber Rueckgabe, Anpassung oder Merge.

## Regel

Keine Dateien in `main`, `prompts`, `models` oder `datasets` veraendern, solange der Review nicht abgeschlossen ist.
