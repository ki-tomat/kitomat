# GitHub Pages Catalog Plan

KItomat will use GitHub Pages as a static catalog.

It is not:

- SaaS
- marketplace
- login system
- database platform
- automated decision tool

## Purpose

The catalog helps users find:

- prompt packages
- dataset/source packages
- KMU and industry models
- reviewed status
- trust notes
- download links
- contribution guidance

## First version

Static pages:

- home
- artifact catalog
- prompts
- datasets/sources
- models
- contribute
- review and trust
- downloads
- partner/contact

## Catalog fields

Each entry should show:

- title
- artifact type
- category
- status
- language
- version
- maintainer code or team
- data risk
- source status
- license status
- human review required
- link to repository folder
- download link if available

## Download handling

Large files are linked from GitHub Release Assets.

The catalog should show:

- file name
- version
- file size
- checksum
- release tag
- license
- data risk

## Build approach

Recommended first implementation:

- GitHub Pages from static Markdown or simple generated HTML
- no backend
- no authentication
- no client-side submission form in MVP
- no analytics requiring consent unless deliberately approved

## Publication gate

Do not publish or promote the catalog until:

- first artifact batch is reviewed
- release notes exist
- no disallowed data is present
- download assets are checked
- maintainer approves public communication

