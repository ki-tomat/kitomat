# KI-Tomat AP15 Submission Worker

Der Worker nimmt genau ein ZIP mit einem neuen Text-Artefaktpaket an. Er ist in der Produktivkonfiguration standardmäßig deaktiviert und darf erst nach dokumentierter Datenschutzfreigabe aktiviert werden.

## Sicherheitsgrenzen

- GitHub OAuth dient nur zur Zuordnung der einreichenden Person; OAuth-Tokens werden nicht gespeichert.
- R2 ist privat. Nur die geschützte GitHub-Action `ap15-import.yml` kann ein freigegebenes Paket per GitHub-OIDC abrufen.
- Erlaubt sind ausschließlich UTF-8 Markdown- und YAML-Dateien in genau einem Pfad `prompts/<id>/`, `datasets/<id>/` oder `models/<id>/`.
- ZIPs mit Pfadangriffen, Symlinks, Binärdateien, doppelten Namen oder übermäßiger Expansion werden abgewiesen.
- Nicht veröffentlichte Pakete, Revisionen und Auditdaten werden 30 Tage nach Abschluss gelöscht; blockierte Uploads werden nicht gespeichert.
- Reviewer erhalten das aktuelle Paket ausschließlich über die authentifizierte Admin-Site. Freigaben benötigen eine dokumentierte Prüfung von Inhalt, Quellen/Lizenz und Datenschutz/PII; Änderungswünsche und Ablehnungen benötigen eine Notiz.
- Eine Einreichung ist nur für GitHub-Konten möglich, die in der serverseitigen Allowlist `ALLOWED_GITHUB_LOGINS` stehen. Die Liste ist standardmäßig leer: Ohne expliziten Eintrag ist kein Konto zugelassen. Sie enthält nur GitHub-Logins, niemals OAuth-Tokens.

## Betriebsgate

Vor `SUBMISSIONS_ENABLED=true` müssen Rechtsgrundlage, Datenschutzhinweis, Auftragsverarbeitungsprüfung, EU-Speicherort, Löschprozess und verantwortliche Stelle dokumentiert freigegeben sein. Testumgebungen akzeptieren ausschließlich synthetische Daten.

Erforderliche Secrets: `GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET`, `SESSION_SECRET`, `INTERNAL_SERVICE_TOKEN`. Zusätzlich wird vor der Aktivierung die serverseitige Variable `ALLOWED_GITHUB_LOGINS` als kommagetrennte Liste der von den Administratoren freigegebenen GitHub-Logins gesetzt. Eine Änderung dieser Liste ist eine Betriebsänderung und wird dokumentiert.

Der tägliche Cron entfernt Paket, Revisionen und Auditdaten 30 Tage nach Merge, Ablehnung oder Rückzug. Der vollständige Betriebs- und Freigabeablauf steht in [`docs/operations/ap15-submission-runbook.md`](../../docs/operations/ap15-submission-runbook.md). Bis das dort beschriebene Gate erfüllt ist, werden weder Worker noch OAuth/R2/D1 produktiv eingerichtet oder aktiviert.
