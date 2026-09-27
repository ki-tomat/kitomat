export function yamlScalar(value) { return JSON.stringify(value); }
export function yamlList(key, values = []) { return values.length ? `${key}:\n${values.map((value) => `  - ${yamlScalar(value)}`).join('\n')}` : `${key}: []`; }
export function yamlMapping(entries) {
  return `${entries.map(([key, value]) => Array.isArray(value) ? yamlList(key, value) : `${key}: ${yamlScalar(value)}`).join('\n')}\n`;
}
