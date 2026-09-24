// AP14: Verbindlicher, rein lokaler GitHub-Handoff. Der Browser sendet nichts
// selbst; erst ein berechtigter Maintainer setzt das Import-Label im Issue.
const START = '<!-- kitomat:payload:v1 -->';
const END = '<!-- /kitomat:payload -->';
const MAX_BYTES = 32 * 1024;

function slug(value) {
  return String(value || '').toLowerCase().normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '').slice(0, 80);
}

function text(value, fallback) {
  const clean = String(value || '').trim().replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '');
  return clean || fallback;
}

function encodeUtf8Base64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return { bytes, base64: btoa(binary) };
}

export function buildAp14IssueDraft(draft) {
  const form = draft?.form || {};
  const type = ['prompt', 'dataset', 'industry'].includes(draft?.selectedType) ? draft.selectedType : 'prompt';
  const id = slug(form.title);
  if (!id || id.length < 3) throw new Error('Bitte gib einen Titel mit mindestens drei Zeichen ein.');

  const language = String(form.language || 'de').toLowerCase().startsWith('de') ? 'de' : 'en';
  const common = {
    id,
    title: text(form.title, id),
    category: 'general', language,
    maintainer: slug(String(form.contributor || 'contributor').replace(/^@/, '')) || 'contributor',
    license: text(form.license, 'CC-BY-4.0') === '—' ? 'CC-BY-4.0' : text(form.license, 'CC-BY-4.0'),
    license_status: 'declared', data_risk: 'green', ai_act_proximity: 'none', sources_status: 'not_required',
    target_users: [text(form.audience, 'Mitarbeitende kleiner Organisationen')],
    use_case: text(form.context, 'Synthetischer KItomat-Beitrag zur Orientierung.'),
    required_inputs: ['Synthetischer Beispielinput'],
    output_format: 'Markdown',
    scenario_positive: text(form.scenarioPos, 'Synthetisches positives Szenario.'),
    scenario_rework: text(form.scenarioRework, 'Synthetisches nachbearbeitbares Szenario.'),
    scenario_negative: text(form.scenarioNeg, 'Synthetisches negatives Szenario.'),
    sample_input: text(form.sampleIn, 'Synthetischer Beispielinput.'),
    sample_output: text(form.sampleOut, 'Synthetische Beispielausgabe.'),
  };
  const answers = type === 'dataset'
    ? { ...common, dataset_description: common.use_case, linked_artifacts: [], data_origin: 'synthetisch', contains_personal_data: false, contains_sensitive_data: false, sources_date: '2026-01-01', usage_scope: common.use_case, release_asset_required: false }
    : type === 'industry'
      ? { ...common, model_type: 'framework', application_scope: common.use_case, framework_references: [], required_review_level: 'human_review', model_description: common.use_case, application_guide: common.output_format, sample_case: common.sample_input }
      : { ...common, personal_data_possible: false, evaluation_criteria: 'Ausgabe nachvollziehbar, synthetisch und menschlich prüfbar.', prompt_text: common.sample_input, failure_modes: ['Unvollständige Eingaben', 'Unklare Anforderungen'] };
  const payload = { v: 1, type, role: 'external', answers, acknowledgements: { public_content_confirmed: true, no_real_personal_data_confirmed: true, pii_hints_reviewed: true } };
  const json = JSON.stringify(payload);
  const { bytes, base64 } = encodeUtf8Base64(json);
  if (bytes.byteLength > MAX_BYTES) throw new Error('Der Übergabetext ist zu groß. Bitte kürze die Eingaben.');
  const title = `AP14 Gate: ${common.title}`;
  const body = `KItomat AP14 Gate: ${common.title}\n\nTyp: ${type}\nRolle: external\nID: ${id}\n\n${START}\n${base64}\n${END}`;
  return { title, body, id };
}
