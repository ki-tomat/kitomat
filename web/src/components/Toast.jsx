import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Icon } from './Icon.jsx';
import { useIsDarkMode } from '../lib/useIsDarkMode.js';

const ToastContext = createContext({ show: () => {}, dismiss: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const show = useCallback((next) => {
    setToast({ id: Date.now(), ...next });
  }, []);

  const dismiss = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return undefined;
    const handle = setTimeout(dismiss, toast.duration || 4500);
    return () => clearTimeout(handle);
  }, [toast, dismiss]);

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      <ToastView toast={toast} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function ToastView({ toast, onDismiss }) {
  const isDark = useIsDarkMode();
  if (!toast) return null;
  const tone = toast.tone || 'success';
  const palette = {
    success: { ring: 'var(--leaf)',   icon: <Icon.check size={14} /> },
    info:    { ring: 'var(--slate)',  icon: <Icon.spark size={14} /> },
    error:   { ring: 'var(--tomato)', icon: '!' },
  }[tone];
  const textColor = isDark ? '#1A1916' : 'white';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed', left: '50%', bottom: 96, zIndex: 80,
        transform: 'translateX(-50%)',
        background: 'var(--ink)', color: textColor,
        padding: '12px 16px 12px 14px', borderRadius: 14,
        minWidth: 280, maxWidth: 480,
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 20px 40px -16px rgba(26,25,22,.5)',
      }}
    >
      <span style={{
        width: 28, height: 28, borderRadius: 99,
        background: palette.ring, color: 'white',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{palette.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {toast.title && (
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: toast.body ? 2 : 0 }}>
            {toast.title}
          </div>
        )}
        {toast.body && <div style={{ fontSize: 13, opacity: 0.88 }}>{toast.body}</div>}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Schließen"
        style={{ color: textColor, opacity: 0.7, padding: 4, borderRadius: 6, background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        <Icon.close size={12} />
      </button>
    </div>
  );
}
