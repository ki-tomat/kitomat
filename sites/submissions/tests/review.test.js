import test from 'node:test';
import assert from 'node:assert/strict';

import { createWorker, validateReviewDecision } from '../src/worker.js';

const approved = {
  actor: 'reviewer@example.org',
  role: 'reviewer',
  outcome: 'approved_for_import',
  status: 'bronze',
  note: 'Paket geprüft.',
  checks: { content: true, sources_license: true, privacy: true },
};

test('requires all human checks before an import approval', () => {
  const result = validateReviewDecision({
    ...approved,
    checks: { ...approved.checks, privacy: false },
  });
  assert.match(result.error, /alle Review-Prüfpunkte/);
});

test('requires a useful note for change requests and rejections', () => {
  const result = validateReviewDecision({
    ...approved,
    outcome: 'changes_requested',
    status: null,
    note: 'zu kurz',
  });
  assert.match(result.error, /nachvollziehbare Notiz/);
});

test('accepts a complete approval decision', () => {
  const result = validateReviewDecision(approved);
  assert.equal(result.error, undefined);
  assert.equal(result.outcome, 'approved_for_import');
  assert.equal(result.status, 'bronze');
});

test('review package download is internal-only and never cached', async () => {
  let databaseCalls = 0;
  const DB = {
    prepare() {
      databaseCalls += 1;
      return {
        bind() {
          return {
            async first() {
              return {
                artifact_id: 'safe-demo',
                state: 'submitted',
                current_revision: 2,
                package_sha256: 'abc123',
                r2_key: 'submissions/id/2/package.zip',
              };
            },
          };
        },
      };
    },
  };
  const PACKAGES = {
    async get() {
      return { body: new Uint8Array([80, 75, 3, 4]) };
    },
  };
  const worker = createWorker();
  const url = 'https://submissions.example/internal/submissions/12345678-1234-1234-1234-123456789abc/package';
  const denied = await worker.fetch(new Request(url), { DB, PACKAGES, INTERNAL_SERVICE_TOKEN: 'secret' });
  assert.equal(denied.status, 403);
  assert.equal(databaseCalls, 0);

  const allowed = await worker.fetch(new Request(url, {
    headers: { 'X-Kitomat-Internal-Token': 'secret' },
  }), { DB, PACKAGES, INTERNAL_SERVICE_TOKEN: 'secret' });
  assert.equal(allowed.status, 200);
  assert.equal(allowed.headers.get('Cache-Control'), 'private, no-store');
  assert.equal(allowed.headers.get('X-Kitomat-Sha256'), 'abc123');
  assert.match(allowed.headers.get('Content-Disposition'), /safe-demo-revision-2\.zip/);
});
