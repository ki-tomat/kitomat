# 06 - Claude und ChatGPT Prompts

Diese Prompts koennen Teilnehmer in Claude, ChatGPT oder einem anderen KI-Tool nutzen.

## Prompt 1 - Artefaktidee klaeren

```text
Ich arbeite an einem Beitrag fuer KItomat, ein oeffentliches GitHub-Projekt fuer reviewfaehige KI-Arbeitsbausteine.

Hilf mir, aus meiner Idee ein klares Hauptartefakt zu machen.

Rahmen:
- Ich darf genau ein Hauptartefakt erstellen: Prompt-Paket, Datensatz-/Quellenpaket oder KMU-/Branchenmodell.
- Keine echten personenbezogenen Daten.
- Keine echten Kundendaten.
- Keine internen Dokumente.
- Keine erfundenen Quellen.
- Fachliche Verantwortung bleibt bei mir.

Meine Idee:
[HIER IDEE EINFUEGEN]

Bitte gib mir:
1. passenden Artefakttyp,
2. Zielgruppe,
3. konkreten Use Case,
4. benoetigte Eingaben,
5. erwartetes Ausgabeformat,
6. Risiken und Grenzen,
7. offene Fragen, die ich fachlich beantworten muss.
```

## Prompt 2 - Prompt-Paket ausarbeiten

```text
Erstelle mit mir ein KItomat Prompt-Paket.

Pflichtdateien:
- prompt.md
- README.md
- metadata.yml
- examples/input-01.md
- examples/output-01.md
- evaluation.md
- failure-modes.md

Wichtig:
- Nutze nur synthetische Beispiele.
- Erfinde keine Quellen.
- Markiere fehlende Informationen als offene Frage.
- Kein finaler Status ueber bronze_candidate.
- Fachliche Freigabe bleibt menschlich.

Use Case:
[HIER USE CASE EINFUEGEN]

Bitte erstelle zuerst eine Dateistruktur und dann einen Entwurf fuer jede Pflichtdatei.
```

## Prompt 3 - Datensatz-/Quellenpaket ausarbeiten

```text
Erstelle mit mir ein KItomat Datensatz-/Quellenpaket.

Pflichtdateien:
- README.md
- metadata.yml
- sources.md
- license.md
- usage.md

Regeln:
- Keine echten personenbezogenen Daten.
- Keine Kundendaten.
- Keine internen Dokumente.
- Keine unklaren Volltexte.
- Nur synthetische Beispiele, Quellenlisten, Vorlagen, Checklisten oder eigene Kurz-Zusammenfassungen.
- Groessere Dateien werden nur als GitHub Release Assets beschrieben und nicht direkt ins Git-Repo gelegt.

Mein Thema:
[HIER THEMA EINFUEGEN]

Bitte liefere:
1. Struktur,
2. Quellen-/Lizenzfragen,
3. synthetisches Beispiel,
4. Nutzungshinweise,
5. Release-Asset-Metadaten falls noetig,
6. offene Trust-Review-Fragen.
```

## Prompt 4 - KMU-/Branchenmodell ausarbeiten

```text
Erstelle mit mir ein KItomat KMU-/Branchenmodell.

Pflichtdateien:
- model.md
- README.md
- metadata.yml
- application-guide.md
- worksheet/ oder canvas/
- examples/example-01.md
- sources.md
- failure-modes.md

Wichtig:
- Die fachliche Substanz kommt von mir.
- Du darfst strukturieren, aber kein Expertenwissen erfinden.
- Markiere fehlende Quellen, Grenzen und Review-Fragen.
- Keine automatisierten Entscheidungen ueber Menschen.

Mein Fachgebiet und Modellansatz:
[HIER BESCHREIBEN]

Bitte erstelle eine klare Struktur und frage mich gezielt nach fehlender fachlicher Substanz.
```

## Prompt 5 - Szenario-Triade erstellen

```text
Hilf mir, fuer mein KItomat-Artefakt eine Szenario-Triade zu erstellen.

Artefakt:
[KURZ BESCHREIBEN]

Erstelle:
1. ein positives synthetisches Szenario,
2. ein nachbearbeitbares Szenario mit offenen Expertenfragen,
3. ein negatives Szenario, das nicht verwendet werden darf oder scheitert.

Zu jedem Szenario:
- Eingabe,
- erwartetes Verhalten,
- moegliches Ergebnis,
- Expertenfeedback,
- Risiko oder Grenze.

Nutze keine echten personenbezogenen Daten.
```

## Prompt 6 - Vorab-Review

```text
Pruefe mein KItomat-Artefakt als strenger, aber hilfreicher Reviewer.

Pruefe:
- Pflichtdateien,
- Vollstaendigkeit,
- Verstaendlichkeit,
- Zielgruppe,
- Beispielqualitaet,
- Szenario-Triade,
- Quellen,
- Lizenzstatus,
- Datenrisiko,
- offene Review-Fragen.

Gib mir:
1. Blocker,
2. wichtige Verbesserungen,
3. kleine Korrekturen,
4. Statusvorschlag: draft oder bronze_candidate,
5. Fragen fuer menschliche Review.

Wichtig: Du darfst keine finale Freigabe geben.

Artefakt:
[HIER INHALT EINFUEGEN]
```

