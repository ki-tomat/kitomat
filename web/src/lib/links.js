export const UI_REPO_URL = 'https://github.com/pfernando-KI/kitomat';
export const CONTENT_REPO_URL = 'https://github.com/ki-tomat/kitomat';
export const CONTENT_REPO_LABEL = 'github.com/ki-tomat/kitomat';
export const ADMIN_SITE_URL =
  import.meta.env?.VITE_KITOMAT_ADMIN_SITE_URL ||
  'https://kitomat-admin-team.kiconsu91i-0-8637.chatgpt-team.site';
export const CONTENT_ISSUES_URL = `${CONTENT_REPO_URL}/issues`;
export const CONTENT_PULLS_URL = `${CONTENT_REPO_URL}/pulls`;

export function contentArtifactUrl(id) {
  return `${CONTENT_REPO_URL}/tree/main/artifacts/${id}`;
}
