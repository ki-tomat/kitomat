import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// base: './' für maximale Flexibilität (funktioniert in jedem Subpfad).
// TODO AP7: für GitHub Pages auf konkreten Pfad setzen, z. B. '/kitomat/web/' oder
// '/kitomat-github-work/web/' je nach Deploy-Repo (siehe ADR-006).
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
