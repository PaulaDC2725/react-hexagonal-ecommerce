import { handleApiRequest } from '../src/server/apiRouter.js';

export default function handler(req, res) {
  const handled = handleApiRequest(req, res);
  if (handled === false) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
}
