# Community Contribution Flow

KItomat is public, but publication is controlled.

Public visibility does not mean that contributions are automatically accepted or released. Every useful contribution should move through a small, reviewable path.

## External user path

1. Read `README.md`, `CONTRIBUTING.md` and the relevant template.
2. Create a fork of `ki-tomat/kitomat`.
3. Copy exactly one artifact template.
4. Fill the required files.
5. Use synthetic examples only.
6. Document sources, license status, data risk and limits.
7. Open a pull request against `main`.
8. Wait for validators, precheck feedback and human review.

External contributors do not push directly to `main`.

## Participant path

Participants can use one of two paths:

1. Direct GitHub path: branch or fork, then pull request.
2. Import path: submit files to a maintainer, who imports them into a participant branch.

Both paths use the same quality standard.

## Reviewed-only publication

An artifact can be merged or included in `v0.1-rc` only when:

- required files are present
- `metadata.yml` is valid
- examples are synthetic or clearly safe
- no sensitive real data is included
- sources and license status are documented
- scenario triad is present
- validators pass
- peer review is documented when needed
- trust review is documented when needed
- a maintainer approves the pull request

## Maintainer authority

Only maintainers decide:

- merge order
- final `bronze` status
- release inclusion
- public communication timing
- whether a risky artifact moves to `post_mvp`

## OpenClaw/Codex precheck

OpenClaw or Codex can provide early feedback:

- `needs_fixes`
- `needs_sources`
- `needs_trust_review`
- `ready_for_human_eval`
- `post_mvp_recommended`

These statuses are advisory. They are not publication approval.

## Hard stop

Do not submit:

- real personal data
- real customer data
- health data
- confidential finance data
- real HR or application documents
- internal company documents
- copied full texts with unclear rights
- legal, audit or compliance approval claims
- automated decisions about people

