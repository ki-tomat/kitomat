import { readFile } from 'node:fs/promises';
import path from 'node:path';

const configPath = path.join(process.cwd(), 'wrangler.toml');
const config = await readFile(configPath, 'utf8');
const placeholders = [...new Set(config.match(/REPLACE_WITH_[A-Z0-9_]+/g) || [])];

if (placeholders.length > 0) {
  console.error(`Cloudflare-Konfiguration ist unvollstaendig: ${placeholders.join(', ')}`);
  console.error('Zuerst die Werte aus dem Cloudflare-Konto in wrangler.toml eintragen.');
  process.exit(1);
}

const databaseIds = [...config.matchAll(/database_id\s*=\s*"([^"]+)"/g)].map((match) => match[1]);
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
if (databaseIds.length === 0 || databaseIds.some((id) => !uuidPattern.test(id))) {
  console.error('Cloudflare-Konfiguration enthaelt keine gueltige D1-Datenbank-ID.');
  process.exit(1);
}

console.log(`Cloudflare-Konfiguration geprueft: ${configPath}`);
