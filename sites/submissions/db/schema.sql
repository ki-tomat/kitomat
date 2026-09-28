CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  owner_github_id TEXT NOT NULL,
  owner_github_login TEXT NOT NULL,
  artifact_id TEXT NOT NULL,
  artifact_type TEXT NOT NULL,
  state TEXT NOT NULL,
  requested_status TEXT,
  current_revision INTEGER NOT NULL DEFAULT 1,
  package_sha256 TEXT NOT NULL,
  package_size INTEGER NOT NULL,
  r2_key TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  completed_at TEXT,
  expires_at TEXT NOT NULL,
  pull_request_number INTEGER,
  UNIQUE(owner_github_id, artifact_id)
);

CREATE TABLE IF NOT EXISTS submission_revisions (
  submission_id TEXT NOT NULL,
  revision INTEGER NOT NULL,
  package_sha256 TEXT NOT NULL,
  package_size INTEGER NOT NULL,
  r2_key TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (submission_id, revision),
  FOREIGN KEY (submission_id) REFERENCES submissions(id)
);

CREATE TABLE IF NOT EXISTS submission_audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  submission_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  actor_kind TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  FOREIGN KEY (submission_id) REFERENCES submissions(id)
);

CREATE INDEX IF NOT EXISTS submissions_owner_state_idx ON submissions(owner_github_id, state);
CREATE INDEX IF NOT EXISTS submissions_expiry_idx ON submissions(expires_at);
