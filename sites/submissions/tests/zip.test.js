import test from 'node:test';
import assert from 'node:assert/strict';
import { inspectArtifactZip } from '../src/zip.js';

function zip(names) {
  const encoder = new TextEncoder(); const parts = []; const central = []; let offset = 0;
  for (const name of names) {
    const bytes = encoder.encode(name); const local = new Uint8Array(30 + bytes.length); const localView = new DataView(local.buffer);
    localView.setUint32(0, 0x04034b50, true); localView.setUint16(4, 20, true); localView.setUint16(6, 0x0800, true); localView.setUint16(8, 0, true); localView.setUint16(26, bytes.length, true); local.set(bytes, 30); parts.push(local);
    const entry = new Uint8Array(46 + bytes.length); const view = new DataView(entry.buffer);
    view.setUint32(0, 0x02014b50, true); view.setUint16(4, 0x0314, true); view.setUint16(6, 20, true); view.setUint16(8, 0x0800, true); view.setUint16(10, 0, true); view.setUint16(28, bytes.length, true); view.setUint32(42, offset, true); entry.set(bytes, 46); central.push(entry); offset += local.length;
  }
  const centralSize = central.reduce((total, part) => total + part.length, 0); const end = new Uint8Array(22); const endView = new DataView(end.buffer); endView.setUint32(0, 0x06054b50, true); endView.setUint16(8, names.length, true); endView.setUint16(10, names.length, true); endView.setUint32(12, centralSize, true); endView.setUint32(16, offset, true);
  const all = [...parts, ...central, end]; const output = new Uint8Array(all.reduce((total, part) => total + part.length, 0)); let cursor = 0; for (const part of all) { output.set(part, cursor); cursor += part.length; } return output.buffer;
}

test('accepts one safe artifact root with markdown and YAML', () => {
  const result = inspectArtifactZip(zip(['models/demo-model/model.md', 'models/demo-model/metadata.yml']), { artifactType: 'industry', artifactId: 'demo-model' });
  assert.equal(result.ok, true);
  assert.equal(result.files.length, 2);
});
test('rejects paths outside the declared artifact root', () => {
  const result = inspectArtifactZip(zip(['models/demo-model/model.md', 'prompts/other/prompt.md']), { artifactType: 'industry', artifactId: 'demo-model' });
  assert.equal(result.ok, false);
  assert.match(result.errors[0], /Unzulässiger Paketpfad/);
});
test('rejects binary file extensions', () => {
  const result = inspectArtifactZip(zip(['prompts/safe/prompt.md', 'prompts/safe/secret.pdf']), { artifactType: 'prompt', artifactId: 'safe' });
  assert.equal(result.ok, false);
  assert.match(result.errors[0], /Dateityp/);
});
