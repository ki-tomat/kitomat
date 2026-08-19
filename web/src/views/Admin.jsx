import { useState } from 'react';
import { ADMIN_USERS, AUDIT_LOG, INTEGRATIONS, ROLE_MATRIX } from '../data/index.js';
import { Avatar, Icon, PhaseBadge } from '../components/index.js';

const TABS = [
  { id: 'users', label: 'Nutzer & Rollen' },
  { id: 'matrix', label: 'Berechtigungs-Matrix' },
  { id: 'integrations', label: 'Integrationen' },
  { id: 'audit', label: 'Audit-Log' },
  { id: 'settings', label: 'Einstellungen' },
];

export default function Admin({ go: _go }) {
  const [tab, setTab] = useState('users');

  return (
    <main className="page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, flexWrap: 'wrap', gap: 18 }}>
          <div>
            <div className="h-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon.lock size={11} /> Admin-Bereich
            </div>
            <h1 className="h2" style={{ marginTop: 6 }}>System, Rollen & Integrationen</h1>
            <p className="muted" style={{ margin: '10px 0 0', maxWidth: 680, fontSize: 14.5 }}>
              Verwaltungs-Cockpit für Maintainer. Im MVP als interaktives Mockup mit Demo-Daten.
              Phase 3 bringt echte Anmeldung via GitHub OAuth.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <PhaseBadge kind="demo">Demo-Login aktiv</PhaseBadge>
            <PhaseBadge kind="postmvp">Echter Login Post-MVP</PhaseBadge>
          </div>
        </div>

        <nav className="card" style={{ padding: 8, marginBottom: 18, display: 'flex', gap: 4, overflowX: 'auto' }}>
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`nav-link ${tab === item.id ? 'active' : ''}`}
              style={{ flexShrink: 0 }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {tab === 'users' && <UsersPanel users={ADMIN_USERS} />}
        {tab === 'matrix' && <MatrixPanel matrix={ROLE_MATRIX} />}
        {tab === 'integrations' && <IntegrationsPanel items={INTEGRATIONS} />}
        {tab === 'audit' && <AuditPanel rows={AUDIT_LOG} />}
        {tab === 'settings' && <SettingsPanel />}
      </div>
    </main>
  );
}

function UsersPanel({ users }) {
  const roleCount = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});
  const roles = ['Nutzer', 'Contributor', 'Reviewer', 'Trust-Verantw.', 'Maintainer', 'Admin'];

  return (
    <section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 18 }}>
        {roles.map((role) => (
          <div key={role} className="card" style={{ padding: '14px 16px' }}>
            <div className="muted" style={{ fontSize: 11.5 }}>{role}</div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>{roleCount[role] || 0}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div className="h-eyebrow">Mitglieder</div>
            <strong style={{ fontSize: 14 }}>Reviewer & Maintainer verwalten</strong>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-secondary btn-sm">Reviewer-Gruppe öffnen</button>
            <button type="button" className="btn btn-primary btn-sm"><Icon.plus /> Mitglied einladen</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5, minWidth: 860 }}>
            <thead>
              <tr style={{ textAlign: 'left', background: 'var(--bg-2)' }}>
                {['Name', 'Handle', 'Rolle', 'E-Mail', 'aktiv seit', 'Artefakte', 'Reviews', ''].map((head) => (
                  <th key={head} className="h-eyebrow" style={{ padding: '12px 16px', fontSize: 11, borderBottom: '1px solid var(--line)' }}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.handle} style={{ borderBottom: index < users.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={initials(user.name)} color="var(--slate)" size={26} />
                      {user.name}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }} className="mono muted">{user.handle}</td>
                  <td style={{ padding: '12px 16px' }}><RoleBadge role={user.role} /></td>
                  <td style={{ padding: '12px 16px' }} className="mono muted">{user.email}</td>
                  <td style={{ padding: '12px 16px' }} className="mono">{user.since}</td>
                  <td style={{ padding: '12px 16px' }} className="mono">{user.artifacts}</td>
                  <td style={{ padding: '12px 16px' }} className="mono">{user.reviews}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button type="button" className="btn btn-ghost btn-sm">Bearbeiten</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function RoleBadge({ role }) {
  const map = {
    Admin: { bg: 'var(--ink)', color: 'white' },
    Maintainer: { bg: 'var(--post-ink)', color: 'white' },
    'Trust-Verantw.': { bg: 'var(--amber-soft)', color: 'var(--amber-ink)' },
    Reviewer: { bg: 'var(--tomato-soft)', color: 'var(--tomato-deep)' },
    Contributor: { bg: 'var(--leaf-soft)', color: 'var(--leaf-ink)' },
    Nutzer: { bg: 'var(--bg-2)', color: 'var(--ink-2)' },
  };
  const meta = map[role] || map.Nutzer;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 9px',
        borderRadius: 999,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        fontWeight: 600,
        background: meta.bg,
        color: meta.color,
      }}
    >
      {role}
    </span>
  );
}

function MatrixPanel({ matrix }) {
  const roles = ['Nutzer', 'Contributor', 'Reviewer', 'Trust', 'Maintainer', 'Admin'];
  return (
    <section className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--line)' }}>
        <div className="h-eyebrow">Berechtigungs-Matrix</div>
        <strong style={{ fontSize: 14 }}>Welche Rolle darf was?</strong>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 760 }}>
          <thead>
            <tr style={{ background: 'var(--bg-2)' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, borderBottom: '1px solid var(--line)' }} className="h-eyebrow">Capability</th>
              {roles.map((role) => (
                <th key={role} style={{ padding: '12px 8px', fontSize: 11, borderBottom: '1px solid var(--line)', textAlign: 'center' }} className="h-eyebrow">{role}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, index) => (
              <tr key={row.capability} style={{ borderBottom: index < matrix.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>{row.capability}</td>
                {roles.map((role) => (
                  <td key={role} style={{ padding: '12px 8px', textAlign: 'center' }}>
                    {row.roles.includes(role) ? (
                      <span style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: 6, background: 'var(--leaf-soft)', color: 'var(--leaf)', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon.check size={11} />
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: 6, background: 'var(--bg-2)', color: 'var(--ink-3)', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon.dash size={11} />
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function IntegrationsPanel({ items }) {
  const badgeMap = { green: 'badge-green', amber: 'badge-yellow', slate: 'badge-neutral' };
  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 14 }}>
      {items.map((item) => (
        <div key={item.name} className="card" style={{ padding: 20, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <span style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: integrationColor(item.name), flexShrink: 0 }}>
            <IntegrationIcon name={item.name} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
              <strong style={{ fontSize: 14 }}>{item.name}</strong>
              <span className={`badge ${badgeMap[item.badge] || 'badge-neutral'}`} style={{ fontSize: 10.5 }}>
                <span className="dot" />{item.status}
              </span>
            </div>
            <div className="muted" style={{ fontSize: 13 }}>{item.note}</div>
          </div>
          <button type="button" className="btn btn-secondary btn-sm">Einstellungen</button>
        </div>
      ))}
    </section>
  );
}

function IntegrationIcon({ name }) {
  if (name.includes('GitHub')) return <Icon.github size={20} />;
  if (name.includes('Mail') || name.includes('E-Mail')) return <Icon.mail size={20} />;
  if (name.includes('Discord')) return <span className="mono" style={{ fontWeight: 800, fontSize: 13 }}>DC</span>;
  if (name.includes('LinkedIn')) return <span className="mono" style={{ fontWeight: 800, fontSize: 13 }}>in</span>;
  return <Icon.spark size={18} />;
}

function integrationColor(name) {
  if (name.includes('Discord')) return 'var(--post-ink)';
  if (name.includes('LinkedIn')) return 'var(--slate)';
  return 'var(--ink-2)';
}

function AuditPanel({ rows }) {
  return (
    <section className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="h-eyebrow">Audit-Log</div>
          <strong style={{ fontSize: 14 }}>Aktivitäten der letzten 24 Stunden</strong>
        </div>
        <span className="muted mono" style={{ fontSize: 12 }}>{rows.length} Einträge · Demo-Daten</span>
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {rows.map((row, index) => (
          <li
            key={`${row.t}-${row.target}`}
            style={{
              padding: '14px 22px',
              borderBottom: index < rows.length - 1 ? '1px solid var(--line)' : 'none',
              display: 'grid',
              gridTemplateColumns: 'minmax(120px, 170px) minmax(90px, 110px) 1fr 1fr',
              gap: 14,
              alignItems: 'center',
              fontSize: 13.5,
            }}
          >
            <span className="mono" style={{ color: 'var(--ink-3)' }}>{row.t}</span>
            <span className="mono">{row.who}</span>
            <span>{row.what}</span>
            <span className="mono muted" style={{ fontSize: 12.5 }}>{row.target}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SettingsPanel() {
  const settings = [
    { title: 'GitHub-Verknüpfung', desc: 'Repository, Branch-Regeln und PR-Labels.', phase: 'live' },
    { title: 'Reviewer-Gruppen', desc: 'Wer wird bei welchem Artefakttyp benachrichtigt.', phase: 'demo' },
    { title: 'E-Mail-Templates', desc: 'Texte für Review Request, Erinnerung, Freigabe.', phase: 'demo' },
    { title: 'Trust-Schwellen', desc: 'Ab wann ein Trust Review zwingend erforderlich ist.', phase: 'live' },
    { title: 'Belohnungsregeln', desc: 'Welche Aktion welches Badge auslöst.', phase: 'geplant' },
    { title: 'System-Status', desc: 'Health-Checks, GitHub-API-Limits, Agenten-Auslastung.', phase: 'geplant' },
  ];

  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
      {settings.map((setting) => (
        <div key={setting.title} className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 10 }}>
            <strong style={{ fontSize: 14.5 }}>{setting.title}</strong>
            <PhaseBadge kind={setting.phase}>{setting.phase}</PhaseBadge>
          </div>
          <p className="muted" style={{ margin: '0 0 12px', fontSize: 13 }}>{setting.desc}</p>
          <button type="button" className="btn btn-secondary btn-sm">Öffnen</button>
        </div>
      ))}
    </section>
  );
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('');
}
