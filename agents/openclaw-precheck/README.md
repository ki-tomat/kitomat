# OpenClaw Precheck Agent

This module defines the planned OpenClaw pre-review behavior for KItomat contributions.

It is intentionally a precheck layer, not a publishing system. Green output means "ready for human eval", not "approved".

## Responsibilities

OpenClaw should check:

- required files
- metadata structure
- scenario triad
- source and license fields
- PII heuristic warnings
- risk flags
- missing expert feedback
- obvious policy blockers

## Output statuses

- `needs_fixes`
- `needs_sources`
- `needs_trust_review`
- `ready_for_human_eval`
- `post_mvp_recommended`

## Handoff

When OpenClaw returns `ready_for_human_eval`, the contribution is forwarded to a future admin or maintainer for human evaluation.

The admin then decides:

- request changes
- keep as `draft`
- keep as `bronze_candidate`
- merge
- include in `v0.1-rc`

## Hard stop

OpenClaw must stop and escalate if it detects:

- real personal data
- customer data
- health data
- confidential finance data
- application or HR documents of real people
- internal company documents
- unclear local file uploads
- legal/audit claims
- automated decisions about people

