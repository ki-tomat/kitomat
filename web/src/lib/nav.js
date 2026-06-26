export const ROLE_LABELS = {
  user:        'Nutzer:in',
  contributor: 'Contributor',
  reviewer:    'Reviewer',
  maintainer:  'Maintainer',
  admin:       'Admin',
};

export const ROLE_COLORS = {
  user:        'var(--slate)',
  contributor: 'var(--leaf)',
  reviewer:    'var(--tomato)',
  maintainer:  'var(--post-ink)',
  admin:       'var(--ink)',
};

export const ROLES = Object.keys(ROLE_LABELS);

export function navForRole(role) {
  const base = [
    { id: 'dashboard',    label: 'Dashboard' },
    { id: 'library',      label: 'Bibliothek' },
    { id: 'contribution', label: 'Beitrag vorbereiten' },
    { id: 'about',        label: 'Über KItomat' },
  ];
  const primary = [...base];
  if (role === 'contributor') {
    primary.push({ id: 'my-requests', label: 'Meine Requests' });
  }
  if (['reviewer', 'maintainer', 'admin'].includes(role)) {
    primary.push({ id: 'review', label: 'Review Center' });
  }

  const secondary = [
    { id: 'community', label: 'Community', desc: 'Forum, Profile, Channels' },
    { id: 'faq',       label: 'FAQ',       desc: 'Häufige Fragen kompakt' },
  ];
  if (role === 'admin') {
    secondary.push({ id: 'admin', label: 'Admin-Bereich', desc: 'Rollen, Integrationen, Audit' });
  }
  return { primary, secondary };
}

export function isRouteAllowed(route, role) {
  if (route === 'review') return ['reviewer', 'maintainer', 'admin'].includes(role);
  if (route === 'admin') return role === 'admin';
  if (route === 'my-requests') return role === 'contributor';
  return true;
}
