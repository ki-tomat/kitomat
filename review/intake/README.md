# Eingang für Review-Kandidaten

Hier landen Beiträge, die geprüft werden sollen, aber **nicht** über einen
Pull Request kommen.

```
review/intake/     ← Pakete, die geprüft werden sollen
       ↓  Agent prüft
review/results/    → Ergebnisse
```

## Wofür das gut ist

Die Kursunterlagen sehen ausdrücklich vor, dass Teilnehmende ohne
Schreibrechte ihre Dateien beim Dozenten abgeben. Genau dafür ist dieser
Ordner da.

Der Weg funktioniert **sofort** — ohne GitHub-Workflows, ohne Label, ohne
Secrets. Er ist damit auch der einfachste Weg, den Agenten überhaupt
auszuprobieren.

## So geht es

**1. Paket ablegen**

```
review/intake/<beliebiger-ordnername>/
    metadata.yml
    prompt.md
    README.md
    ...
```

Der Ordnername ist frei wählbar, zum Beispiel `abgabe-p07` oder
`2026-08-03-mueller`. Er hat keine Bedeutung für die Prüfung.

**2. Prüfen lassen**

```bash
python3 review/tools/run_review.py . review/intake/<ordnername>
```

**3. Ergebnis ansehen**

Unter `review/results/<artefakt-id>/<lauf-id>/`. Die Artefakt-ID stammt aus
`metadata.yml`, nicht aus dem Ordnernamen.

## Woher der Agent den Artefakttyp kennt

Im Content-Repository verrät der Pfad den Typ: Was unter `models/` liegt,
ist ein Modell. Hier gibt es diese Struktur nicht.

Deshalb liest der Agent `artifact_type` aus `metadata.yml` und leitet daraus
den **künftigen Zielpfad** ab:

```yaml
id: mein-beitrag
artifact_type: model      →  models/mein-beitrag
```

Im Ergebnis steht dann:

```json
"path": "models/mein-beitrag",              // wo es einmal hingehört
"source": { "intake_path": "review/intake/abgabe-p07" }   // wo es gefunden wurde
```

**Fehlt `artifact_type` oder ist der Wert unbekannt**, erkennt der Agent den
Typ als `unknown` und kann die Pflichtdateien nicht prüfen. Das fällt in
Phase 0 auf.

## Was hier nicht hingehört

- Beiträge, die bereits als Pull Request vorliegen — die laufen über den
  Workflow
- Echte personenbezogene Daten. Der Agent stoppt zwar, aber die Datei läge
  dann trotzdem im öffentlichen Repository. Vorher prüfen.
- Ergebnisse. Die gehören nach `review/results/`.

## Aufräumen

Geprüfte Pakete können nach dem Review entfernt werden — das Ergebnis unter
`review/results/` enthält alle Dateinamen mit Prüfsummen. Damit lässt sich
später feststellen, ob ein Beitrag nach dem Review verändert wurde, auch ohne
die Kopie hier.
