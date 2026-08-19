// D1-Wrapper fuer content_cache und sync_runs.

const LIST_KEY = "content-list-v1";

export async function getList(db) {
  const row = await db
    .prepare("SELECT value_json, updated_at, status FROM content_cache WHERE cache_key = ?1")
    .bind(LIST_KEY)
    .first();
  if (!row) return null;
  return {
    value: JSON.parse(row.value_json),
    updatedAt: row.updated_at,
    status: row.status,
  };
}

export async function setList(db, value, status, updatedAt) {
  const json = JSON.stringify(value);
  await db
    .prepare(
      "INSERT INTO content_cache (cache_key, value_json, updated_at, status) " +
      "VALUES (?1, ?2, ?3, ?4) " +
      "ON CONFLICT(cache_key) DO UPDATE SET value_json = excluded.value_json, " +
      "updated_at = excluded.updated_at, status = excluded.status"
    )
    .bind(LIST_KEY, json, updatedAt, status)
    .run();
}

export async function logSyncRun(db, { startedAt, finishedAt, status, artifactCount, message }) {
  await db
    .prepare(
      "INSERT INTO sync_runs (started_at, finished_at, status, artifact_count, message) VALUES (?1, ?2, ?3, ?4, ?5)"
    )
    .bind(startedAt, finishedAt, status, artifactCount, message ?? null)
    .run();
}

export async function lastSyncRun(db) {
  return await db
    .prepare("SELECT started_at, finished_at, status, artifact_count, message FROM sync_runs ORDER BY id DESC LIMIT 1")
    .first();
}

export function isFresh(updatedAt, ttlSeconds, now = Date.now()) {
  if (!updatedAt) return false;
  const updated = Date.parse(updatedAt);
  if (Number.isNaN(updated)) return false;
  return now - updated < ttlSeconds * 1000;
}

export const _testing = { LIST_KEY };
