import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { buildFiles } from '../../web/src/lib/contribution/generate.js';

const [fixturePath, root] = process.argv.slice(2);
if (!fixturePath || !root) throw new Error('Usage: generate-fixture.mjs <fixture.json> <target-dir>');
const fixture = JSON.parse(await readFile(fixturePath, 'utf8'));
for (const file of buildFiles(fixture)) {
  const target = path.join(root, file.path);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, file.content, 'utf8');
}
