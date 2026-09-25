import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const START = '<!-- kitomat:payload:v1 -->';
const END = '<!-- /kitomat:payload -->';
const TYPES = { prompt: ['prompts', 'prompt_package'], dataset: ['datasets', 'dataset_package'], industry: ['models', 'model'] };
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(message) { throw new Error(message); }
function yaml(value) { return JSON.stringify(value); }
function list(key, values) { return values.length ? `${key}:\n${values.map((v) => `  - ${yaml(v)}`).join('\n')}` : `${key}: []`; }
function req(value, name) { if (value === undefined || value === null || value === '') fail(`Pflichtfeld fehlt: ${name}`); return value; }
function decode(body) {
  if (typeof body !== 'string' || body.split(START).length !== 2 || body.split(END).length !== 2) fail('AP14-Payloadmarker fehlen oder sind mehrfach vorhanden.');
  const encoded = body.slice(body.indexOf(START) + START.length, body.indexOf(END)).trim();
  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded)) fail('Payload ist kein gültiges Base64.');
  const bytes = Buffer.from(encoded, 'base64');
  if (bytes.length > 32 * 1024 || bytes.toString('base64') !== encoded) fail('Payload ist zu groß oder nicht kanonisch.');
  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
}
function metadata(p, artifactType) {
  const a = p.answers;
  const lines = [
    ['id', a.id], ['artifact_type', artifactType], ['title', a.title], ['category', a.category], ['status', 'draft'], ['language', a.language], ['version', '0.1.0'], ['maintainer', a.maintainer], ['license', a.license], ['license_status', a.license_status], ['data_risk', a.data_risk], ['human_review_required', true], ['ai_act_proximity', a.ai_act_proximity], ['legal_disclaimer', 'Arbeits- und Orientierungshilfe. Keine automatische fachliche Freigabe.'], ['sources_status', a.sources_status],
  ].map(([k, v]) => `${k}: ${yaml(v)}`);
  if (p.type === 'prompt') lines.push(list('target_users', a.target_users), `use_case: ${yaml(a.use_case)}`, list('required_inputs', a.required_inputs), `output_format: ${yaml(a.output_format)}`, `personal_data_possible: ${yaml(a.personal_data_possible)}`, `evaluation_criteria: ${yaml(a.evaluation_criteria)}`);
  if (p.type === 'dataset') lines.push(list('linked_artifacts', a.linked_artifacts), `data_origin: ${yaml(a.data_origin)}`, `contains_personal_data: ${yaml(a.contains_personal_data)}`, `contains_sensitive_data: ${yaml(a.contains_sensitive_data)}`, `sources_date: ${yaml(a.sources_date)}`, `usage_scope: ${yaml(a.usage_scope)}`, `release_asset_required: ${yaml(a.release_asset_required)}`);
  if (p.type === 'industry') lines.push(`model_type: ${yaml(a.model_type)}`, list('target_users', a.target_users), `use_case: ${yaml(a.use_case)}`, list('required_inputs', a.required_inputs), `output_format: ${yaml(a.output_format)}`, `application_scope: ${yaml(a.application_scope)}`, list('framework_references', a.framework_references), `required_review_level: ${yaml(a.required_review_level)}`);
  return `${lines.join('\n')}\n`;
}
function files(p, artifactType) {
  const a = p.answers;
  const base = { 'metadata.yml': metadata(p, artifactType) };
  if (p.type === 'prompt') return { ...base, 'README.md': `# Prompt-Paket: ${a.title}\n\n## Szenario-Triade\n\n### Positiv\n${a.scenario_positive}\n\n### Nachbearbeitbar\n${a.scenario_rework}\n\n### Negativ\n${a.scenario_negative}\n`, 'prompt.md': `# Prompt\n\n${a.prompt_text}\n`, 'evaluation.md': `# Evaluation\n\n${a.evaluation_criteria}\n`, 'failure-modes.md': `# Failure Modes\n\n${a.failure_modes.map((x) => `- ${x}`).join('\n')}\n`, 'examples/input-01.md': `# Beispielinput\n\n${a.sample_input}\n`, 'examples/output-01.md': `# Beispieloutput\n\n${a.sample_output}\n` };
  if (p.type === 'dataset') return { ...base, 'README.md': `# Quellenpaket: ${a.title}\n\n${a.dataset_description}\n\nPositiv: ${a.scenario_positive}\nNachbearbeitbar: ${a.scenario_rework}\nNegativ: ${a.scenario_negative}\n`, 'sources.md': '# Quellen\n\nSynthetischer Test ohne externe Quellen.\n', 'license.md': `# Lizenz\n\n${a.license}\n`, 'usage.md': `# Nutzung\n\n${a.usage_scope}\n` };
  return { ...base, 'README.md': `# Modell: ${a.title}\n\nPositiv: ${a.scenario_positive}\nNachbearbeitbar: ${a.scenario_rework}\nNegativ: ${a.scenario_negative}\n`, 'model.md': `# Modell\n\n${a.model_description}\n`, 'application-guide.md': `# Application Guide\n\n${a.application_guide}\n`, 'examples/example-01.md': `# Beispiel\n\n${a.sample_case}\n`, 'sources.md': '# Quellen\n\nSynthetischer Test ohne externe Quellen.\n', 'failure-modes.md': '# Failure Modes\n\n- Menschliche Prüfung erforderlich\n' };
}

export async function generateFromIssue({ issueBody, root }) {
  const p = decode(issueBody);
  if (!p || p.v !== 1 || !TYPES[p.type] || p.role !== 'external' || !p.acknowledgements?.public_content_confirmed || !p.acknowledgements?.no_real_personal_data_confirmed || !p.acknowledgements?.pii_hints_reviewed) fail('Payload erfüllt die AP14-Freigaben nicht.');
  const a = p.answers || {};
  for (const key of ['id', 'title', 'category', 'language', 'maintainer', 'license', 'license_status', 'data_risk', 'ai_act_proximity', 'sources_status']) req(a[key], key);
  if (!idPattern.test(a.id) || a.id.length > 80) fail('Ungültige Artefakt-ID.');
  const [folder, artifactType] = TYPES[p.type];
  await mkdir(path.join(root, folder), { recursive: true });
  const dir = path.join(root, folder, a.id);
  await mkdir(dir, { recursive: false });
  for (const [name, content] of Object.entries(files(p, artifactType))) {
    const target = path.join(dir, name);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content.replace(/\r\n/g, '\n'), { encoding: 'utf8', flag: 'wx' });
  }
  return { id: a.id, folder, artifactType, artifactPath: `${folder}/${a.id}`, risk: a.data_risk };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const event = JSON.parse(await import('node:fs/promises').then(({ readFile }) => readFile(process.env.GITHUB_EVENT_PATH, 'utf8')));
  const result = await generateFromIssue({ issueBody: event.issue?.body, root: process.env.GITHUB_WORKSPACE || process.cwd() });
  console.log(JSON.stringify(result));
}
