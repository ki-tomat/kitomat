# Failure Modes

## Zweck

Diese Datei beschreibt typische Fehler, die beim Einsatz des Pre-Sales Clarity Kit vermieden werden sollen.

| ID | Fehlerbild | Risiko | Gegenmaßnahme |
|---|---|---|---|
| FM-01 | Zu viele Dateien nötig | Nutzer verstehen den Ablauf nicht. | Die finale Fassung nutzt nur die benötigten Hauptdateien plus vier Kontextdateien. |
| FM-02 | Prompt wird nicht ausgeführt | Modell behandelt `prompt.md` als Dokument. | Prompt ist direkt ausführbar und README enthält Startnachricht. |
| FM-03 | Zu lange erste Antwort | Nutzer bekommt sichtbare Kontexttabellen statt Arbeitsstart. | Startantwort maximal kurz halten; Check läuft im Hintergrund. |
| FM-04 | Datenschutzhinweis zu lang | Nutzer wird vom eigentlichen Ablauf abgelenkt. | Hinweis auf 1 bis 2 Sätze begrenzen. |
| FM-05 | Dashboard überladen | Bearbeiter erkennt nicht, was zu tun ist. | Dashboard nur mit Ampel, offenen Punkten, Rückfragen, nächster Aktion. |
| FM-06 | Antwortmail mit langem Rebriefing | Mail wirkt künstlich oder distanziert. | Nur kurz bedanken, Situation knapp aufgreifen, Klärung anbieten. |
| FM-07 | Erfundenes Detail | KI ergänzt Budget, Fristen, Systeme oder Leistungen. | Annahmen markieren, Fakten nicht erfinden. |
| FM-08 | Zu frühes Angebot | Output wird verbindlich. | Keine Preise, keine Zusagen, keine Vertragsformulierungen. |
| FM-09 | Zu viele Rückfragen | Output ist im Alltag schwer nutzbar. | Maximal 6 Rückfragen, nur relevante Punkte. |
| FM-10 | Kontext als Kundenfakt | Beispiele oder Nutzerprofil werden als Anfrageinhalt behandelt. | Kontext ist Rahmen, nicht Kundenfakt. |
| FM-11 | Sensible Daten übersehen | Datenschutz- oder Vertraulichkeitsrisiko. | Sensible Daten nicht wiederholen; bei hohem Risiko Rot, bereinigte Anfrage und Human Review. |
| FM-12 | Fachfremde Anfrage wird wie passende Anfrage behandelt | Die KI simuliert Angebotsvorbereitung für Leistungen, die das beschriebene Unternehmen nicht anbietet. | Leistungsfit vor Analyse prüfen; bei fachfremden Anfragen keine fachliche Angebotsvorbereitung zur fremden Leistung simulieren. |
| FM-13 | Regulierte oder entscheidungsnahe Anfrage wird zu sicher beantwortet | Output kann wie Beratung, Bewertung oder Entscheidungsvorlage wirken. | HR, Gesundheit, Recht, Datenschutz, Compliance, Finanzen, Steuern und Bildung als Risikokontext markieren; keine verbindlichen Empfehlungen. |
| FM-14 | Widersprüche werden geglättet | Umfang, Frist, Budget oder Ziel wirken fälschlich stimmig. | Zentrale Widersprüche als P1 markieren und keine Angebotsreife ableiten. |
| FM-15 | Dashboard wirkt trotz Risiko zu handlungsorientiert | Bearbeiter könnte direkt weiterarbeiten, obwohl erst geprüft oder abgebrochen werden muss. | Bei Rot als nächste Aktion Daten bereinigen, Leistungsfit klären, Human Review auslösen oder abgrenzen. |
| FM-16 | Überforderungsfall wird scheinbar vollständig gelöst | Zu viele oder widersprüchliche Quellen werden zu einem belastbar wirkenden Angebot verdichtet. | Output auf Triage, Rückfragen und nächsten sicheren Schritt begrenzen. |
| FM-17 | Fremdmaterial wird ungeprüft übernommen | Wettbewerbertexte, Screenshots, Testimonials oder interne Materialien könnten ohne Rechte-, Quellen- oder Freigabeklärung weiterverwendet werden. | Nicht übernehmen; als Prüfpunkt markieren und Rechte-/Quellenklärung durch die fachlich verantwortliche Stelle verlangen. |

## Kontrollfragen

1. Ist der Dateiumfang verständlich?
2. Ist die erste Antwort kurz?
3. Ist das Dashboard wirklich eine Arbeitsübersicht?
4. Sind Rückfragen priorisiert und knapp?
5. Wurde keine Angebotszusage erzeugt?
6. Ist die Antwortmail natürlich und kundenfreundlich?
7. Bleibt fachliche Kontrolle erforderlich?
8. Wurde der Leistungsfit zur beschriebenen Leistung geprüft?
9. Werden sensible oder vertrauliche Daten nicht unnötig wiederholt?
10. Wird bei regulierten oder entscheidungsnahen Fällen gebremst?
11. Werden Widersprüche klar benannt?
12. Werden Fremdmaterial, Screenshots, Testimonials und Wettbewerberinhalte als Rechte-/Quellenprüfpunkt behandelt?
