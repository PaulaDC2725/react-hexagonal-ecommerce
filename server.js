import http from 'http';
import { handleApiRequest } from './src/server/apiRouter.js';

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  const handled = handleApiRequest(req, res);
  if (handled === false) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Independent Products API Server running on http://localhost:${PORT}`);
  console.log(`   GET  http://localhost:${PORT}/api/products`);
  console.log(`   GET  http://localhost:${PORT}/api/products/:id`);
  console.log(`   POST http://localhost:${PORT}/api/orders`);
});
