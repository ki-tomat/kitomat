# OpenClaw Handoff Flow

OpenClaw is used as an advisory precheck before a human admin spends final review time.

## Flow

```text
Incoming issue, pull request or imported files
  -> run local validators
  -> run OpenClaw precheck
  -> return feedback to contributor
  -> contributor fixes if needed
  -> if ready: handoff to human admin evaluation
  -> maintainer decides merge, status and release inclusion
```

## Green light

`ready_for_human_eval` means the contribution appears structurally reviewable.

It does not mean:

- approved
- merged
- published
- legally checked
- professionally audited
- final `bronze`

## Feedback rules

OpenClaw feedback should be short and actionable:

1. name the artifact and path
2. state the handoff status
3. list blocking fixes
4. list source/license/trust concerns
5. list suggested improvements
6. state the next human step

## Escalation

OpenClaw must escalate to a maintainer when:

- data risk is unclear
- sources are missing or license status is unclear
- local files are uploaded
- sensitive domains are involved
- examples could contain personal or customer data
- the artifact claims legal, audit, medical, HR, finance or education decision quality

