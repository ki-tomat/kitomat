# Schnittstellen zwischen Review-Modul und KItomat

Dieses Dokument richtet sich an alle, die am KItomat-Hauptprojekt arbeiten.
Es beschreibt genau, **wo das Review-Modul euer Projekt berührt** — und wo
nicht.

Kurzfassung: Das Review-Modul liest aus KItomat und schreibt ausschließlich
nach `review/`. Es verändert keine bestehende Datei.

---

## 1. Was wir aus KItomat lesen

Alles Folgende ist **nur lesend**. Ändert sich etwas davon, müssen wir
nachziehen — deshalb bitten wir um eine kurze Info bei Änderungen.

| Was | Wo | Warum wir es brauchen | Bei Änderung |
|---|---|---|---|
| Artefaktordner | `prompts/*/`, `datasets/*/`, `models/*/` | Der Beitrag, der geprüft wird | Pfadmuster in `review-checks.yml` anpassen |
| Pflichtdateien je Typ | `tools/validators/validate_completeness.py` | Vollständigkeitsprüfung | `review/policy/review-checks.yml`, Abschnitt `required_files` |
| Metadatenschema | `schemas/metadata.schema.json` | 15 Pflichtfelder, Enum-Werte | `review-checks.yml`, Abschnitt `enums` |
| PII-Muster | `tools/validators/pii_heuristic.py` | Sicherheits-Gate | wird **importiert**, zieht automatisch mit |
| Platzhalterliste | `tools/validators/validate_completeness.py` | Platzhalterprüfung | `stage1a_scan.py`, Konstante `PLACEHOLDERS` |
| Szenario-Begriffe | `tools/validators/validate_completeness.py` | Szenario-Triade | `review-checks.yml`, Phase 5 |
| Agenten-Policy | `agents/openclaw-precheck/openclaw-agent.yml` | Harte Stopps, erlaubte Status, Verbote | `review-checks.yml`, Abschnitte `hard_stops` und `not_allowed` |
| Handoff-Semantik | `agents/openclaw-precheck/handoff-flow.md` | Bedeutung von „grün" | `gate_engine.py`, Funktion `_handoff` |
| Risikostufen | `docs/`-Kursworkflow, Abschnitt 9 | Prüftiefe je `data_risk` | `review-checks.yml`, Abschnitt `risk_policy` |

**Der wichtigste Punkt:** Die PII-Muster werden importiert, nicht kopiert.
Wer `pii_heuristic.py` erweitert, erweitert damit automatisch auch unser
Sicherheits-Gate. Das ist Absicht.

---

## 2. Was wir nach KItomat schreiben

| Pfad | Inhalt | Wer schreibt |
|---|---|---|
| `review/results/<artefakt-id>/<run-id>/` | `review_run.json` und drei Markdown-Berichte | Workflow oder Reviewer |
| `review/intake/<ordnername>/` | Beiträge, die ohne Pull Request eingereicht wurden | Maintainer, von Hand |

`review/intake/` ist ein **Eingang**, kein Ausgang. Wer nicht pushen kann,
gibt seine Dateien beim Maintainer ab, der sie dort ablegt. Der Agent liest
von dort und schreibt nach `review/results/`. Details:
`review/intake/README.md`.

**Sonst nichts.** Keine Änderung an `main`, `prompts/`, `datasets/`,
`models/`, `docs/`, `schemas/`, `tools/` oder `agents/`.

Der Agent setzt **keine** Labels, führt **keinen** Merge aus, ändert **keinen**
Artefaktstatus und erstellt **keine** Releases. Das ist in
`review-checks.yml` unter `not_allowed` festgeschrieben und wird von der
Testsuite geprüft.

---

## 3. Der Abholpunkt

Wer den Review-Stand eines Beitrags programmatisch braucht, liest genau eine
Datei:

```
review/results/<artefakt-id>/<run-id>/review_run.json
```

Struktur siehe `review/schemas/review_run.schema.json`. Die wichtigsten Felder:

```jsonc
{
  "run_id": "rev-20260801-001",
  "artifact": { "id": "...", "path": "models/...", "data_risk": "yellow" },
  "overall": {
    "review_signal": "green | yellow | red",   // die Ampel
    "handoff": "start_trust_review",           // wer ist als nächstes dran
    "status_suggestion": "bronze_candidate",   // Empfehlung, KEINE Vergabe
    "blocking_findings": 0,
    "open_human_decisions": [ "..." ]
  },
  "phases": [ /* 7 Phasen mit Gates */ ],
  "audit": { "human_decision_required": true }
}
```

Drei Zusicherungen, auf die ihr euch verlassen könnt:

1. `audit.human_decision_required` ist **immer** `true`.
2. `overall.status_suggestion` enthält **nie** einen finalen Status
   (`bronze`, `silver`, `gold`). Nur `draft`, `bronze_candidate`,
   `bronze_ready_for_human_decision` oder `post_mvp`.
3. Jeder Befund trägt `produced_by`: `validator` (deterministisch, exakt
   reproduzierbar), `agent` (Sprachmodell, mit `confidence`) oder `human`.

---

## 4. Wenn die Web-Oberfläche den Status anzeigen soll

Die WebUI darf lesen — aber nur den sanitisierten Kurzstatus, nicht den
Volltext der Befunde. Empfohlene Felder:

| Feld | Beispiel | Anzeige |
|---|---|---|
| `overall.review_signal` | `yellow` | Ampel |
| `overall.handoff` | `start_trust_review` | „Trust Review erforderlich" |
| `run_id` | `rev-20260801-001` | Referenz |
| `created_at` | ISO-Zeitstempel | „geprüft am" |
| `artifact.files[].sha256` | Hash | erkennen, ob das Ergebnis veraltet ist |

**Veraltete Ergebnisse erkennen:** Vergleicht die Hashes aus
`artifact.files` mit dem aktuellen Stand. Weichen sie ab, wurde der Beitrag
nach dem Review geändert und das Ergebnis gilt nicht mehr.

**Bitte nicht anzeigen:** einzelne Befundtexte aus `phases[].checks[].finding`
in einer öffentlichen Ansicht ohne Kontext. Sie sind für Reviewer gedacht und
ohne den zugehörigen Prüfpunkt leicht misszuverstehen.

---

## 5. Der Trigger

Der Agent startet über das Label **`review-required`** an einem Pull Request.

Damit das funktioniert, braucht das Hauptrepository:

- ein Label `review-required` (Einstellungen → Labels)
- die beiden Workflows aus `review/workflows/` unter `.github/workflows/`

Beide Workflows sind so gebaut, dass sie **nichts tun**, solange das Label
fehlt. Ihr könnt sie also gefahrlos einspielen.

> **Hinweis zur Begriffsklärung:** Der native GitHub-Status „Review required"
> aus der Branch-Protection ist etwas anderes und lässt sich nicht als
> Workflow-Trigger verwenden. Wir brauchen das Label.

---

## 6. Was wir bewusst nicht tun

| Nicht getan | Warum |
|---|---|
| `pii_heuristic.py` blockierend machen | Das wäre eine Änderung an `main` und würde eure CI beeinflussen. Wir verschärfen nur in unserem Prozess. |
| Labels im Hauptrepo setzen | Der Agent entscheidet nichts. Labels sind Maintainer-Sache. |
| `docs/index.md` aktualisieren | Dafür gibt es den separaten `index-sync`-PR. |
| Artefaktstatus setzen | Ausdrücklich verboten in `openclaw-agent.yml`. |
| In `main` schreiben | No-Impact-Regel des Review-Teams. |

---

## 7. Bekannte Abhängigkeiten und Risiken

**Wenn ihr die Ordnerstruktur ändert** (z. B. `prompts/` umbenennt), bricht
das Pfadmuster in `review_run.schema.json` (`artifact.path`) und in
`stage1a_scan.py`. Beide Stellen sind kommentiert.

**Wenn ihr Pflichtdateien ändert**, muss `review-checks.yml` nachziehen.
Sonst meldet der Agent Dateien als fehlend, die es nicht mehr geben soll.

**Wenn ihr Enum-Werte im Metadatenschema ändert**, ebenso.

**Fork-Beiträge:** Bei Pull Requests aus einem Fork stehen keine Secrets zur
Verfügung. Deshalb die Zwei-Workflow-Konstruktion. Wer sie zu einem Workflow
zusammenfasst, bricht den Agenten für externe Beiträge.

---

## 8. Kontakt und Verantwortung

Das Review-Modul gehört dem Review-Team und lebt in der Branch
`review/pre-review-wizard`. Änderungen am Hauptprojekt, die eine der oben
genannten Lesestellen betreffen, sollten dort angekündigt werden.

Umgekehrt gilt: Wenn ihr etwas am Review-Modul braucht, das es noch nicht
gibt, ist `review/docs/UEBERGABE.md` der richtige Einstieg — dort steht, was
gebaut ist, was fehlt und wie man weiterarbeitet.
