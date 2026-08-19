# Beispieloutput 01

## Hinweis

Dieser Beispieloutput basiert auf einem echten Testlauf mit der Kundenanfrage aus `examples/input-01.md` und dem Beispielprofil `examples/nutzerprofil-beispiel.md` (Malermeister Muster GmbH).

Das HTML-Dashboard wird je nach Plattform als separate Datei, Artefakt oder HTML-Codeblock ausgegeben. Inhaltlich soll es nur Ampel, Einordnung, offene Punkte, Rückfragen, nächste Aktion und Kontrollhinweis enthalten.

# Pre-Sales Clarity Kit

## 0. Aktionsdashboard

```html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pre-Sales Aktionsdashboard</title>
  <style>
    :root {
      --bg: #f7f5f0; --card: #ffffff; --text: #1f2933; --muted: #5f6875;
      --accent: #1f7a75; --soft: #e3eee9; --yellow: #d9942b;
      --line: #d8ddd6; --shadow: 0 14px 40px rgba(31,41,51,.08);
    }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--text); line-height: 1.5; padding: 32px 18px; }
    .wrap { max-width: 980px; margin: 0 auto; background: var(--card); border: 1px solid var(--line); border-radius: 22px; box-shadow: var(--shadow); overflow: hidden; }
    header { padding: 28px 30px 22px; border-bottom: 1px solid var(--line); display: flex; gap: 18px; justify-content: space-between; align-items: flex-start; }
    h1 { margin: 0 0 8px; font-size: clamp(1.35rem, 2vw, 1.8rem); letter-spacing: -.02em; }
    .sub { color: var(--muted); margin: 0; max-width: 680px; }
    .badge { white-space: nowrap; background: rgba(217,148,43,.12); color: #8a5616; border: 1px solid rgba(217,148,43,.35); border-radius: 999px; padding: 8px 14px; font-weight: 700; font-size: .92rem; }
    main { padding: 26px 30px 30px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 18px; }
    .box { background: #fbfcfb; border: 1px solid var(--line); border-radius: 18px; padding: 18px; }
    h2 { margin: 0 0 12px; font-size: 1rem; color: var(--accent); }
    ul, ol { margin: 0; padding-left: 1.1rem; }
    li { margin: 7px 0; }
    .next { background: var(--soft); border: 1px solid #c6ddd5; border-radius: 18px; padding: 16px 18px; margin-top: 18px; }
    .next strong { color: var(--accent); }
    footer { margin-top: 18px; color: var(--muted); font-size: .9rem; border-top: 1px solid var(--line); padding-top: 14px; }
    @media (max-width: 720px) { body { padding: 18px 12px; } header { flex-direction: column; padding: 22px; } main { padding: 22px; } .grid { grid-template-columns: 1fr; } .badge { align-self: flex-start; } }
    @media print { body { background: #fff; padding: 0; } .wrap { box-shadow: none; border-radius: 0; border: 0; } }
  </style>
</head>
<body>
  <section class="wrap" aria-label="Pre-Sales Aktionsdashboard">
    <header>
      <div>
        <h1>Pre-Sales Aktionsdashboard</h1>
        <p class="sub">Die Anfrage ist leistungsnah und gut verständlich; für eine belastbare Angebotsvorbereitung fehlen vor allem Objekt- und Ausführungsdetails.</p>
      </div>
      <div class="badge">Ampel: Gelb</div>
    </header>
    <main>
      <div class="grid">
        <div class="box">
          <h2>Offene Punkte</h2>
          <ul>
            <li>Objektadresse, Etage und Zugänglichkeit</li>
            <li>Zustand der Untergründe und Umfang der Ausbesserungen</li>
            <li>Gewünschte Ausführungslogik: Wochenende oder abschnittsweise</li>
            <li>Flächenangaben je Raum sowie Türen, Zargen, Decken oder Sonderflächen</li>
          </ul>
        </div>
        <div class="box">
          <h2>Rückfragen</h2>
          <ol>
            <li>Wo genau befindet sich das Objekt in Stuttgart-Mitte?</li>
            <li>Sollen nur Wände oder auch Decken, Türen, Zargen oder Heizkörper gestrichen werden?</li>
            <li>Gibt es Fotos, Grundriss oder Raumliste mit Flächenangaben?</li>
            <li>Welche Zeitfenster sind am Wochenende oder abschnittsweise möglich?</li>
          </ol>
        </div>
      </div>
      <div class="next">
        <strong>Nächste Aktion:</strong> Kurzen Besichtigungstermin vereinbaren und vorab Fotos, Raumliste sowie gewünschte Ausführungsfenster anfordern.
      </div>
      <footer>
        Kontrollhinweis: Noch kein finales Angebot ableiten; Leistungsumfang, Untergründe, Terminfenster und Ausführungsbedingungen fachlich prüfen.
      </footer>
    </main>
  </section>
</body>
</html>
```

## 1. Kurzdiagnose

Es geht um die Renovierung einer gewerblich genutzten Bürofläche in Stuttgart-Mitte mit ca. 160 m², mehreren Büroräumen, Flur, Empfangsbereich und kleineren Ausbesserungsarbeiten. Die Anfrage ist bereits gut vorstrukturiert, aber noch nicht ausreichend für eine konkrete Angebotsvorbereitung. Zuerst sollten Leistungsumfang, Objektzustand, Ausführungsfenster und Besichtigung geklärt werden. Ein Vor-Ort-Termin ist sinnvoll, weil Untergründe, Bohrlöcher, Nutzungssituation und Ablauf im laufenden Bürobetrieb geprüft werden müssen.

## 2. Angebotsklarheit

**Ampel: Gelb**

- Der Leistungsfit ist gegeben: Büro-/Gewerbeflächenrenovierung, Innenanstrich und kleinere Ausbesserungen liegen im beschriebenen Leistungsbereich.
- Die Fläche, Raumarten, grobe Arbeiten und gewünschter Zeitraum sind genannt.
- Für eine Angebotsvorbereitung fehlen noch Objektadresse, genaue Flächen-/Raumaufteilung, Untergrundzustand, gewünschte Nebenleistungen und Ausführungslogik.
- Keine erkennbaren sensiblen Daten, Fremdmaterialien, regulierte Nähe oder zentrale Widersprüche in der Anfrage.

## 3. Wichtigste offene Punkte

| Priorität | Offener Punkt | Warum wichtig? |
|---|---|---|
| P1 | Besichtigung und Objektadresse | Für realistische Einschätzung von Untergründen, Zugänglichkeit, Schutzmaßnahmen und Ablauf. |
| P1 | Exakter Leistungsumfang | Klärung, ob nur Wände oder auch Decken, Türen, Zargen, Heizkörper, Sockel oder weitere Flächen betroffen sind. |
| P1 | Ausführungszeitfenster | Wochenende oder abschnittsweise Ausführung beeinflusst Planung, Personal, Ablauf und Machbarkeit. |
| P2 | Zustand der Flächen | Bohrlöcher, Gebrauchsspuren, Risse oder stärkere Schäden verändern Vorarbeiten und Materialbedarf. |
| P2 | Akzentwand im Empfangsbereich | Farbton, Fläche, Untergrund und gewünschte Wirkung müssen vorab geklärt werden. |
| P3 | Vorhandene Unterlagen | Fotos, Grundriss oder Raumliste erleichtern die Vorbereitung des Besichtigungstermins. |

## 4. Rückfragen

| Priorität | Rückfrage | Zweck |
|---|---|---|
| P1 | Wie lautet die Objektadresse und in welcher Etage befinden sich die Büroräume? | Klärung von Anfahrt, Einzugsgebiet, Zugang und Logistik. |
| P1 | Sollen ausschließlich Wände gestrichen werden oder auch Decken, Türen, Zargen, Heizkörper oder weitere Flächen? | Abgrenzung des Leistungsumfangs. |
| P1 | Ist eine Besichtigung vor Ort in den nächsten Tagen möglich? | Fachliche Prüfung von Zustand, Aufwand und Ablauf. |
| P2 | Gibt es Fotos, einen Grundriss oder eine Raumliste mit ungefähren Flächen je Raum? | Vorbereitung und schnellere Einschätzung. |
| P2 | Welche Zeitfenster wären für Wochenendarbeit oder abschnittsweise Ausführung möglich? | Planung im laufenden Bürobetrieb. |
| P3 | Ist der Empfangsbereich bereits farblich konkret geplant oder wird Beratung zur Akzentwand gewünscht? | Klärung von Gestaltungsanteil und Materialauswahl. |

## 5. Erstgespräch

| Abschnitt | Ziel |
|---|---|
| Anfrage kurz einordnen | Ziel, Umfang und gewünschtes Ergebnis bestätigen. |
| Objekt und Flächen klären | Räume, Flächen, Etage, Zugänglichkeit und Nutzungssituation erfassen. |
| Leistungsumfang abgrenzen | Wände, Decken, Ausbesserungen, Akzentwand und mögliche Zusatzflächen klären. |
| Ablauf und Zeitfenster prüfen | Wochenende, abschnittsweise Ausführung, 4–6 Wochen und interne Einschränkungen besprechen. |
| Nächsten Schritt festlegen | Besichtigungstermin, Unterlagenversand oder interne Prüfung vereinbaren. |

## 6. Angebotsvorbereitung

**Mögliche Leistungsbereiche**

- Innenanstrich von Büro-, Besprechungs-, Flur- und Empfangsflächen,
- kleinere Spachtel- und Ausbesserungsarbeiten,
- weiße Wandbeschichtung,
- farbige Akzentwand im Empfangsbereich,
- Schutz-/Abdeckarbeiten im genutzten Büro,
- organisatorische Abstimmung für Wochenend- oder Abschnittsausführung.

**Noch zu klärende Angebotsbausteine**

- genaue zu bearbeitende Flächen,
- Anzahl und Zustand der Räume,
- Wandflächen versus Decken oder weitere Bauteile,
- Umfang der Bohrloch- und Gebrauchsspuren-Ausbesserung,
- Material-/Farbwünsche,
- Ablauf bei laufendem Bürobetrieb.

**Vor einem Angebot fehlen**

- Objektadresse und Zugänglichkeit,
- Fotos, Grundriss oder Raumliste,
- Entscheidung, ob Decken/weitere Flächen enthalten sind,
- gewünschte Ausführungsfenster,
- Einschätzung der Untergründe vor Ort,
- konkrete Abstimmung zur Akzentwand.

## 7. Antwortmail-Entwurf

**Betreff:** Ihre Anfrage zur Renovierung der Büroräume

Guten Tag,

vielen Dank für Ihre Anfrage. Eine kurze Vorstrukturierung hilft, Umfang, Zeitfenster und den passenden nächsten Schritt realistisch einzuschätzen. Gerade bei genutzten Büroräumen ist es sinnvoll, Ausführung am Wochenende oder abschnittsweise vorab sauber zu planen.

Für die Angebotserstellung wären folgende Informationen hilfreich: die genaue Objektadresse, ob nur Wände oder auch Decken, Türen, Zargen oder Heizkörper bearbeitet werden sollen, Fotos oder ein Grundriss mit Raumübersicht sowie Hinweise zum Zustand der Flächen und zum gewünschten Zeitfenster.

Ein Besichtigungstermin wäre in diesem Fall sinnvoll, damit Untergründe, Ausbesserungen und Ablauf vor Ort eingeschätzt werden können. Ich freue mich, die offenen Punkte mit Ihnen zu klären und einen passenden Termin abzustimmen.

Freundliche Grüße

## 8. Kontrolle

- Keine Fakten, Preise, Termine oder Machbarkeitszusagen erfunden.
- Kein finales Angebot und keine verbindliche Aufwandseinschätzung erstellt.
- Sensible Daten, Fremdmaterialien, Leistungsfit und Risikokontext geprüft; keine auffälligen Risiken erkannt.
- Vor Versand oder Angebotsableitung fachlich, datenschutzrechtlich und rechtlich kontrollieren.
