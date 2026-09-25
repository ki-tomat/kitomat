# Quellen und Bezuege

Diese Datei dokumentiert Quellen, Vorarbeiten und Bezuege des Beratungsmodells zur KI-Hardware-Bedarfsanalyse.

Das Modell nutzt Quellen auf drei Ebenen:

1. Interne Vorarbeiten und eigene Ausarbeitungen: Grundlage fuer Modelllogik, Fragenstruktur, Bewertungsmatrix und Beispiele.
2. Externe Quellen und Referenzen: Grundlage fuer KMU-Kontext, Datenschutz-/Governance-Hinweise, KI-VO-Naehe und technische Architekturbezuege.
3. Dynamisch zu pruefende Quellen: Quellen, die vor konkreten Produktempfehlungen immer aktuell geprueft werden muessen, zum Beispiel Preise, Verfuegbarkeit und technische Datenblaetter.

Das Modell ersetzt keine aktuelle Produkt-, Preis-, Rechts- oder Datenschutzpruefung.

## 1. Interne Vorarbeiten zur Modellentwicklung

Diese Dateien wurden als fachliche Ausgangsbasis fuer den urspruenglichen Custom-GPT-Entwurf und die spaetere Umwandlung in ein Beratungsmodell genutzt. Sie werden zur Nachvollziehbarkeit genannt, aber nicht in das Modellpaket kopiert.

| Datei | Nutzung im Modell | Quellenstatus |
|---|---|---|
| `KI-Hardware-Bedarfsanalyse & Empfehlung.md` | fruehe Beratungs- und Empfehlungslogik | interne Vorarbeit |
| `ki-hardware-checkliste.md` | fruehes Fragengeruest und Checklistenlogik | interne Vorarbeit |
| `ki-hardware-llm-assistent_Hilfe.md` | Hinweise fuer LLM-gestuetzte oder agentische Anwendung | interne Vorarbeit |
| `llm_hardware_umfrage_checkliste_Hilfe.md` | Hilfetext zur Umfrage- und Checklistenlogik | interne Vorarbeit |
| `Prompt fu__r deep research.docx` | Ausgangsprompt fuer Recherche und Quellenaufbau | interne Vorarbeit |
| `Text-4171-BF64-90-0.txt` | fruehe Arbeitsnotiz; nicht Teil des Modellpakets und nicht als externe Quelle genutzt | interne Vorarbeit |

## 2. Projektinterne Ausgangsdokumente

Diese Dateien liegen im Ideenordner des Arbeitspakets und bilden die direkte Grundlage fuer das Modellpaket.

| Datei | Nutzung im Modell |
|---|---|
| `Konsolidierte_KI_Checkliste_und_Umfrage_2026.md` | Grundlage fuer Worksheet, Fragenstruktur und Bedarfsaufnahme |
| `Konsolidiertes_Assistenzdokument_KI-Hardware-Bedarfsanalyse_2026.md` | Grundlage fuer Application Guide, Gespraechslogik, Rueckfragenlogik und Statuskennzeichnung |
| `Bewertungsmatrix_Custom_GPT_KI_Hardware_2026.md` | Grundlage fuer Bewertungsachsen, Scoring 0-3, Profilindikatoren und Ampellogik |
| `Custom_GPT_V2_Beispielfaelle_und_Testfaelle_2026.md` | Grundlage fuer Beispiel 01, Szenario-Triade und Anti-Beispiele |
| `deep-research-report.md` | Grundlage fuer externe Quellen, KMU-Kontext, DSGVO-/KI-VO-Naehe, Hardware-Patterns, Betrieb und Failure Modes |
| `Steuerdokument_Custom_GPT_KI_Hardware_Beratung_2026.md` | Grundlage fuer Guardrails, Pflichtregeln und Abbruchbedingungen |
| `Custom_GPT_Systemprompt_KI_Hardware_Beratung_2026.txt` | Bezug fuer optionale agentische Nutzung, nicht Hauptartefakt |
| `Custom_GPT_Build_Guide_KI_Hardware_Beratung_2026.md` | Bezug fuer Aufbau- und Nutzungsidee eines Berater-Agenten |

## 3. Externe Quellen und Referenzen

Die folgenden Quellen wurden aus dem Deep-Research-Report als relevante externe Referenzen uebernommen. Abrufdatum fuer die Modellfassung: 2026-05-11. Vor produktiver Nutzung sollen rechtliche, technische und preisbezogene Quellen erneut geprueft werden.

| Quelle | Herausgeber | Nutzung im Modell | Abrufdatum | Lizenz-/Nutzungshinweis |
|---|---|---|---|---|
| Destatis: Jedes fuenfte Unternehmen nutzt kuenstliche Intelligenz, https://www.destatis.de/DE/Presse/Pressemitteilungen/2024/11/PD24_444_52911.html | Statistisches Bundesamt | KMU-Kontext, typische Barrieren, Bedarf an strukturierter Bedarfsanalyse | 2026-05-11 | oeffentliche Quelle, Linkreferenz |
| KfW-Digitalisierungsbericht Mittelstand 2024, https://www.kfw.de/PDF/Download-Center/Konzernthemen/Research/PDF-Dokumente-Digitalisierungsbericht-Mittelstand/KfW-Digitalisierungsbericht-2024.pdf | KfW Research | Budget- und Digitalisierungsrealitaet im Mittelstand | 2026-05-11 | oeffentliche Quelle, Linkreferenz |
| EU AI Act / KI-VO, https://eur-lex.europa.eu/eli/reg/2024/1689/oj | Europaeische Union | Governance-, Logging-, Transparenz- und Aufsichtshinweise | 2026-05-11 | offizielle EU-Rechtsquelle |
| DSGVO / GDPR, https://eur-lex.europa.eu/eli/reg/2016/679/oj | Europaeische Union | Datenschutz, TOMs, Datenschutz durch Technikgestaltung, DSFA-Pruefpunkte | 2026-05-11 | offizielle EU-Rechtsquelle |
| NVIDIA Jetson Orin NX Series Data Sheet, https://developer.nvidia.com/downloads/jetson-orin-nx-series-data-sheet | NVIDIA | Edge- und kompakte KI-Hardwareklasse | 2026-05-11 | technische Referenz, keine Produktempfehlung |
| LenovoPress: ThinkSystem NVIDIA L4 24GB PCIe Gen4 Passive GPU, https://lenovopress.lenovo.com/lp1717-thinksystem-nvidia-l4-24gb-pcie-gen4-passive-gpu | LenovoPress | GPU-/Server-Referenzklasse, VRAM- und Betriebsbezug | 2026-05-11 | technische Referenz, keine Produktempfehlung |
| PNY NVIDIA L40S Datasheet, https://www.pny.com/en-eu/File%20Library/Professional/DATASHEET/DATA%20CENTER%20CARDS/PNY-NVIDIA-L40S-Datasheet.pdf | PNY / NVIDIA | GPU-/Workstation- und Serverklasse | 2026-05-11 | technische Referenz, keine Produktempfehlung |
| Dell PowerEdge R760xa Spec Sheet, https://www.delltechnologies.com/asset/de-de/products/servers/technical-support/poweredge-r760xa-spec-sheet.pdf | Dell Technologies | Server-/GPU-Architekturbezug | 2026-05-11 | technische Referenz, keine Produktempfehlung |
| HPE ProLiant DL380 Gen11 Data Sheet, https://www.hpe.com/psnow/generateDDS/HPE%20ProLiant%20DL380%20Gen11%20data%20sheet-PSN1014696069USEN.pdf | HPE | Serverklasse, Betrieb, Infrastruktur | 2026-05-11 | technische Referenz, keine Produktempfehlung |
| HP Z8 G5 Workstation Datasheet, https://h20195.www2.hp.com/v2/GetPDF.aspx/c08498005.pdf | HP | Workstation-Klasse und lokale KI-Workloads | 2026-05-11 | technische Referenz, keine Produktempfehlung |

## 4. Dynamisch zu pruefende Quellen

Konkrete Produkt-, Preis- und Verfuegbarkeitsdaten sind zeitabhaengig. Vor einer konkreten Produktauswahl muessen aktuelle Quellen geprueft werden.

Dazu gehoeren insbesondere:

- offizielle Herstellerseiten,
- aktuelle technische Datenblaetter,
- serioese Haendler- oder Distributorenangebote,
- aktuelle Cloud- und API-Preisseiten,
- aktuelle OpenAI- oder Anbieter-Dokumentation,
- aktuelle rechtliche oder regulatorische Hinweise.

Das Modell darf konkrete Produktempfehlungen nur vorbereiten, wenn Zielklasse, Budget, Betriebsmodell, Datenlage und Lastprofil ausreichend geklaert sind. Vor der finalen Empfehlung ist eine aktuelle Quellenpruefung erforderlich.

## 5. Nicht geeignete Quellen fuer finale Empfehlungen

Fuer finale Produkt- oder Architekturentscheidungen sollten nicht allein genutzt werden:

- veraltete Preislisten,
- reine Marketing-Landingpages ohne technische Daten,
- Forenbeitraege ohne nachvollziehbare Quellen,
- ungepruefte KI-Antworten,
- urheberrechtlich unklare Volltexte,
- interne oder personenbezogene Echtdaten.

## 6. Lizenz- und Datenhinweise

Dieses Modell nutzt keine echten Kundendaten, keine personenbezogenen E-Mails, keine vertraulichen internen Unternehmensdaten und keine Bewerbungs-, Gesundheits- oder Finanzdaten echter Personen.

Die Modellinhalte sind fuer das Community-Projekt als `CC-BY-4.0` vorgesehen. Externe Quellen werden nur als Link, Kurzreferenz und fachlicher Bezug dokumentiert.
