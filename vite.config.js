import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Tailwind v4 is a Vite plugin: no tailwind.config.js, no postcss.config.js.
// Design tokens live in `src/index.css` under `@theme`.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
