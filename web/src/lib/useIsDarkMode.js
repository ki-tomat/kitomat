import { useEffect, useState } from 'react';

// Reactive dark-mode flag — beobachtet body.dark Klassen-Wechsel via MutationObserver.
// Greift für Inline-Styles, die theme-konditional die Schriftfarbe wechseln müssen
// (z. B. wenn der Background eine theme-aware Variable hat, der Text aber fest).
export function useIsDarkMode() {
  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined' && document.body.classList.contains('dark'),
  );
  useEffect(() => {
    const update = () => setIsDark(document.body.classList.contains('dark'));
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}
