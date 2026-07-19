// Adaptador de Infraestructura: Capa de acceso a datos a través de endpoints REST
const RAW_BASE_URL = import.meta.env.VITE_BASE_URL || '';
const CLEAN_BASE = RAW_BASE_URL.replace(/\/$/, '');
const BASE_URL = CLEAN_BASE ? `${CLEAN_BASE}/api` : '/api';

export const productService = {
  /**
   * Obtiene la lista de productos (opcionalmente filtrada por categoría)
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
        throw new Error(`Error al obtener productos: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en productService.getProducts:', error);
      throw error;
    }
  },

  /**
   * Obtiene un producto por su ID
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
        throw new Error(`Error al obtener producto ${id}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error en productService.getProductById (${id}):`, error);
      throw error;
    }
  },

  /**
   * Crea una orden y descuenta el stock en la API mediante POST
   * @param {Object} orderData - { buyer, items }
   * @returns {Promise<Object>} Datos de la orden creada
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
        throw new Error(data.error || 'No se pudo completar la orden');
      }

      return data;
    } catch (error) {
      console.error('Error en productService.createOrder:', error);
      throw error;
    }
  }
};
