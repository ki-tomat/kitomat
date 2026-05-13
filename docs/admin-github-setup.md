# Admin GitHub Setup

This guide is for maintainers who prepare `ki-tomat/kitomat` for public collaboration.

## Repository target

- Organization: `ki-tomat`
- Repository: `kitomat`
- URL: `https://github.com/ki-tomat/kitomat`
- Default release target: `v0.1-rc`

The repository can be private during setup and made public only after the license, privacy and review gates are confirmed.

## Local bootstrap commands

Run these only after human go and working GitHub authentication:

```bash
git init -b main
git remote add origin git@github.com:ki-tomat/kitomat.git
git add .
git commit -m "Bootstrap KItomat foundation"
git push -u origin main
```

HTTPS can also be used if GitHub token authentication is configured:

```bash
git remote add origin https://github.com/ki-tomat/kitomat.git
```

## Required repository settings

Before participant work is merged:

- set default branch to `main`
- require pull requests before merge
- require at least one human review
- require the `validate-artifacts` workflow
- prevent force pushes to `main`
- keep maintainer merge responsibility explicit
- use participant codes instead of clear names by default

## Suggested roles

- Owner: organization owner
- Maintainer: course lead or trusted admin
- Contributor: participant who can push branches or open pull requests
- Import contributor: participant who submits files to the maintainer
- Trust reviewer: maintainer/admin who checks risk, sources and license

## Labels to create

Use snake_case labels:

```text
prompt_package
dataset_package
model
draft
bronze_candidate
bronze
needs_human_input
needs_peer_review
needs_trust_review
needs_strict_trust_review
ready_for_human_eval
post_mvp
```

Do not use `silver`, `gold_candidate` or `gold` as regular course labels.

## First admin checklist

1. Confirm the license files are acceptable.
2. Confirm whether the repository starts private or public.
3. Confirm who may merge into `main`.
4. Invite admins and contributors.
5. Test one dummy issue.
6. Test one dummy pull request.
7. Confirm GitHub Actions runs the validators.
8. Confirm OpenClaw precheck is only advisory.
9. Confirm no real personal, customer, health, HR or confidential finance data is uploaded.
10. Confirm first participant imports happen in batches.

## Import path for participants

If contributors cannot push directly:

1. maintainer receives the artifact files
2. maintainer creates or asks Codex to create `participant/pXX-<artifact-id>`
3. files are copied into the matching artifact folder
4. validators are run
5. OpenClaw/Codex pre-review feedback is generated
6. peer review and trust review are completed as needed
7. maintainer decides merge or changes

This path has the same quality standard as direct pull requests.

