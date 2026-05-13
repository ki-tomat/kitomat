# Trust Layer Guide

The trust layer is the minimum metadata and review context needed before an artifact can be trusted by other users.

## Required metadata

- `data_risk`
- `human_review_required`
- `ai_act_proximity`
- `legal_disclaimer`
- `sources_status`
- `license_status`

## Data risk

| Value | Meaning |
|---|---|
| `green` | no or very low data risk |
| `yellow` | personal or confidential data may be possible |
| `red` | sensitive, legal, finance, HR, insurance, health or education-related risk possible |

## Review rule

- `green`: self-declaration plus peer review can be enough unless sensitive areas are involved.
- `yellow`: trust review required.
- `red`: trust review plus second maintainer approval required, or move to `post_mvp`.

## Hard boundaries

Do not merge:

- real personal data
- real customer data
- internal company documents
- health data
- confidential finance data
- real application documents
- personal emails
- unclear full-text copies
- anonymized internal real data

