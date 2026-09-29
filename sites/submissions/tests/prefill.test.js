import test from 'node:test';
import assert from 'node:assert/strict';

import { safeSubmissionReturn, submissionFormPrefill } from '../src/worker.js';

test('accepts a valid AP15 handoff prefill', () => {
  assert.deepEqual(
    submissionFormPrefill('https://submissions.example/?artifactId=mein-prompt-01&artifactType=prompt'),
    { artifactId: 'mein-prompt-01', artifactType: 'prompt' },
  );
});

test('fails safely for manipulated handoff query parameters', () => {
  assert.deepEqual(
    submissionFormPrefill('https://submissions.example/?artifactId=%22%20autofocus%20x=%22&artifactType=script'),
    { artifactId: '', artifactType: 'prompt' },
  );
});

test('keeps only safe prefill values through the GitHub login round-trip', () => {
  assert.equal(
    safeSubmissionReturn('https://submissions.example/auth/github?artifactId=mein-prompt-01&artifactType=prompt'),
    '/?artifactId=mein-prompt-01&artifactType=prompt',
  );
  assert.equal(
    safeSubmissionReturn('https://submissions.example/auth/github?artifactId=unsafe%22&artifactType=script'),
    '/?artifactType=prompt',
  );
});
