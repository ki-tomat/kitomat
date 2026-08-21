# Testfixture: korrekter Beitrag

Sollergebnis: **Sicherheits-Gate offen, Exit-Code 0.**

Dieser Beitrag ist formal vollstaendig und enthaelt keine echten
personenbezogenen Daten. Er enthaelt aber absichtlich Abrufdaten, ein
DOI-Fragment, ein deutsches Datum, eine Jahresspanne und eine Versionsnummer -
also genau die Muster, die eine naive PII-Heuristik faelschlich als
Telefonnummer erkennt.

Die Fixture belegt, dass der Vorfilter greift und korrekte Beitraege nicht
blockiert werden.

## Anwendung

Fuer wen: Entwicklerinnen und Entwickler des Review-Agenten.
Wann: bei jeder Aenderung an der Stufe-1a-Pruefung.
Ergebnis: Gate offen, keine blockierenden Befunde.
Danach pruefen: ob `false_positives_removed` groesser als null ist.
