// Domain / State Layer: Manages core shopping cart business rules, calculations, and stock validations.
// Ensures that components only interact with cart state through validated domain interfaces.

import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  /**
   * Adds an item to the cart, verifying available stock limit.
   * @param {Object} product - Product to add.
   * @param {number} quantity - Quantity of the product.
   * @returns {boolean} - True if added successfully, false if stock exceeded or capped.
   */
  const addItem = (product, quantity) => {
    if (quantity <= 0) return false;

    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].quantity;
      const newQty = currentQty + quantity;

      if (newQty > product.stock) {
        // Business Rule: Cannot add more than the available stock.
        console.warn(`Stock limit reached for ${product.title}. Available: ${product.stock}, Requested: ${newQty}`);
        // Cap the quantity at maximum stock
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
        // Business Rule: Cannot exceed initial stock
        console.warn(`Stock limit reached for ${product.title}. Available: ${product.stock}, Requested: ${quantity}`);
        setCart([...cart, { ...product, quantity: product.stock }]);
        return false;
      }
      setCart([...cart, { ...product, quantity }]);
      return true;
    }
  };

  /**
   * Removes a product from the cart by its ID.
   * @param {string} itemId
   */
  const removeItem = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  /**
   * Clears all items from the cart.
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Checks if a product is in the cart.
   * @param {string} itemId
   * @returns {boolean}
   */
  const isInCart = (itemId) => {
    return cart.some((item) => item.id === itemId);
  };

  /**
   * Calculates total quantity of items.
   * @returns {number}
   */
  const getTotalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  /**
   * Calculates total monetary cost of all items in cart.
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
