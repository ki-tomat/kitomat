import { fieldsForType, slug } from './model.js';

export function validateForm(type, answers, acknowledgements = {}) {
  const errors = [];
  for (const field of fieldsForType(type)) {
    const value = answers?.[field.key];
    if (!field.required) continue;
    if (field.kind === 'list' && (!Array.isArray(value) || !value.some((item) => String(item).trim()))) errors.push(issue(field.key, 'Bitte gib mindestens einen Eintrag an.'));
    else if (field.kind === 'boolean' && typeof value !== 'boolean') errors.push(issue(field.key, 'Bitte wähle Ja oder Nein.'));
    else if (field.kind === 'select' && !field.options.includes(value)) errors.push(issue(field.key, 'Bitte wähle einen erlaubten Wert.'));
    else if (!['list', 'boolean'].includes(field.kind) && !String(value || '').trim()) errors.push(issue(field.key, 'Dieses Feld ist erforderlich.'));
  }
  if (answers?.id && (slug(answers.id) !== answers.id || answers.id.length < 3)) errors.push(issue('id', 'Die ID muss mindestens drei Zeichen haben und nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.'));
  if (/^pXX$/i.test(String(answers?.maintainer || ''))) errors.push(issue('maintainer', 'Bitte ersetze den Platzhalter pXX durch dein Kürzel oder deinen GitHub-Namen.'));
  for (const key of ['public_content_confirmed', 'no_real_personal_data_confirmed', 'pii_hints_reviewed']) if (!acknowledgements[key]) errors.push(issue(key, 'Bitte bestätige diesen Datenschutz- und Veröffentlichungshinweis aktiv.'));
  return errors;
}
function issue(field, message) { return { level: 'error', ebene: 1, field, message }; }
