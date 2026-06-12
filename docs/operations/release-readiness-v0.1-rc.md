# Release Readiness: v0.1-rc

`v0.1-rc` is a release candidate, not a claim of production readiness.

## Required before release candidate

Foundation:

- [x] public repository exists
- [x] `main` is protected
- [x] pull requests are required
- [x] one human review is required
- [x] validator check `validate` is required
- [x] root files exist
- [x] artifact templates exist
- [x] trust layer docs exist
- [x] issue and PR templates exist
- [x] release target milestone exists

Content:

- [ ] at least 10 release-ready or nearly release-ready main artifacts, or honest deviation documented
- [ ] at least one reviewed example per artifact type where possible
- [ ] each release candidate has required files
- [ ] each release candidate has valid metadata
- [ ] each release candidate has a scenario triad
- [ ] each release candidate has peer review
- [ ] each release candidate has required trust review
- [ ] no unsupported `silver`, `gold_candidate` or `gold`

Data and source safety:

- [ ] no real personal data
- [ ] no real customer data
- [ ] no internal company documents
- [ ] no health data
- [ ] no confidential finance data
- [ ] no unclear full-text copies
- [ ] no local uploads without clear origin, license and trust review
- [ ] release assets have metadata, size, checksum, license status and source status

Release material:

- [ ] `CHANGELOG.md` updated
- [ ] release notes drafted
- [ ] `docs/index.md` updated
- [ ] GitHub Pages catalog plan documented
- [ ] open post-MVP items documented
- [ ] maintainer approval recorded

## Release asset gate

Large dataset/source packages should be attached as GitHub Release Assets, not committed directly to Git.

Each asset needs:

- file name
- version
- file size
- checksum, preferably SHA-256
- artifact ID
- linked metadata file
- license status
- source status
- data risk
- human review decision

## Go/no-go rule

Release as `v0.1-rc` only when blockers are documented honestly.

Do not release as `v0.1.0` unless license, privacy, source review, trust review, release notes and maintainer approval are complete.

