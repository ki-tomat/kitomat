# OpenClaw Pre-Review

OpenClaw can be used as an optional pre-review assistant for incoming KItomat contributions.

For step-by-step usage, see `agents/openclaw-precheck/openclaw-step-by-step.md`.

For release, handover and communication preparation, use Hermes:

- `agents/hermes-release/system-prompt.md`
- `agents/hermes-release/hermes-step-by-step.md`

## Goal

OpenClaw should give early feedback before a human maintainer spends review time. It may recommend a handoff status, but it must not approve, merge, publish or assign final `bronze`.

## Flow

```text
Incoming contribution
  -> syntax and completeness check
    -> OpenClaw scenario and trust pre-review
      -> feedback to contributor
        -> if green: handoff to admin/human eval
          -> human review confirms or rejects
```

## Allowed OpenClaw outputs

- `needs_fixes`
- `needs_sources`
- `needs_trust_review`
- `ready_for_human_eval`
- `post_mvp_recommended`

## Not allowed

OpenClaw must not:

- merge into `main`
- publish a release
- mark `bronze` as final
- make legal or audit claims
- accept real sensitive data
- bypass human review

## Green light meaning

`ready_for_human_eval` means:

- required files appear present
- metadata is structurally valid
- no obvious PII warning is unresolved
- scenario triad is present
- sources/license fields are not obviously missing
- risk level is plausible enough for human review
- release asset metadata is present when a download package is involved

It does not mean the artifact is approved.

## Hermes relation

OpenClaw checks incoming contributions before human evaluation. Hermes prepares release notes, handover summaries and communication drafts after review facts exist. Both agents are advisory and both require human approval before publication.
