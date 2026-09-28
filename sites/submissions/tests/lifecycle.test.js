import test from 'node:test';
import assert from 'node:assert/strict';

import { canSubmissionTransition, isGithubLoginAllowed } from '../src/worker.js';

test('permits only approved lifecycle transitions', () => {
  assert.equal(canSubmissionTransition('submitted', 'review'), true);
  assert.equal(canSubmissionTransition('submitted', 'revise'), true);
  assert.equal(canSubmissionTransition('changes_requested', 'revise'), true);
  assert.equal(canSubmissionTransition('approved_for_import', 'open_draft_pr'), true);
  assert.equal(canSubmissionTransition('draft_pr_open', 'merged'), true);
  assert.equal(canSubmissionTransition('draft_pr_open', 'rejected'), true);
});

test('blocks skipped publication and terminal-state transitions', () => {
  assert.equal(canSubmissionTransition('submitted', 'open_draft_pr'), false);
  assert.equal(canSubmissionTransition('changes_requested', 'merged'), false);
  assert.equal(canSubmissionTransition('merged', 'revise'), false);
  assert.equal(canSubmissionTransition('rejected', 'open_draft_pr'), false);
});

test('requires an explicit, case-insensitive GitHub allowlist entry', () => {
  assert.equal(isGithubLoginAllowed('KI-Consultant-01', 'ki-consultant-01, second-user'), true);
  assert.equal(isGithubLoginAllowed('not-in-course', 'ki-consultant-01, second-user'), false);
  assert.equal(isGithubLoginAllowed('ki-consultant-01', ''), false);
  assert.equal(isGithubLoginAllowed('unsafe<script>', 'unsafe<script>'), false);
});
