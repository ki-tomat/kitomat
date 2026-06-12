# Download Assets Step by Step

Large download files should be published through GitHub Releases, not committed directly to Git.

## Why release assets

Use release assets for multi-MB files such as:

- `.zip`
- `.csv`
- `.xlsx`
- `.pdf`
- `.docx`

Keep the repository lightweight and reviewable.

## What stays in the repo

Commit only:

- templates
- small synthetic examples
- source lists
- short summaries
- metadata
- usage instructions
- checksums

## 1. Prepare the file

1. Remove disallowed data.
2. Package related files as `.zip`.
3. Use a clear file name:

```text
kitomat-<artifact-id>-<version>.zip
```

## 2. Calculate checksum

Recommended:

```bash
shasum -a 256 <file>
```

Record the result in the artifact README or release notes.

## 3. Required metadata

For each downloadable asset, document:

- artifact ID
- title
- version
- file name
- file size
- SHA-256 checksum
- license
- license status
- sources status
- data risk
- human review status
- release tag
- download URL

## 4. Upload to GitHub Release

1. Open GitHub Releases.
2. Create a draft release or release candidate.
3. Attach the file.
4. Add release notes.
5. Keep release as draft until maintainer approval.

## 5. Link from catalog

The GitHub Pages catalog should link to release assets, not store large files.

Each catalog entry should show:

- download button
- file size
- version
- checksum
- license status
- data risk
- review status

## Hard stop

Do not publish assets with:

- personal data
- customer data
- health data
- confidential finance data
- internal documents
- unclear full-text rights
- unclear source or license

