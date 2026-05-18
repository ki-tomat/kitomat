# 01 - Projektueberblick: KItomat

## Was ist KItomat?

KItomat ist ein oeffentliches GitHub-Projekt fuer wiederverwendbare KI-Arbeitsbausteine.

Es geht nicht darum, moeglichst viele Prompts zu sammeln. Es geht darum, hochwertige, nachvollziehbare und reviewfaehige Pakete bereitzustellen, die andere Menschen verstehen, pruefen und verantwortungsvoll nutzen koennen.

## Was entsteht?

Es gibt drei Arten von Hauptartefakten:

1. Prompt-Pakete
2. Datensatz-/Quellenpakete
3. KMU-/Branchenmodelle

Jede teilnehmende Person oder jedes Team arbeitet zuerst an genau einem Hauptartefakt.

## Warum ist das anders als ein normaler Prompt?

Ein KItomat-Beitrag enthaelt nicht nur eine Anweisung an eine KI. Er enthaelt auch:

- Zielgruppe
- Einsatzkontext
- benoetigte Eingaben
- erwartetes Ausgabeformat
- Beispiele
- Szenario-Triade
- Quellen oder Quellenstatus
- Grenzen und Risiken
- Trust-Layer-Metadaten
- menschliche Review-Fragen

## Was ist die Szenario-Triade?

Jedes gute Artefakt soll zeigen:

1. Positives Szenario: funktioniert mit klaren, synthetischen Eingaben.
2. Nachbearbeitbares Szenario: funktioniert teilweise, braucht aber Expertenkorrektur.
3. Negatives Szenario: darf so nicht verwendet werden oder fuehrt zu falschen Ergebnissen.

Das Expertenfeedback zu diesen Szenarien ist besonders wichtig. Dort wird sichtbar, was ein Fachmensch erkennt, was ein generisches KI-Modell leicht uebersieht.

## Was ist nicht erlaubt?

Nicht in KItomat einbringen:

- echte personenbezogene Daten
- echte Kundendaten
- interne Unternehmensdokumente
- Bewerbungsunterlagen echter Personen
- Gesundheitsdaten
- vertrauliche Finanzdaten
- personenbezogene E-Mails
- unklare Volltextkopien
- anonymisierte interne Echtdaten
- rechtliche, medizinische, HR- oder Finanzentscheidungen ohne menschliche Pruefung

## Wie wird veroeffentlicht?

Das Repo ist oeffentlich, aber `main` ist geschuetzt:

- Pull Request ist Pflicht.
- Validatoren muessen laufen.
- Mindestens eine menschliche Review ist Pflicht.
- Maintainer entscheiden Merge und Release.

OpenClaw, Hermes, Codex, Claude oder ChatGPT koennen helfen, aber sie ersetzen keine menschliche Freigabe.

