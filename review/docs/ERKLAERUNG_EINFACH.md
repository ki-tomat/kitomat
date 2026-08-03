# Was wir gebaut haben — in einfachen Worten

Für Ibrahim, damit du im Meeting jede Frage beantworten kannst.
Ohne Fachbegriffe, wo es geht. Wo einer nötig ist, wird er erklärt.

---

## 1. Das Grundproblem

Bei KItomat reichen Leute Beiträge ein — Prompt-Pakete, Datensätze, Modelle.
Jemand muss prüfen, ob die etwas taugen und ob nichts Verbotenes drin ist.
Das kostet pro Beitrag eine halbe bis eine ganze Stunde.

**Die Idee:** Eine KI macht die Vorarbeit. Ein Mensch entscheidet.

Das Heikle daran: Wenn eine KI prüft, könnte sie sich irren. Und wenn sie
selbst entscheiden dürfte, wäre der ganze Qualitätsprozess wertlos. Also
musste die Lösung so gebaut sein, dass die KI **strukturell nicht
entscheiden kann** — nicht bloß, dass wir es ihr verbieten.

---

## 2. Die Grundidee: Drei Rollen, sauber getrennt

Stell dir eine Führerscheinprüfung vor.

- **Der Fahrlehrer** (= die KI) beobachtet und notiert: „Schulterblick
  vergessen, Einparken gut."
- **Der Prüfer** (= der Reviewer) sieht die Notizen, prüft selbst nach und
  entscheidet.
- **Die Prüfungsordnung** (= die Gates) sagt: Ohne bestandene Theorie darf
  gar nicht erst praktisch geprüft werden. Das ist eine Regel, keine Meinung.

Genau so ist der Agent gebaut:

| Rolle | Wer | Was |
|---|---|---|
| Bewerten | die KI | schaut sich den Beitrag an, notiert Befunde |
| Entscheiden | der Mensch | sieht die Befunde, kann jeden überstimmen |
| Rechnen | die Gates | prüfen mechanisch, ob weitergegangen werden darf |

**Das Wichtigste:** Die Gates fragen die KI nicht. Sie rechnen mit Zahlen und
Häkchen. Eine KI kann ein Gate nicht öffnen — auch wenn sie wollte.

---

## 3. Die sieben Phasen

Der Agent arbeitet einen Beitrag in sieben Schritten ab. Diese Reihenfolge
haben wir nicht erfunden — sie stand schon in deinem Codex-Prompt für den
Peer Review.

| Phase | Was passiert | Wer prüft |
|---|---|---|
| **0** | Sicherheitsprüfung: Sind personenbezogene Daten drin? | Computer, keine KI |
| **1** | Was kann der Beitrag, wo sind blinde Flecken? | KI |
| **2** | Sind alle Pflichtdateien da? | Computer + KI |
| **3** | Stimmen Metadaten, Lizenz, Risikoangaben? | Computer + KI |
| **4** | Ist der Beitrag fachlich nutzbar? | KI |
| **5** | Sind die drei Szenarien da und ehrlich? | Computer + KI |
| **6** | Rückmeldung schreiben, Status vorschlagen | KI |

Nach jeder Phase kommt ein **Gate** — ein Tor. Das Tor öffnet nur, wenn vier
Bedingungen erfüllt sind. Sonst geht es nicht weiter.

---

## 4. Phase 0 ist der wichtigste Teil

Bevor auch nur ein Wort an eine KI geht, läuft eine Prüfung **auf dem
eigenen Rechner**:

- Sind E-Mail-Adressen im Text?
- Kontonummern?
- Steuernummern?

Findet sie etwas, ist Schluss. Der Beitrag geht zurück, und es wurde
**nichts übertragen**. Das ist der Datenschutz-Riegel.

**Warum das wichtig ist für das Meeting:** Der Owner wollte, dass der Agent
automatisch startet. Das ursprüngliche Konzept sagte aber: Erst muss ein
Mensch freigeben, bevor Daten das Projekt verlassen. Beides gleichzeitig
ging nicht.

Unsere Lösung: **Nicht ein Mensch ist der Türsteher, sondern Phase 0.** Sie
läuft automatisch, lokal, ohne Datenübertragung. Der Owner bekommt seine
Automatik, die Schutzregel bleibt.

---

## 5. Die Ampel

Nach der Prüfung steht ein Ergebnis fest:

| Farbe | Bedeutung | Was passiert |
|---|---|---|
| **Rot** | Es gibt einen echten Blocker | Zurück an die einreichende Person |
| **Gelb** | Nachbesserung oder Trust Review nötig | Je nach Befund |
| **Grün** | Nichts Blockierendes gefunden | Reviewer kann freigeben |

**Grün heißt nicht „freigegeben".** Grün heißt: „bereit, dass ein Mensch
freigibt." Diese Formulierung steht wörtlich schon in den KItomat-Unterlagen,
wir haben sie unverändert übernommen.

Wenn jemand im Meeting fragt: *„Und wenn die KI grün sagt, ist es dann
durch?"* — Antwort: **Nein.** Grün ist eine Empfehlung. Ohne Unterschrift
eines Reviewers passiert nichts.

---

## 6. Was der Reviewer im Cockpit tut

Das Cockpit ist eine einzelne HTML-Datei. Doppelklick, fertig — kein Server,
keine Installation.

Der Reviewer sieht links die sieben Phasen mit Ampeln, rechts die Befunde.
Er kann drei Dinge:

**Bestätigen.** Punkte, die die KI nicht beurteilen konnte, muss ein Mensch
abzeichnen. Solange das nicht passiert, bleibt das Gate zu.

**Übersteuern.** Jeden einzelnen Befund kann er ändern — in beide Richtungen.
Die KI sagt „in Ordnung", er sagt „nein, das ist ein Blocker"? Geht. Umgekehrt
auch. Eine Begründung ist Pflicht und landet im Protokoll.

**Freigeben.** Wenn alle Bedingungen erfüllt sind, unterschreibt er das Gate
und die nächste Phase öffnet.

---

## 7. Warum der Agent im Moment „nichts weiß"

Wenn du die Vorführung machst, wirst du viele Punkte mit
`not_assessable` sehen — „kann ich nicht beurteilen".

Der Grund: Es ist **noch kein Sprachmodell angebunden.** Statt dessen läuft
ein Platzhalter, der nur nach Stichwörtern sucht. Er gibt ehrlich zu, wenn er
etwas nicht beurteilen kann, statt zu raten.

**Das ist Absicht, kein Mangel.** Es bedeutet:

- Das Paket ist sofort ausprobierbar, ohne Kosten und ohne Anbieterentscheidung.
- Wer es übernimmt, sieht sofort, was funktioniert.
- Der Owner kann in Ruhe über Anbieter und Budget entscheiden.

Sobald ein echtes Modell dranhängt, füllen sich die 40 offenen Punkte mit
echten Befunden. Der ganze Rest bleibt unverändert — das ist der Sinn der
Trennung.

---

## 8. Warum das Testen so wichtig war

Der Owner wollte „harte Gates mit End-to-End-Tests". Das klang nach
Bürokratie. Es hat aber vier echte Fehler gefunden:

**Fehler 1 — Abrufdaten als Telefonnummern.**
Ein Datum wie `2026-05-09` sieht für eine einfache Suchregel aus wie eine
Telefonnummer. Quellen müssen aber ein Abrufdatum haben. Ergebnis: Drei von
sieben echten Beiträgen wären blockiert worden — ausgerechnet die sauber
zitierten.

**Fehler 2 — „Weiß ich nicht" als Blocker.**
Wenn die KI etwas nicht beurteilen konnte, wurde das wie ein schwerer Mangel
behandelt. Jeder Lauf hätte blockiert.

**Fehler 3 — Der Disclaimer als Rechtsberatung.**
Ein guter Beitrag schreibt „ersetzt keine Rechtsberatung". Die Suchregel fand
das Wort „Rechtsberatung" und meldete einen Verstoß. **Der sorgfältige
Beitrag wäre durchgefallen, der nachlässige nicht.**

**Fehler 4 — Cockpit und Bericht uneins.**
Der Bericht sagte gelb, das Cockpit rot. Der Reviewer hätte eine falsche
Ampel gesehen.

**Der gemeinsame Nenner:** Jede dieser Regeln war formal korrekt und
inhaltlich falsch. Kein einziger wäre ohne Lauf an echtem Material
aufgefallen.

Das ist deine stärkste Botschaft im Meeting: Die Tests sind kein Zierrat,
sie haben vier Fehler abgefangen, die im Betrieb Vertrauen gekostet hätten.

---

## 9. Was wir nicht verändert haben

Kein einziger Ordner außerhalb von `review/`. Nicht `main`, nicht
`prompts/`, nicht `datasets/`, nicht `models/`, nicht die Validatoren, nicht
die Web-Oberfläche.

Wo wir schärfer sein wollten als das Hauptprojekt — die PII-Prüfung blockiert
bei uns, im Hauptprojekt warnt sie nur — haben wir das **in unserem Bereich**
gemacht, nicht dort. Die anderen Teilnehmer merken von uns nichts.

---

## 10. Häufige Fragen und kurze Antworten

**„Kann die KI etwas durchwinken?"**
Nein. Sie kann keinen Status vergeben und kein Gate öffnen. Beides ist im
Code ausgeschlossen und durch Tests belegt.

**„Was, wenn die KI sich irrt?"**
Der Reviewer sieht jeden Befund und kann jeden ändern. Mit Begründung, die
im Protokoll landet.

**„Was kostet das?"**
Aktuell nichts — es läuft ohne Sprachmodell. Mit Modell entstehen Kosten pro
Prüfung. Der Agent startet nur auf ausdrückliche Anforderung per Label, und
es gibt Größenbegrenzungen.

**„Was ist mit Datenschutz?"**
Beiträge mit erkennbar personenbezogenen Daten werden gestoppt, bevor etwas
übertragen wird. Das läuft lokal.

**„Kann jemand anderes daran weiterarbeiten?"**
Ja. `docs/UEBERGABE.md` beschreibt Stand, Lücken und nächste Schritte und
enthält einen fertigen Einstiegsprompt für eine KI.

**„Was fehlt noch?"**
Ein echtes Sprachmodell, und die GitHub-Workflows sind geschrieben, aber nie
gelaufen. Beides steht offen dokumentiert.

**„Warum sieben Phasen?"**
Weil das der Ablauf ist, den du schon manuell mit Codex gefahren hast. Wir
haben ihn automatisiert, nicht neu erfunden.

---

## 11. Die drei Sätze, wenn du nur drei sagen darfst

1. **Der Agent prüft, der Mensch entscheidet, das Gate rechnet** — und diese
   Trennung ist im Code erzwungen, nicht nur zugesagt.
2. **Nichts verlässt das Projekt ungeprüft** — die Sicherheitsprüfung läuft
   lokal, bevor eine KI den Beitrag sieht.
3. **53 Tests laufen grün** — und haben beim Bauen vier Fehler gefunden, die
   im Betrieb Vertrauen gekostet hätten.
