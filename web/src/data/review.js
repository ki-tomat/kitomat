// AP1b — Review-Pipeline: Reviewer, Spalten, Pipeline-Einträge
// 1:1 extrahiert aus design/kitomat-remix-1/data.jsx

// ---------- Review pipeline ----------
export const REVIEWERS = [
  { id: "mira",   name: "Mira K.",      role: "Reviewer",          avatar: "MK", color: "#B82318" },
  { id: "jonas",  name: "Jonas R.",     role: "Reviewer",          avatar: "JR", color: "#2D8F4E" },
  { id: "stefan", name: "Stefan W.",    role: "Trust-Verantw.",    avatar: "SW", color: "#D4A12E" },
  { id: "anna",   name: "Anna L.",      role: "Reviewer",          avatar: "AL", color: "#3D4654" },
  { id: "core",   name: "Core Maintain.", role: "Maintainer",      avatar: "CM", color: "#1A1916" },
];

export const PIPELINE_COLS = [
  { id: "submitted",   title: "Eingereicht",            sub: "neu im Repository" },
  { id: "agent_check", title: "Agenten-Vorprüfung",     sub: "automatische Checks" },
  { id: "peer_review", title: "Peer Review",            sub: "fachliche Prüfung" },
  { id: "trust_review",title: "Trust Review",           sub: "Risiko · Quellen · DSGVO" },
  { id: "maintainer",  title: "Maintainer-Entscheidung",sub: "Status & Merge" },
  { id: "published",   title: "Freigegeben",            sub: "→ Bibliothek" },
];

export const REVIEW_PIPELINE = [
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
