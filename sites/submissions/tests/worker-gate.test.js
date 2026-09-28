import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorker } from '../src/worker.js';

test('shows no upload form while the legal go-live gate is disabled', async () => {
  const worker = createWorker();
  const response = await worker.fetch(new Request('https://submissions.example/'), { SUBMISSIONS_ENABLED: 'false' });
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Direkteinreichungen sind deaktiviert/);
  assert.doesNotMatch(html, /submission-form/);
});

test('does not accept an unauthenticated upload request', async () => {
  const worker = createWorker();
  const response = await worker.fetch(new Request('https://submissions.example/api/submissions', { method: 'POST' }), { SUBMISSIONS_ENABLED: 'false' });
  assert.equal(response.status, 401);
});
