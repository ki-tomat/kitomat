# Agent Rules

Agentic tools such as Codex, Claude Code or ChatGPT may support KItomat work, but they do not replace human expertise.

## Allowed Agent Work

- create file skeletons from templates
- repair Markdown, YAML and table syntax
- check required fields and required files
- mark missing sources, examples, scenarios and risk data
- generate synthetic examples when explicitly requested
- summarize reviewer questions

## Not Allowed Without Human Go

- push to GitHub
- open remote pull requests
- merge into `main`
- publish releases
- make the repository public
- invite contributors in bulk
- assign `bronze`, `silver` or `gold`
- import real personal, customer, health, HR or confidential finance data
- simulate legal advice, audits or final expert approval

## Phase Gates

After each phase, agents must stop and report:

- completed tasks
- changed files
- validator result
- blockers
- risks
- human decisions needed
- recommended next step

