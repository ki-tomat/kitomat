# Review Process

## Flow

```text
Contributor artifact
  -> automated validation
    -> OpenClaw/Codex pre-review feedback
      -> peer review
        -> trust review by risk level
          -> maintainer decision
```

## Automated validation

Validators check:

- metadata fields
- required files
- placeholders
- scenario triad hints
- PII heuristics

These checks do not replace expert review.

## Peer review

Peer reviewers check:

- clarity
- usability
- target group
- example quality
- scenario triad
- obvious domain errors
- open questions

## Trust review

Trust reviewers check:

- data risk
- source status
- license status
- sensitive domain proximity
- local file uploads
- human review requirements

## Maintainer decision

Only maintainers decide:

- merge order
- `bronze` status
- release inclusion
- public release timing

