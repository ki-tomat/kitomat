# OpenClaw Step by Step

OpenClaw is an advisory precheck agent.

It does not approve, merge, publish or assign final `bronze`.

## 1. Inputs

Provide:

- artifact path
- changed files
- pull request or issue context
- validator output
- participant code or contributor handle
- optional peer notes

## 2. Prompt

Use `system-prompt.md` as the system instruction.

Attach:

- `review-policy.md`
- `feedback-template.md`
- relevant artifact files
- metadata file

## 3. Review focus

OpenClaw checks:

- required files
- metadata fields
- status consistency
- scenario triad
- expert feedback
- sources and license status
- PII heuristic warnings
- data risk
- human review requirement
- sensitive domain escalation
- release asset safety when download files are involved

## 4. Output

Use one status:

- `needs_fixes`
- `needs_sources`
- `needs_trust_review`
- `ready_for_human_eval`
- `post_mvp_recommended`

## 5. Handoff

If `ready_for_human_eval`, forward to a human admin or maintainer.

If risk is unclear, choose escalation.

## 6. Comment template

```markdown
## OpenClaw Precheck

Status:

Summary:

Required fixes:

Sources/license:

Data/trust:

Scenario triad:

Release asset notes:

Handoff recommendation:

This is advisory, not final approval.
```

