import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { buildAp14IssueDraft } from '../../../web/src/lib/ap14Handoff.js';
import { emptyAnswers, fieldsForType } from '../../../web/src/lib/contribution/model.js';
import { generateFromIssue } from '../import-issue.mjs';

function answers() {
  const result = emptyAnswers('prompt');
  for (const field of fieldsForType('prompt')) {
    if (field.key === 'id') result.id = 'isolierter-import-test';
    else if (field.kind === 'list') result[field.key] = ['synthetischer Eintrag'];
    else if (field.kind === 'boolean') result[field.key] = false;
    else if (!result[field.key]) result[field.key] = `${field.key} Inhalt`;
  }
  result.scenario_positive = 'positiv'; result.scenario_rework = 'nachbearbeitbar'; result.scenario_negative = 'negativ';
  return result;
}

test('import writes a new artifact only once', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'kitomat-ap14-'));
  try {
    const draft = buildAp14IssueDraft({ selectedType: 'prompt', answers: answers(), acknowledgements: { public_content_confirmed: true, no_real_personal_data_confirmed: true, pii_hints_reviewed: true } });
    const first = await generateFromIssue({ issueBody: draft.body, root });
    assert.equal(first.artifactPath, 'prompts/isolierter-import-test');
    await assert.rejects(() => generateFromIssue({ issueBody: draft.body, root }), /EEXIST/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
