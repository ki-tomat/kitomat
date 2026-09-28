# AP15: Betrieb der geschützten Direkteinreichung

## Geltungsbereich

Diese Strecke verarbeitet ausschließlich ein ZIP mit UTF-8-Markdown und YAML in exakt einem neuen Pfad `prompts/<id>/`, `datasets/<id>/` oder `models/<id>/`. PDF, DOCX, Binärdateien und echte personenbezogene Daten sind ausgeschlossen. Bestehende Artefakte werden nie überschrieben.

## Vor dem Go-live

`SUBMISSIONS_ENABLED` bleibt `false`, bis die verantwortliche Stelle schriftlich Rechtsgrundlage, Datenschutzhinweis, AV-/Drittlandprüfung, EU-Speicherort, Löschkonzept, Incident-Prozess und Test mit ausschließlich synthetischen Daten freigegeben hat. Erst dann dürfen R2, D1, OAuth-App, Secrets, die Repository-Variable `AP15_SUBMISSIONS_URL` und das geschützte GitHub-Environment `ap15-import` eingerichtet werden.

Der Submission-Worker benötigt private R2- und D1-Bindings sowie die Secrets `GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET`, `SESSION_SECRET` und `INTERNAL_SERVICE_TOKEN`. Der Admin-Worker erhält nur `SUBMISSIONS_API_URL` und das Secret `SUBMISSIONS_INTERNAL_SERVICE_TOKEN`. Geheimnisse gehören nie in `wrangler.toml`, Git oder Issue-Texte.

Der öffentliche Web-Build darf den dritten Einreichungsweg erst nach diesem Gate über `VITE_AP15_SUBMISSIONS_ENABLED=true` und `VITE_AP15_SUBMISSIONS_URL=<Worker-URL>` zeigen. Ohne beide Werte bleibt die bestehende Website unverändert und zeigt keine Direkteinreichung.

## Review und Veröffentlichung

1. Die einreichende Person meldet sich mit GitHub an und lädt ein Text-ZIP hoch. Das Paket bleibt privat in R2.
2. Admin, Maintainer oder Reviewer prüfen Inhalt, Lizenz und Datenschutz in `/submissions` der Admin-Site und wählen Bronze, Silber oder Gold.
3. Ein berechtigter Maintainer startet **AP15 Import** manuell mit der Einreichungs-ID. Das geschützte Environment muss eine zweite menschliche Freigabe verlangen.
4. Die Action prüft Hash, ZIP, Metadaten, Vollständigkeit, PII-Hinweise und die unveränderte Artefakt-Baseline. Nur danach erstellt sie einen Draft-PR mit `needs_peer_review`.
5. Nach regulärem menschlichen PR-Review und Merge wird der gewählte Status erst in `main` und damit durch den normalen Website-Deploy öffentlich. Der Abschluss-Workflow markiert die private Einreichung als `merged`; bei Schließen ohne Merge als `rejected`.

Nicht veröffentlichte Pakete, Revisionen und Auditdaten werden 30 Tage nach `merged`, `rejected` oder Rückzug per täglichem Worker-Cron entfernt. Blockierte Pakete werden nie gespeichert.

## Störung und Abbruch

Bei einem fehlerhaften Paket, Hash, Validator oder OIDC-Fehler darf kein Workaround per manuellem Kopieren in bestehende Artefaktordner erfolgen. Einreichung zurückziehen oder eine neue Revision innerhalb derselben Einreichung verlangen; danach Ursache dokumentieren. Die Baseline-Prüfung muss vor jedem PR-Merge grün sein.
