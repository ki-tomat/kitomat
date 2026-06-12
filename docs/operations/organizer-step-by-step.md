# Organizer Step by Step

This guide is for volunteers who help organize KItomat without necessarily being maintainers.

## 1. Role boundaries

Organizers can help with:

- participant coordination
- issue hygiene
- peer review pairing
- reminder messages
- outreach drafts
- partner research
- documentation feedback

Organizers do not:

- merge into `main`
- approve final `bronze`
- publish releases
- publish public posts without human go
- accept risky data
- provide legal or audit approval

## 2. Participant coordination

1. Confirm participant code, for example `p07`.
2. Confirm artifact type.
3. Confirm target folder or import path.
4. Check whether the participant can use GitHub.
5. Route non-GitHub submissions to the maintainer import path.

## 3. Peer review pairing

1. Pair each artifact with one reviewer from another team where possible.
2. Avoid self-review.
3. Ask the reviewer to check clarity, usability, target group, scenario triad and obvious domain errors.
4. Keep review comments short and actionable.

## 4. Trust review support

Organizers can pre-sort risks:

- `green`: low-risk synthetic examples
- `yellow`: sensitive domain or unclear source context
- `red`: possible sensitive data, HR, finance, health, legal or decisions about people

Final trust decision remains with maintainers or trust reviewers.

## 5. Outreach support

1. Collect possible partners.
2. Note why the partner is relevant for KMU.
3. Draft a short contact message.
4. Mark whether public mention is allowed.
5. Wait for maintainer approval before sending.

## 6. Weekly organizer report

Use this format:

```markdown
## Organizer Report

- New submissions:
- PRs needing peer review:
- PRs needing trust review:
- Blockers:
- Partner/outreach drafts:
- Decisions needed from maintainers:
```

