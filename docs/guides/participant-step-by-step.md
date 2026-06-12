# Participant Step by Step

This guide is for course participants contributing to KItomat.

## 1. Choose one main artifact

Choose exactly one:

- prompt package
- dataset/source package
- KMU or industry model

Do not start a second main artifact before the first one is at least `bronze_candidate` ready.

## 2. Pick your path

Path A: GitHub direct

1. Create or use your assigned branch.
2. Copy the matching `_template` folder.
3. Fill the required files.
4. Open a pull request.

Path B: maintainer import

1. Fill the required files locally.
2. Send them to the course lead/maintainer.
3. The maintainer or Codex imports them into a participant branch.
4. You answer review questions.

Both paths have the same quality standard.

## 3. Required quality

Your artifact must show:

- target group
- use case
- required inputs
- output format
- boundaries
- scenario triad
- source or source status
- data risk
- human review requirement

## 4. Scenario triad

Include:

1. positive scenario
2. reworkable scenario
3. negative scenario

For each scenario, explain what an expert sees that a generic AI model may miss.

## 5. Dataset and download packages

Small examples can stay in the repository.

Large files should be prepared as release assets:

- `.zip`
- `.csv`
- `.xlsx`
- `.pdf`
- `.docx`

For every large file, provide:

- file name
- short description
- version
- file size if known
- source status
- license status
- data risk
- whether it contains personal or sensitive data

Do not submit real customer, personal, health, HR or confidential finance data.

## 6. Agentic AI usage

You may use ChatGPT, Claude, Codex, Claude Code, Cowork or another approved AI tool.

AI can help with:

- structure
- examples
- syntax
- checklists
- wording

You remain responsible for:

- domain correctness
- sources
- limits
- data safety
- final expert judgment

## 7. Before submission

Check:

- no placeholders remain
- no real sensitive data is included
- metadata is filled
- examples are synthetic
- sources are documented
- scenario triad is present
- status is `draft` or `bronze_candidate`

