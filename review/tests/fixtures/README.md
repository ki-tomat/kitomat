# Testfixtures fuer den Review-Agenten

Kuenstliche Beitraege mit bekanntem Sollergebnis. Sie belegen, dass die Gates
tun, was sie sollen - und dass sie korrekte Beitraege nicht faelschlich stoppen.

Alle enthaltenen Daten sind erfunden. Adressen nutzen die reservierte Domain
`.example`, die IBAN ist eine oeffentliche Testnummer.

Diese Fixtures liegen unter `review/` und werden von den Validatoren des
Hauptrepositorys nicht erfasst - die scannen ausschliesslich `prompts/`,
`datasets/` und `models/`. Die CI auf `main` bleibt davon unberuehrt.

## Bestand

| Fixture | Typ | Sollergebnis |
|---|---|---|
| `tf-pii-must-block` | prompt_package | Gate **blockiert**, Exit-Code 1. Enthaelt E-Mail und IBAN. Zusaetzlich Abrufdatum, DOI und Zahlenspanne, die der Vorfilter korrekt entfernen muss. |
| `tf-clean-must-pass` | model | Gate **offen**, Exit-Code 0. Formal vollstaendig. Enthaelt bewusst Abrufdaten, DOI, deutsches Datum, Jahresspanne und Versionsnummer - also alle typischen Fehlalarm-Ausloeser. |
| `tf-missing-files` | prompt_package | Gate **offen**, aber `evaluation.md` und `failure-modes.md` werden als fehlend gemeldet. Belegt die Abgrenzung zwischen Sicherheitsproblem und formalem Mangel. |

## Ausfuehren

Einzelne Fixture pruefen:

```bash
python3 review/tools/stage1a_scan.py <repo-root> <artefakt-pfad>
```

Exit-Code 0 = Gate offen, Exit-Code 1 = Gate blockiert.

Gesamte Testsuite:

```bash
python3 review/tests/run_tests.py
```

Mit Regressionspruefung gegen die echten Beitraege:

```bash
python3 review/tests/run_tests.py --repo /pfad/zu/kitomat
```

## Eine Fixture ergaenzen

1. Ordner unter `review/tests/fixtures/<name>/` anlegen, Struktur wie ein
   echter Beitrag des jeweiligen Typs.
2. Ein `README.md` mit dem erwarteten Ergebnis schreiben - ohne das ist eine
   Fixture wertlos, weil niemand weiss, was sie belegen soll.
3. Testfunktion in `review/tests/run_tests.py` ergaenzen.
4. In der Tabelle oben eintragen.

Regel: Nur synthetische Daten. Keine echten Namen, Firmen, Adressen oder
Kontodaten - auch nicht in einer Datei, die "nur ein Test" ist.
