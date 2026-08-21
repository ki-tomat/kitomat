# Import Batch Step by Step

Use this guide when participant files are submitted outside GitHub.

## Batch size

Process 3 to 5 artifacts per batch.

Do not import all 20 participant contributions in one run.

## 1. Prepare batch list

Create a table:

```markdown
| Code | Type | Title | Source folder/file | Target ID |
|---|---|---|---|---|
| p01 | prompt_package | ... | ... | ... |
```

## 2. Create branches

Use branch names:

```text
participant/p01-<artifact-id>
participant/p02-<artifact-id>
```

## 3. Copy into template structure

Target folders:

- `prompts/<category>/<artifact-id>/`
- `datasets/<category>/<artifact-id>/`
- `models/<category>/<artifact-id>/`

If category is unclear, use a conservative temporary category such as `general`.

## 4. Syntax repair

Codex may repair:

- Markdown headings
- YAML indentation
- tables
- file names
- missing folder structure

Codex must not invent expert substance, sources or final approval.

## 5. Run checks

Run:

```bash
python3 tools/validators/validate_metadata.py
python3 tools/validators/validate_completeness.py
python3 tools/validators/pii_heuristic.py
```

## 6. Open pull request

PR title:

```text
Import pXX: <artifact title>
```

PR body must include:

- artifact type
- participant code
- source path
- validation result
- OpenClaw/Codex precheck result
- missing information
- data/license/trust notes

## 7. Batch report

After each batch:

```markdown
## Batch Report

- Imported:
- PRs opened:
- Validator result:
- Missing expert information:
- Source/license concerns:
- Trust review needed:
- Recommended next batch:
```

