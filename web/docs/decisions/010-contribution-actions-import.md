# ADR 010: Lokale Beitragsvorbereitung mit kontrolliertem GitHub-Import

## Entscheidung

Die Weboberfläche bleibt statisch. Textdateien werden ausschließlich im Browser gelesen; Binäranhänge werden nur im lokal erzeugten ZIP gespeichert. Ein öffentlicher GitHub-Issue kann ausschließlich ausdrücklich übergebene Textantworten enthalten.

Der Import läuft erst nach einer Maintainer-Freigabe als GitHub Action. Browser und Action teilen Generator und Validatoren. Der Import akzeptiert nur einen streng geparsten, versionierten Payload, speichert dessen Hash im Issue und überschreibt weder bestehende Ordner noch Artefakte.

## Folgen

Es gibt keinen Server, keine API-Schlüssel und keine persistente Upload-Ablage. Ein späterer AP15-Uploaddienst benötigt vorab eine eigene Datenschutz-, Lösch-, Berechtigungs- und Betriebsentscheidung.
