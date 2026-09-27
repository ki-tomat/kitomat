const encoder = new TextEncoder();
function crc32(bytes) { let crc = 0xffffffff; for (const byte of bytes) { crc ^= byte; for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); } return (crc ^ 0xffffffff) >>> 0; }
function u16(value) { return [value & 255, (value >>> 8) & 255]; }
function u32(value) { return [...u16(value), ...u16(value >>> 16)]; }
function safeName(name) { return String(name).replace(/[\\/\0]/g, '-').replace(/[^\w. -]/gu, '-').slice(0, 120); }
export async function buildZip(files) {
  const local = []; const central = []; let offset = 0;
  for (const file of files) {
    const name = encoder.encode(file.path || safeName(file.name));
    const data = file.binary ? new Uint8Array(file.binary) : encoder.encode(file.content || '');
    const crc = crc32(data); const header = Uint8Array.from([0x50, 0x4b, 3, 4, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), 0, 0, ...name, ...data]);
    local.push(header); central.push(Uint8Array.from([0x50, 0x4b, 1, 2, 20, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ...u32(offset), ...name])); offset += header.length;
  }
  const centralSize = central.reduce((size, value) => size + value.length, 0); const end = Uint8Array.from([0x50, 0x4b, 5, 6, 0, 0, 0, 0, ...u16(files.length), ...u16(files.length), ...u32(centralSize), ...u32(offset), 0, 0]);
  return new Blob([...local, ...central, end], { type: 'application/zip' });
}
export function downloadZip(blob, filename) { const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url); }
export { safeName };
