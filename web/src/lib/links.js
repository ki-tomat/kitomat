export const UI_REPO_URL = 'https://github.com/ki-tomat/kitomat';
export const CONTENT_REPO_URL = 'https://github.com/ki-tomat/kitomat';
export const CONTENT_REPO_LABEL = 'github.com/ki-tomat/kitomat';
// Ausschliesslich aus der Env. Ohne gesetzte Variable ist der Wert leer und der
// Admin-Einstieg wird in der Navigation ausgeblendet (siehe Header/MobileNav/nav).
// Bewusst KEIN hardcodierter Fallback mehr auf ein altes Deployment.
export const ADMIN_SITE_URL = import.meta.env?.VITE_KITOMAT_ADMIN_SITE_URL || '';
export const CONTENT_ISSUES_URL = `${CONTENT_REPO_URL}/issues`;
export const CONTENT_PULLS_URL = `${CONTENT_REPO_URL}/pulls`;

// Ordner-Konvention der echten Content-Struktur (prompts/datasets/models).
// Dupliziert bewusst die kleine Map aus liveContent.js, um einen Import-Zyklus
// (links.js <-> liveContent.js) zu vermeiden.
const FOLDER_FOR_TYPE = {
  prompt: 'prompts',
  dataset: 'datasets',
  industry: 'models',
};

// Fallback-Link fuer Artefakte ohne eigenen githubUrl (Mockdaten). Baut den Pfad
// aus dem Typ->Ordner-Mapping statt aus dem frueher fest verdrahteten, nicht
// existierenden `artifacts/`-Ordner. Ohne aufloesbaren Typ/id -> Repo-Wurzel.
export function contentArtifactUrl(id, type) {
  const folder = FOLDER_FOR_TYPE[type];
  if (!id || !folder) return `${CONTENT_REPO_URL}/tree/main`;
  return `${CONTENT_REPO_URL}/tree/main/${folder}/${id}`;
}
