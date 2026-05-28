// KItomat — Mockdata (v2)
// Status taxonomy:
//   library:   gold (= freigegeben, in der öffentlichen Bibliothek)
//   pipeline:  submitted | agent_check | peer_review | trust_review | maintainer | published
//   lock:      free | reserved | in_progress | waiting_trust | waiting_maintainer

const DATENSCHUTZ_HINWEIS =
  "Verwende ausschließlich synthetische Beispiele, selbst erstellte Musterfälle oder öffentlich nutzbare Quellen mit klarer Herkunft und Lizenz. Keine echten personenbezogenen Daten, keine Kundendaten, keine internen Unternehmensdokumente und keine anonymisierten Echtdaten.";

const DATENSCHUTZ_KURZ_DONT = [
  "Echte personenbezogene Daten",
  "Echte Kundendaten",
  "Interne Unternehmensdokumente",
  "Anonymisierte Echtdaten",
];
const DATENSCHUTZ_KURZ_DO = [
  "Synthetische Beispiele",
  "Selbst erstellte Musterfälle",
  "Öffentlich nutzbare Quellen mit Lizenz",
];

// ---------- Library: only published / gold ----------
const LIBRARY = [
  {
    id: "kitomat-onboarding-kmu",
    title: "KI-Onboarding-Prompt für KMU",
    type: "prompt", typeLabel: "Prompt-Paket",
    short: "Strukturierter Prompt, der KMU-Mitarbeitende schrittweise in den Umgang mit KI-Assistenten einführt.",
    version: "v1.2.0",
    released: "12.05.2026",
    contributor: "@lena.h",
    language: "DE",
    topic: "Onboarding",
    license: "CC BY 4.0",
    sources: "geprüft",
    risk: "green",
    audience: "KMU-Geschäftsführung & Mitarbeitende ohne KI-Vorerfahrung",
    context: "Erste KI-Berührung im Unternehmen, Kickoff-Workshop, interne Wissenstransfer-Sessions.",
    aiAct: "Begrenztes Risiko – keine biometrischen oder hoheitlichen Anwendungen.",
    failure: [
      "Bei sehr branchenspezifischen Begriffen halluziniert das Modell teilweise Definitionen.",
      "Bei mehr als 10 Themen pro Session bricht der Faden ab.",
    ],
    pos: "Geschäftsführer:in eines Handwerksbetriebs versteht in 20 Minuten, wozu KI im Büroalltag sinnvoll eingesetzt werden kann.",
    nb:  "Mitarbeitende:r mit halbem Vorwissen – Begriffe wie 'Prompt' werden erklärt, einzelne Beispiele müssen ggf. an die Branche angepasst werden.",
    neg: "Wenn jemand bereits Programmiererfahrung hat, wirkt der Einstieg zu langsam – hier eher die Deep-Dive-Variante nutzen.",
    sampleIn:  "Stelle mir eine 20-minütige KI-Einstiegsrunde für ein 8-köpfiges Tischlerei-Team zusammen.",
    sampleOut: "1) Begrüßung & Erwartungsmanagement (3 min)\n2) Was ist ein Sprachmodell – Analogie 'Praktikant mit Bibliothek' (5 min)\n3) Drei Live-Beispiele aus dem Tischlerei-Alltag (8 min)\n4) Grenzen & Datenschutz-Hinweise (3 min)\n5) Abschluss & nächste Schritte (1 min)",
  },
  {
    id: "kitomat-eu-ai-act",
    title: "Quellenpaket: EU AI Act Einstieg",
    type: "dataset", typeLabel: "Quellenpaket",
    short: "Kuratierte Sammlung offizieller Quellen, Erklärartikel und Checklisten zum EU AI Act für Einsteiger:innen.",
    version: "v0.9.1", released: "07.05.2026",
    contributor: "@tarek.k",
    language: "DE / EN", topic: "Recht & Regulierung",
    license: "Quellen jeweils eigene Lizenz – siehe Index",
    sources: "geprüft", risk: "yellow",
    audience: "Consultants, KMU-Verantwortliche, Datenschutzbeauftragte",
    context: "Recherche-Startpunkt vor Mandaten, internes Briefing, Workshop-Vorbereitung.",
    aiAct: "Selbst Gegenstand – das Paket erklärt die Verordnung.",
    failure: ["Nationale Umsetzungsdetails fehlen pro Mitgliedsstaat.", "Quellen sind Stand 2025-Q4 und müssen halbjährlich neu geprüft werden."],
    pos: "Berater:in versteht in 30 Minuten, welche Risikoklassen es gibt und wo offizielle Primärquellen liegen.",
    nb:  "Quellen sind teils auf Englisch – deutsche Zusammenfassung ist vorhanden, Originaltext bleibt verbindlich.",
    neg: "Für Detail-Compliance-Audit nicht ausreichend, dann auf Fachgutachten verweisen.",
    sampleIn:  "Gib mir die drei wichtigsten Primärquellen zum AI Act und je einen Satz, was darin steht.",
    sampleOut: "1) Verordnung (EU) 2024/1689 – Originaltext mit Risikoklassen.\n2) Kommissions-FAQ – kompakte Antworten zu Pflichten.\n3) Leitlinien der nationalen Aufsicht – konkrete Umsetzungshilfen.",
  },
  {
    id: "kitomat-handwerk",
    title: "Branchenmodell: Handwerksbetrieb",
    type: "industry", typeLabel: "KMU-/Branchenmodell",
    short: "Strukturmodell zur Einordnung typischer KI-Use-Cases in einem klassischen Handwerksbetrieb (10–50 MA).",
    version: "v1.0.0", released: "30.04.2026",
    contributor: "@miriam.b",
    language: "DE", topic: "Branchenmodell",
    license: "CC BY 4.0", sources: "geprüft", risk: "green",
    audience: "Berater:innen, Innungen, KMU-Geschäftsführung",
    context: "Strategie-Workshop, Use-Case-Mapping, Förderantragsvorbereitung.",
    aiAct: "Begrenztes Risiko – Use-Cases im operativen Bereich.",
    failure: ["Kein Anspruch auf statistische Repräsentativität – qualitatives Modell.", "Nicht 1:1 auf Industrie übertragbar."],
    pos: "Beratungsteam strukturiert in 45 Minuten 8 mögliche KI-Initiativen entlang der Wertschöpfungskette eines Tischlereibetriebs.",
    nb:  "Manche Use-Cases brauchen eigene Datenerhebung – das Modell liefert das Raster, nicht die Daten.",
    neg: "Für Großbetriebe ab 250 MA ist das Modell zu klein gedacht.",
    sampleIn:  "Welche drei KI-Use-Cases liefern in einem 20-Personen-Tischlereibetrieb am schnellsten messbaren Nutzen?",
    sampleOut: "1) Angebots-Entwurf aus Aufmaß-Foto.\n2) Wissensbasis aus Reparaturberichten.\n3) Marketing-Texte für Social Media.",
  },
  {
    id: "kitomat-review-checkliste",
    title: "Review-Checkliste für Prompt-Pakete",
    type: "prompt", typeLabel: "Prompt-Paket",
    short: "Strukturierte Checkliste, mit der Reviewer:innen Prompt-Pakete systematisch auf Trust-Layer-Kriterien prüfen.",
    version: "v2.1.0", released: "02.05.2026",
    contributor: "@core",
    language: "DE", topic: "Review-Prozess",
    license: "CC BY 4.0", sources: "geprüft", risk: "green",
    audience: "Reviewer:innen, Maintainer:innen",
    context: "Jeder Review-Durchlauf in KItomat.",
    aiAct: "Meta-Artefakt.",
    failure: ["Nicht für Quellenpakete optimiert – dort eigene Variante nutzen."],
    pos: "Neue Reviewer:in kann nach 30 Minuten Einarbeitung einen ersten vollständigen Review-Durchlauf machen.",
    nb:  "Manche Kriterien sind interpretierbar – im Zweifel zweite Reviewer-Meinung einholen.",
    neg: "Ersetzt keinen menschlichen Endabgleich vor Bronze-Freigabe.",
    sampleIn: "—", sampleOut: "—",
  },
  {
    id: "kitomat-vertrieb",
    title: "Prompt-Paket: Discovery-Call Vorbereitung B2B",
    type: "prompt", typeLabel: "Prompt-Paket",
    short: "Strukturiert ein B2B-Erstgespräch mit Pain-Points, offenen Fragen und Next-Best-Action-Vorschlag.",
    version: "v1.0.0", released: "19.04.2026",
    contributor: "@viktoria.s",
    language: "DE / EN", topic: "Vertrieb",
    license: "CC BY 4.0", sources: "geprüft", risk: "green",
    audience: "B2B-Vertrieb, Consultants, Account Manager",
    context: "Discovery-Call-Vorbereitung, Pre-Sales-Briefing.",
    aiAct: "Begrenztes Risiko.",
    failure: ["Bei sehr regulierten Branchen zu generisch – ggf. Branchen-Add-On nötig."],
    pos: "Vertriebler:in betritt den Discovery-Call mit fundierter Hypothese und priorisierten Fragen.",
    nb:  "Funktioniert besser, wenn vorher 3–5 öffentliche Quellen zur Zielfirma eingespielt werden.",
    neg: "Ersetzt keinen guten Zuhörer im Gespräch.",
    sampleIn:  "Bereite einen Discovery-Call mit einem mittelständischen Maschinenbauer (180 MA) zum Thema KI-Wartungsassistenz vor.",
    sampleOut: "5 Hypothesen, 8 priorisierte Fragen, 3 'Stille-Killer'-Pausenfragen, NBA-Vorschlag für Folge-Termin.",
  },
  {
    id: "kitomat-fortbildung",
    title: "Branchenmodell: Weiterbildungsträger",
    type: "industry", typeLabel: "KMU-/Branchenmodell",
    short: "Use-Case-Raster für Akademien und Weiterbildungsträger zur Einordnung möglicher KI-Anwendungen.",
    version: "v1.0.0", released: "11.04.2026",
    contributor: "@elias.t",
    language: "DE", topic: "Bildung",
    license: "CC BY-SA 4.0", sources: "geprüft", risk: "green",
    audience: "Geschäftsführung, Bildungsmanager:innen",
    context: "Strategieworkshop, Förderantragsvorbereitung.",
    aiAct: "Begrenztes Risiko.",
    failure: ["Aktualität bei Förderprogrammen begrenzt."],
    pos: "Bildungsanbieter strukturiert in 60 Minuten KI-Use-Cases entlang Lernpfad und Verwaltung.",
    nb:  "Datenschutz für Teilnehmer:innen muss separat geprüft werden.",
    neg: "Für Hochschulen mit Forschungsfokus zu schmal.",
    sampleIn: "—", sampleOut: "—",
  },
];

// ---------- Review pipeline ----------
const REVIEWERS = [
  { id: "mira",   name: "Mira K.",      role: "Reviewer",          avatar: "MK", color: "#B82318" },
  { id: "jonas",  name: "Jonas R.",     role: "Reviewer",          avatar: "JR", color: "#2D8F4E" },
  { id: "stefan", name: "Stefan W.",    role: "Trust-Verantw.",    avatar: "SW", color: "#D4A12E" },
  { id: "anna",   name: "Anna L.",      role: "Reviewer",          avatar: "AL", color: "#3D4654" },
  { id: "core",   name: "Core Maintain.", role: "Maintainer",      avatar: "CM", color: "#1A1916" },
];

const PIPELINE_COLS = [
  { id: "submitted",   title: "Eingereicht",            sub: "neu im Repository" },
  { id: "agent_check", title: "Agenten-Vorprüfung",     sub: "automatische Checks" },
  { id: "peer_review", title: "Peer Review",            sub: "fachliche Prüfung" },
  { id: "trust_review",title: "Trust Review",           sub: "Risiko · Quellen · DSGVO" },
  { id: "maintainer",  title: "Maintainer-Entscheidung",sub: "Status & Merge" },
  { id: "published",   title: "Freigegeben",            sub: "→ Bibliothek" },
];

const REVIEW_PIPELINE = [
  {
    id: "rp-001",
    title: "Prompt-Paket: Energie-Effizienz für KMU",
    type: "prompt", typeLabel: "Prompt-Paket",
    stage: "submitted", risk: "yellow", sources: "teilweise",
    assignee: null, lock: "free",
    updated: "vor 2 Stunden",
    open: ["Metadaten unvollständig", "Beispieloutput fehlt"],
    agentReport: null,
  },
  {
    id: "rp-002",
    title: "Quellenpaket: KI-Recht für Arztpraxen",
    type: "dataset", typeLabel: "Quellenpaket",
    stage: "agent_check", risk: "red", sources: "offen",
    assignee: null, lock: "free",
    updated: "vor 1 Stunde",
    open: ["Agenten-Report läuft", "Datenschutz-Heuristik prüft"],
    agentReport: { progress: 64 },
  },
  {
    id: "rp-003",
    title: "Prompt-Paket: Redaktionsplan für Social Media",
    type: "prompt", typeLabel: "Prompt-Paket",
    stage: "peer_review", risk: "yellow", sources: "geprüft",
    assignee: "mira", lock: "in_progress", lockedSince: "seit 2 Stunden",
    updated: "vor 18 Minuten",
    open: ["Markenstimme prüfen", "Quellen verifizieren"],
    agentReport: { issues: 2, warnings: 4, ok: 18 },
  },
  {
    id: "rp-004",
    title: "Branchenmodell: Bauverband / Innungen",
    type: "industry", typeLabel: "KMU-/Branchenmodell",
    stage: "peer_review", risk: "yellow", sources: "teilweise",
    assignee: "jonas", lock: "in_progress", lockedSince: "seit 45 Minuten",
    updated: "vor 6 Minuten",
    open: ["Use-Case-Raster gegenchecken"],
    agentReport: { issues: 1, warnings: 3, ok: 22 },
  },
  {
    id: "rp-005",
    title: "Prompt-Paket: Beschwerde-Triage Hotline",
    type: "prompt", typeLabel: "Prompt-Paket",
    stage: "trust_review", risk: "red", sources: "geprüft",
    assignee: "stefan", lock: "waiting_trust", lockedSince: "seit 3 Stunden",
    updated: "vor 1 Stunde",
    open: ["Risiko-Einstufung final klären"],
    agentReport: { issues: 0, warnings: 2, ok: 26 },
  },
  {
    id: "rp-006",
    title: "Quellenpaket: Förderprogramme Digitalisierung",
    type: "dataset", typeLabel: "Quellenpaket",
    stage: "maintainer", risk: "green", sources: "geprüft",
    assignee: "core", lock: "waiting_maintainer",
    updated: "heute, 09:42",
    open: ["Lizenz-Tabelle final prüfen"],
    agentReport: { issues: 0, warnings: 1, ok: 28 },
  },
  {
    id: "rp-007",
    title: "Prompt-Paket: Standortanalyse-Briefing",
    type: "prompt", typeLabel: "Prompt-Paket",
    stage: "submitted", risk: "green", sources: "geprüft",
    assignee: null, lock: "free",
    updated: "vor 12 Stunden",
    open: ["Szenario-Triade prüfen"],
    agentReport: null,
  },
];

// ---------- Admin ----------
const ADMIN_USERS = [
  { name: "Mira Krüger",      handle:"@mira.k",   role: "Reviewer",         email:"mira@kitomat.community", since:"03/2026", artifacts: 2, reviews: 7 },
  { name: "Jonas Reichert",   handle:"@jonas.r",  role: "Reviewer",         email:"jonas@kitomat.community", since:"03/2026", artifacts: 1, reviews: 6 },
  { name: "Stefan Weiß",      handle:"@stefan.w", role: "Trust-Verantw.",   email:"stefan@kitomat.community", since:"02/2026", artifacts: 0, reviews: 11 },
  { name: "Anna Lehmann",     handle:"@anna.l",   role: "Reviewer",         email:"anna@kitomat.community", since:"04/2026", artifacts: 2, reviews: 3 },
  { name: "Lena Holzmann",    handle:"@lena.h",   role: "Contributor",      email:"lena@kitomat.community", since:"04/2026", artifacts: 3, reviews: 1 },
  { name: "Viktoria Schenk",  handle:"@viktoria.s", role: "Contributor",    email:"v.schenk@kitomat.community", since:"04/2026", artifacts: 2, reviews: 0 },
  { name: "Tarek Karim",      handle:"@tarek.k",  role: "Maintainer",       email:"tarek@kitomat.community", since:"02/2026", artifacts: 1, reviews: 14 },
  { name: "Core Maintainer",  handle:"@core",     role: "Admin",            email:"admin@kitomat.community", since:"01/2026", artifacts: 1, reviews: 22 },
];

const ROLE_MATRIX = [
  { capability: "Bibliothek lesen",          roles: ["Nutzer","Contributor","Reviewer","Trust","Maintainer","Admin"] },
  { capability: "Artefakt einreichen",       roles: ["Contributor","Reviewer","Trust","Maintainer","Admin"] },
  { capability: "Review übernehmen",         roles: ["Reviewer","Trust","Maintainer","Admin"] },
  { capability: "Trust Review durchführen",  roles: ["Trust","Maintainer","Admin"] },
  { capability: "Maintainer-Entscheidung",   roles: ["Maintainer","Admin"] },
  { capability: "Rollen verwalten",          roles: ["Admin"] },
  { capability: "GitHub-Integration setzen", roles: ["Admin"] },
  { capability: "Audit-Log einsehen",        roles: ["Maintainer","Admin"] },
];

const AUDIT_LOG = [
  { t:"heute · 14:08", who:"@core",     what:"Status gesetzt",          target:"kitomat-vertrieb → gold" },
  { t:"heute · 12:41", who:"@stefan.w", what:"Trust Review gestartet",  target:"rp-005" },
  { t:"heute · 11:17", who:"@mira.k",   what:"Review übernommen",       target:"rp-003" },
  { t:"heute · 09:42", who:"@core",     what:"Maintainer-Entscheidung", target:"rp-006" },
  { t:"gestern · 18:02", who:"@jonas.r", what:"Review übernommen",      target:"rp-004" },
  { t:"gestern · 16:30", who:"@admin",  what:"Reviewer eingeladen",     target:"@anna.l" },
];

const INTEGRATIONS = [
  { name:"GitHub Repository",        status:"verbunden",  badge:"green",   note:"github.com/ki-tomat/kitomat" },
  { name:"GitHub OAuth Login",       status:"geplant",    badge:"amber",   note:"Phase 3" },
  { name:"E-Mail-Benachrichtigung",  status:"Demo",       badge:"slate",   note:"Mockup für Review-Trigger" },
  { name:"Discord Webhook",          status:"Post-MVP",   badge:"slate",   note:"Channel #kitomat-reviews" },
  { name:"LinkedIn Sharing",         status:"Post-MVP",   badge:"slate",   note:"Erfolgs-Posts pro Artefakt" },
  { name:"GitHub Actions Trust-Gate",status:"in Arbeit",  badge:"amber",   note:"Validatoren werden konfiguriert" },
];

// ---------- Community ----------
const COMMUNITY_THREADS = [
  { title:"Wie tief sollte ein Quellenpaket zu Förderprogrammen recherchiert sein?", author:"@miriam.b", replies: 7, last:"vor 2 Stunden", tag:"Quellenpaket" },
  { title:"Best Practice: Prompt-Paket für Discovery-Calls modularisieren",          author:"@viktoria.s", replies: 12, last:"vor 5 Stunden", tag:"Prompt-Paket" },
  { title:"Branchenmodell Pflege & Bildung – Co-Autor:innen gesucht",                author:"@elias.t",   replies: 4, last:"gestern", tag:"Co-Work" },
  { title:"AI-Act-Risikoeinstufung – wer hat Erfahrung mit Hochrisiko-Use-Cases?",   author:"@stefan.w",  replies: 9, last:"gestern", tag:"Trust Review" },
];

const COMMUNITY_MEMBERS = [
  { name:"Mira K.",     skills:["Prompt-Engineering","B2B-Vertrieb"],     open:"Co-Autor:in", avatar:"MK", color:"#B82318" },
  { name:"Jonas R.",    skills:["Branchenmodelle","Workshop-Design"],    open:"Reviewer",     avatar:"JR", color:"#2D8F4E" },
  { name:"Stefan W.",   skills:["AI-Act","DSGVO"],                       open:"Trust Review", avatar:"SW", color:"#D4A12E" },
  { name:"Elias T.",    skills:["Bildungs-Use-Cases","Förder-Reporting"], open:"Co-Work",      avatar:"ET", color:"#3D4654" },
];

// ---------- Rewards ----------
const REWARD_BADGES = [
  { id:"first_submit",  label:"Erstes Artefakt eingereicht", earned: true,  color:"var(--leaf)"   },
  { id:"gold_artifact", label:"Gold-Artefakt freigegeben",   earned: true,  color:"var(--amber)"  },
  { id:"helpful_rev",   label:"Hilfreicher Reviewer",        earned: true,  color:"var(--tomato)" },
  { id:"trust_contrib", label:"Trust Contributor",           earned: true,  color:"#3D4654"       },
  { id:"streak_3",      label:"Review-Streak 3",             earned: false, color:"var(--slate)"  },
  { id:"community",     label:"Community Supporter",         earned: false, color:"var(--slate)"  },
];

// ---------- FAQ ----------
const FAQ_ITEMS = [
  { q: "Was ist KItomat?",
    a: "KItomat ist ein Community-Projekt unseres KI-Consultant-Kurses. Es sammelt und organisiert reviewfähige KI-Arbeitsbausteine – Prompt-Pakete, Quellenpakete und KMU-/Branchenmodelle. Die WebGUI legt sich als Navigations- und Review-Oberfläche über ein öffentliches GitHub-Repository." },
  { q: "Was ist ein Prompt-Paket?",
    a: "Ein Prompt-Paket bündelt einen oder mehrere getestete Prompts inklusive Beispiel-Input, Beispiel-Output, Zielgruppe, Einsatzkontext und bekannten Grenzen. Es ist mehr als ein einzelner Prompt-Schnipsel – es ist ein nachvollziehbarer, dokumentierter Baustein." },
  { q: "Was ist ein Datensatz-/Quellenpaket?",
    a: "Ein Quellenpaket ist eine kuratierte Sammlung von Primär- und Sekundärquellen zu einem Thema (z. B. EU AI Act). Es enthält keine personenbezogenen oder vertraulichen Daten – nur öffentlich nutzbare Materialien mit Lizenzangaben." },
  { q: "Was ist ein KMU-/Branchenmodell?",
    a: "Ein KMU-/Branchenmodell beschreibt typische KI-Use-Cases entlang der Wertschöpfungskette einer Branche oder Unternehmensgröße. Es liefert ein Raster für Strategie- und Workshop-Arbeit, keine repräsentativen Marktdaten." },
  { q: "Was zeigt die Bibliothek?",
    a: "Die Bibliothek zeigt ausschließlich geprüfte und freigegebene KItomat-Artefakte. Beiträge im Entwurfs- oder Review-Status befinden sich im geschützten Review Center und sind für Reviewer:innen und Admins sichtbar." },
  { q: "Wie läuft der Review-Prozess?",
    a: "Einreichung → automatische Vorprüfung durch Validatoren und KI-Agenten → fachlicher Peer Review → Trust Review bei Risiko-, Quellen- oder Datenschutzfragen → Maintainer-Entscheidung über Status, Merge und Freigabe. Erst danach landet ein Artefakt in der Bibliothek." },
  { q: "Welche Daten darf ich nicht verwenden?",
    a: DATENSCHUTZ_HINWEIS },
  { q: "Wie reiche ich einen Beitrag ein?",
    a: "Im Contribution Center wirst du durch sieben Schritte geführt: Typ wählen, Dateien hochladen, KI-Agent prüfen lassen, Metadaten / Quellen / Szenarien / Datenschutz freigeben und am Ende einen Review Request für GitHub vorbereiten. Der KI-Agent macht Vorschläge – der Mensch entscheidet." },
  { q: "Ersetzen KI-Agenten den menschlichen Review?",
    a: "Nein. KI-Agenten unterstützen beim Erkennen fehlender Metadaten, beim Vorschlagen von Beschreibungen, beim Quellen- und Datenschutz-Check und beim Vorbereiten der Szenario-Triade. Die finale Bewertung erfolgt durch Reviewer:innen, Trust-Verantwortliche und Maintainer:innen." },
  { q: "Was bringt mir ein Beitrag?",
    a: "Du baust ein öffentliches, reviewtes Portfolio an KI-Arbeitsbausteinen auf, erhältst Anerkennungs-Badges, vernetzt dich mit anderen Consultants und stärkst gemeinsam einen vertrauenswürdigen KI-Werkzeugkasten für KMU." },
];

// ---------- Roadmap (now on Über KItomat) ----------
const ROADMAP = [
  { phase: "Jetzt im MVP", color: "tomato",
    items: [
      "Dashboard mit Prozessüberblick",
      "Bibliothek nur mit freigegebenen Artefakten",
      "Contribution Center mit Upload & KI-Agent-Mockup",
      "Review Center mit Pipeline & Reviewer-Sperre",
      "FAQ, Über-Seite, Community-Skizze",
      "GitHub-Verlinkung pro Artefakt",
    ] },
  { phase: "Als Nächstes", color: "amber",
    items: [
      "Echte Issue-/PR-Erzeugung aus dem Contribution Center",
      "GitHub Actions als Trust-Gate-Validatoren",
      "Validierungs- und Risikoreport im Review Center",
      "E-Mail-Benachrichtigung der Reviewer-Gruppe",
    ] },
  { phase: "Später / Post-MVP", color: "slate",
    items: [
      "Login & GitHub-OAuth",
      "Admin-Bereich live",
      "Echter Upload aus der GUI nach GitHub",
      "Discord- und LinkedIn-Anbindung",
      "Belohnungs- und Anerkennungssystem live",
    ] },
  { phase: "Community-Ideen", color: "leaf",
    items: [
      "Community-Forum mit Themen-Threads",
      "Profile mit Skills und Kooperations-Suche",
      "Co-Autorenschaft an Artefakten",
      "Kurs-spezifische Lernpfade",
    ] },
];

window.KitomatData = {
  DATENSCHUTZ_HINWEIS, DATENSCHUTZ_KURZ_DONT, DATENSCHUTZ_KURZ_DO,
  LIBRARY, REVIEWERS, PIPELINE_COLS, REVIEW_PIPELINE,
  ADMIN_USERS, ROLE_MATRIX, AUDIT_LOG, INTEGRATIONS,
  COMMUNITY_THREADS, COMMUNITY_MEMBERS, REWARD_BADGES,
  FAQ_ITEMS, ROADMAP,
};
