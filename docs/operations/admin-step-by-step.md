# Admin Step by Step

This guide is for repository admins and maintainers.

## 1. Daily admin check

1. Open the repository issues.
2. Check new pull requests.
3. Check failed GitHub Actions.
4. Check labels: `needs_human_input`, `needs_peer_review`, `needs_trust_review`, `needs_strict_trust_review`.
5. Keep the active trust review queue below 8 items.

## 2. New contributor or participant

Choose one access path:

1. Fork + pull request for external contributors.
2. Direct branch/PR for trusted course participants.
3. Maintainer import for participants who submit files outside GitHub.

Default: use the least access needed.

## 3. Pull request triage

For each PR:

1. Confirm artifact type.
2. Confirm one main artifact only.
3. Confirm no direct change to global schema, CI, license or branch protection unless the PR is from maintainers.
4. Wait for `validate`.
5. Apply labels.
6. Request peer review.
7. Request trust review when needed.

## 4. Merge decision

Merge only when:

- `validate` passes
- required files are present
- metadata is valid
- no sensitive real data is included
- source/license status is documented
- review comments are resolved
- one human approval is present
- maintainer agrees with status and release inclusion

Use squash merge. Delete the branch after merge.

## 5. Release asset upload

Use GitHub Releases for large files.

Steps:

1. Confirm artifact has review-ready metadata.
2. Package large files as `.zip` when multiple files belong together.
3. Calculate SHA-256 checksum.
4. Confirm file contains no disallowed data.
5. Attach file to a draft release or release candidate.
6. Add asset link to the artifact metadata or catalog entry.
7. Document source, license, data risk and version.

Do not upload unclear local files.

## 6. Release candidate

Before `v0.1-rc`:

1. Review release readiness checklist.
2. Check open PRs.
3. Mark unfinished work as `draft`, `bronze_candidate` or `post_mvp`.
4. Update `CHANGELOG.md`.
5. Draft release notes.
6. Confirm no public post is scheduled without human go.

