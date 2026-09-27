import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { decodePayload } from '../../web/src/lib/ap14Handoff.js';
import { TYPES } from '../../web/src/lib/contribution/model.js';
import { validateForm } from '../../web/src/lib/contribution/validateForm.js';
import { buildFiles } from '../../web/src/lib/contribution/generate.js';
import { validatePackage } from '../../web/src/lib/contribution/validate.js';

function fail(message) { throw new Error(message); }
export async function generateFromIssue({ issueBody, root }) {
  const decoded = decodePayload(issueBody);
  if (!decoded.ok) fail(decoded.errors.join(' '));
  const payload = decoded.payload;
  const formErrors = validateForm(payload.type, payload.answers, payload.acknowledgements);
  if (formErrors.length) fail(formErrors.map((item) => item.message).join(' '));
  const files = buildFiles(payload);
  const validation = validatePackage(files, { ...payload.answers, artifact_type: TYPES[payload.type].artifactType, status: 'draft', human_review_required: true }, payload.type);
  if (validation.errors.length) fail(validation.errors.map((item) => item.message).join(' '));
  const relative = `${TYPES[payload.type].folder}/${payload.answers.id}`;
  const target = path.resolve(root, relative);
  if (!target.startsWith(`${path.resolve(root)}${path.sep}`)) fail('Ungültiger Zielpfad.');
  await mkdir(path.join(root, TYPES[payload.type].folder), { recursive: true });
  await mkdir(target, { recursive: false });
  try {
    for (const file of files) {
      const destination = path.resolve(root, file.path);
      if (!destination.startsWith(`${target}${path.sep}`)) fail('Generator lieferte einen ungültigen Pfad.');
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, file.content, { encoding: 'utf8', flag: 'wx' });
    }
  } catch (error) {
    throw new Error(`Import wurde ohne Überschreiben abgebrochen: ${error.message}`);
  }
  return { id: payload.answers.id, folder: TYPES[payload.type].folder, artifactType: payload.type, artifactPath: relative, risk: payload.answers.data_risk, payloadHash: createHash('sha256').update(JSON.stringify(payload)).digest('hex') };
}
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const result = await generateFromIssue({ issueBody: event.issue?.body, root: process.env.GITHUB_WORKSPACE || process.cwd() });
  console.log(JSON.stringify(result));
}
