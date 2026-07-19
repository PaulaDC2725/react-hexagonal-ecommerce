import fs from 'fs';
import path from 'path';

// Carga inicial de productos desde archivo JSON
const productsFilePath = path.resolve(process.cwd(), 'src/data/products.json');

let products = [];

function loadProducts() {
  try {
    if (fs.existsSync(productsFilePath)) {
      const data = fs.readFileSync(productsFilePath, 'utf8');
      products = JSON.parse(data);
    }
  } catch (err) {
    console.error('Error al cargar productos desde el archivo:', err);
  }
}

function saveProducts() {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar productos en el archivo:', err);
  }
}

// Inicializar lista de productos
loadProducts();

export function handleApiRequest(req, res) {
  if (products.length === 0) {
    loadProducts();
  }
  const urlParts = new URL(req.url, 'http://localhost');
  const pathname = urlParts.pathname;
  const method = req.method.toUpperCase();

  // Función auxiliar para enviar respuestas JSON
  const sendJson = (statusCode, data) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.end(JSON.stringify(data));
  };

  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    return res.end();
  }

  // GET /api/products (Obtener productos o filtrar por categoría)
  if (pathname === '/api/products' && method === 'GET') {
    const category = urlParts.searchParams.get('category');
    if (category) {
      const filtered = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      return sendJson(200, filtered);
    }
    return sendJson(200, products);
  }

  // GET /api/products/:id (Obtener producto por ID)
  const getProductMatch = pathname.match(/^\/api\/products\/([^/]+)$/);
  if (getProductMatch && method === 'GET') {
    const id = getProductMatch[1];
    const product = products.find((p) => p.id === id);
    if (!product) {
      return sendJson(404, { error: 'Producto no encontrado' });
    }
    return sendJson(200, product);
  }

  // POST /api/orders (Procesar orden y descontar stock)
  if ((pathname === '/api/orders' || pathname === '/api/products/purchase') && method === 'POST') {
    let bodyStr = '';
    req.on('data', (chunk) => {
      bodyStr += chunk;
    });

    req.on('end', () => {
      try {
        const body = JSON.parse(bodyStr || '{}');
        const { buyer, items } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
          return sendJson(400, { error: 'No se incluyeron productos en la orden' });
        }

        // Validar stock para todos los artículos solicitados
        const stockErrors = [];
        items.forEach((item) => {
          const product = products.find((p) => p.id === item.id);
          if (!product) {
            stockErrors.push(`Producto con ID ${item.id} no encontrado.`);
          } else if (product.stock < item.quantity) {
            stockErrors.push(`Stock insuficiente para "${product.title}". Solicitado: ${item.quantity}, Disponible: ${product.stock}`);
          }
        });

        if (stockErrors.length > 0) {
          return sendJson(400, { error: stockErrors.join(' | ') });
        }

        // Descontar stock disponible
        items.forEach((item) => {
          const product = products.find((p) => p.id === item.id);
          if (product) {
            product.stock -= item.quantity;
          }
        });

        // Guardar cambios en disco
        saveProducts();

        const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        const orderSummary = {
          orderId,
          buyer: buyer || {},
          items,
          date: new Date().toISOString(),
          status: 'confirmed'
        };

        return sendJson(201, orderSummary);
      } catch (err) {
        return sendJson(400, { error: 'Formato JSON inválido', details: err.message });
      }
    });
    return;
  }

  return false;
}
