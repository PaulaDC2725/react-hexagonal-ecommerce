// Puerto: Hooks personalizados que aíslan la UI de la capa de infraestructura
import { useState, useEffect } from 'react';
import { productService } from '../adapters/productService';
import { STATUS } from '../constants/status';

/**
 * Hook para obtener y gestionar la lista de productos
 * @param {string} [categoryId]
 * @returns {{products: Array, status: string, error: Error|null}}
 */
export const useProducts = (categoryId) => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setStatus(STATUS.LOADING);
    setError(null);

    productService.getProducts(categoryId)
      .then((data) => {
        if (isMounted) {
          setProducts(data);
          setStatus(STATUS.SUCCESS);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setStatus(STATUS.ERROR);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  return { products, status, error };
};

/**
 * Hook para obtener el detalle de un producto por ID
 * @param {string} itemId
 * @returns {{product: Object|null, status: string, error: Error|null}}
 */
export const useProduct = (itemId) => {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!itemId) return;

    let isMounted = true;
    setStatus(STATUS.LOADING);
    setError(null);

    productService.getProductById(itemId)
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setStatus(STATUS.SUCCESS);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setStatus(STATUS.ERROR);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [itemId]);

  return { product, status, error };
};
