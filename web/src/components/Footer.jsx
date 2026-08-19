import { Icon } from './Icon.jsx';
import kitomatMark from '../assets/kitomat-mark.png';

import { CONTENT_REPO_LABEL, CONTENT_REPO_URL } from '../lib/links.js';
function FooterCol({ title, items, go }) {
  return (
    <div>
      <div className="h-eyebrow" style={{ marginBottom: 10 }}>{title}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map(([label, id]) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => go(id)}
              style={{ fontSize: 13.5, color: 'var(--ink-2)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ go }) {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', marginTop: 60, background: 'var(--surface)' }}>
      <div className="container" style={{ padding: '32px 32px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32, marginBottom: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <img src={kitomatMark} alt="" style={{ height: 32, width: 32, objectFit: 'contain' }} />
              <strong style={{ fontSize: 16 }}>
                <span>KI</span><span style={{ color: 'var(--tomato)' }}>tomat</span>
              </strong>
            </div>
            <div className="muted" style={{ fontSize: 13, maxWidth: 320 }}>
              Kuratierte, reviewte Bibliothek für KI-Arbeitsbausteine.
              Aufgebaut im KI-Consultant-Kurs, getragen von der Community.
            </div>
          </div>
          <FooterCol
            title="Erkunden"
            items={[
              ['Dashboard', 'dashboard'],
              ['Bibliothek', 'library'],
              ['Über KItomat', 'about'],
              ['FAQ', 'faq'],
            ]}
            go={go}
          />
          <FooterCol
            title="Mitmachen"
            items={[
              ['Beitrag vorbereiten', 'contribution'],
              ['Review Center', 'review'],
              ['Community', 'community'],
            ]}
            go={go}
          />
          <div>
            <div className="h-eyebrow" style={{ marginBottom: 10 }}>Repository</div>
            <a
              className="mono"
              style={{ fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ink-2)' }}
              href={CONTENT_REPO_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Icon.github size={13} /> {CONTENT_REPO_LABEL}
            </a>
            <div className="mono muted" style={{ fontSize: 11, marginTop: 8 }}>v0.2 · MVP</div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div className="mono muted" style={{ fontSize: 11 }}>Community-Projekt · KI-Consultant-Kurs · Made for KMU.</div>
          <div className="mono muted" style={{ fontSize: 11 }}>Frische KI-Ressourcen. Reife Ideen.</div>
        </div>
      </div>
    </footer>
  );
}
