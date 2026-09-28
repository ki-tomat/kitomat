const EOCD = 0x06054b50;
const CENTRAL = 0x02014b50;
const UTF8_FLAG = 0x0800;
const ENCRYPTED_FLAG = 0x0001;
const MAX_ENTRIES = 100;
const MAX_UNCOMPRESSED = 100 * 1024 * 1024;
const MAX_RATIO = 50;
const ALLOWED_EXTENSIONS = new Set(['md', 'yml', 'yaml']);

export function inspectArtifactZip(buffer, { artifactType, artifactId }) {
  const bytes = new Uint8Array(buffer); const view = new DataView(buffer); const errors = [];
  if (bytes.byteLength < 22) return { ok: false, errors: ['ZIP-Datei ist unvollständig.'] };
  const eocdOffset = findEocd(view, bytes.byteLength);
  if (eocdOffset < 0) return { ok: false, errors: ['ZIP-Endverzeichnis fehlt.'] };
  const entries = view.getUint16(eocdOffset + 10, true); const centralSize = view.getUint32(eocdOffset + 12, true); const centralOffset = view.getUint32(eocdOffset + 16, true);
  if (!entries || entries > MAX_ENTRIES) errors.push(`ZIP darf höchstens ${MAX_ENTRIES} Einträge enthalten.`);
  if (centralOffset + centralSize > bytes.byteLength) errors.push('ZIP-Endverzeichnis liegt außerhalb der Datei.');
  const folder = { prompt: 'prompts', dataset: 'datasets', industry: 'models' }[artifactType];
  if (!folder) errors.push('Unbekannter Artefakttyp.');
  const expectedPrefix = `${folder}/${artifactId}/`; const seen = new Set(); const files = [];
  let offset = centralOffset; let uncompressed = 0; let compressed = 0;
  for (let index = 0; index < entries && !errors.length; index += 1) {
    if (offset + 46 > bytes.byteLength || view.getUint32(offset, true) !== CENTRAL) { errors.push('ZIP-Zentralverzeichnis ist ungültig.'); break; }
    const flags = view.getUint16(offset + 8, true); const method = view.getUint16(offset + 10, true); const compressedSize = view.getUint32(offset + 20, true); const uncompressedSize = view.getUint32(offset + 24, true);
    const nameLength = view.getUint16(offset + 28, true); const extraLength = view.getUint16(offset + 30, true); const commentLength = view.getUint16(offset + 32, true); const externalAttributes = view.getUint32(offset + 38, true);
    const nameStart = offset + 46; const nameEnd = nameStart + nameLength;
    if (nameEnd > bytes.byteLength) { errors.push('ZIP-Dateiname ist unvollständig.'); break; }
    let name;
    try { const raw = bytes.slice(nameStart, nameEnd); name = (flags & UTF8_FLAG) ? new TextDecoder('utf-8', { fatal: true }).decode(raw) : asciiName(raw); } catch { errors.push('ZIP-Dateiname ist nicht UTF-8/ASCII-kodiert.'); break; }
    offset = nameEnd + extraLength + commentLength;
    if (flags & ENCRYPTED_FLAG) { errors.push('Verschlüsselte ZIP-Dateien sind nicht erlaubt.'); break; }
    if (![0, 8].includes(method)) { errors.push(`ZIP-Kompression für ${name} ist nicht erlaubt.`); break; }
    if (((externalAttributes >>> 16) & 0o170000) === 0o120000) { errors.push(`Symbolischer Link ist nicht erlaubt: ${name}`); break; }
    if (isMacNoise(name)) continue;
    if (!safePath(name) || !name.startsWith(expectedPrefix)) { errors.push(`Unzulässiger Paketpfad: ${name}`); break; }
    if (name.endsWith('/')) continue;
    const extension = name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(extension)) { errors.push(`Dateityp ist nicht erlaubt: ${name}`); break; }
    const normalized = name.toLocaleLowerCase('en-US'); if (seen.has(normalized)) { errors.push(`Doppelter Dateiname im Paket: ${name}`); break; }
    seen.add(normalized); compressed += compressedSize; uncompressed += uncompressedSize;
    if (uncompressed > MAX_UNCOMPRESSED || (compressedSize === 0 && uncompressedSize > 0) || (compressed > 0 && uncompressed / compressed > MAX_RATIO)) { errors.push('ZIP überschreitet die zulässigen Entpackgrenzen.'); break; }
    files.push(name);
  }
  if (!files.length && !errors.length) errors.push('ZIP enthält keine zulässigen Paketdateien.');
  return errors.length ? { ok: false, errors } : { ok: true, files, compressed, uncompressed };
}
function findEocd(view, length) { for (let offset = length - 22; offset >= Math.max(0, length - 65557); offset -= 1) if (view.getUint32(offset, true) === EOCD) return offset; return -1; }
function asciiName(bytes) { if ([...bytes].some((byte) => byte > 0x7f)) throw new Error('non-ascii'); return String.fromCharCode(...bytes); }
function safePath(name) { return name.length > 0 && name.length <= 240 && !name.startsWith('/') && !name.includes('\\') && !name.includes('\0') && !name.split('/').some((part) => !part || part === '.' || part === '..'); }
function isMacNoise(name) { return name.startsWith('__MACOSX/') || name.split('/').some((part) => part === '.DS_Store'); }
