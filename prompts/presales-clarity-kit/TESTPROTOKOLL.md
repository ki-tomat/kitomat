# Testprotokoll

## Zweck

Dieses Dokument protokolliert durchgeführte Testläufe des Pre-Sales Clarity Kit.

Testläufe werden gegen die Bewertungskriterien aus `evaluation.md` dokumentiert. Das Protokoll dient als Nachweis der praktischen Funktionsfähigkeit vor einer Veröffentlichung.

---

## Testumgebung

| Feld | Angabe |
|---|---|
| Datum | 2026-06-01 |
| Getestetes Profil | `examples/nutzerprofil-beispiel.md` (Malermeister Muster GmbH, Stuttgart – fiktiv) |
| Prompt-Version | `prompt.md` v1.1.0 |
| Getestete Plattform | ChatGPT |
| WebUI-Test | `tools/nutzerprofil-erstellen.html` im Browser |

---

## Test 1: Passende Anfrage – Bürorenovierung (Ampel Gelb)

**Beschreibung:** Kundenanfrage zur Renovierung von ca. 160 m² Bürofläche in Stuttgart-Mitte. Wände streichen, Ausbesserungsarbeiten, Ausführung am Wochenende oder abschnittsweise.

**Input:** `examples/input-01.md`
**Output:** `examples/output-01.md`

### Ergebnis

| Kriterium | ID | Ergebnis | Anmerkung |
|---|---|---|---|
| Startantwort kurz und hilfreich | E-01 | ✓ | Korrekte kurze Startnachricht ohne Kontextübersicht |
| Kontextnutzung | E-02 | ✓ | Nutzerprofil als Rahmen, nicht als Kundenfakt behandelt |
| Leistungsfit erkannt | E-03 | ✓ | Bürorenovierung korrekt als passend eingeordnet |
| Dashboard kompakt und nützlich | E-04 | ✓ | Ampel, 4 offene Punkte, 4 Rückfragen, 1 nächste Aktion |
| Anliegen korrekt erkannt | E-05 | ✓ | Bürorenovierung, Ausbesserungen, Ausführungslogik korrekt erfasst |
| Informationslücken sichtbar | E-06 | ✓ | Objektadresse, Flächen, Untergründe, Zeitfenster klar benannt |
| Rückfragen konkret, max. 6 | E-07 | ✓ | 6 priorisierte Rückfragen (P1–P3) |
| Erstgespräch-Agenda praktisch | E-08 | ✓ | 5 Punkte, handlungsorientiert |
| Keine finale Angebotsformulierung | E-09 | ✓ | Keine Preise, keine verbindlichen Zusagen |
| Antwortmail kurz und passend | E-10 | ✓ | Unter 140 Wörter, kein Rebriefing, kein "Ich habe verstanden" |
| Sensible Daten / Zusagen vermieden | E-11 | ✓ | Keine sensiblen Daten in der Anfrage; korrekt gehandhabt |
| Keine erfundenen Fakten | E-12 | ✓ | Keine Preise, Fristen oder Leistungen erfunden |
| Fachliche Kontrolle sichtbar | E-13 | ✓ | Human Review im Kontrollhinweis explizit |
| Risikologik korrekt | E-14 | ✓ | Keine Risikofälle in dieser Anfrage; korrekt erkannt |

**Bewertung:** 28/28 Punkte – sehr gut nutzbar.
Alle Mindestanforderungen (E-03, E-07, E-09, E-11, E-14 ≥ 1) erfüllt. Kein automatisches Fail-Kriterium ausgelöst.

---

## Test 2: Fachfremde Anfrage – Badsanierung (Ampel Rot)

**Beschreibung:** Kundenanfrage zur kompletten Badsanierung inklusive Sanitär, Elektrik, Fliesen und abschließenden Malerarbeiten. Als Gesamtauftrag fachfremd; Teilleistung Malerarbeiten potenziell relevant.

**Input:** `examples/input-02.md`
**Output:** `examples/output-02.md`

### Ergebnis

| Kriterium | ID | Ergebnis | Anmerkung |
|---|---|---|---|
| Leistungsfit korrekt erkannt | E-03 | ✓ | Gesamtauftrag als fachfremd markiert, Teilleistung transparent benannt |
| Keine Angebotsvorbereitung für fachfremde Leistung | E-09 | ✓ | Kein Angebot für Sanitär, Elektrik oder Fliesen simuliert |
| Sensible Daten / Zusagen vermieden | E-11 | ✓ | Kein Diagnoseversprechen für fachfremde Leistung |
| Risikologik – fachfremde Anfrage korrekt gebremst | E-14 | ✓ | Ampel Rot, klare Abgrenzung, Weiterverweis benannt |
| Antwortmail passend und höflich | E-10 | ✓ | Höfliche Abgrenzung, Teilleistung transparent, kein Rebriefing |
| Interne Handlungsempfehlung klar | – | ✓ | Tabelle mit klaren Ja/Nein-Empfehlungen für Backoffice |

**Bewertung:** Alle relevanten Kriterien erfüllt. Kein automatisches Fail-Kriterium ausgelöst. Korrekte Fail-Safe-Logik bei fachfremder Anfrage bestätigt.

---

## WebUI-Test

| Punkt | Ergebnis |
|---|---|
| Formular vollständig ausfüllbar | ✓ |
| Pflichtfeld-Validierung funktioniert | ✓ |
| Markdown-Generierung korrekt | ✓ |
| Download als nutzerprofil.md funktioniert | ✓ |
| Lokale Verarbeitung (kein Server) | ✓ |
| Datenschutzhinweis sichtbar | ✓ |
| Abschnitt 2 (Allgemeine Regeln) vollständig im Output | ✓ |

Getestetes Ausgabeprofil: `Neue Testergebnisse/nutzerprofil.md` (vollständig generiert und in Test 1 + 2 eingesetzt).

---

## Offene Punkte

- Startverhalten (Prompt-Start ohne Kundenanfrage) in diesen Tests nicht separat dokumentiert; wurde in früheren Versionen des Prompts geprüft und bestätigt.
- Weitere Testfälle (z. B. Risiko-Anfragen mit sensiblen Daten, Widersprüche in Umfang/Budget/Zeit) stehen für zukünftige Testläufe aus.

---

## Fazit

Das Pre-Sales Clarity Kit verhält sich in beiden getesteten Szenarien korrekt und sicher:

- Passende Anfragen werden strukturiert und angebotsvorbereitend behandelt (Ampel Gelb).
- Fachfremde Anfragen werden klar abgegrenzt, ohne fachfremde Leistungen zu simulieren (Ampel Rot).
- Die WebUI funktioniert lokal und erzeugt ein korrekt formatiertes Nutzerprofil.

Status vor Veröffentlichung: **Testphase abgeschlossen.** Manuelle Endabnahme durch Maintainer ausstehend.
