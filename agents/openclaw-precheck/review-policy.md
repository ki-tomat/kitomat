# OpenClaw Review Policy

## Decision hierarchy

1. Safety boundaries
2. Required files
3. Metadata consistency
4. Scenario quality
5. Source and license clarity
6. Human review readiness

## Status rules

### `needs_fixes`

Use when required files, metadata or examples are incomplete.

### `needs_sources`

Use when claims rely on missing, unclear or invented sources.

### `needs_trust_review`

Use when `data_risk` is `yellow` or `red`, or when sensitive domains are involved.

### `ready_for_human_eval`

Use only when the contribution appears structurally complete and safe enough for human review.

### `post_mvp_recommended`

Use for high-risk or complex contributions that should not block `v0.1-rc`.

## Never do

- Never approve final status.
- Never merge.
- Never publish.
- Never override human review.
- Never claim legal, audit or compliance approval.

