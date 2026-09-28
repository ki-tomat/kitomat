import { inspectArtifactZip } from './zip.js';

const MAX_UPLOAD = 25 * 1024 * 1024;
const ACTIVE_STATES = new Set(['submitted', 'changes_requested', 'approved_for_import', 'draft_pr_open']);
const DECISION_STATUSES = new Set(['bronze', 'silver', 'gold']);
const REVIEW_OUTCOMES = new Set(['approved_for_import', 'changes_requested', 'rejected']);
const REVIEW_CHECKS = ['content', 'sources_license', 'privacy'];
const REVIEW_ROLES = new Set(['admin', 'maintainer', 'reviewer']);
const GITHUB_JWKS = 'https://token.actions.githubusercontent.com/.well-known/jwks';
let githubKeys = { expiresAt: 0, keys: new Map() };

export function createWorker({ fetchImpl = globalThis.fetch, now = () => new Date() } = {}) {
  return {
    async fetch(request, env) {
      const url = new URL(request.url);
      if (request.method === 'OPTIONS') return new Response(null, { headers: cors(request, env) });
      if (url.pathname === '/' && request.method === 'GET') return renderSubmissionPage(request, env);
      if (url.pathname === '/auth/github' && request.method === 'GET') return startGithubLogin(request, env);
      if (url.pathname === '/auth/github/callback' && request.method === 'GET') return finishGithubLogin(request, env, fetchImpl);
      if (url.pathname === '/auth/logout' && request.method === 'POST') return logout(request, env);
      if (url.pathname === '/api/session' && request.method === 'GET') return sessionResponse(request, env);
      if (url.pathname === '/api/submissions' && request.method === 'POST') return createSubmission(request, env, now);
      if (url.pathname === '/api/submissions' && request.method === 'GET') return listOwnSubmissions(request, env);
      const revision = url.pathname.match(/^\/api\/submissions\/([0-9a-f-]{36})\/revisions$/);
      if (revision && request.method === 'POST') return uploadRevision(request, env, revision[1], now);
      const withdrawal = url.pathname.match(/^\/api\/submissions\/([0-9a-f-]{36})\/withdraw$/);
      if (withdrawal && request.method === 'POST') return withdrawSubmission(request, env, withdrawal[1], now);
      if (url.pathname === '/internal/queue' && request.method === 'GET') return internalQueue(request, env);
      const reviewPackage = url.pathname.match(/^\/internal\/submissions\/([0-9a-f-]{36})\/package$/);
      if (reviewPackage && request.method === 'GET') return internalReviewPackage(request, env, reviewPackage[1]);
      const decision = url.pathname.match(/^\/internal\/submissions\/([0-9a-f-]{36})\/decision$/);
      if (decision && request.method === 'POST') return recordDecision(request, env, decision[1], now);
      const artifact = url.pathname.match(/^\/internal\/action\/submissions\/([0-9a-f-]{36})\/package$/);
      if (artifact && request.method === 'GET') return actionPackage(request, env, artifact[1], fetchImpl);
      const imported = url.pathname.match(/^\/internal\/action\/submissions\/([0-9a-f-]{36})\/imported$/);
      if (imported && request.method === 'POST') return actionImported(request, env, imported[1], fetchImpl, now);
      const completed = url.pathname.match(/^\/internal\/action\/submissions\/([0-9a-f-]{36})\/complete$/);
      if (completed && request.method === 'POST') return actionCompleted(request, env, completed[1], fetchImpl, now);
      if (url.pathname === '/internal/cleanup' && request.method === 'POST') return cleanup(request, env, now);
      return json({ error: 'Not found.' }, 404, request, env);
    },
    async scheduled(_event, env) { await deleteExpired(env, now()); },
  };
}
export default createWorker();

export function safeSubmissionReturn(value) {
  const source = new URL(value);
  const prefill = submissionFormPrefill(source.toString());
  const destination = new URL('/', source);
  if (prefill.artifactId) destination.searchParams.set('artifactId', prefill.artifactId);
  destination.searchParams.set('artifactType', prefill.artifactType);
  return `${destination.pathname}${destination.search}`;
}

async function startGithubLogin(request, env) {
  if (!env.GITHUB_OAUTH_CLIENT_ID || !env.SESSION_SECRET) return json({ error: 'GitHub-Anmeldung ist nicht konfiguriert.' }, 503, request, env);
  const state = random();
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID); url.searchParams.set('redirect_uri', new URL('/auth/github/callback', request.url).toString());
  url.searchParams.set('scope', 'read:user'); url.searchParams.set('state', state);
  const oauthState = { state, returnTo: safeSubmissionReturn(request.url) };
  return new Response(null, { status: 302, headers: { Location: url.toString(), 'Set-Cookie': cookie('__Host-kitomat_oauth_state', await signJson(oauthState, env.SESSION_SECRET), 600), ...cors(request, env) } });
}
async function finishGithubLogin(request, env, fetchImpl) {
  const url = new URL(request.url); const state = url.searchParams.get('state'); const code = url.searchParams.get('code');
  const stateCookie = readCookie(request, '__Host-kitomat_oauth_state');
  const oauthState = stateCookie ? await verifyJson(stateCookie, env.SESSION_SECRET) : null;
  if (!state || !code || !oauthState || oauthState.state !== state || typeof oauthState.returnTo !== 'string') return json({ error: 'GitHub-Anmeldung konnte nicht verifiziert werden.' }, 403, request, env);
  const tokenResponse = await fetchImpl('https://github.com/login/oauth/access_token', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ client_id: env.GITHUB_OAUTH_CLIENT_ID, client_secret: env.GITHUB_OAUTH_CLIENT_SECRET, code }) });
  const token = await tokenResponse.json();
  if (!tokenResponse.ok || !token.access_token) return json({ error: 'GitHub-Anmeldung wurde abgelehnt.' }, 403, request, env);
  const userResponse = await fetchImpl('https://api.github.com/user', { headers: { Authorization: `Bearer ${token.access_token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'kitomat-submissions' } });
  const user = await userResponse.json();
  if (!userResponse.ok || !Number.isInteger(user.id) || !/^[A-Za-z0-9-]{1,39}$/.test(String(user.login || ''))) return json({ error: 'GitHub-Profil ist unvollständig.' }, 403, request, env);
  if (!isGithubLoginAllowed(user.login, env.ALLOWED_GITHUB_LOGINS)) {
    return json({ error: 'Dieses GitHub-Konto ist nicht für die KI-Tomat-Einreichung freigeschaltet.' }, 403, request, env);
  }
  const session = { githubId: String(user.id), login: user.login, exp: Math.floor(Date.now() / 1000) + 3600 };
  const destination = new URL(oauthState.returnTo, request.url);
  return new Response(null, { status: 302, headers: { Location: destination.toString(), 'Set-Cookie': `${cookie('__Host-kitomat_submission_session', await signJson(session, env.SESSION_SECRET), 3600)}, ${expiredCookie('__Host-kitomat_oauth_state')}`, ...cors(request, env) } });
}
async function logout(request, env) { return json({ ok: true }, 200, request, env, { 'Set-Cookie': expiredCookie('__Host-kitomat_submission_session') }); }
async function sessionResponse(request, env) { const identity = await session(request, env); return json({ authenticated: Boolean(identity), identity }, 200, request, env); }

async function createSubmission(request, env, now) {
  const identity = await requireSession(request, env); if (identity.error) return identity.error;
  const disabled = enabled(request, env); if (disabled) return disabled;
  const originError = requireOrigin(request, env); if (originError) return originError;
  const input = await readUpload(request); if (input.error) return json({ error: input.error }, 400, request, env);
  const packageCheck = inspectArtifactZip(input.bytes, input); if (!packageCheck.ok) return json({ error: packageCheck.errors.join(' ') }, 400, request, env);
  const nowIso = now().toISOString(); const recent = await env.DB.prepare("SELECT COUNT(*) AS n FROM submissions WHERE owner_github_id = ? AND created_at >= datetime('now', '-1 day')").bind(identity.githubId).first();
  if (Number(recent?.n || 0) >= 3) return json({ error: 'Upload-Limit: höchstens drei Einreichungen je 24 Stunden.' }, 429, request, env);
  const open = await env.DB.prepare('SELECT * FROM submissions WHERE owner_github_id = ? AND artifact_id = ?').bind(identity.githubId, input.artifactId).first();
  if (open && ACTIVE_STATES.has(open.state)) return json({ error: 'Für diese Artefakt-ID besteht bereits eine offene Einreichung. Bitte reiche eine Revision ein.' }, 409, request, env);
  if (open) return json({ error: 'Diese Artefakt-ID wurde bereits eingereicht und kann aus Gründen der Nachvollziehbarkeit nicht erneut angelegt werden.' }, 409, request, env);
  const global = await env.DB.prepare("SELECT id FROM submissions WHERE artifact_id = ? AND state IN ('submitted','changes_requested','approved_for_import','draft_pr_open')").bind(input.artifactId).first();
  if (global) return json({ error: 'Diese Artefakt-ID ist bereits durch eine andere offene Einreichung belegt.' }, 409, request, env);
  const id = crypto.randomUUID(); const hash = await sha256(input.bytes); const r2Key = `submissions/${id}/1/package.zip`; const expires = plusDays(now(), 30).toISOString();
  await env.PACKAGES.put(r2Key, input.bytes, { httpMetadata: { contentType: 'application/zip' } });
  await env.DB.batch([
    env.DB.prepare('INSERT INTO submissions (id, owner_github_id, owner_github_login, artifact_id, artifact_type, state, current_revision, package_sha256, package_size, r2_key, created_at, updated_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)').bind(id, identity.githubId, identity.login, input.artifactId, input.artifactType, 'submitted', hash, input.bytes.byteLength, r2Key, nowIso, nowIso, expires),
    env.DB.prepare('INSERT INTO submission_revisions (submission_id, revision, package_sha256, package_size, r2_key, created_at) VALUES (?, 1, ?, ?, ?, ?)').bind(id, hash, input.bytes.byteLength, r2Key, nowIso),
    audit(env, id, 'submitter', identity.githubId, 'submitted', JSON.stringify({ artifactId: input.artifactId, files: packageCheck.files.length })),
  ]);
  return json({ id, state: 'submitted', expiresAt: expires }, 201, request, env);
}
async function listOwnSubmissions(request, env) { const identity = await requireSession(request, env); if (identity.error) return identity.error; const rows = await env.DB.prepare(`SELECT s.id, s.artifact_id, s.artifact_type, s.state, s.requested_status, s.current_revision, s.created_at, s.updated_at, s.expires_at, s.pull_request_number,
    (SELECT r.outcome FROM submission_reviews r WHERE r.submission_id = s.id ORDER BY r.id DESC LIMIT 1) AS review_outcome,
    (SELECT r.note FROM submission_reviews r WHERE r.submission_id = s.id ORDER BY r.id DESC LIMIT 1) AS review_note,
    (SELECT r.created_at FROM submission_reviews r WHERE r.submission_id = s.id ORDER BY r.id DESC LIMIT 1) AS reviewed_at
    FROM submissions s WHERE s.owner_github_id = ? ORDER BY s.updated_at DESC`).bind(identity.githubId).all(); return json({ submissions: rows.results || [] }, 200, request, env); }
async function uploadRevision(request, env, id, now) {
  const identity = await requireSession(request, env); if (identity.error) return identity.error; const disabled = enabled(request, env); if (disabled) return disabled; const originError = requireOrigin(request, env); if (originError) return originError;
  const current = await env.DB.prepare('SELECT * FROM submissions WHERE id = ? AND owner_github_id = ?').bind(id, identity.githubId).first();
  if (!current || !canSubmissionTransition(current.state, 'revise')) return json({ error: 'Diese Einreichung kann nicht nachgereicht werden.' }, 409, request, env);
  const input = await readUpload(request); if (input.error) return json({ error: input.error }, 400, request, env);
  if (input.artifactId !== current.artifact_id || input.artifactType !== current.artifact_type) return json({ error: 'Typ und Artefakt-ID einer Revision dürfen nicht geändert werden.' }, 400, request, env);
  const check = inspectArtifactZip(input.bytes, input); if (!check.ok) return json({ error: check.errors.join(' ') }, 400, request, env);
  const revision = current.current_revision + 1; const key = `submissions/${id}/${revision}/package.zip`; const hash = await sha256(input.bytes); const stamp = now().toISOString();
  await env.PACKAGES.put(key, input.bytes, { httpMetadata: { contentType: 'application/zip' } });
  await env.DB.batch([env.DB.prepare("UPDATE submissions SET state = 'submitted', current_revision = ?, package_sha256 = ?, package_size = ?, r2_key = ?, updated_at = ?, requested_status = NULL WHERE id = ?").bind(revision, hash, input.bytes.byteLength, key, stamp, id), env.DB.prepare('INSERT INTO submission_revisions (submission_id, revision, package_sha256, package_size, r2_key, created_at) VALUES (?, ?, ?, ?, ?, ?)').bind(id, revision, hash, input.bytes.byteLength, key, stamp), audit(env, id, 'submitter', identity.githubId, 'revision_uploaded', String(revision))]);
  return json({ id, revision, state: 'submitted' }, 200, request, env);
}
async function withdrawSubmission(request, env, id, now) { const identity = await requireSession(request, env); if (identity.error) return identity.error; const originError = requireOrigin(request, env); if (originError) return originError; const current = await env.DB.prepare('SELECT * FROM submissions WHERE id = ? AND owner_github_id = ?').bind(id, identity.githubId).first(); if (!current || !ACTIVE_STATES.has(current.state)) return json({ error: 'Einreichung kann nicht zurückgezogen werden.' }, 409, request, env); await removeSubmissionFiles(env, id); const stamp = now().toISOString(); await env.DB.batch([env.DB.prepare("UPDATE submissions SET state = 'withdrawn', completed_at = ?, updated_at = ?, expires_at = ? WHERE id = ?").bind(stamp, stamp, stamp, id), audit(env, id, 'submitter', identity.githubId, 'withdrawn')]); return json({ id, state: 'withdrawn' }, 200, request, env); }

async function internalQueue(request, env) { if (!internal(request, env)) return json({ error: 'Internal access required.' }, 403, request, env); const rows = await env.DB.prepare("SELECT id, owner_github_login, artifact_id, artifact_type, state, requested_status, current_revision, package_sha256, package_size, created_at, updated_at, expires_at, pull_request_number FROM submissions WHERE state NOT IN ('withdrawn','expired') ORDER BY updated_at DESC LIMIT 100").all(); return json({ submissions: rows.results || [] }, 200, request, env); }

async function internalReviewPackage(request, env, id) {
  if (!internal(request, env)) return json({ error: 'Internal access required.' }, 403, request, env);
  const current = await env.DB.prepare('SELECT artifact_id, state, current_revision, package_sha256, r2_key FROM submissions WHERE id = ?').bind(id).first();
  if (!current) return json({ error: 'Einreichung nicht gefunden.' }, 404, request, env);
  if (['withdrawn', 'expired'].includes(current.state)) return json({ error: 'Paket ist nicht mehr zur Prüfung verfügbar.' }, 409, request, env);
  const object = await env.PACKAGES.get(current.r2_key);
  if (!object) return json({ error: 'Paket ist nicht verfügbar.' }, 404, request, env);
  return new Response(object.body, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${current.artifact_id}-revision-${current.current_revision}.zip"`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Kitomat-Sha256': current.package_sha256,
    },
  });
}

async function recordDecision(request, env, id, now) {
  if (!internal(request, env)) return json({ error: 'Internal access required.' }, 403, request, env);
  const body = await request.json().catch(() => null);
  const validation = validateReviewDecision(body);
  if (validation.error) return json({ error: validation.error }, 400, request, env);
  const current = await env.DB.prepare('SELECT state FROM submissions WHERE id = ?').bind(id).first();
  if (!current) return json({ error: 'Einreichung nicht gefunden.' }, 404, request, env);
  if (!canSubmissionTransition(current.state, 'review')) return json({ error: 'Für diesen Bearbeitungsstand ist keine Review-Entscheidung möglich.' }, 409, request, env);
  const stamp = now().toISOString();
  const completedAt = validation.outcome === 'rejected' ? stamp : null;
  const expiresAt = validation.outcome === 'rejected' ? plusDays(now(), 30).toISOString() : null;
  const update = validation.outcome === 'approved_for_import'
    ? env.DB.prepare("UPDATE submissions SET state = 'approved_for_import', requested_status = ?, updated_at = ? WHERE id = ?").bind(validation.status, stamp, id)
    : validation.outcome === 'changes_requested'
      ? env.DB.prepare("UPDATE submissions SET state = 'changes_requested', requested_status = NULL, updated_at = ? WHERE id = ?").bind(stamp, id)
      : env.DB.prepare("UPDATE submissions SET state = 'rejected', requested_status = NULL, updated_at = ?, completed_at = ?, expires_at = ? WHERE id = ?").bind(stamp, completedAt, expiresAt, id);
  await env.DB.batch([
    update,
    env.DB.prepare('INSERT INTO submission_reviews (submission_id, created_at, actor_role, actor_id, outcome, requested_status, note, checklist_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').bind(id, stamp, validation.role, validation.actor, validation.outcome, validation.status, validation.note, JSON.stringify(validation.checks)),
    audit(env, id, validation.role, validation.actor, 'review_decided', JSON.stringify({ outcome: validation.outcome, status: validation.status })),
  ]);
  return json({ id, state: validation.outcome, requestedStatus: validation.status, reviewedAt: stamp }, 200, request, env);
}

export function validateReviewDecision(body) {
  if (!body || !REVIEW_ROLES.has(body.role) || !/^[^@\s]+@[^@\s]+$/.test(String(body.actor || ''))) return { error: 'Ungültige Review-Identität.' };
  const outcome = String(body.outcome || '');
  if (!REVIEW_OUTCOMES.has(outcome)) return { error: 'Ungültige Review-Entscheidung.' };
  const note = String(body.note || '').trim();
  if (note.length > 2000) return { error: 'Review-Notiz ist zu lang.' };
  if (['changes_requested', 'rejected'].includes(outcome) && note.length < 10) return { error: 'Änderungswunsch oder Ablehnung benötigt eine nachvollziehbare Notiz.' };
  const status = outcome === 'approved_for_import' ? String(body.status || '') : null;
  if (outcome === 'approved_for_import' && !DECISION_STATUSES.has(status)) return { error: 'Freigabe benötigt Bronze, Silber oder Gold.' };
  const checks = Object.fromEntries(REVIEW_CHECKS.map((key) => [key, body.checks?.[key] === true]));
  if (outcome === 'approved_for_import' && REVIEW_CHECKS.some((key) => !checks[key])) return { error: 'Vor der Freigabe müssen alle Review-Prüfpunkte bestätigt werden.' };
  return { actor: String(body.actor), role: body.role, outcome, status, note, checks };
}
async function actionPackage(request, env, id, fetchImpl) { if (!(await validGithubOidc(request, env, fetchImpl))) return json({ error: 'GitHub-OIDC-Berechtigung fehlt.' }, 403, request, env); const row = await env.DB.prepare("SELECT * FROM submissions WHERE id = ? AND state = 'approved_for_import'").bind(id).first(); if (!row) return json({ error: 'Keine freigegebene Einreichung gefunden.' }, 404, request, env); const object = await env.PACKAGES.get(row.r2_key); if (!object) return json({ error: 'Paket nicht mehr verfügbar.' }, 410, request, env); return new Response(object.body, { headers: { 'Content-Type': 'application/zip', 'X-Kitomat-Artifact-Id': row.artifact_id, 'X-Kitomat-Artifact-Type': row.artifact_type, 'X-Kitomat-Requested-Status': row.requested_status, 'X-Kitomat-Revision': String(row.current_revision), 'X-Kitomat-Sha256': row.package_sha256 } }); }
async function actionImported(request, env, id, fetchImpl, now) { if (!(await validGithubOidc(request, env, fetchImpl, 'import'))) return json({ error: 'GitHub-OIDC-Berechtigung fehlt.' }, 403, request, env); const body = await request.json().catch(() => null); const pullRequestNumber = Number(body?.pullRequestNumber); const branch = String(body?.branch || ''); if (!Number.isInteger(pullRequestNumber) || pullRequestNumber < 1 || !/^webui\/ap15-[0-9a-f-]{36}$/.test(branch)) return json({ error: 'Ungültiger Importnachweis.' }, 400, request, env); const row = await env.DB.prepare('SELECT state, pull_request_number FROM submissions WHERE id = ?').bind(id).first(); if (!row || !canSubmissionTransition(row.state, 'open_draft_pr')) return json({ error: 'Einreichung kann nicht als importiert markiert werden.' }, 409, request, env); if (row.pull_request_number && row.pull_request_number !== pullRequestNumber) return json({ error: 'Pull-Request-Nummer stimmt nicht mit dem vorhandenen Import überein.' }, 409, request, env); const stamp = now().toISOString(); await env.DB.batch([env.DB.prepare("UPDATE submissions SET state = 'draft_pr_open', pull_request_number = ?, updated_at = ? WHERE id = ?").bind(pullRequestNumber, stamp, id), audit(env, id, 'github_action', 'ap15-import', 'draft_pr_open', JSON.stringify({ pullRequestNumber, branch }))]); return json({ id, state: 'draft_pr_open', pullRequestNumber }, 200, request, env); }
async function actionCompleted(request, env, id, fetchImpl, now) { if (!(await validGithubOidc(request, env, fetchImpl, 'complete'))) return json({ error: 'GitHub-OIDC-Berechtigung fehlt.' }, 403, request, env); const body = await request.json().catch(() => null); const pullRequestNumber = Number(body?.pullRequestNumber); const outcome = String(body?.outcome || ''); if (!Number.isInteger(pullRequestNumber) || pullRequestNumber < 1 || !['merged', 'rejected'].includes(outcome)) return json({ error: 'Ungültiger Abschlussnachweis.' }, 400, request, env); const row = await env.DB.prepare('SELECT state, pull_request_number FROM submissions WHERE id = ?').bind(id).first(); if (!row || !canSubmissionTransition(row.state, outcome) || row.pull_request_number !== pullRequestNumber) return json({ error: 'Abschluss stimmt nicht mit dem offenen Entwurfs-PR überein.' }, 409, request, env); const stamp = now().toISOString(); const expires = plusDays(now(), 30).toISOString(); await env.DB.batch([env.DB.prepare('UPDATE submissions SET state = ?, completed_at = ?, updated_at = ?, expires_at = ? WHERE id = ?').bind(outcome, stamp, stamp, expires, id), audit(env, id, 'github_action', 'ap15-complete', outcome, JSON.stringify({ pullRequestNumber }))]); return json({ id, state: outcome, expiresAt: expires }, 200, request, env); }
async function cleanup(request, env, now) { if (!internal(request, env)) return json({ error: 'Internal access required.' }, 403, request, env); const deleted = await deleteExpired(env, now()); return json({ deleted }, 200, request, env); }
async function deleteExpired(env, now) { const rows = await env.DB.prepare("SELECT id FROM submissions WHERE expires_at <= ? AND state IN ('merged','rejected','withdrawn','failed','expired')").bind(now.toISOString()).all(); for (const row of rows.results || []) { await removeSubmissionFiles(env, row.id); await env.DB.batch([env.DB.prepare("UPDATE submissions SET state = 'expired', updated_at = ? WHERE id = ?").bind(now.toISOString(), row.id), env.DB.prepare('DELETE FROM submission_revisions WHERE submission_id = ?').bind(row.id), env.DB.prepare('DELETE FROM submission_audit_log WHERE submission_id = ?').bind(row.id)]); } return (rows.results || []).length; }
async function removeSubmissionFiles(env, id) { const revisions = await env.DB.prepare('SELECT r2_key FROM submission_revisions WHERE submission_id = ?').bind(id).all(); await env.PACKAGES.delete((revisions.results || []).map((item) => item.r2_key)); }

async function readUpload(request) { const form = await request.formData().catch(() => null); const artifactId = String(form?.get('artifactId') || ''); const artifactType = String(form?.get('artifactType') || ''); const file = form?.get('package'); if (!/^[a-z0-9][a-z0-9-]{2,79}$/.test(artifactId) || !['prompt', 'dataset', 'industry'].includes(artifactType)) return { error: 'Artefakt-ID oder -Typ ist ungültig.' }; if (!file || typeof file.arrayBuffer !== 'function' || file.size > MAX_UPLOAD || !String(file.name || '').toLowerCase().endsWith('.zip')) return { error: 'Erforderlich ist ein ZIP-Paket mit höchstens 25 MB.' }; return { artifactId, artifactType, bytes: await file.arrayBuffer() }; }
async function requireSession(request, env) { const identity = await session(request, env); if (!identity) return { error: json({ error: 'GitHub-Anmeldung erforderlich.' }, 401, request, env) }; if (!isGithubLoginAllowed(identity.login, env.ALLOWED_GITHUB_LOGINS)) return { error: json({ error: 'Dieses GitHub-Konto ist nicht für die KI-Tomat-Einreichung freigeschaltet.' }, 403, request, env) }; return identity; }
async function session(request, env) { const raw = readCookie(request, '__Host-kitomat_submission_session'); if (!raw || !env.SESSION_SECRET) return null; const payload = await verifyJson(raw, env.SESSION_SECRET); return payload && payload.exp > Math.floor(Date.now() / 1000) && /^\d+$/.test(payload.githubId || '') ? payload : null; }
function enabled(request, env) { return env.SUBMISSIONS_ENABLED === 'true' ? null : json({ error: 'Direkteinreichungen sind bis zur dokumentierten Datenschutzfreigabe deaktiviert.' }, 503, request, env); }
export function isGithubLoginAllowed(login, value) {
  const allowed = new Set(String(value || '').split(',').map((item) => item.trim().toLowerCase()).filter(Boolean));
  return /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(String(login || '')) && allowed.has(String(login).toLowerCase());
}

export function canSubmissionTransition(state, action) {
  return ({
    submitted: new Set(['review', 'revise', 'withdraw']),
    changes_requested: new Set(['review', 'revise', 'withdraw']),
    approved_for_import: new Set(['open_draft_pr', 'withdraw']),
    draft_pr_open: new Set(['merged', 'rejected']),
  }[state] || new Set()).has(action);
}
function requireOrigin(request, env) { const origin = request.headers.get('Origin'); return !origin || origin !== String(env.ALLOWED_ORIGIN || '').replace(/\/$/, '') ? json({ error: 'Unzulässige Herkunft.' }, 403, request, env) : null; }
function internal(request, env) { const provided = request.headers.get('X-Kitomat-Internal-Token') || ''; return Boolean(env.INTERNAL_SERVICE_TOKEN) && provided === env.INTERNAL_SERVICE_TOKEN; }
function audit(env, submissionId, actorKind, actorId, action, details = null) { return env.DB.prepare('INSERT INTO submission_audit_log (submission_id, created_at, actor_kind, actor_id, action, details) VALUES (?, ?, ?, ?, ?, ?)').bind(submissionId, new Date().toISOString(), actorKind, actorId, action, details); }
async function sha256(value) { const digest = await crypto.subtle.digest('SHA-256', value); return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join(''); }
function plusDays(date, days) { return new Date(date.getTime() + days * 86400000); }
function random() { const bytes = crypto.getRandomValues(new Uint8Array(32)); return base64url(bytes); }
async function sign(value, secret) { const signature = await hmac(value, secret); return `${base64url(new TextEncoder().encode(value))}.${signature}`; }
async function verify(value, signed, secret) { const [encoded, signature] = String(signed).split('.'); return encoded === base64url(new TextEncoder().encode(value)) && signature === await hmac(value, secret); }
async function signJson(value, secret) { const encoded = base64url(new TextEncoder().encode(JSON.stringify(value))); return `${encoded}.${await hmac(encoded, secret)}`; }
async function verifyJson(value, secret) { const [encoded, signature] = String(value).split('.'); if (!encoded || !signature || signature !== await hmac(encoded, secret)) return null; try { return JSON.parse(new TextDecoder().decode(base64urlBytes(encoded))); } catch { return null; } }
async function hmac(value, secret) { const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']); return base64url(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value)))); }
function base64url(bytes) { let binary = ''; for (const byte of bytes) binary += String.fromCharCode(byte); return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', ''); }
function base64urlBytes(value) { const binary = atob(value.replaceAll('-', '+').replaceAll('_', '/') + '='.repeat((4 - value.length % 4) % 4)); return Uint8Array.from(binary, (char) => char.charCodeAt(0)); }
function readCookie(request, name) { return String(request.headers.get('Cookie') || '').split(';').map((part) => part.trim().split('=')).find(([key]) => key === name)?.slice(1).join('=') || ''; }
function cookie(name, value, seconds) { return `${name}=${value}; Path=/; Max-Age=${seconds}; HttpOnly; Secure; SameSite=Lax`; }
function expiredCookie(name) { return `${name}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`; }
function cors(request, env) { const origin = request.headers.get('Origin'); return origin && origin === env.ALLOWED_ORIGIN ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Credentials': 'true', Vary: 'Origin', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' } : {}; }
function json(value, status, request, env, extra = {}) { return new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors(request, env), ...extra } }); }

async function submissionPage(request, env) { const identity = await session(request, env); const disabled = env.SUBMISSIONS_ENABLED !== 'true'; const prefill = submissionFormPrefill(request.url); const uploadForm = `<form id="submission-form"><label>Artefakt-ID <input name="artifactId" required pattern="[a-z0-9][a-z0-9-]{2,79}" value="${escapeHtml(prefill.artifactId)}"></label><label>Typ <select name="artifactType"><option value="prompt"${prefill.artifactType === 'prompt' ? ' selected' : ''}>Prompt</option><option value="dataset"${prefill.artifactType === 'dataset' ? ' selected' : ''}>Datensatz</option><option value="industry"${prefill.artifactType === 'industry' ? ' selected' : ''}>Branchenmodell</option></select></label><label>Text-ZIP (max. 25 MB) <input name="package" type="file" accept=".zip" required></label><button>Geschützt einreichen</button></form><h2>Meine Einreichungen</h2><div id="mine">Lade …</div><pre id="result" aria-live="polite"></pre><script>const result=document.querySelector(\"#result\"),mine=document.querySelector(\"#mine\");async function api(url,init){const response=await fetch(url,{credentials:\"same-origin\",...init});const body=await response.json();if(!response.ok)throw new Error(body.error||\"Aktion fehlgeschlagen.\");return body}function show(text){result.textContent=text}async function loadMine(){try{const data=await api(\"/api/submissions\");mine.textContent=\"\";for(const item of data.submissions){const row=document.createElement(\"div\");row.textContent=item.artifact_id+\" · \"+item.state+\" · Revision \"+item.current_revision; if([\"submitted\",\"changes_requested\"].includes(item.state)){const file=document.createElement(\"input\");file.type=\"file\";file.accept=\".zip\";const revise=document.createElement(\"button\");revise.textContent=\"Revision hochladen\";revise.onclick=async()=>{if(!file.files[0])return show(\"Bitte zuerst ZIP wählen.\");const form=new FormData();form.set(\"artifactId\",item.artifact_id);form.set(\"artifactType\",item.artifact_type);form.set(\"package\",file.files[0]);try{await api(\"/api/submissions/\"+item.id+\"/revisions\",{method:\"POST\",body:form});show(\"Revision gespeichert.\");loadMine()}catch(error){show(error.message)}};const withdraw=document.createElement(\"button\");withdraw.textContent=\"Zurückziehen\";withdraw.onclick=async()=>{try{await api(\"/api/submissions/\"+item.id+\"/withdraw\",{method:\"POST\"});show(\"Einreichung zurückgezogen.\");loadMine()}catch(error){show(error.message)}};row.append(document.createTextNode(\" \"),file,revise,withdraw)}mine.append(row)}}catch(error){show(error.message)}}document.querySelector(\"#submission-form\").addEventListener(\"submit\",async event=>{event.preventDefault();try{await api(\"/api/submissions\",{method:\"POST\",body:new FormData(event.target)});show(\"Einreichung gespeichert und privat zur Prüfung vorgemerkt.\");event.target.reset();loadMine()}catch(error){show(error.message)}});loadMine()</script>`; const body = disabled ? '<p><strong>Direkteinreichungen sind deaktiviert.</strong> Sie werden erst nach der dokumentierten Datenschutz- und Betriebsfreigabe aktiviert.</p>' : `<p>${identity ? `Angemeldet als <strong>${escapeHtml(identity.login)}</strong>.` : 'Melde dich zunächst mit GitHub an.'}</p>${identity ? uploadForm : `<a href="/auth/github?artifactId=${encodeURIComponent(prefill.artifactId)}&artifactType=${encodeURIComponent(prefill.artifactType)}">Mit GitHub anmelden</a>`}`; return new Response(`<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>KI-Tomat – Direkteinreichung</title><main><h1>Geschützte Direkteinreichung</h1><p>Nur ein textbasiertes ZIP-Paket. Keine PDF-, DOCX- oder personenbezogenen Daten.</p>${body}</main>`, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; form-action 'self'; connect-src 'self'", 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' } }); }
export function submissionFormPrefill(value) {
  const url = new URL(value);
  const artifactId = url.searchParams.get('artifactId') || '';
  const artifactType = url.searchParams.get('artifactType') || '';
  return {
    artifactId: /^[a-z0-9][a-z0-9-]{2,79}$/.test(artifactId) ? artifactId : '',
    artifactType: ['prompt', 'dataset', 'industry'].includes(artifactType) ? artifactType : 'prompt',
  };
}

function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]); }

async function renderSubmissionPage(request, env) {
  const response = await submissionPage(request, env);
  if (env.SUBMISSIONS_ENABLED !== 'true') return response;
  const html = await response.text();
  const previous = 'row.textContent=item.artifact_id+" · "+item.state+" · Revision "+item.current_revision;';
  const feedback = 'const headline=document.createElement("strong");headline.textContent=item.artifact_id+" · "+item.state+" · Revision "+item.current_revision;row.textContent="";row.append(headline);if(item.review_note){const note=document.createElement("p");note.textContent="Letzter Review-Hinweis: "+item.review_note;row.append(note)}';
  return new Response(html.replace(previous, feedback), { status: response.status, headers: response.headers });
}

async function validGithubOidc(request, env, fetchImpl, expected = 'import') {
  const token = String(request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, ''); if (!token) return false;
  const parts = token.split('.'); if (parts.length !== 3) return false;
  try {
    const header = JSON.parse(new TextDecoder().decode(base64urlBytes(parts[0]))); const payload = JSON.parse(new TextDecoder().decode(base64urlBytes(parts[1])));
    const workflow = String(payload.workflow_ref || ''); const trustedImport = expected === 'import' && payload.ref === 'refs/heads/main' && workflow.endsWith('/.github/workflows/ap15-import.yml@refs/heads/main'); const trustedComplete = expected === 'complete' && payload.event_name === 'pull_request' && workflow.endsWith('/.github/workflows/ap15-complete.yml@refs/heads/main');
    if (header.alg !== 'RS256' || !header.kid || payload.iss !== 'https://token.actions.githubusercontent.com' || payload.aud !== env.GITHUB_OIDC_AUDIENCE || payload.repository !== env.GITHUB_REPOSITORY || payload.exp <= Math.floor(Date.now() / 1000) || (!trustedImport && !trustedComplete)) return false;
    const key = await githubKey(header.kid, fetchImpl); const verified = await crypto.subtle.verify({ name: 'RSASSA-PKCS1-v1_5' }, key, base64urlBytes(parts[2]), new TextEncoder().encode(`${parts[0]}.${parts[1]}`)); return verified;
  } catch { return false; }
}
async function githubKey(kid, fetchImpl) { if (githubKeys.expiresAt <= Date.now() || !githubKeys.keys.has(kid)) { const response = await fetchImpl(GITHUB_JWKS); if (!response.ok) throw new Error('GitHub JWKS unavailable'); const body = await response.json(); const keys = new Map(); for (const jwk of body.keys || []) if (jwk.kid) keys.set(jwk.kid, await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify'])); githubKeys = { expiresAt: Date.now() + 3600000, keys }; } const key = githubKeys.keys.get(kid); if (!key) throw new Error('Unknown GitHub signing key'); return key; }
