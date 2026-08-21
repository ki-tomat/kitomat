# Artifact Standard

## Prompt Package

Required files:

```text
prompt.md
README.md
metadata.yml
examples/input-01.md
examples/output-01.md
evaluation.md
failure-modes.md
```

## Dataset/Source Package

Required files:

```text
README.md
metadata.yml
sources.md
license.md
usage.md
```

At least one useful material form should be present:

- synthetic example data
- source list
- checklist
- template
- short context package

Large files are not stored directly in Git by default. Use GitHub Release Assets and document file name, version, size, checksum, source status, license status and data risk.

## Model

Required files:

```text
model.md
README.md
metadata.yml
application-guide.md
worksheet/ or canvas/
examples/example-01.md
sources.md
failure-modes.md
```

## Scenario Triad

Every release candidate artifact needs:

- positive scenario
- reworkable scenario
- negative scenario
- short expert feedback

The triad can live in examples, evaluation, usage or failure modes. It does not create a new artifact type.
