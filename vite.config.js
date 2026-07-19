import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleApiRequest } from './src/server/apiRouter.js';

// Plugin de Vite para integrar los endpoints de la API en el servidor de desarrollo
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

export default defineConfig({
  plugins: [react(), mockApiPlugin()]
});
