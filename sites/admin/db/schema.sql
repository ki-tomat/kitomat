CREATE TABLE IF NOT EXISTS team_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  author_key TEXT,
  body TEXT NOT NULL
);

-- AP11: id als TEXT fuer benannte Eintraege (ap8, ap9, ...)
CREATE TABLE IF NOT EXISTS checklist_items (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  done INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_users (
  email TEXT PRIMARY KEY,
  display_name TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_user_roles (
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  granted_by TEXT NOT NULL,
  granted_at TEXT NOT NULL,
  PRIMARY KEY (email, role),
  FOREIGN KEY (email) REFERENCES admin_users(email)
);

CREATE TABLE IF NOT EXISTS artifact_status_overrides (
  artifact_id TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  note TEXT,
  updated_by TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  actor_email TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  details TEXT
);
