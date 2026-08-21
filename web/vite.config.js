import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// base: './' bleibt vor AP7 bewusst robust f?r lokale Vorschau, Forks und Hash-Routing.
// AP7 soll im Pages-Workflow VITE_BASE_PATH='/kitomat/web/' setzen, wenn die Web UI
// unter https://pfernando-KI.github.io/kitomat/web/ ver?ffentlicht wird.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || './',
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
