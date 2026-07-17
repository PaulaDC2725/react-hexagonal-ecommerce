// Infrastructure Adapter: Simulates external data access layer.
// Encapsulates mock database calls as asynchronous promises to mimic remote API latencies.

const MOCK_PRODUCTS = [
  {
    id: 'prod-01',
    title: 'AeroType Mechanical Keyboard',
    description: 'A premium 75% mechanical keyboard with hot-swappable tactile switches, double-shot PBT keycaps, and custom RGB lighting.',
    price: 189.99,
    pictureUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80',
    stock: 8,
    category: 'keyboards'
  },
  {
    id: 'prod-02',
    title: 'ApexGlide Wireless Mouse',
    description: 'Ultra-lightweight ergonomic gaming mouse featuring a 26K DPI optical sensor, optical switches, and up to 80 hours of battery life.',
    price: 99.99,
    pictureUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    stock: 15,
    category: 'mice'
  },
  {
    id: 'prod-03',
    title: 'SoundArch ANC Headphones',
    description: 'Studio-grade over-ear wireless headphones with hybrid active noise cancellation, high-resolution audio drivers, and comfortable memory foam earcups.',
    price: 249.99,
    pictureUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    stock: 5,
    category: 'audio'
  },
  {
    id: 'prod-04',
    title: 'MatteDesk Merino Wool Felt Mat',
    description: 'Minimalist desktop mat crafted from natural water-resistant merino wool felt, featuring a non-slip cork backing for maximum comfort.',
    price: 59.99,
    pictureUrl: 'https://images.unsplash.com/photo-1632292224971-0d45778bd364?auto=format&fit=crop&w=600&q=80',
    stock: 12,
    category: 'accessories'
  },
  {
    id: 'prod-05',
    title: 'RGB Custom Cable Co.',
    description: 'Coiled double-sleeved paracord keyboard cable with GX16 aviator connector. Perfect for aesthetic setup customization.',
    price: 34.99,
    pictureUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80',
    stock: 20,
    category: 'keyboards'
  },
  {
    id: 'prod-06',
    title: 'ProGlide Ergonomic Wrist Rest',
    description: 'Ergonomic solid walnut wood wrist rest designed to reduce wrist strain during long typing or gaming sessions.',
    price: 45.00,
    pictureUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    stock: 3,
    category: 'accessories'
  }
];

export const productService = {
  /**
   * Fetches products optionally filtered by category.
   * @param {string} [categoryId]
   * @returns {Promise<Array>}
   */
  getProducts: (categoryId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (categoryId) {
          const filtered = MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === categoryId.toLowerCase());
          resolve(filtered);
        } else {
          resolve(MOCK_PRODUCTS);
        }
      }, 600);
    });
  },

  /**
   * Fetches a single product by ID.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  getProductById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = MOCK_PRODUCTS.find(p => p.id === id);
        resolve(product || null);
      }, 400);
    });
  }
};
