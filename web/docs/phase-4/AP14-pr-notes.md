# AP14-Umsetzungsprotokoll

## Artefaktschutz

- Baseline erstellt: `tools/validators/artifact_baseline.json`
- Geschützte Dateien: 192 unter `prompts/`, `datasets/` und `models/`
- Prüfbefehl: `python3 tools/validators/verify_artifact_baseline.py`
- Ergebnis bei Erstellung: bestanden

## Umsetzung

- Lokale Dateiübernahme, Formularvalidierung, Validator-Port, Generator und ZIP-Weg ergänzt.
- Issue-Import auf gemeinsame Bibliothek umgestellt; keine Löschung oder Statusänderung vorhandener Artefakte.
- Review-Labels werden beim Import bei Bedarf angelegt; importierte Review-PRs werden immer als Draft erstellt.

## Verifikation

- `npm run test:ci`: 46 Tests bestanden
- `npm run build`: bestanden
- `node --test tools/ap14/tests/import-issue.test.mjs`: bestanden
- `unzip -t /tmp/ap14-zip-test.zip`: bestanden
- Python-Metadaten- und Vollständigkeitsvalidatoren: bestanden
- PII-Heuristik: nur bestehende Hinweise, Exit-Code 0
- JS/Python-Paritätsfixture: bestanden
- Browserprüfung: leerer Entwurf zeigt Fehler aus Ebene 1 und 2; keine simulierte Erfolgsmeldung

## End-to-End-Abnahme

- In einem getrennten privaten Testrepository mit ausschließlich synthetischen Inhalten durchgeführt.
- Das Test-Issue erhielt einen unveränderlichen SHA-256-Payload-Hash als Kommentar.
- Der erfolgreiche Draft-PR änderte ausschließlich sieben neue Dateien unter `prompts/ap14-e2e-draft-20260927/`.
- Es gab keinen automatischen Merge, keinen Statuswechsel und keine Änderung am Produktivrepository.
- Zwei durch den Test gefundene Workflow-Voraussetzungen wurden vor der finalen Wiederholung behoben: fehlende Review-Labels werden erzeugt; der erzeugte PR ist ein Draft.
