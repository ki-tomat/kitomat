export function buildAp15SubmissionUrl(baseUrl, { id, type }) {
  const base = String(baseUrl || '').replace(/\/$/, '');
  if (!base) return '';
  const url = new URL(`${base}/`);
  url.searchParams.set('artifactId', id);
  url.searchParams.set('artifactType', type);
  return url.toString();
}

export function ap15ZipName(type, id) {
  return `kitomat-ap15-${type}-${id}.zip`;
}

export function hasOnlyTextPackageFiles(files) {
  return files.every((file) => typeof file.content === 'string' && !file.binary);
}
