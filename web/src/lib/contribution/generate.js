import { TYPES } from './model.js';
import { yamlMapping } from './yaml.js';

const disclaimer = 'Arbeits- und Orientierungshilfe. Keine automatische fachliche Freigabe.';
const text = (value) => String(value || '').trim();

export function buildMetadata(type, answers) {
  const common = [
    ['id', answers.id], ['artifact_type', TYPES[type].artifactType], ['title', answers.title], ['category', answers.category], ['status', 'draft'], ['language', answers.language], ['version', '0.1.0'], ['maintainer', answers.maintainer], ['license', answers.license], ['license_status', answers.license_status], ['data_risk', answers.data_risk], ['human_review_required', true], ['ai_act_proximity', answers.ai_act_proximity], ['legal_disclaimer', disclaimer], ['sources_status', answers.sources_status],
  ];
  if (type === 'prompt') common.push(['target_users', answers.target_users], ['use_case', answers.use_case], ['required_inputs', answers.required_inputs], ['output_format', answers.output_format], ['personal_data_possible', answers.personal_data_possible], ['evaluation_criteria', answers.evaluation_criteria]);
  if (type === 'dataset') common.push(['linked_artifacts', answers.linked_artifacts], ['data_origin', answers.data_origin], ['contains_personal_data', answers.contains_personal_data], ['contains_sensitive_data', answers.contains_sensitive_data], ['sources_date', answers.sources_date], ['usage_scope', answers.usage_scope], ['release_asset_required', answers.release_asset_required]);
  if (type === 'industry') common.push(['model_type', answers.model_type], ['target_users', answers.target_users], ['use_case', answers.use_case], ['required_inputs', answers.required_inputs], ['output_format', answers.output_format], ['application_scope', answers.application_scope], ['framework_references', answers.framework_references], ['required_review_level', answers.required_review_level]);
  return yamlMapping(common);
}

function readme(title, answers) {
  return `# ${text(title)}\n\n## Zielgruppe\n${(answers.target_users || []).map((item) => `- ${item}`).join('\n')}\n\n## Einsatz\n${text(answers.use_case)}\n\n## Szenario-Triade\n\n### Positiv\n${text(answers.scenario_positive)}\n\n### Nachbearbeitbar\n${text(answers.scenario_rework)}\n\n### Negativ\n${text(answers.scenario_negative)}\n\n## Grenzen\n${text(answers.failure_modes?.join('\n- ') ? `- ${answers.failure_modes.join('\n- ')}` : 'Siehe paketbezogene Hinweise.')}\n\n## Quellen und Lizenz\nQuellenstatus: ${text(answers.sources_status)}. Lizenz: ${text(answers.license)}.\n\n> ${disclaimer}\n`;
}

export function buildFiles(payload) {
  const { type, answers } = payload;
  const { folder } = TYPES[type];
  const base = `${folder}/${answers.id}`;
  const file = (name, content) => ({ path: `${base}/${name}`, content: `${content}`.replace(/\r\n/g, '\n') });
  const metadata = file('metadata.yml', buildMetadata(type, answers));
  if (type === 'prompt') return [metadata, file('README.md', readme(answers.title, answers)), file('prompt.md', `# Prompt\n\n${text(answers.prompt_text)}\n`), file('evaluation.md', `# Evaluation\n\n${text(answers.evaluation_criteria)}\n`), file('failure-modes.md', `# Grenzen und Fehlermodi\n\n${(answers.failure_modes || []).map((item) => `- ${item}`).join('\n')}\n`), file('examples/input-01.md', `# Beispiel-Eingabe\n\n${text(answers.sample_input)}\n`), file('examples/output-01.md', `# Beispiel-Ausgabe\n\n${text(answers.sample_output)}\n`)];
  if (type === 'dataset') return [metadata, file('README.md', readme(answers.title, answers)), file('sources.md', `# Quellen\n\n${text(answers.dataset_description)}\n\nHerkunft: ${text(answers.data_origin)}\n`), file('license.md', `# Lizenz\n\n${text(answers.license)}\n`), file('usage.md', `# Nutzung\n\n${text(answers.usage_scope)}\n`)];
  return [metadata, file('README.md', readme(answers.title, answers)), file('model.md', `# Modell\n\n${text(answers.model_description)}\n`), file('application-guide.md', `# Anwendung\n\n${text(answers.application_guide)}\n`), file('examples/example-01.md', `# Beispiel-Fall\n\n${text(answers.sample_case)}\n`), file('sources.md', `# Quellen und Frameworks\n\n${(answers.framework_references || []).map((item) => `- ${item}`).join('\n')}\n`), file('failure-modes.md', `# Grenzen\n\nMenschliche Prüfung erforderlich.\n`)];
}
