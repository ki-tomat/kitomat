import { TYPES } from './model.js';

const REQUIRED_FILES = {
  prompts: ['prompt.md', 'README.md', 'metadata.yml', 'examples/input-01.md', 'examples/output-01.md', 'evaluation.md', 'failure-modes.md'],
  datasets: ['README.md', 'metadata.yml', 'sources.md', 'license.md', 'usage.md'],
  models: ['model.md', 'README.md', 'metadata.yml', 'application-guide.md', 'examples/example-01.md', 'sources.md', 'failure-modes.md'],
};
const PLACEHOLDERS = ['TODO', 'TBD', 'lorem ipsum', 'Replace with', 'replace-with', 'pXX'];
const ALLOWED = { data_risk: ['green', 'yellow', 'red'], ai_act_proximity: ['none', 'transparency', 'high_risk_adjacent', 'prohibited_check', 'unclear'], sources_status: ['not_required', 'missing', 'provided', 'checked', 'unverified'], license_status: ['declared', 'unclear', 'not_applicable'] };

export function validateMetadata(meta, type) {
  const errors = [];
  const artifactType = TYPES[type]?.artifactType;
  for (const key of ['id', 'title', 'category', 'language', 'maintainer', 'license', 'license_status', 'data_risk', 'ai_act_proximity', 'sources_status']) if (meta?.[key] === undefined || meta[key] === '') errors.push(problem(key, 'Pflichtfeld fehlt in metadata.yml.'));
  if (meta?.artifact_type !== artifactType) errors.push(problem('artifact_type', 'Der Artefakttyp passt nicht zum gewählten Paket.'));
  for (const [key, values] of Object.entries(ALLOWED)) if (meta?.[key] && !values.includes(meta[key])) errors.push(problem(key, `Der Wert „${meta[key]}“ ist nicht erlaubt.`));
  if (meta?.status && !['draft', 'bronze_candidate', 'bronze', 'silver_candidate', 'silver', 'gold_candidate', 'gold'].includes(meta.status)) errors.push(problem('status', 'Der Status ist nicht erlaubt.'));
  if (meta?.status === 'bronze' && meta.human_review_required !== true) errors.push(problem('human_review_required', 'Bronze braucht eine menschliche Prüfung.'));
  return errors;
}
export function validateCompleteness(files, type) {
  const folder = TYPES[type]?.folder;
  const names = new Set(files.map((file) => file.path.split('/').slice(2).join('/')));
  const errors = (REQUIRED_FILES[folder] || []).filter((name) => !names.has(name)).map((name) => problem('files', `Pflichtdatei fehlt: ${name}.`));
  const markdown = files.filter((file) => /\.(md|yml|yaml)$/.test(file.path)).map((file) => file.content || '').join('\n');
  for (const placeholder of PLACEHOLDERS) if (markdown.includes(placeholder)) errors.push(problem('files', `Platzhalter bleibt enthalten: ${placeholder}.`));
  for (const term of ['positiv', 'nachbearbeitbar', 'negativ']) if (!markdown.toLowerCase().includes(term)) errors.push(problem('scenario_positive', `Szenario-Triade unvollständig: „${term}“ fehlt.`));
  return errors;
}
export function scanPii(files) {
  const patterns = { email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, phone_like: /\b(?:\+?\d[\d\s()./-]{7,}\d)\b/g, iban_like: /\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b/g, german_tax_id_like: /\b\d{11}\b/g };
  const hints = [];
  for (const file of files) for (const [code, regex] of Object.entries(patterns)) { regex.lastIndex = 0; if (regex.test(file.content || '')) hints.push({ level: 'hint', ebene: 2, field: 'files', code, message: `Mögliche personenbezogene Angabe (${code}) in ${file.path}. Bitte prüfe sie vor der Einreichung.` }); }
  return hints;
}
export function validatePackage(files, meta, type) { return { errors: [...validateMetadata(meta, type), ...validateCompleteness(files, type)], hints: scanPii(files) }; }
function problem(field, message) { return { level: 'error', ebene: 2, field, message }; }
