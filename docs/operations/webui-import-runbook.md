# AP14 WebUI-Import: Maintainer-Runbook

1. Lies den Issue-Überblick und kontrolliere, ob ausschließlich zulässige Inhalte enthalten sind.
2. Setze bei Zustimmung das Label `webui-import`. Nur Maintainer-Rechte lösen den Workflow aus.
3. Der Workflow verankert den Payload-Hash als unsichtbaren Kommentar, validiert das Paket und öffnet einen Draft-PR.
4. Bei Fehlern: Lauf im Issue lesen. Ein geänderter Payload nach einer Freigabe braucht ein neues Issue; ein vorhandener Import-Branch wird nicht überschrieben.
5. Auf dem PR die erforderlichen Checks freigeben, danach Peer- und gegebenenfalls Trust-Review durchführen. Kein automatischer Merge und kein automatischer Statuswechsel.

Der Import kann nur neue Artefaktordner erzeugen. Bestehende Artefakte und deren Status werden nie überschrieben.
