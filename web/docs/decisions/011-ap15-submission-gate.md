# ADR 011: AP15-Einreichungen bleiben privat bis zum menschlichen Merge

## Entscheidung

AP15 nutzt einen getrennten Cloudflare-Submission-Worker mit privatem R2 und D1. Einreichende authentifizieren sich mit GitHub; die bestehende Google-Admin-Site bleibt die Warteschlange für Admins, Maintainer und Reviewer.

Der Worker erhält kein GitHub-Schreibrecht. Ein Maintainer startet nach einer dokumentierten Statusentscheidung die geschützte GitHub-Action manuell. Diese ruft das Paket per GitHub-OIDC ab und erstellt ausschließlich einen Draft-PR. Öffentliche Sichtbarkeit entsteht erst durch den regulären menschlichen Merge nach `main` und das bestehende Website-Deployment.

## Datenschutz-Gate

Produktiv bleibt `SUBMISSIONS_ENABLED=false`, bis Rechtsgrundlage, Datenschutzhinweis, AV-Prüfung, EU-Speicherort und Löschkonzept dokumentiert freigegeben wurden. Nicht veröffentlichte Pakete und Auditdaten werden 30 Tage nach Abschluss gelöscht.

## Folgen

Nur ZIP-Textpakete bis 25 MB werden angenommen. PDF/DOCX bleiben im lokalen AP14-ZIP-Weg. Bestehende Artefakte und ihre Statuswerte werden durch AP15 nicht verändert.
