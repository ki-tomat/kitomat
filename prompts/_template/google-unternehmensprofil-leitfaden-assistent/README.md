# README.md

# Google-Unternehmensprofil Leitfaden-Assistent

## Status

**Version:** 0.1.0  
**Status:** Draft  
**Sprache:** Deutsch  
**Kategorie:** Online-Marketing / Lokales Marketing  
**Zielgruppe:** Marketing-Anfänger, kleine lokale Unternehmen, Selbstständige, lokale Dienstleister

---

## Kurzbeschreibung

Dieses Prompt-Paket enthält einen interaktiven Leitfaden-Prompt zur Erstellung, Prüfung und Optimierung eines Google Unternehmensprofils.

Der Prompt führt Nutzer Schritt für Schritt durch einen strukturierten Beratungsprozess. Er unterscheidet zwischen drei Ausgangslagen:

1. Es gibt bereits ein Google Unternehmensprofil.
2. Es gibt noch kein Google Unternehmensprofil.
3. Die Person ist unsicher, ob bereits ein Profil existiert.

Am Ende entsteht je nach Ausgangslage ein Audit, ein Aufbauplan oder ein Klärungsplan mit konkreten nächsten Schritten.

---

## Zweck des Prompt-Pakets

Viele kleine Unternehmen haben entweder noch kein Google Unternehmensprofil oder ein bestehendes Profil, das unvollständig, veraltet oder wenig überzeugend ist.

Dieses Prompt-Paket soll helfen, solche Profile systematisch vorzubereiten oder zu verbessern. Es unterstützt insbesondere bei:

- Basisdaten und Kontaktdaten
- Standort oder Einzugsgebiet
- Zielgruppe und Profilziel
- Positionierung und Kategorie-Logik
- Unternehmensbeschreibung
- Leistungen, Produkte oder Angebote
- Fotos und visuellen Inhalten
- Rezensionen und Antwortverhalten
- Beiträgen und Aktualisierungen
- Richtlinien- und Vertrauensrisiken
- Pflege-Routine

Der Prompt ist nicht als reiner Textgenerator gedacht, sondern als geführter Beratungsassistent.

---

## Enthaltene Hauptdatei

Die wichtigste Datei dieses Prompt-Pakets ist:

```text
prompt.md
```

Diese Datei enthält den direkt nutzbaren Prompt. Nutzer können den Prompt vollständig kopieren und in ein KI-System einfügen.

---

## Geplante Paketstruktur

```text
google-unternehmensprofil-leitfaden-assistent/
├── README.md
├── prompt.md
├── metadata.yml
├── sources.md
├── scenario-triad.md
├── PR_DESCRIPTION.md
├── examples/
│   ├── input-neues-profil-cafe.md
│   ├── output-neues-profil-cafe.md
│   ├── input-audit-friseur.md
│   └── output-audit-friseur.md
├── evaluation.md
└── failure-modes.md
```

---

## Für wen ist der Prompt geeignet?

Geeignet für:

- kleine lokale Unternehmen
- Selbstständige
- Handwerksbetriebe
- Cafés, Restaurants und Einzelhandel
- lokale Dienstleister
- Praxen, Studios und Bildungseinrichtungen
- Personen mit wenig Online-Marketing-Erfahrung
- Community-Mitglieder, die ein strukturiertes Prompt-Paket testen oder weiterentwickeln möchten

Weniger geeignet für:

- große Filialketten mit komplexem Standortmanagement
- stark regulierte Branchen ohne zusätzliche Fachprüfung
- rein digitale Geschäftsmodelle ohne klaren lokalen Bezug
- Fälle, in denen verbindliche Rechtsberatung erwartet wird
- Fälle, in denen eine garantierte Google-Freigabe oder Ranking-Verbesserung erwartet wird

---

## Benötigte Eingaben

Der Prompt beginnt mit fünf Startfragen:

1. Gibt es bereits ein Google Unternehmensprofil?
2. Wie heißt das Unternehmen?
3. In welcher Branche oder Tätigkeit ist das Unternehmen aktiv?
4. Hat das Unternehmen einen festen Standort, ein Einzugsgebiet oder beides?
5. Was ist das wichtigste Ziel des Google Unternehmensprofils?

Je nach Antwort fragt der Prompt anschließend weitere Informationen ab, zum Beispiel:

- Adresse oder Einzugsgebiet
- Telefonnummer
- Website
- Öffnungszeiten
- Leistungen oder Produkte
- Zielgruppe
- vorhandene Unternehmensbeschreibung
- vorhandene Fotos
- Rezensionen und bisheriges Antwortverhalten
- aktuelle Angebote, Neuigkeiten oder Veranstaltungen

Fehlende Informationen werden nicht erfunden, sondern als offen markiert.

---

## Erwartete Ergebnisse

Je nach Modus erzeugt der Prompt unter anderem:

- Einschätzung des aktuellen Profils
- Aufbauplan für ein neues Profil
- Liste fehlender Angaben
- optimierte Unternehmensbeschreibung
- Beschreibung von Leistungen, Produkten oder Angeboten
- Fotoliste mit Prioritäten
- Ideen für Google-Unternehmensprofil-Beiträge
- Vorlagen für Bewertungsanfragen
- Antwortvorlagen für Rezensionen
- Hinweise auf mögliche Richtlinien- oder Vertrauensrisiken
- priorisierte To-do-Liste
- monatliche Pflege-Checkliste

---

## Arbeitsweise des Prompts

Der Prompt arbeitet interaktiv und schrittweise.

Wichtige Prinzipien:

- nicht zu viele Fragen auf einmal
- kurze Erklärung, warum eine Information benötigt wird
- Zwischenzusammenfassungen nach größeren Abschnitten
- klare Trennung zwischen gesicherten Informationen, Annahmen, offenen Fragen und Prüfpunkten
- einfache Sprache für Marketing-Anfänger
- konkrete To-dos statt allgemeiner Marketing-Floskeln

---

## Modi des Prompts

### Modus A: Bestehendes Profil überprüfen

Dieser Modus wird genutzt, wenn bereits ein Google Unternehmensprofil vorhanden ist.

Der Prompt prüft unter anderem:

- Basisdaten
- Eignung und Richtlinien-Risiken
- Kategorie und Positionierung
- Beschreibung
- Leistungen, Produkte oder Angebote
- Fotos
- Rezensionen
- Beiträge
- Pflege-Routine

Am Ende entsteht ein priorisierter Maßnahmenplan.

---

### Modus B: Neues Profil vorbereiten

Dieser Modus wird genutzt, wenn noch kein Google Unternehmensprofil existiert.

Der Prompt hilft bei:

- Prüfung der Ausgangslage
- Sammlung der Basisdaten
- Positionierung
- Vorbereitung der Kategorie-Richtung
- Erstellung einer Unternehmensbeschreibung
- Strukturierung von Leistungen
- Planung der Fotos
- Vorbereitung von Bewertungsmanagement
- Ideen für Startbeiträge
- Pflegeplan nach Veröffentlichung

Am Ende entsteht ein Startplan für die Vorbereitung des Profils.

---

### Modus C: Existenz unklar

Dieser Modus wird genutzt, wenn nicht klar ist, ob bereits ein Profil existiert.

Der Prompt führt durch einfache Prüfschritte:

- Suche nach Unternehmensname und Ort
- Suche in Google Maps
- Prüfung alter Namen oder Schreibweisen
- Prüfung möglicher bestehender Einträge
- Klärung, wer im Unternehmen berechtigt ist

Danach wird in Modus A oder Modus B gewechselt.

---

## Grenzen und Sicherheitsregeln

Der Prompt darf nicht:

- Unternehmensdaten erfinden
- Öffnungszeiten, Adressen, Telefonnummern oder Angebote erfinden
- offizielle Google-Kategorien erfinden
- eine Google-Freigabe garantieren
- bessere Rankings garantieren
- mehr Umsatz, mehr Besucher oder mehr Anrufe versprechen
- Rechtsberatung geben
- gekaufte oder manipulierte Bewertungen empfehlen
- Gegenleistungen für positive Bewertungen vorschlagen
- personenbezogene Kundendaten in öffentlichen Antworten verwenden
- aggressive oder herabwürdigende Antworten auf Rezensionen schreiben
- übertriebene oder nicht belegbare Werbeversprechen formulieren

Bei Unsicherheit soll der Prompt Rückfragen stellen oder eine Prüfung anhand offizieller Google-Richtlinien empfehlen.

---

## Qualitätskriterien

Ein guter Durchlauf mit diesem Prompt sollte folgende Kriterien erfüllen:

| Kriterium | Prüffrage |
|---|---|
| Verständlichkeit | Können Marketing-Anfänger dem Ablauf folgen? |
| Vollständigkeit | Werden die wichtigsten Bereiche eines Unternehmensprofils abgedeckt? |
| Interaktivität | Fragt der Prompt schrittweise und nicht alles auf einmal? |
| Faktentreue | Werden fehlende Angaben als offen markiert? |
| Praxisnutzen | Entsteht am Ende eine konkrete To-do-Liste? |
| Risikoarmut | Werden Richtlinien-, Datenschutz- und Bewertungsrisiken beachtet? |
| Umsetzbarkeit | Sind die Empfehlungen realistisch für kleine Unternehmen? |
| Transparenz | Werden Annahmen und Unsicherheiten sichtbar gemacht? |

---

## Beispielhafte Nutzung

1. Nutzer öffnet `prompt.md`.
2. Nutzer kopiert den vollständigen Prompt.
3. Nutzer fügt den Prompt in ein KI-System ein.
4. Die KI stellt die fünf Startfragen.
5. Nutzer beantwortet die Fragen.
6. Die KI wählt Modus A, B oder C.
7. Der Leitfaden läuft Schritt für Schritt durch den passenden Prozess.
8. Am Ende erhält der Nutzer einen Maßnahmenplan.

---

## Empfohlene menschliche Prüfung

Die Ergebnisse sollten immer von einer Person geprüft werden, besonders bei:

- Unternehmensname
- Adresse
- Telefonnummer
- Website
- Öffnungszeiten
- Kategorieauswahl
- rechtlich sensiblen Aussagen
- Branchenaussagen
- Gesundheits-, Finanz-, Rechts- oder Sicherheitsbezug
- Rezensionen und öffentlichen Antworten
- Aussagen zu Preisen, Garantien oder Verfügbarkeit

Der Prompt unterstützt die Vorbereitung, ersetzt aber keine finale Prüfung durch den Geschäftsinhaber oder fachlich zuständige Personen.

---

## Offizielle Orientierung und Aktualität

Dieses Prompt-Paket orientiert sich an öffentlich zugänglichen Informationen aus der Google-Unternehmensprofil-Hilfe.

Besonders relevant sind unter anderem:

- Einstieg in Google Unternehmensprofile
- Unternehmensprofil bearbeiten
- Unternehmen bei Google bestätigen
- Google-Richtlinien für Unternehmensprofile
- Beiträge in Unternehmensprofilen
- Rezensionen, Fotos, Kontaktdaten und Profilverwaltung

**Hinweis:** Google kann Funktionen, Richtlinien und Oberflächen ändern. Deshalb sollten kritische Punkte immer anhand der aktuellen offiziellen Google-Hilfe geprüft werden.

Stand der fachlichen Orientierung: **11. Mai 2026**

---

## Aktueller Entwicklungsstand

Die Kern-Dateien des Prompt-Pakets sind vollständig erstellt:

```text
README.md
prompt.md
metadata.yml
sources.md
scenario-triad.md
PR_DESCRIPTION.md
examples/input-neues-profil-cafe.md
examples/output-neues-profil-cafe.md
examples/input-audit-friseur.md
examples/output-audit-friseur.md
evaluation.md
failure-modes.md
```

Status: `draft`, bereit für Peer Review, Trust Review und Praxistest.

---

## Empfohlener nächster Schritt

Das Paket kann nun in ein GitHub-Repository hochgeladen und per Pull Request eingereicht werden. Danach sollten Peer Review, Trust Review und ein Praxistest mit den Szenarien aus `scenario-triad.md` durchgeführt werden.

