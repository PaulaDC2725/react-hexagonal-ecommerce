// Presentation Layer: Order summary panel (Brief).
// Lists products, selected quantities, individual pricing, and calculates subtotals.
// Can be toggled as read-only for final checkout stages.

import React, { useContext } from 'react';
import { Table, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import { MESSAGES } from '../../constants/messages';

export const Brief = ({ readOnly = false }) => {
  const { cart, totalPrice, removeItem, clearCart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted mb-0">{MESSAGES.CART.EMPTY_SUBTITLE}</p>
      </div>
    );
  }

  return (
    <div className="order-brief">
      <Table hover responsive className="align-middle">
        <thead>
          <tr className="text-muted border-bottom small">
            <th style={{ width: '45%' }}>Product</th>
            <th className="text-center">Quantity</th>
            <th className="text-end">Price</th>
            <th className="text-end">Subtotal</th>
            {!readOnly && <th className="text-center" style={{ width: '50px' }}></th>}
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="border-bottom">
              <td>
                <div className="d-flex align-items-center gap-3">
                  <Image 
                    src={item.pictureUrl} 
                    alt={item.title} 
                    rounded 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                  />
                  <div>
                    <h6 className="mb-0 fw-semibold text-dark">{item.title}</h6>
                    <span className="text-muted small text-uppercase" style={{ fontSize: '0.75rem' }}>{item.category}</span>
                  </div>
                </div>
              </td>
              <td className="text-center fw-semibold">{item.quantity}</td>
              <td className="text-end text-muted">${item.price.toFixed(2)}</td>
              <td className="text-end fw-bold text-dark">${(item.price * item.quantity).toFixed(2)}</td>
              {!readOnly && (
                <td className="text-center">
                  <Button 
                    variant="link" 
                    onClick={() => removeItem(item.id)} 
                    className="text-danger p-0"
                    title={MESSAGES.CART.REMOVE_ITEM}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      
      <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
        {!readOnly && (
          <Button variant="outline-danger" size="sm" onClick={clearCart} className="fw-semibold">
            {MESSAGES.CART.CLEAR_CART}
          </Button>
        )}
        <div className="ms-auto text-end">
          <span className="text-muted small d-block mb-1">{MESSAGES.CART.TOTAL}</span>
          <h4 className="fw-bold text-primary mb-0">${totalPrice.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
};
