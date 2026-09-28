# AP15: Betrieb der geschützten Direkteinreichung

## Geltungsbereich

Diese Strecke verarbeitet ausschließlich ein ZIP mit UTF-8-Markdown und YAML in exakt einem neuen Pfad `prompts/<id>/`, `datasets/<id>/` oder `models/<id>/`. PDF, DOCX, Binärdateien und echte personenbezogene Daten sind ausgeschlossen. Bestehende Artefakte werden nie überschrieben.

## Vor dem Go-live

`SUBMISSIONS_ENABLED` bleibt `false`, bis die verantwortliche Stelle schriftlich Rechtsgrundlage, Datenschutzhinweis, AV-/Drittlandprüfung, EU-Speicherort, Löschkonzept, Incident-Prozess und Test mit ausschließlich synthetischen Daten freigegeben hat. Erst dann dürfen R2, D1, OAuth-App, Secrets, die Repository-Variable `AP15_SUBMISSIONS_URL` und das geschützte GitHub-Environment `ap15-import` eingerichtet werden.

Der Submission-Worker benötigt private R2- und D1-Bindings sowie die Secrets `GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET`, `SESSION_SECRET` und `INTERNAL_SERVICE_TOKEN`. Der Admin-Worker erhält nur `SUBMISSIONS_API_URL` und das Secret `SUBMISSIONS_INTERNAL_SERVICE_TOKEN`. Geheimnisse gehören nie in `wrangler.toml`, Git oder Issue-Texte.

Vor dem ersten technischen Test mit aktivierter Einreichung setzen zwei verantwortliche Admins gemeinsam `ALLOWED_GITHUB_LOGINS` auf eine dokumentierte, kommagetrennte Liste der zugelassenen Kurs- bzw. Community-Mitglieder. Ohne diese Konfiguration ist jede Einreichung gesperrt. Beim Wechsel von Administratoren werden die neue verantwortliche Person, die Zugriffsrechte und die Freigabeliste im Betriebsprotokoll übergeben; es gibt keine fest im Quellcode hinterlegte Person.

Der öffentliche Web-Build darf den dritten Einreichungsweg erst nach diesem Gate über `VITE_AP15_SUBMISSIONS_ENABLED=true` und `VITE_AP15_SUBMISSIONS_URL=<Worker-URL>` zeigen. Ohne beide Werte bleibt die bestehende Website unverändert und zeigt keine Direkteinreichung.

## Review und Veröffentlichung

1. Die einreichende Person meldet sich mit GitHub an und lädt ein Text-ZIP hoch. Das Paket bleibt privat in R2.
2. Admin, Maintainer oder Reviewer öffnen `/submissions` der Admin-Site, laden das unveränderte private Prüfpaket herunter und prüfen Inhalt, Quellen/Lizenz sowie Datenschutz-/PII-Hinweise. Eine Freigabe ist erst nach Bestätigung aller drei Prüfpunkte möglich. Alternativ fordern sie mit einer begründeten Notiz Änderungen an oder lehnen die Einreichung begründet ab. Die einreichende Person sieht den letzten Hinweis in ihrer privaten Einreichungsübersicht und kann bei einem Änderungswunsch eine neue Revision derselben Artefakt-ID hochladen.
3. Ein berechtigter Maintainer startet **AP15 Import** manuell mit der Einreichungs-ID. Das geschützte Environment muss eine zweite menschliche Freigabe verlangen.
4. Die Action prüft Hash, ZIP, Metadaten, Vollständigkeit, PII-Hinweise und die unveränderte Artefakt-Baseline. Nur danach erstellt sie einen Draft-PR mit `needs_peer_review`.
5. Nach regulärem menschlichen PR-Review und Merge wird der gewählte Status erst in `main` und damit durch den normalen Website-Deploy öffentlich. Der Abschluss-Workflow markiert die private Einreichung als `merged`; bei Schließen ohne Merge als `rejected`.

Nicht veröffentlichte Pakete, Revisionen und Auditdaten werden 30 Tage nach `merged`, `rejected` oder Rückzug per täglichem Worker-Cron entfernt. Blockierte Pakete werden nie gespeichert.

## Störung und Abbruch

Bei einem fehlerhaften Paket, Hash, Validator oder OIDC-Fehler darf kein Workaround per manuellem Kopieren in bestehende Artefaktordner erfolgen. Einreichung zurückziehen oder eine neue Revision innerhalb derselben Einreichung verlangen; danach Ursache dokumentieren. Die Baseline-Prüfung muss vor jedem PR-Merge grün sein.

## Implementierungsnachweis

### Phase 1: Menschliche Vorprüfung

- Geschützter Paketdownload ist nur für authentifizierte Admin-, Maintainer- oder Reviewer-Rollen über die Admin-Site erreichbar; Antworten sind nicht cachebar.
- Freigaben erfordern die drei serverseitig geprüften Bestätigungen zu Inhalt, Quellen/Lizenz und Datenschutz/PII.
- Änderungswünsche und Ablehnungen erfordern eine nachvollziehbare Review-Notiz; Entscheidungen werden separat protokolliert.
- Testbefehle: `npm --prefix sites/submissions test`, `npm --prefix sites/submissions run build`, `npm --prefix sites/admin test`, `npm --prefix sites/admin run build`, `python3 tools/validators/verify_artifact_baseline.py`.
- Ergebnis am 28.09.2026: 9 Submission-Tests, 30 Admin-Tests und beide Builds grün; Baseline für 192 geschützte Dateien unverändert.
- Das Produktivgate bleibt unverändert geschlossen: `SUBMISSIONS_ENABLED=false`; es wurden weder Worker noch R2, D1, OAuth, Secrets oder öffentliche Upload-Links eingerichtet.

### Phase 2: Sichere Übergabe aus dem Contribution-Formular

- Der siebenschrittige Beitragsersteller erzeugt für AP15 ein separates, reines Text-ZIP aus den generierten Markdown- und YAML-Dateien. PDF/DOCX-Anhänge werden technisch nicht übernommen und sperren diesen Weg sichtbar.
- Das lokale vollständige ZIP für den manuellen PR-Weg bleibt unverändert verfügbar und kann weiterhin lokale PDF/DOCX-Anhänge enthalten.
- Erst nach späterer Aktivierung öffnet der dritte Weg das getrennte Submission-Portal mit vorbefüllter Artefakt-ID und Typ. Die Vorbefüllung bleibt auch bei einer nötigen GitHub-Anmeldung erhalten. Die ZIP-Datei, Formularfelder und Anhänge werden nicht per URL oder automatisch aus dem Browser übertragen; die einreichende Person wählt das lokal gespeicherte Text-ZIP dort bewusst aus.
- Testbefehle: `npm --prefix web run test:ci`, `npm --prefix web run build`, `npm --prefix sites/submissions test`, `npm --prefix sites/submissions run build`, `npm --prefix sites/admin test`, `npm --prefix sites/admin run build`, `python3 tools/validators/verify_artifact_baseline.py`.
- Ergebnis am 28.09.2026: 50 Web-Tests, 11 Submission-Tests, 30 Admin-Tests und alle Builds grün; Baseline für 192 geschützte Dateien unverändert.
- Visuelle Prüfung: lokaler Testbetrieb mit nichtproduktiver Beispiel-URL; helles und dunkles Schema sowie 375 px und Desktop geprüft. Der Produktivschalter blieb dabei unverändert `false`.
