export function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="theme-toggle" role="group" aria-label="Farbschema">
      <button
        type="button"
        onClick={() => setTheme('light')}
        title="Light Mode"
        aria-label="Light Mode"
        className={`tt tt-bottom ${theme === 'light' ? 'active' : ''}`}
        data-tt="Light"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        title="Dark Mode"
        aria-label="Dark Mode"
        className={`tt tt-bottom ${theme === 'dark' ? 'active' : ''}`}
        data-tt="Dark"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      </button>
    </div>
  );
}
