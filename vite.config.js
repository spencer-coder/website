import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Tailwind v4 runs as a Vite plugin — there is no tailwind.config.js and no
// postcss.config.js. Design tokens live in `src/index.css` under `@theme`.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        // React changes far less often than the site copy does. Giving it its
        // own chunk means editing content doesn't invalidate the cached copy.
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
