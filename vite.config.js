import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Tailwind CSS is wired in through PostCSS (see postcss.config.js below),
// which Vite picks up automatically. The explicit reference here makes the
// pipeline obvious and lets you swap configs per-environment if needed.
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173,
    open: true,
  },
});
