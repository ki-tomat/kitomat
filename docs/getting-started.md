# Getting Started

## For contributors

1. Get your participant code, for example `p01`.
2. Choose one main artifact:
   - Prompt package
   - Dataset/source package
   - KMU/industry model
3. Copy the matching `_template` folder.
4. Rename the folder with a short artifact ID.
5. Fill all required files.
6. Add a scenario triad: positive, reworkable, negative.
7. Run or request validation.
8. Submit via pull request or through the maintainer import path.

## Folder examples

```text
prompts/marketing/seo-content-brief/
datasets/marketing/synthetic-persona-pack/
models/consulting/ai-use-case-canvas/
```

## Local validation

```bash
python tools/validators/validate_metadata.py
python tools/validators/validate_completeness.py
python tools/validators/pii_heuristic.py
```

## Status

Use `draft` until the artifact is structurally complete. Use `bronze_candidate` when it is ready for peer/trust review. Only maintainers can confirm `bronze`.

