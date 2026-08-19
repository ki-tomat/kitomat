// AP: Admin RBAC Foundation
// Internal KI-tomat admin surface with authenticated Sites identity, D1-backed
// roles, audit log, admin-only access and artifact status overrides.

const SITES_USER_EMAIL_HEADER = 'oai-authenticated-user-email';
const SITES_USER_NAME_HEADER = 'oai-authenticated-user-full-name';
const SITES_USER_NAME_ENCODING_HEADER = 'oai-authenticated-user-full-name-encoding';
const LEGACY_USER_HEADER = 'x-openai-workspace-user';
const INPUT_MAX_LEN = 2000;
const CONTENT_REPO_OWNER = 'ki-tomat';
const CONTENT_REPO_NAME = 'kitomat';
const CONTENT_REPO_BRANCH = 'main';
const CONTENT_REPO = `${CONTENT_REPO_OWNER}/${CONTENT_REPO_NAME}`;
const CONTENT_FOLDERS = new Set(['prompts', 'datasets', 'models']);

const ROLES = [
  { id: 'admin', label: 'Admin', desc: 'Vollzugriff, Rollenvergabe, Statuspflege.' },
  { id: 'maintainer', label: 'Maintainer', desc: 'Inhalts- und Release-Verantwortung.' },
  { id: 'reviewer', label: 'Reviewer', desc: 'Review-Rolle fuer Artefaktpruefungen.' },
  { id: 'contributor', label: 'Contributor', desc: 'Beitragsrolle ohne Admin-Zugang.' },
  { id: 'viewer', label: 'Viewer', desc: 'Leserolle fuer spaetere interne Uebersichten.' },
];
const ROLE_IDS = new Set(ROLES.map((r) => r.id));

const ARTIFACT_STATUSES = [
  'draft',
  'bronze_candidate',
  'bronze',
  'silver',
  'gold',
  'archived',
  'rejected',
];
const ARTIFACT_STATUS_SET = new Set(ARTIFACT_STATUSES);

const DEFAULT_CHECKLIST = [
  { id: 'ap8',  label: 'AP8: Sites-Grundstruktur' },
  { id: 'ap9',  label: 'AP9: Public Content API + D1 Cache' },
  { id: 'ap10', label: 'AP10: WebUI Data Bridge' },
  { id: 'ap11', label: 'AP11: Internal Admin Site' },
  { id: 'ap12', label: 'AP12: Contribution Persistence + GitHub-Handoff' },
  { id: 'ap13', label: 'AP13: Integration, QA, Rollout' },
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method;
    const isLocalDev = env.LOCAL_DEV === 'true';

    await ensureSchema(env);

    const identity = getIdentity(request, isLocalDev);

    if (!identity.email && !isLocalDev) {
      return renderAccessDenied(401, 'Login erforderlich', 'Die Admin-Site benoetigt eine authentifizierte Sites-Identitaet.');
    }

    const currentUser = await resolveCurrentUser(env, identity, isLocalDev);

    if (!currentUser.isAdmin) {
      return renderAccessDenied(403, 'Kein Admin-Zugriff', 'Dein Login wurde erkannt, aber deiner Person ist keine Admin-Rolle zugewiesen.');
    }

    if (method === 'POST') {
      const originError = checkOrigin(request, env);
      if (originError) return originError;
    }

    if (url.pathname === '/api/admin/state' && method === 'GET') {
      return handleState(env, currentUser);
    }
    if (url.pathname === '/api/admin/notes' && method === 'POST') {
      return handleNotesPost(request, env, currentUser);
    }
    if (url.pathname === '/api/admin/notes/delete' && method === 'POST') {
      return handleNotesDelete(request, env, currentUser);
    }
    if (url.pathname === '/api/admin/checklist' && method === 'POST') {
      return handleChecklistPost(request, env, currentUser);
    }
    if (url.pathname === '/api/admin/users/grant' && method === 'POST') {
      return handleRoleGrant(request, env, currentUser);
    }
    if (url.pathname === '/api/admin/users/revoke' && method === 'POST') {
      return handleRoleRevoke(request, env, currentUser);
    }
    if (url.pathname === '/api/admin/users/delete' && method === 'POST') {
      return handleUserDelete(request, env, currentUser);
    }
    if (url.pathname === '/api/admin/artifact-status' && method === 'POST') {
      return handleArtifactStatusPost(request, env, currentUser);
    }

    if (method !== 'GET') {
      return jsonResp({ error: 'Method not allowed.' }, 405);
    }

    return renderAdminPage(env, currentUser);
  },
};

function getIdentity(request, isLocalDev) {
  const email = normalizeEmail(
    request.headers.get(SITES_USER_EMAIL_HEADER) ||
    request.headers.get(LEGACY_USER_HEADER) ||
    (isLocalDev ? 'local.admin@example.test' : ''),
  );
  const encodedName = request.headers.get(SITES_USER_NAME_HEADER);
  const encoding = request.headers.get(SITES_USER_NAME_ENCODING_HEADER);
  let displayName = email;
  if (encodedName && encoding === 'percent-encoded-utf-8') {
    try {
      displayName = decodeURIComponent(encodedName);
    } catch {
      displayName = email;
    }
  }
  return { email, displayName };
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function parseEmailList(value) {
  return String(value || '')
    .split(',')
    .map((v) => normalizeEmail(v))
    .filter(Boolean);
}

function checkOrigin(request, env) {
  const allowed = env.ALLOWED_ORIGIN || '';
  if (!allowed) return null;
  const origin = request.headers.get('Origin') || '';
  if (origin !== allowed) {
    return jsonResp({ error: 'Origin nicht erlaubt.' }, 403);
  }
  return null;
}

async function resolveCurrentUser(env, identity, isLocalDev) {
  const email = identity.email;
  const now = new Date().toISOString();

  if (!env.DB) {
    return {
      email,
      displayName: identity.displayName,
      roles: isLocalDev ? ['admin'] : [],
      isAdmin: isLocalDev,
      bootstrapSource: 'no-db',
    };
  }

  await seedEnvAdmins(env);

  if (email) {
    await env.DB
      .prepare(`INSERT INTO admin_users (email, display_name, status, created_at, updated_at)
        VALUES (?, ?, 'active', ?, ?)
        ON CONFLICT(email) DO UPDATE SET display_name = excluded.display_name, updated_at = excluded.updated_at`)
      .bind(email, identity.displayName || email, now, now)
      .run();
  }

  const explicitAdmins = parseEmailList(env.ADMIN_EMAILS);
  let bootstrapSource = explicitAdmins.includes(email) ? 'env' : 'd1';

  if (explicitAdmins.includes(email)) {
    await grantRole(env, email, 'admin', 'system:ADMIN_EMAILS');
  }

  if (isLocalDev) {
    await grantRole(env, email, 'admin', 'system:LOCAL_DEV');
    bootstrapSource = 'local-dev';
  }

  const adminCount = await countAdminRoles(env);
  if (adminCount === 0 && env.ALLOW_FIRST_ADMIN_BOOTSTRAP === 'true' && email) {
    await grantRole(env, email, 'admin', 'system:first-admin-bootstrap');
    await writeAudit(env, {
      actor: email,
      action: 'first_admin_bootstrap',
      targetType: 'admin_user',
      targetId: email,
      details: 'ALLOW_FIRST_ADMIN_BOOTSTRAP=true',
    });
    bootstrapSource = 'first-admin-bootstrap';
  }

  const roles = await getRolesForEmail(env, email);
  return {
    email,
    displayName: identity.displayName || email,
    roles,
    isAdmin: roles.includes('admin'),
    bootstrapSource,
  };
}

async function seedEnvAdmins(env) {
  if (!env.DB) return;
  const admins = parseEmailList(env.ADMIN_EMAILS);
  for (const email of admins) {
    await env.DB
      .prepare(`INSERT INTO admin_users (email, display_name, status, created_at, updated_at)
        VALUES (?, ?, 'active', ?, ?)
        ON CONFLICT(email) DO UPDATE SET status = 'active', updated_at = excluded.updated_at`)
      .bind(email, email, new Date().toISOString(), new Date().toISOString())
      .run();
    await grantRole(env, email, 'admin', 'system:ADMIN_EMAILS');
  }
}

async function getRolesForEmail(env, email) {
  if (!env.DB || !email) return [];
  const result = await env.DB
    .prepare(`SELECT role FROM admin_user_roles WHERE email = ? ORDER BY role`)
    .bind(email)
    .all();
  return (result.results || []).map((r) => r.role);
}

async function countAdminRoles(env) {
  const result = await env.DB
    .prepare(`SELECT COUNT(*) AS n FROM admin_user_roles WHERE role = 'admin'`)
    .first();
  return Number(result?.n || 0);
}

async function grantRole(env, email, role, actor) {
  const now = new Date().toISOString();
  await env.DB
    .prepare(`INSERT INTO admin_users (email, display_name, status, created_at, updated_at)
      VALUES (?, ?, 'active', ?, ?)
      ON CONFLICT(email) DO UPDATE SET status = 'active', updated_at = excluded.updated_at`)
    .bind(email, email, now, now)
    .run();
  await env.DB
    .prepare(`INSERT OR IGNORE INTO admin_user_roles (email, role, granted_by, granted_at)
      VALUES (?, ?, ?, ?)`)
    .bind(email, role, actor, now)
    .run();
}

async function revokeRole(env, email, role) {
  await env.DB
    .prepare(`DELETE FROM admin_user_roles WHERE email = ? AND role = ?`)
    .bind(email, role)
    .run();
}

async function handleState(env, currentUser) {
  const contentApiUrl = env.CONTENT_API_URL;
  let apiStatus = 'nicht konfiguriert';
  let inventory = [];
  let apiError = null;
  let apiWarning = null;

  if (contentApiUrl) {
    try {
      const resp = await fetch(`${contentApiUrl}/api/content`, {
        headers: { 'Accept': 'application/json' },
      });
      if (resp.ok) {
        const data = await resp.json();
        apiStatus = 'erreichbar';
        inventory = Array.isArray(data) ? data : (data.artifacts || data.items || []);
      } else {
        apiStatus = `HTTP ${resp.status}`;
        apiError = `Content API antwortete mit ${resp.status}`;
      }
    } catch (e) {
      apiStatus = 'nicht erreichbar';
      apiError = e.message;
    }
  }

  if (inventory.length === 0) {
    const fallback = await loadGitHubInventory(env);
    if (fallback.ok) {
      apiWarning = apiError
        ? `${apiError}; GitHub-Fallback aktiv`
        : 'GitHub-Fallback aktiv';
      apiError = null;
      apiStatus = 'GitHub-Fallback';
      inventory = fallback.inventory;
    } else if (apiError) {
      apiError = `${apiError}; GitHub-Fallback fehlgeschlagen: ${fallback.error}`;
    } else {
      apiStatus = 'Fehler';
      apiError = `GitHub-Fallback fehlgeschlagen: ${fallback.error}`;
    }
  }

  const statusOverrides = await listArtifactStatusOverrides(env);
  inventory = inventory.map((item) => {
    const id = item.id || item.slug || item.repoPath || item.title;
    const override = statusOverrides.find((s) => s.artifact_id === id);
    return {
      ...item,
      id,
      adminStatus: override?.status || null,
      adminStatusUpdatedAt: override?.updated_at || null,
      effectiveStatus: override?.status || item.status || null,
    };
  });

  const notes = await listNotes(env);
  const checklist = await getOrSeedChecklist(env);
  const users = await listUsers(env);
  const audit = await listAudit(env);

  return jsonResp({
    auth: {
      email: currentUser.email,
      displayName: currentUser.displayName,
      roles: currentUser.roles,
      bootstrapSource: currentUser.bootstrapSource,
    },
    roles: ROLES,
    contentApiConfigured: Boolean(contentApiUrl),
    apiStatus,
    apiError,
    apiWarning,
    artifactCount: inventory.length,
    inventory,
    notes,
    checklist,
    users,
    audit,
    generatedAt: new Date().toISOString(),
  });
}

async function loadGitHubInventory(env) {
  try {
    const headers = githubHeaders(env);
    const treeUrl = `https://api.github.com/repos/${CONTENT_REPO}/git/trees/${CONTENT_REPO_BRANCH}?recursive=1`;
    const treeResp = await fetch(treeUrl, { headers });
    if (!treeResp.ok) {
      return { ok: false, error: `GitHub Tree API HTTP ${treeResp.status}` };
    }

    const treeData = await treeResp.json();
    const paths = (treeData.tree || [])
      .filter((item) => item.type === 'blob')
      .map((item) => item.path)
      .filter(isArtifactMetadataPath);

    const inventory = [];
    for (const path of paths) {
      const rawUrl = `https://raw.githubusercontent.com/${CONTENT_REPO}/${CONTENT_REPO_BRANCH}/${path}`;
      const rawResp = await fetch(rawUrl, { headers });
      if (!rawResp.ok) continue;

      const yaml = await rawResp.text();
      const parsed = parseSimpleYaml(yaml);
      const parts = path.split('/');
      const folder = parts[0];
      const id = parsed.id || parts[1] || path;
      const title = parsed.title || parsed.name || id;
      const artifactType = parsed.artifact_type || parsed.type || folder;
      const repoPath = parts.slice(0, -1).join('/');

      inventory.push({
        id,
        title,
        type: artifactType,
        artifact_type: artifactType,
        status: parsed.status || parsed.lifecycle_status || 'draft',
        risk: parsed.data_risk || parsed.risk || parsed.risk_level || '-',
        data_risk: parsed.data_risk || parsed.risk || parsed.risk_level || '-',
        githubUrl: `https://github.com/${CONTENT_REPO}/tree/${CONTENT_REPO_BRANCH}/${repoPath}`,
        repoPath,
        description: parsed.description || parsed.summary || '',
      });
    }

    return { ok: true, inventory };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

function githubHeaders(env) {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'kitomat-admin-site',
  };
  if (env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  }
  return headers;
}

function isArtifactMetadataPath(path) {
  const parts = String(path || '').split('/');
  if (parts.length < 3) return false;
  if (!CONTENT_FOLDERS.has(parts[0])) return false;
  if (parts.includes('_template')) return false;
  return parts[parts.length - 1] === 'metadata.yml' || parts[parts.length - 1] === 'metadata.yaml';
}

function parseSimpleYaml(text) {
  const result = {};
  const lines = String(text || '').split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2].trim();
    if (!value || value === '|' || value === '>') continue;
    value = value.replace(/^['"]|['"]$/g, '');
    result[key] = value;
  }
  return result;
}

async function handleNotesPost(request, env, currentUser) {
  const body = await readJson(request);
  if (body.error) return body.error;

  const text = String(body.text || '').trim();
  if (!text) return jsonResp({ error: 'text darf nicht leer sein.' }, 400);
  if (text.length > INPUT_MAX_LEN) {
    return jsonResp({ error: `text zu lang (max ${INPUT_MAX_LEN} Zeichen).` }, 400);
  }

  if (!env.DB) return jsonResp({ error: 'D1 nicht konfiguriert.' }, 500);

  await env.DB
    .prepare('INSERT INTO team_notes (created_at, author_key, body) VALUES (?, ?, ?)')
    .bind(new Date().toISOString(), authorKey(currentUser.email), text)
    .run();

  await writeAudit(env, {
    actor: currentUser.email,
    action: 'create_note',
    targetType: 'team_note',
    targetId: 'latest',
  });

  return jsonResp({ ok: true });
}

async function handleNotesDelete(request, env, currentUser) {
  const body = await readJson(request);
  if (body.error) return body.error;

  const ids = Array.isArray(body.ids)
    ? body.ids.map((id) => Number.parseInt(id, 10)).filter((id) => Number.isInteger(id) && id > 0)
    : [];

  if (ids.length === 0) return jsonResp({ error: 'Keine Notiz ausgewaehlt.' }, 400);
  if (ids.length > 50) return jsonResp({ error: 'Zu viele Notizen auf einmal ausgewaehlt.' }, 400);
  if (!env.DB) return jsonResp({ error: 'D1 nicht konfiguriert.' }, 500);

  const uniqueIds = Array.from(new Set(ids));
  for (const id of uniqueIds) {
    await env.DB
      .prepare('DELETE FROM team_notes WHERE id = ?')
      .bind(id)
      .run();
  }

  await writeAudit(env, {
    actor: currentUser.email,
    action: 'delete_notes',
    targetType: 'team_note',
    targetId: uniqueIds.join(','),
    details: `${uniqueIds.length} note(s)`,
  });

  return jsonResp({ ok: true, deleted: uniqueIds.length });
}

async function handleChecklistPost(request, env, currentUser) {
  const body = await readJson(request);
  if (body.error) return body.error;

  const id = String(body.id || '').trim().substring(0, 64);
  if (!id) return jsonResp({ error: 'id fehlt.' }, 400);
  const checked = body.checked === true ? 1 : 0;

  if (!env.DB) return jsonResp({ error: 'D1 nicht konfiguriert.' }, 500);

  await env.DB
    .prepare('UPDATE checklist_items SET done = ?, updated_at = ? WHERE id = ?')
    .bind(checked, new Date().toISOString(), id)
    .run();

  await writeAudit(env, {
    actor: currentUser.email,
    action: checked ? 'check_release_item' : 'uncheck_release_item',
    targetType: 'checklist_item',
    targetId: id,
  });

  return jsonResp({ ok: true });
}

async function handleRoleGrant(request, env, currentUser) {
  const body = await readJson(request);
  if (body.error) return body.error;

  const email = normalizeEmail(body.email);
  const role = String(body.role || '').trim();
  if (!email || !email.includes('@')) return jsonResp({ error: 'Gueltige E-Mail erforderlich.' }, 400);
  if (!ROLE_IDS.has(role)) return jsonResp({ error: 'Unbekannte Rolle.' }, 400);

  await grantRole(env, email, role, currentUser.email);
  await writeAudit(env, {
    actor: currentUser.email,
    action: 'grant_role',
    targetType: 'admin_user_role',
    targetId: `${email}:${role}`,
  });

  return jsonResp({ ok: true });
}

async function handleRoleRevoke(request, env, currentUser) {
  const body = await readJson(request);
  if (body.error) return body.error;

  const email = normalizeEmail(body.email);
  const role = String(body.role || '').trim();
  if (!email || !ROLE_IDS.has(role)) return jsonResp({ error: 'E-Mail oder Rolle ungueltig.' }, 400);

  if (role === 'admin') {
    const adminCount = await countAdminRoles(env);
    const targetRoles = await getRolesForEmail(env, email);
    if (adminCount <= 1 && targetRoles.includes('admin')) {
      return jsonResp({ error: 'Die letzte Admin-Rolle kann nicht entfernt werden.' }, 409);
    }
  }

  await revokeRole(env, email, role);
  await writeAudit(env, {
    actor: currentUser.email,
    action: 'revoke_role',
    targetType: 'admin_user_role',
    targetId: `${email}:${role}`,
  });

  return jsonResp({ ok: true });
}

async function handleUserDelete(request, env, currentUser) {
  const body = await readJson(request);
  if (body.error) return body.error;

  const email = normalizeEmail(body.email);
  if (!email || !email.includes('@')) return jsonResp({ error: 'Gueltige E-Mail erforderlich.' }, 400);
  if (email === normalizeEmail(currentUser.email)) {
    return jsonResp({ error: 'Du kannst deinen eigenen Admin-Zugang nicht loeschen.' }, 409);
  }

  const explicitAdmins = parseEmailList(env.ADMIN_EMAILS);
  if (explicitAdmins.includes(email)) {
    return jsonResp({
      error: 'Diese Person ist als fester Admin in ADMIN_EMAILS hinterlegt und wuerde automatisch wieder angelegt.',
    }, 409);
  }

  const targetRoles = await getRolesForEmail(env, email);
  if (targetRoles.includes('admin')) {
    const adminCount = await countAdminRoles(env);
    if (adminCount <= 1) {
      return jsonResp({ error: 'Die letzte Admin-Person kann nicht geloescht werden.' }, 409);
    }
  }

  await writeAudit(env, {
    actor: currentUser.email,
    action: 'delete_user',
    targetType: 'admin_user',
    targetId: email,
    details: targetRoles.join(','),
  });

  await env.DB
    .prepare('DELETE FROM admin_user_roles WHERE email = ?')
    .bind(email)
    .run();
  await env.DB
    .prepare('DELETE FROM admin_users WHERE email = ?')
    .bind(email)
    .run();

  return jsonResp({ ok: true });
}

async function handleArtifactStatusPost(request, env, currentUser) {
  const body = await readJson(request);
  if (body.error) return body.error;

  const artifactId = String(body.artifactId || '').trim().substring(0, 160);
  const status = String(body.status || '').trim();
  const note = String(body.note || '').trim().substring(0, 500);
  if (!artifactId) return jsonResp({ error: 'artifactId fehlt.' }, 400);
  if (!ARTIFACT_STATUS_SET.has(status)) return jsonResp({ error: 'Status ungueltig.' }, 400);

  const now = new Date().toISOString();
  await env.DB
    .prepare(`INSERT INTO artifact_status_overrides (artifact_id, status, note, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(artifact_id) DO UPDATE SET
        status = excluded.status,
        note = excluded.note,
        updated_by = excluded.updated_by,
        updated_at = excluded.updated_at`)
    .bind(artifactId, status, note, currentUser.email, now)
    .run();

  await writeAudit(env, {
    actor: currentUser.email,
    action: 'set_artifact_status',
    targetType: 'artifact',
    targetId: artifactId,
    details: status,
  });

  return jsonResp({ ok: true });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return { error: jsonResp({ error: 'Ungueltiges JSON.' }, 400) };
  }
}

function authorKey(email) {
  return String(email || '')
    .substring(0, 64)
    .replace(/[^a-zA-Z0-9_\-.@]/g, '');
}

async function listNotes(env) {
  if (!env.DB) return [];
  const result = await env.DB
    .prepare('SELECT id, created_at, author_key, body FROM team_notes ORDER BY id DESC LIMIT 10')
    .all();
  return result.results || [];
}

async function getOrSeedChecklist(env) {
  if (!env.DB) return [];
  const existing = await env.DB.prepare('SELECT * FROM checklist_items ORDER BY id').all();
  if (existing.results && existing.results.length > 0) {
    return existing.results;
  }

  const now = new Date().toISOString();
  for (const item of DEFAULT_CHECKLIST) {
    await env.DB
      .prepare('INSERT OR IGNORE INTO checklist_items (id, label, done, updated_at) VALUES (?, ?, 0, ?)')
      .bind(item.id, item.label, now)
      .run();
  }

  const seeded = await env.DB.prepare('SELECT * FROM checklist_items ORDER BY id').all();
  return seeded.results || [];
}

async function listUsers(env) {
  if (!env.DB) return [];
  const users = await env.DB
    .prepare(`SELECT email, display_name, status, created_at, updated_at
      FROM admin_users ORDER BY email`)
    .all();
  const roles = await env.DB
    .prepare(`SELECT email, role, granted_by, granted_at
      FROM admin_user_roles ORDER BY email, role`)
    .all();
  const roleRows = roles.results || [];
  return (users.results || []).map((u) => ({
    ...u,
    roles: roleRows.filter((r) => r.email === u.email),
  }));
}

async function listArtifactStatusOverrides(env) {
  if (!env.DB) return [];
  const result = await env.DB
    .prepare(`SELECT artifact_id, status, note, updated_by, updated_at
      FROM artifact_status_overrides ORDER BY updated_at DESC`)
    .all();
  return result.results || [];
}

async function listAudit(env) {
  if (!env.DB) return [];
  const result = await env.DB
    .prepare(`SELECT id, created_at, actor_email, action, target_type, target_id, details
      FROM audit_log ORDER BY id DESC LIMIT 20`)
    .all();
  return result.results || [];
}

async function writeAudit(env, { actor, action, targetType, targetId, details = null }) {
  if (!env.DB) return;
  await env.DB
    .prepare(`INSERT INTO audit_log
      (created_at, actor_email, action, target_type, target_id, details)
      VALUES (?, ?, ?, ?, ?, ?)`)
    .bind(new Date().toISOString(), actor || 'system', action, targetType, targetId, details)
    .run();
}

async function ensureSchema(env) {
  if (!env.DB) return;

  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS team_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      author_key TEXT,
      body TEXT NOT NULL
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS checklist_items (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS admin_users (
      email TEXT PRIMARY KEY,
      display_name TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS admin_user_roles (
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      granted_by TEXT NOT NULL,
      granted_at TEXT NOT NULL,
      PRIMARY KEY (email, role),
      FOREIGN KEY (email) REFERENCES admin_users(email)
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS artifact_status_overrides (
      artifact_id TEXT PRIMARY KEY,
      status TEXT NOT NULL,
      note TEXT,
      updated_by TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      actor_email TEXT NOT NULL,
      action TEXT NOT NULL,
      target_type TEXT NOT NULL,
      target_id TEXT NOT NULL,
      details TEXT
    )`),
  ]);
}

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function roleOptions(selected = '') {
  return ROLES.map((role) =>
    `<option value="${esc(role.id)}"${role.id === selected ? ' selected' : ''}>${esc(role.label)}</option>`
  ).join('');
}

function statusOptions(selected = '') {
  return ARTIFACT_STATUSES.map((status) =>
    `<option value="${esc(status)}"${status === selected ? ' selected' : ''}>${esc(status)}</option>`
  ).join('');
}

async function renderAdminPage(env, currentUser) {
  let state;
  try {
    const stateResp = await handleState(env, currentUser);
    state = await stateResp.json();
  } catch (e) {
    state = {
      apiStatus: 'unbekannt',
      apiError: e.message,
      artifactCount: 0,
      inventory: [],
      notes: [],
      checklist: [],
      users: [],
      audit: [],
      generatedAt: new Date().toISOString(),
    };
  }

  const configHint = !env.CONTENT_API_URL
    ? `<div class="hint warn"><strong>CONTENT_API_URL fehlt.</strong> Content Inventory ist nicht verfuegbar.</div>`
    : '';
  const apiErrorHint = state.apiError
    ? `<div class="hint warn"><strong>Content API:</strong> ${esc(state.apiError)}</div>`
    : '';
  const apiWarningHint = state.apiWarning
    ? `<div class="hint info"><strong>Datenquelle:</strong> ${esc(state.apiWarning)}</div>`
    : '';
  const externalHint = `<div class="hint info"><strong>Hinweis zu externen Personen:</strong> Rollen in D1 reichen fuer den Admin-Zugang nicht allein. Die Person muss zusaetzlich ueber Sites/Workspace-Zugriff auf diese Admin-Site zugelassen sein. Beim Anlegen wird keine E-Mail versendet und kein KI-Tomat-Passwort erzeugt; der Login laeuft ueber Sites/Workspace.</div>`;

  const inventoryRows = state.inventory.length > 0
    ? state.inventory.map((item) => {
        const id = item.id || item.repoPath || item.title || '';
        const link = item.githubUrl || item.url || item.link || '';
        const effectiveStatus = item.effectiveStatus || item.status || 'draft';
        return `
          <tr>
            <td>
              <strong>${esc(item.title || id || '-')}</strong>
              <small>${esc(id)}</small>
            </td>
            <td>${esc(item.type || item.artifact_type || '-')}</td>
            <td>${esc(item.risk || item.data_risk || '-')}</td>
            <td>
              <select data-artifact-id="${esc(id)}" onchange="setArtifactStatus(this)">
                ${statusOptions(effectiveStatus)}
              </select>
            </td>
            <td>${link ? `<a href="${esc(link)}" target="_blank" rel="noopener">GitHub</a>` : '-'}</td>
          </tr>`;
      }).join('')
    : `<tr><td colspan="5" class="empty">Kein Inventory verfuegbar.</td></tr>`;

  const userRows = state.users.length > 0
    ? state.users.map((user) => {
        const chips = user.roles.length > 0
          ? user.roles.map((role) => `
              <button class="role-chip" onclick="revokeRole('${esc(user.email)}','${esc(role.role)}')" title="Rolle entfernen">
                ${esc(role.role)} x
              </button>`).join('')
          : '<span class="empty">keine Rollen</span>';
        return `
          <tr>
            <td>
              <strong>${esc(user.display_name || user.email)}</strong>
              <small>${esc(user.email)}</small>
            </td>
            <td>${chips}</td>
            <td>${esc(user.status)}</td>
            <td><button class="danger-lite" onclick="deleteUser('${esc(user.email)}')">Loeschen</button></td>
          </tr>`;
      }).join('')
    : `<tr><td colspan="4" class="empty">Noch keine Nutzer erfasst.</td></tr>`;

  const notesHtml = state.notes.length > 0
    ? state.notes.map((n) => `
        <div class="note">
          <label class="note-select">
            <input type="checkbox" class="note-checkbox" value="${esc(n.id)}">
            <span>
              <span class="note-meta">${esc((n.created_at || '').substring(0, 16).replace('T', ' '))}${n.author_key ? ' · ' + esc(n.author_key) : ''}</span>
              <p>${esc(n.body)}</p>
            </span>
          </label>
          <button class="danger-lite note-delete" onclick="deleteNotes([${Number(n.id)}])">Loeschen</button>
        </div>`).join('')
    : '<p class="empty">Noch keine Notizen.</p>';

  const checklistHtml = state.checklist.map((item) => `
    <label class="check-item">
      <input type="checkbox" data-id="${esc(String(item.id))}"${item.done ? ' checked' : ''}>
      ${esc(item.label)}
    </label>`).join('');

  const auditRows = state.audit.length > 0
    ? state.audit.map((row) => `
        <tr>
          <td>${esc((row.created_at || '').substring(0, 16).replace('T', ' '))}</td>
          <td>${esc(row.actor_email)}</td>
          <td>${esc(row.action)}</td>
          <td>${esc(row.target_type)} / ${esc(row.target_id)}</td>
        </tr>`).join('')
    : `<tr><td colspan="4" class="empty">Noch keine Audit-Eintraege.</td></tr>`;

  return new Response(`<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KI-tomat Admin</title>
  <style>
    :root { color-scheme: light; font-family: Inter, system-ui, sans-serif; --red:#e63329; --line:#ddd8ce; --soft:#f3f0e9; --ink:#1f1d1a; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 24px; background: #f8f5ee; color: var(--ink); }
    main { max-width: 1120px; margin: 0 auto; }
    h1 { font-size: 28px; margin: 0 0 8px; }
    h2 { font-size: 18px; margin: 30px 0 10px; border-bottom: 1px solid var(--line); padding-bottom: 7px; }
    h3 { font-size: 15px; margin: 0 0 10px; }
    .topline { color: #6f685e; margin: 0 0 18px; font-size: 14px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
    .card { padding: 15px 16px; border-radius: 8px; background: #fff; border: 1px solid var(--line); }
    .card-label { font-size: 11px; opacity: .58; margin-bottom: 5px; text-transform: uppercase; letter-spacing: .04em; }
    .card-value { font-size: 21px; font-weight: 700; }
    .hint { padding: 11px 14px; border-radius: 7px; margin-bottom: 10px; font-size: 14px; }
    .hint.warn { background: #fff2d7; border-left: 3px solid #d58a00; }
    .hint.info { background: #e9f3ef; border-left: 3px solid #23805a; }
    .section-split { display: grid; grid-template-columns: 1.2fr .8fr; gap: 18px; align-items: start; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; background: #fff; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
    th, td { text-align: left; padding: 9px 11px; border-bottom: 1px solid var(--line); vertical-align: top; }
    th { font-size: 12px; opacity: .62; font-weight: 700; text-transform: uppercase; background: var(--soft); }
    small { display: block; color: #756d61; margin-top: 3px; font-size: 12px; }
    .empty { opacity: .52; font-style: italic; }
    .note { margin-bottom: 10px; padding: 11px 14px; border-radius: 7px; background: #fff; border: 1px solid var(--line); }
    .note { display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: start; }
    .note-select { display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: start; cursor: pointer; }
    .note-select input { margin-top: 3px; }
    .note-meta { font-size: 12px; opacity: .55; }
    .note p { margin: 5px 0 0; font-size: 14px; line-height: 1.5; }
    .note-form, .role-form { display: flex; gap: 8px; margin-top: 12px; }
    textarea, input, select { padding: 9px 10px; border-radius: 7px; border: 1px solid #cfc7ba; background: #fff; color: var(--ink); font-family: inherit; font-size: 14px; }
    textarea { flex: 1; resize: vertical; }
    .role-form input { flex: 1; }
    button { padding: 9px 16px; border-radius: 7px; border: none; background: var(--red); color: #fff; font-weight: 700; cursor: pointer; font-size: 14px; }
    .role-chip { padding: 5px 8px; margin: 0 4px 4px 0; background: #efe9dd; color: #332d25; font-size: 12px; border: 1px solid #d8cfbf; }
    .danger-lite { padding: 6px 9px; background: #fff; color: #9e211a; border: 1px solid #e0b5ad; font-size: 12px; }
    .check-item { display: block; margin-bottom: 9px; font-size: 14px; cursor: pointer; }
    .check-item input { margin-right: 8px; }
    a { color: #8b1d17; font-weight: 700; }
    .meta { font-size: 11px; opacity: .42; margin-top: 36px; }
    @media (max-width: 860px) { .grid, .section-split { grid-template-columns: 1fr; } .note-form, .role-form { flex-direction: column; } }
  </style>
</head>
<body>
<main>
  <h1>KI-tomat Admin</h1>
  <p class="topline">Angemeldet als <strong>${esc(currentUser.email)}</strong> · Rollen: ${esc(currentUser.roles.join(', '))}</p>
  ${configHint}${apiErrorHint}${apiWarningHint}${externalHint}

  <section class="grid">
    <div class="card"><div class="card-label">Content API</div><div class="card-value" style="font-size:15px">${esc(state.apiStatus)}</div></div>
    <div class="card"><div class="card-label">Artefakte</div><div class="card-value">${state.artifactCount}</div></div>
    <div class="card"><div class="card-label">Stand</div><div class="card-value" style="font-size:13px">${esc((state.generatedAt || '').substring(0, 16).replace('T', ' '))}</div></div>
  </section>

  <h2>Nutzer & Rollen</h2>
  <div class="section-split">
    <div>
      <table>
        <thead><tr><th>Nutzer</th><th>Rollen</th><th>Status</th><th>Aktion</th></tr></thead>
        <tbody>${userRows}</tbody>
      </table>
    </div>
    <div class="card">
      <h3>Rolle vergeben</h3>
      <div class="role-form">
        <input id="role-email" type="email" placeholder="person@example.com">
        <select id="role-id">${roleOptions()}</select>
        <button onclick="grantRole()">Hinzufuegen</button>
      </div>
      <p class="topline" style="margin-top:12px">Nur Personen mit Rolle <strong>admin</strong> duerfen diese Admin-Seite nutzen. Das Anlegen versendet keine E-Mail und setzt kein Passwort; die Person muss sich mit ihrem Sites/Workspace-Konto anmelden.</p>
    </div>
  </div>

  <h2>Content Inventory</h2>
  <table>
    <thead><tr><th>Titel</th><th>Typ</th><th>Risiko</th><th>Admin-Status</th><th>Link</th></tr></thead>
    <tbody>${inventoryRows}</tbody>
  </table>

  <h2>Team-Notizen</h2>
  ${notesHtml}
  ${state.notes.length > 0 ? '<button class="danger-lite" onclick="deleteSelectedNotes()">Ausgewaehlte Notizen loeschen</button>' : ''}
  <div class="note-form">
    <textarea id="note-text" rows="2" maxlength="2000" placeholder="Neue Notiz ..."></textarea>
    <button onclick="submitNote()">Speichern</button>
  </div>

  <h2>Release-Checkliste</h2>
  <div id="checklist">${checklistHtml}</div>

  <h2>Audit Log</h2>
  <table>
    <thead><tr><th>Zeit</th><th>Person</th><th>Aktion</th><th>Ziel</th></tr></thead>
    <tbody>${auditRows}</tbody>
  </table>

  <p class="meta">Admin RBAC Foundation · ${esc(state.generatedAt || '')}</p>
</main>
<script>
  async function postJson(url, body) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'Aktion fehlgeschlagen.');
      return false;
    }
    return true;
  }
  async function submitNote() {
    const ta = document.getElementById('note-text');
    const text = ta.value.trim();
    if (!text) return;
    if (await postJson('/api/admin/notes', { text })) location.reload();
  }
  async function deleteNotes(ids) {
    if (!ids || ids.length === 0) return;
    const label = ids.length === 1 ? 'diese Notiz' : ids.length + ' Notizen';
    if (!confirm('Soll ' + label + ' geloescht werden?')) return;
    if (await postJson('/api/admin/notes/delete', { ids })) location.reload();
  }
  async function deleteSelectedNotes() {
    const ids = Array.from(document.querySelectorAll('.note-checkbox:checked'))
      .map(function(cb) { return Number.parseInt(cb.value, 10); })
      .filter(function(id) { return Number.isInteger(id) && id > 0; });
    if (ids.length === 0) {
      alert('Bitte zuerst eine oder mehrere Notizen auswaehlen.');
      return;
    }
    await deleteNotes(ids);
  }
  async function grantRole() {
    const email = document.getElementById('role-email').value.trim();
    const role = document.getElementById('role-id').value;
    if (!email) return;
    if (await postJson('/api/admin/users/grant', { email, role })) location.reload();
  }
  async function revokeRole(email, role) {
    if (!confirm('Rolle ' + role + ' fuer ' + email + ' entfernen?')) return;
    if (await postJson('/api/admin/users/revoke', { email, role })) location.reload();
  }
  async function deleteUser(email) {
    if (!confirm('Nutzer ' + email + ' komplett aus der Admin-Liste loeschen?')) return;
    if (await postJson('/api/admin/users/delete', { email })) location.reload();
  }
  async function setArtifactStatus(select) {
    const artifactId = select.dataset.artifactId;
    const status = select.value;
    await postJson('/api/admin/artifact-status', { artifactId, status });
  }
  document.querySelectorAll('#checklist input[type=checkbox]').forEach(function(cb) {
    cb.addEventListener('change', function() {
      postJson('/api/admin/checklist', { id: cb.dataset.id, checked: cb.checked });
    });
  });
</script>
</body>
</html>`, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function renderAccessDenied(status, title, message) {
  return new Response(`<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: Inter, system-ui, sans-serif; background: #f8f5ee; color: #1f1d1a; }
    main { max-width: 520px; padding: 34px; background: #fff; border: 1px solid #ddd8ce; border-radius: 10px; box-shadow: 0 16px 40px rgba(31,29,26,.08); }
    h1 { margin: 0 0 10px; font-size: 24px; }
    p { margin: 0; line-height: 1.55; color: #655d52; }
  </style>
</head>
<body><main><h1>${esc(title)}</h1><p>${esc(message)}</p></main></body>
</html>`, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function jsonResp(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
