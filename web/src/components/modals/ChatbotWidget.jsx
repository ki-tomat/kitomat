import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon.jsx';
import { useToast } from '../Toast.jsx';
import kitomatMark from '@/assets/kitomat-mark.png';

const CHAT_STORAGE_KEY = 'kitomat_chat_v1';

const CHAT_INITIAL = [
  { who: 'bot', t: 'Hallo! Ich bin der KItomat-Assistent. Wie kann ich helfen?' },
];

function reply(q) {
  const lower = q.toLowerCase();
  if (lower.includes('quellen'))
    return 'Ein Quellenpaket bündelt geprüfte, öffentlich nutzbare Quellen zu einem Thema – mit Metadaten, Lizenzinfo und Nutzungshinweisen.';
  if (lower.includes('review'))
    return 'Einreichung → Agenten-Vorprüfung → Peer Review → Trust Review → Freigabe. Jeder Schritt ist im Review Center einsehbar.';
  if (lower.includes('daten') || lower.includes('verbot'))
    return 'Verwende ausschließlich synthetische Beispiele oder lizenzfreie Quellen. Keine personenbezogenen Echtdaten.';
  if (lower.includes('github'))
    return 'Im MVP übergeben wir Beiträge über GitHub Pull Requests. Ein Konto ist erforderlich.';
  if (lower.includes('trust'))
    return 'Der Trust Layer ist die Summe aller Prüfungen: automatisiert, Peer und finale Human-Review.';
  if (lower.includes('artefakt') || lower.includes('typ'))
    return 'Drei Typen: Prompt-Paket, Quellen-Paket und Industry-Model-Paket. Jeder Typ hat eigene Metadaten.';
  return 'Gute Frage. Im MVP verweise ich dich auf die Dokumentation unter FAQ oder About.';
}

const QUICK = [
  'Was ist ein Quellenpaket?',
  'Wie läuft der Review?',
  'Welche Daten sind verboten?',
  'Brauche ich GitHub?',
];

export function ChatbotWidget({ open, setOpen }) {
  const { show } = useToast();

  const [msgs, setMsgs] = useState(() => {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) { /* ignore */ }
    return CHAT_INITIAL;
  });

  const [draft, setDraft] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const scrollerRef = useRef(null);
  const panelRef = useRef(null);
  const fabRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [msgs, open]);

  useEffect(() => {
    try { localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(msgs)); } catch (e) { /* ignore */ }
  }, [msgs]);

  // Außenklick schließt Panel
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (inputFocused) return;
      if (panelRef.current?.contains(e.target)) return;
      if (fabRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, inputFocused, setOpen]);

  // ESC schließt Panel
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, setOpen]);

  const send = (text) => {
    const t = (text || draft).trim();
    if (!t) return;
    setMsgs(m => [...m, { who: 'user', t }]);
    setDraft('');
    setTimeout(() => setMsgs(m => [...m, { who: 'bot', t: reply(t) }]), 450);
  };

  const clearHistory = () => {
    setMsgs(CHAT_INITIAL);
    show({ title: 'Verlauf zurückgesetzt', tone: 'info' });
  };

  return (
    <>
      {/* FAB */}
      <button
        ref={fabRef}
        onClick={() => setOpen(true)}
        className="tt tt-left"
        data-tt="KItomat Assistent · Verlauf bleibt erhalten"
        style={{
          position: 'fixed', right: 24, bottom: 24, zIndex: 60,
          width: 56, height: 56, borderRadius: 999,
          background: 'var(--tomato)', color: 'white',
          boxShadow: '0 14px 28px -10px rgba(230,51,41,.6), 0 4px 10px rgba(0,0,0,.08)',
          display: open ? 'none' : 'flex',
          alignItems: 'center', justifyContent: 'center',
          transition: 'transform .15s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={e => e.currentTarget.style.transform = ''}
      >
        <Icon.chat size={22} />
        <span style={{
          position: 'absolute', top: -2, right: -2,
          width: 14, height: 14, borderRadius: 999,
          background: 'var(--leaf)', border: '2px solid white',
        }} />
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="KItomat Assistent"
        aria-modal="true"
        style={{
          position: 'fixed', right: 24, bottom: 24, zIndex: 60,
          width: 380, height: 560,
          background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 18,
          boxShadow: '0 24px 60px -20px rgba(26,25,22,.25), 0 8px 16px -8px rgba(26,25,22,.08)',
          display: open ? 'flex' : 'none',
          flexDirection: 'column', overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '14px 16px',
          background: 'linear-gradient(135deg, var(--tomato) 0%, var(--tomato-deep) 100%)',
          color: 'white', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: 'rgba(255,255,255,.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src={kitomatMark} alt="" style={{ width: 24, height: 24, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.1 }}>KItomat Assistent</div>
            <div className="mono" style={{ fontSize: 10.5, opacity: .85, marginTop: 2, letterSpacing: '.04em' }}>DEMO · VERLAUF BLEIBT ERHALTEN</div>
          </div>
          <button
            onClick={clearHistory}
            title="Verlauf zurücksetzen"
            style={{ color: 'white', opacity: .8, padding: 6, borderRadius: 6, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '.04em' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.15)'}
            onMouseLeave={e => e.currentTarget.style.background = ''}
          >
            RESET
          </button>
          <button
            onClick={() => setOpen(false)}
            title="Minimieren"
            style={{ color: 'white', opacity: .85, padding: 6, borderRadius: 6 }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.15)'}
            onMouseLeave={e => e.currentTarget.style.background = ''}
          >
            <Icon.close />
          </button>
        </div>

        {/* Nachrichten */}
        <div ref={scrollerRef} style={{ flex: 1, overflow: 'auto', padding: '14px 14px 6px', background: 'var(--bg)' }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', marginBottom: 10, justifyContent: m.who === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '82%',
                padding: '9px 13px',
                borderRadius: m.who === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: m.who === 'user' ? 'var(--ink)' : 'var(--surface)',
                color: m.who === 'user' ? 'white' : 'var(--ink-2)',
                border: m.who === 'user' ? 'none' : '1px solid var(--line)',
                fontSize: 13.5, lineHeight: 1.5,
              }}>
                {m.t}
              </div>
            </div>
          ))}
        </div>

        {/* Quick-Chips */}
        <div style={{ padding: '6px 12px 8px', display: 'flex', gap: 6, flexWrap: 'wrap', background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
          {QUICK.map(q => (
            <button
              key={q}
              onClick={() => send(q)}
              style={{
                padding: '5px 10px', borderRadius: 999,
                background: 'var(--surface)', border: '1px solid var(--line)',
                fontSize: 11.5, color: 'var(--ink-2)', fontWeight: 500,
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Eingabe */}
        <form
          onSubmit={e => { e.preventDefault(); send(); }}
          style={{ padding: 12, borderTop: '1px solid var(--line)', display: 'flex', gap: 8, alignItems: 'center', background: 'var(--surface)' }}
        >
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Frage stellen…"
            className="input"
            style={{ padding: '10px 12px', fontSize: 13.5 }}
          />
          <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '9px 12px' }}>
            <Icon.send size={14} />
          </button>
        </form>
      </div>
    </>
  );
}
