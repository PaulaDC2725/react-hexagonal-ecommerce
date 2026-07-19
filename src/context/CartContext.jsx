// Capa de Dominio / Estado: Gestiona las reglas de negocio del carrito de compras
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  /**
   * Agrega un producto al carrito verificando el límite de stock disponible
   * @param {Object} product
   * @param {number} quantity
   * @returns {boolean}
   */
  const addItem = (product, quantity) => {
    if (quantity <= 0) return false;

    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].quantity;
      const newQty = currentQty + quantity;

      if (newQty > product.stock) {
        // Regla de Negocio: No se puede superar el stock disponible
        console.warn(`Límite de stock alcanzado para ${product.title}. Disponible: ${product.stock}, Solicitado: ${newQty}`);
        const updatedCart = [...cart];
        updatedCart[existingIndex].quantity = product.stock;
        setCart(updatedCart);
        return false;
      }

      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity = newQty;
      setCart(updatedCart);
      return true;
    } else {
      if (quantity > product.stock) {
        // Regla de Negocio: No se puede superar el stock inicial
        console.warn(`Límite de stock alcanzado para ${product.title}. Disponible: ${product.stock}, Solicitado: ${quantity}`);
        setCart([...cart, { ...product, quantity: product.stock }]);
        return false;
      }
      setCart([...cart, { ...product, quantity }]);
      return true;
    }
  };

  /**
   * Elimina un producto del carrito por su ID
   * @param {string} itemId
   */
  const removeItem = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  /**
   * Limpia todos los artículos del carrito
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Verifica si un producto está en el carrito
   * @param {string} itemId
   * @returns {boolean}
   */
  const isInCart = (itemId) => {
    return cart.some((item) => item.id === itemId);
  };

  /**
   * Calcula la cantidad total de artículos en el carrito
   * @returns {number}
   */
  const getTotalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  /**
   * Calcula el precio total del carrito
   * @returns {number}
   */
  const getTotalPrice = () => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return Math.round(total * 100) / 100;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        totalItems: getTotalItems(),
        totalPrice: getTotalPrice(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
