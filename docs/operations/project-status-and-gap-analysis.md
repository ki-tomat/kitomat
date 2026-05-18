# KItomat Project Status and Gap Analysis

Status date: 2026-05-18

## Current state

KItomat is a public GitHub repository for reviewed AI work resources:

- prompt packages
- dataset/source packages
- KMU and industry models

The repository is not a SaaS, marketplace, login system or database platform. The public website scope is a static GitHub Pages catalog with links to repository content and GitHub Release Assets.

## Completed foundation

Repository and governance:

- organization/repository: `ki-tomat/kitomat`
- visibility: public
- default branch: `main`
- branch protection active
- pull request required before merge
- one human review required
- required status check: `validate`
- force pushes disabled
- branch deletion disabled
- conversation resolution required
- admin enforcement enabled

Repository content:

- root docs: `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `LICENSE`, `LICENSE-CONTENT.md`, `ROADMAP.md`, `CHANGELOG.md`, `AGENTS.md`
- artifact templates for prompts, datasets and models
- issue templates and pull request template
- metadata schemas
- validator workflow
- trust layer and review docs
- OpenClaw advisory precheck docs
- public contribution flow

Validation:

- GitHub Actions workflow `Validate artifacts` is active
- smoke-test PR confirmed that validation can pass while merge stays blocked without human review

## Open work

Content:

- participant artifacts are not imported yet
- no release candidate artifact batch is reviewed yet
- no `bronze` artifacts are confirmed yet
- no release notes are finalized yet

Operations:

- admins, maintainers, reviewers and trust reviewers need final GitHub usernames
- first import batch needs 3 to 5 participant artifacts
- peer review assignments are not documented in GitHub yet
- trust review ownership is still mainly course-lead based

Agents:

- OpenClaw is documented as advisory precheck, not yet connected to a runtime
- Hermes release/handover agent needs prompt and usage guide
- no automated agent comments should run until the manual process is stable

Website and downloads:

- GitHub Pages catalog is not implemented yet
- release asset download process is not documented in the repo yet
- no dataset package has been published as a GitHub Release Asset yet

Outreach:

- no public announcement has been approved
- no partner outreach has been sent
- partner strategy for German KMU ecosystem needs a controlled draft

## Main risks

- Large files committed directly to Git instead of published as release assets.
- Participant submissions contain unclear sources or local files without license status.
- Review bottleneck if more than 8 trust reviews arrive at once.
- Public visibility is mistaken for publication approval.
- Agent output is mistaken for expert approval.
- Outreach starts before v0.1-rc is honestly ready.

## Immediate next sequence

1. Finalize operational guides and agent prompts.
2. Import participant artifacts in batches of 3 to 5.
3. Run validators and OpenClaw/Codex precheck.
4. Route artifacts to peer review and trust review.
5. Prepare first `v0.1-rc` release notes.
6. Publish only after license, privacy, source and maintainer gates are clear.

