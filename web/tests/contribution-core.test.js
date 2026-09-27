import { describe, expect, it } from 'vitest';
import { buildAp14IssueDraft, decodePayload, parsePayload } from '../src/lib/ap14Handoff.js';
import { buildFiles } from '../src/lib/contribution/generate.js';
import { emptyAnswers, fieldsForType } from '../src/lib/contribution/model.js';
import { validateForm } from '../src/lib/contribution/validateForm.js';
import { validatePackage } from '../src/lib/contribution/validate.js';
import { buildZip } from '../src/lib/contribution/zip.js';

function complete(type = 'prompt') {
  const answers = emptyAnswers(type);
  for (const field of fieldsForType(type)) {
    if (field.key === 'id') answers[field.key] = 'sicherer-test-beitrag';
    else if (field.kind === 'list') answers[field.key] = field.required ? ['synthetischer Eintrag'] : [];
    else if (field.kind === 'boolean') answers[field.key] = false;
    else if (!answers[field.key]) answers[field.key] = `${field.key} Inhalt`;
  }
  answers.scenario_positive = 'positiv und vollständig'; answers.scenario_rework = 'nachbearbeitbar und vollständig'; answers.scenario_negative = 'negativ und vollständig';
  return answers;
}

describe('AP14 contribution core', () => {
  it.each(['prompt', 'dataset', 'industry'])('generates a formally valid %s package', (type) => {
    const answers = complete(type); const files = buildFiles({ type, answers });
    expect(validateForm(type, answers, { public_content_confirmed: true, no_real_personal_data_confirmed: true, pii_hints_reviewed: true })).toEqual([]);
    expect(validatePackage(files, { ...answers, artifact_type: type === 'industry' ? 'model' : `${type}_package`, status: 'draft', human_review_required: true }, type).errors).toEqual([]);
  });
  it('keeps an empty scenario as a form error even when generated headings exist', () => {
    const answers = complete(); answers.scenario_negative = '';
    expect(validateForm('prompt', answers, { public_content_confirmed: true, no_real_personal_data_confirmed: true, pii_hints_reviewed: true }).some((error) => error.field === 'scenario_negative')).toBe(true);
    expect(validatePackage(buildFiles({ type: 'prompt', answers }), { ...answers, artifact_type: 'prompt_package', status: 'draft', human_review_required: true }, 'prompt').errors).toEqual([]);
  });
  it('round-trips payloads containing markdown fences and rejects extra fields', () => {
    const answers = complete(); answers.prompt_text = '```js\nconst x = "ü";\n```';
    const draft = buildAp14IssueDraft({ selectedType: 'prompt', answers, acknowledgements: { public_content_confirmed: true, no_real_personal_data_confirmed: true, pii_hints_reviewed: true } });
    expect(decodePayload(draft.body)).toMatchObject({ ok: true });
    expect(parsePayload({ ...draft.payload, foreign: true }).ok).toBe(false);
  });
  it('writes a non-empty ZIP blob', async () => {
    const blob = await buildZip([{ path: 'prompts/test/README.md', content: 'Hallo Ümlaut' }]);
    expect(blob.type).toBe('application/zip');
    expect(blob.size).toBeGreaterThan(30);
  });
});
