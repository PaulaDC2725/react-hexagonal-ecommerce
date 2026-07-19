import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleApiRequest } from './src/server/apiRouter.js';

// Custom Vite plugin to embed the Products API directly into Vite dev server
const mockApiPlugin = () => ({
  name: 'mock-products-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url.startsWith('/api')) {
        const handled = handleApiRequest(req, res);
        if (handled !== false) return;
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mockApiPlugin()]
});
