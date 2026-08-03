# Vorführung des Review-Agenten

Zwei Beiträge, zwei Ausgänge. Zeigt in zwei Minuten, was der Agent tut.

```bash
python3 review/demo/run_demo.py
```

## Was gezeigt wird

| | Beitrag A | Beitrag B |
|---|---|---|
| Name | Angebotstexte für Handwerksbetriebe | Kundenmails auswerten |
| Zustand | sorgfältig erstellt, vollständig | echte Kundenmail als Beispiel eingefügt |
| Sicherheits-Gate | offen | **blockiert** |
| An ein Modell übertragen | ja | **nein** |
| Ausgang | 7 von 7 Gates freigegeben, geht an den Maintainer | zurück an die beitragende Person |

## Die drei Momente, auf die es ankommt

**1. Beitrag B wird gestoppt, bevor etwas passiert.**
Die Ausgabe zeigt: „5 Dateien zur Übertragung vorgemerkt — tatsächlich
gesendet: 0." Der Fehler ist realistisch: Jemand fügt eine echte Kundenmail
als Beispiel ein. Gut gemeint, aber ein Datenschutzproblem.

**2. Der Reviewer kann das nicht wegklicken.**
Die Vorführung versucht es ausdrücklich. Das Gate bleibt blockiert. Nur die
beitragende Person kann den Befund beheben.

**3. Beitrag A endet gelb, nicht grün — und das ist richtig.**
28 Punkte stehen auf „kann ich nicht beurteilen", weil kein Sprachmodell
angebunden ist. Der Reviewer hat sie bestätigt, die Befunde bleiben aber
offen. Mit einem echten Modell würde Beitrag A grün.

## Ergebnisse ansehen

Nach dem Lauf liegen die vollständigen Berichte hier:

```
review/demo/ergebnisse/
  A_erfolgreich/
    review_run.json
    agent_report.md
    contributor_feedback.md
    maintainer_handoff.md
  B_zurueck/
    ...
```

Besonders sehenswert: `B_zurueck/contributor_feedback.md` — die Rückmeldung
nennt Datei und Zeile der gefundenen Stellen, ohne die beitragende Person
abzuwerten.

## Im Cockpit weiterarbeiten

```
review/wizard/KItomat_Review_Wizard_v2.html
```

Öffnen und `review/demo/ergebnisse/B_zurueck/review_run.json` hineinziehen.
Dort sieht man, dass das Gate blockiert ist und der Knopf „Gate freigeben"
gar nicht erst erscheint.

## Hinweis zu den Demo-Daten

Beide Beiträge sind erfunden. Beitrag B enthält absichtlich Adressen mit der
reservierten Endung `.example` und eine erfundene Telefonnummer. Es sind
keine echten Kontaktdaten.
