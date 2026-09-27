import { MAX_PAYLOAD_BYTES, PAYLOAD_BEGIN, PAYLOAD_END, PAYLOAD_VERSION, TYPES, allowedAnswerKeys, slug } from './contribution/model.js';

function bytesToBase64(bytes) { let raw = ''; for (const byte of bytes) raw += String.fromCharCode(byte); return btoa(raw); }
function base64ToBytes(value) { const raw = atob(value); return Uint8Array.from(raw, (char) => char.charCodeAt(0)); }
function utf8(value) { return new TextEncoder().encode(value); }
function decodeUtf8(bytes) { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); }

export function buildPayload({ selectedType, answers, acknowledgements, role = 'external' }) {
  const type = TYPES[selectedType] ? selectedType : 'prompt';
  return { v: PAYLOAD_VERSION, type, role, answers: { ...answers, id: slug(answers?.id || answers?.title) }, acknowledgements: { ...acknowledgements } };
}
export function encodePayload(payload) {
  const bytes = utf8(JSON.stringify(payload));
  if (bytes.byteLength > MAX_PAYLOAD_BYTES) throw new Error('Der Übergabetext ist zu groß. Bitte kürze die Eingaben oder nutze den ZIP-Weg.');
  return `${PAYLOAD_BEGIN}\n${bytesToBase64(bytes)}\n${PAYLOAD_END}`;
}
export function decodePayload(body) {
  const starts = String(body || '').split(PAYLOAD_BEGIN).length - 1; const ends = String(body || '').split(PAYLOAD_END).length - 1;
  if (starts !== 1 || ends !== 1) return { ok: false, errors: ['Der Payload muss genau ein vollständiges Markerpaar enthalten.'] };
  try {
    const encoded = body.slice(body.indexOf(PAYLOAD_BEGIN) + PAYLOAD_BEGIN.length, body.indexOf(PAYLOAD_END)).trim();
    if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded)) throw new Error('Der Payload ist kein gültiges Base64.');
    const bytes = base64ToBytes(encoded);
    if (bytes.byteLength > MAX_PAYLOAD_BYTES || bytesToBase64(bytes) !== encoded) throw new Error('Der Payload ist zu groß oder nicht kanonisch kodiert.');
    return parsePayload(JSON.parse(decodeUtf8(bytes)));
  } catch (error) { return { ok: false, errors: [error.message || 'Der Payload konnte nicht gelesen werden.'] }; }
}
export function parsePayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) errors.push('Der Payload muss ein Objekt sein.');
  const allowedTop = new Set(['v', 'type', 'role', 'answers', 'acknowledgements']);
  for (const key of Object.keys(payload || {})) if (!allowedTop.has(key)) errors.push(`Unbekanntes Payload-Feld: ${key}.`);
  if (payload?.v !== PAYLOAD_VERSION) errors.push('Dieser Entwurf stammt aus einer älteren Fassung der Web UI.');
  if (!TYPES[payload?.type]) errors.push('Unbekannter Artefakttyp.');
  if (!['external', 'course'].includes(payload?.role)) errors.push('Ungültige Rolle.');
  const keys = TYPES[payload?.type] ? allowedAnswerKeys(payload.type) : new Set();
  if (!payload?.answers || typeof payload.answers !== 'object' || Array.isArray(payload.answers)) errors.push('Antworten fehlen.');
  for (const [key, value] of Object.entries(payload?.answers || {})) {
    if (!keys.has(key)) errors.push(`Unbekanntes Antwortfeld: ${key}.`);
    if (typeof value === 'string' && utf8(value).byteLength > 12000) errors.push(`Antwortfeld ${key} ist zu lang.`);
    if (Array.isArray(value) && (value.length > 25 || value.some((item) => typeof item !== 'string' || utf8(item).byteLength > 2000))) errors.push(`Liste ${key} ist ungültig.`);
  }
  if (!/^[a-z0-9][a-z0-9-]{2,79}$/.test(payload?.answers?.id || '')) errors.push('Ungültige Artefakt-ID.');
  const acks = payload?.acknowledgements;
  if (!acks || typeof acks !== 'object' || Object.keys(acks).some((key) => !['public_content_confirmed', 'no_real_personal_data_confirmed', 'pii_hints_reviewed'].includes(key))) errors.push('Ungültige Bestätigungen.');
  if (errors.length) return { ok: false, errors };
  return { ok: true, payload };
}
export function buildAp14IssueDraft(draft) {
  const payload = buildPayload(draft); const encoded = encodePayload(payload); const title = `AP14-Beitrag: ${payload.answers.title}`;
  const body = `## KItomat-Beitrag\n\nTyp: ${TYPES[payload.type].label}\nID: \`${payload.answers.id}\`\n\nDie folgenden Angaben werden nach der Einreichung öffentlich im Issue und im Pull Request sichtbar. Binäranhänge sind nicht enthalten; bitte nutze dafür den ZIP-Weg.\n\n${encoded}`;
  return { title, body, id: payload.answers.id, payload };
}
