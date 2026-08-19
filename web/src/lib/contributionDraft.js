// AP12 — Contribution-Persistenz (Opt-in) + GitHub-Handoff.
// Datenschutz vor Komfort: Entwuerfe liegen ausschliesslich im sessionStorage
// (nur derselbe Browser-Tab), niemals im localStorage. Datei-Inhalte werden nie
// gespeichert, nur Metadaten (Name, Groesse, Typ).
import { CONTENT_REPO_URL } from './links.js';
import { DATENSCHUTZ_KURZ_DONT } from '../data/content.js';

export const DRAFT_KEY = 'kitomat_contribution_draft_v1';
export const CONTENT_ISSUE_NEW_URL = `${CONTENT_REPO_URL}/issues/new`;

const TYPE_LABELS = {
  prompt: 'Prompt-Paket',
  dataset: 'Quellenpaket',
  industry: 'KMU-/Branchenmodell',
};

export function typeLabel(type) {
  return TYPE_LABELS[type] || type || '—';
}

// Liest den Draft. Defekter oder ungueltiger Storage wird geloescht und darf die
// App nicht zum Absturz bringen.
export function readDraft() {
  let raw;
  try {
    raw = sessionStorage.getItem(DRAFT_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') {
      clearDraft();
      return null;
    }
    return data;
  } catch {
    clearDraft();
    return null;
  }
}

export function writeDraft(draft) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Storage voll oder gesperrt: Persistenz ist optional, die App laeuft weiter.
  }
}

export function clearDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

// Nur Metadaten der Dateien behalten — niemals Inhalte.
export function fileMetadata(files) {
  if (!Array.isArray(files)) return [];
  return files.map((f) => ({ n: f.n, s: f.s, type: f.type }));
}

// Reine Funktion: baut das Handoff-Markdown fuer ein GitHub-Issue.
export function buildHandoffMarkdown(draft) {
  const f = (draft && draft.form) || {};
  const files = draft && Array.isArray(draft.files) ? draft.files : [];
  const val = (v) => (v && String(v).trim() ? String(v).trim() : '—');

  const fileLines = files.length
    ? files.map((x) => `- ${x.n} (${x.type || 'Datei'}, ${x.s || '—'})`).join('\n')
    : '- Keine Dateien angehaengt. Dateien bitte direkt in GitHub erneut auswaehlen.';

  const privacyLines = DATENSCHUTZ_KURZ_DONT.map((d) => `- [ ] Enthaelt nicht: ${d}`).join('\n');

  return `## Beitrag: ${val(f.title)}

**Typ:** ${typeLabel(draft && draft.selectedType)}
**Contributor:** ${val(f.contributor)}
**Sprache:** ${val(f.language)}
**Lizenzstatus:** ${val(f.license)}

### Zielgruppe und Einsatzkontext
- Zielgruppe: ${val(f.audience)}
- Einsatzkontext: ${val(f.context)}

### Szenario-Triade
- Positiv: ${val(f.scenarioPos)}
- Nachbearbeitbar: ${val(f.scenarioRework)}
- Negativ: ${val(f.scenarioNeg)}

### Synthetisches Beispiel
**Input:**
${val(f.sampleIn)}

**Erwarteter Output:**
${val(f.sampleOut)}

### Datenschutz-Checkliste
${privacyLines}

### Dateien
${fileLines}

---
Vorbereitet mit der KItomat-WebUI. Die WebUI bereitet den Beitrag nur vor; die Einreichung erfolgt ueber GitHub (Issue oder Pull Request) im Repository ki-tomat/kitomat.`;
}
