// Infrastructure Adapter: Data access layer fetching from independent REST API endpoint.
// Connects UI / domain logic to real HTTP endpoints (/api/products and /api/orders).

const RAW_BASE_URL = import.meta.env.VITE_BASE_URL || '';
const CLEAN_BASE = RAW_BASE_URL.replace(/\/$/, '');
const BASE_URL = CLEAN_BASE ? `${CLEAN_BASE}/api` : '/api';

export const productService = {
  /**
   * Fetches products from API, optionally filtered by category.
   * @param {string} [categoryId]
   * @returns {Promise<Array>}
   */
  getProducts: async (categoryId) => {
    try {
      const url = categoryId
        ? `${BASE_URL}/products?category=${encodeURIComponent(categoryId)}`
        : `${BASE_URL}/products`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('productService.getProducts error:', error);
      throw error;
    }
  },

  /**
   * Fetches a single product by ID from API.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  getProductById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${encodeURIComponent(id)}`);
      if (response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error(`Error fetching product ${id}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`productService.getProductById error (${id}):`, error);
      throw error;
    }
  },

  /**
   * Creates an order and updates stock in the database/endpoint via POST.
   * @param {Object} orderData - { buyer, items }
   * @returns {Promise<Object>} Created order details including orderId
   */
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order and update stock');
      }

      return data;
    } catch (error) {
      console.error('productService.createOrder error:', error);
      throw error;
    }
  }
};
