export const PAYLOAD_VERSION = 1;
export const PAYLOAD_BEGIN = '<!-- kitomat:payload:v1 -->';
export const PAYLOAD_END = '<!-- /kitomat:payload -->';
export const MAX_PAYLOAD_BYTES = 32 * 1024;

export const TYPES = {
  prompt: { folder: 'prompts', artifactType: 'prompt_package', label: 'Prompt-Paket' },
  dataset: { folder: 'datasets', artifactType: 'dataset_package', label: 'Quellenpaket' },
  industry: { folder: 'models', artifactType: 'model', label: 'KMU-/Branchenmodell' },
};

const common = [
  ['title', 'Titel deines Beitrags', 'text', true], ['id', 'Artefakt-ID', 'text', true],
  ['category', 'Kategorie', 'text', true], ['language', 'Sprache', 'select', true, ['de', 'en']],
  ['maintainer', 'GitHub-Name oder Kürzel', 'text', true], ['license', 'Welche Lizenz gilt?', 'text', true],
  ['license_status', 'Ist der Lizenzstatus geklärt?', 'select', true, ['declared', 'unclear', 'not_applicable']],
  ['data_risk', 'Wie hoch ist das Datenrisiko?', 'select', true, ['green', 'yellow', 'red']],
  ['ai_act_proximity', 'Nähe zum EU AI Act', 'select', true, ['none', 'transparency', 'high_risk_adjacent', 'prohibited_check', 'unclear']],
  ['sources_status', 'Wie ist der Quellenstatus?', 'select', true, ['not_required', 'missing', 'provided', 'checked', 'unverified']],
  ['target_users', 'Für wen ist das gedacht?', 'list', true], ['use_case', 'Welchen konkreten Nutzen hat es?', 'longtext', true],
  ['required_inputs', 'Welche Eingaben werden benötigt?', 'list', true], ['output_format', 'Wie sieht das Ergebnis aus?', 'text', true],
  ['sample_input', 'Beispiel-Eingabe', 'longtext', true], ['sample_output', 'Beispiel-Ausgabe', 'longtext', true],
  ['scenario_positive', 'Positives Szenario', 'longtext', true], ['scenario_rework', 'Nachbearbeitbares Szenario', 'longtext', true],
  ['scenario_negative', 'Negatives Szenario', 'longtext', true],
];

const typeFields = {
  prompt: [['prompt_text', 'Der eigentliche Prompt', 'longtext', true], ['personal_data_possible', 'Können personenbezogene Daten vorkommen?', 'boolean', true], ['evaluation_criteria', 'Woran wird eine gute Ausgabe erkannt?', 'longtext', true], ['failure_modes', 'Bekannte Grenzen oder Fehlermodi', 'list', true]],
  dataset: [['dataset_description', 'Was enthalten die Quellen?', 'longtext', true], ['linked_artifacts', 'Verknüpfte Artefakt-IDs', 'list', false], ['data_origin', 'Herkunft der Daten', 'text', true], ['contains_personal_data', 'Enthält das Paket personenbezogene Daten?', 'boolean', true], ['contains_sensitive_data', 'Enthält das Paket sensible Daten?', 'boolean', true], ['sources_date', 'Stand der Quellen (YYYY-MM-DD)', 'text', true], ['usage_scope', 'Wofür dürfen die Quellen genutzt werden?', 'longtext', true], ['release_asset_required', 'Wird ein separates Release-Asset benötigt?', 'boolean', true]],
  industry: [['model_type', 'Welche Art von Modell ist das?', 'text', true], ['application_scope', 'In welchem Rahmen wird es eingesetzt?', 'longtext', true], ['framework_references', 'Auf welche Frameworks oder Quellen stützt es sich?', 'list', true], ['required_review_level', 'Welches Review-Level ist nötig?', 'select', true, ['human_review', 'trust_review']], ['model_description', 'Beschreibung des Modells', 'longtext', true], ['application_guide', 'Kurze Anwendungshilfe', 'longtext', true], ['sample_case', 'Beispiel-Fall', 'longtext', true]],
};

export function fieldsForType(type) { return [...common, ...(typeFields[type] || [])].map(([key, label, kind, required, options]) => ({ key, label, kind, required, options: options || [] })); }
export function allowedAnswerKeys(type) { return new Set(fieldsForType(type).map((field) => field.key)); }
export function emptyAnswers(type = 'prompt') {
  return Object.fromEntries(fieldsForType(type).map((field) => {
    if (field.kind === 'list') return [field.key, []];
    if (field.kind === 'boolean') return [field.key, false];
    if (field.key === 'language') return [field.key, 'de'];
    if (field.key === 'license') return [field.key, 'CC-BY-4.0'];
    if (field.key === 'license_status') return [field.key, 'declared'];
    if (field.key === 'data_risk') return [field.key, 'green'];
    if (field.key === 'ai_act_proximity') return [field.key, 'none'];
    if (field.key === 'sources_status') return [field.key, type === 'dataset' ? 'provided' : 'not_required'];
    if (field.key === 'required_review_level') return [field.key, 'human_review'];
    return [field.key, ''];
  }));
}
export function slug(value) { return String(value || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80); }
export function typeLabel(type) { return TYPES[type]?.label || 'Unbekannter Typ'; }
