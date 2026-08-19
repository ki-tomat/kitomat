import { useEffect, useRef } from 'react';
import { Icon } from '../Icon.jsx';
import kitomatMark from '@/assets/kitomat-mark.png';

export function VideoModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousActiveRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    previousActiveRef.current = document.activeElement;
    const dialog = dialogRef.current;
    const getFocusable = () => Array.from(
      dialog?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || [],
    ).filter((el) => !el.disabled && !el.getAttribute('aria-hidden'));

    requestAnimationFrame(() => {
      const first = closeButtonRef.current || getFocusable()[0];
      first?.focus?.();
    });

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      previousActiveRef.current?.focus?.();
      previousActiveRef.current = null;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-label="Erklärvideo"
      aria-modal="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 70,
        background: 'rgba(26,25,22,.65)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
    >
      <div
        ref={dialogRef}
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(840px, 100%)',
          background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 18, overflow: 'hidden', position: 'relative',
          boxShadow: '0 30px 80px -20px rgba(26,25,22,.5)',
        }}
      >
        <button
          onClick={onClose}
          title="Schließen"
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 2,
            padding: 8, color: 'white', background: 'rgba(0,0,0,.4)', borderRadius: 8,
          }}
        >
          <Icon.close size={16} />
        </button>

        {/* Video-Platzhalter */}
        <div
          className="video-card"
          style={{ borderRadius: 0, cursor: 'default', aspectRatio: '16 / 9' }}
        >
          <div className="video-corner">
            <img src={kitomatMark} alt="" style={{ width: 16, height: 16, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            KItomat · Tutorial
          </div>
          <div className="video-corner video-corner-r">
            <Icon.spark size={10} /> Erklärvideo folgt
          </div>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            color: 'white', textAlign: 'center', padding: 24,
          }}>
            <div style={{
              width: 84, height: 84, borderRadius: 999,
              background: 'rgba(255,255,255,.94)', color: 'var(--tomato)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 30px -4px rgba(0,0,0,.4)', marginBottom: 18,
            }}>
              <Icon.play />
            </div>
            <div className="mono" style={{ fontSize: 11, opacity: .85, letterSpacing: '.08em', marginBottom: 8 }}>02:00 · DEMO-VIDEO GEPLANT</div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.015em', marginBottom: 6 }}>So funktioniert KItomat</div>
            <div style={{ fontSize: 14.5, opacity: .9, maxWidth: 520 }}>
              Das Erklärvideo wird hier später eingebunden. Es zeigt in 2 Minuten,
              wie Artefakte gefunden, vorbereitet und reviewt werden.
            </div>
          </div>
        </div>

        <div style={{
          padding: '14px 18px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 10, flexWrap: 'wrap',
        }}>
          <div className="muted" style={{ fontSize: 12.5 }}>Platzhalter – wird mit fertigem Video ersetzt.</div>
          <button className="btn btn-primary btn-sm" onClick={onClose}>Schließen</button>
        </div>
      </div>
    </div>
  );
}
