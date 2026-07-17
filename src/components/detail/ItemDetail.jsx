// Presentation Layer: Renders details of a single product.
// Integrates domain state (CartContext) and sub-components (ItemQuantitySelector, AddItemButton) to orchestrate product purchasing.

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Badge, Card, Button, Alert } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import { ItemQuantitySelector } from './ItemQuantitySelector';
import { AddItemButton } from '../common/AddItemButton';
import { MESSAGES } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';

export const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useContext(CartContext);

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const success = addItem(product, quantity);
    if (success) {
      setAdded(true);
    }
  };

  return (
    <Card className="border-0 shadow p-4 rounded bg-white">
      <Row className="g-5 align-items-center">
        {/* Product Image Column */}
        <Col md={6}>
          <div className="rounded overflow-hidden border" style={{ maxHeight: '480px' }}>
            <img 
              src={product.pictureUrl} 
              alt={product.title} 
              className="w-100" 
              style={{ objectFit: 'cover', minHeight: '350px', maxHeight: '480px' }}
            />
          </div>
        </Col>

        {/* Product Information Column */}
        <Col md={6}>
          <div className="d-flex flex-column justify-content-center">
            <div className="mb-3">
              <Badge bg="primary" className="text-uppercase mb-2 px-3 py-2">
                {product.category}
              </Badge>
              <h2 className="fw-bold text-dark display-6 mb-2">{product.title}</h2>
              <span className="fs-3 fw-bold text-primary">${product.price.toFixed(2)}</span>
            </div>

            <p className="text-muted mb-4 lead" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              {product.description}
            </p>

            <hr className="my-4 text-light-50" />

            {product.stock > 0 ? (
              <>
                {!added ? (
                  <>
                    <ItemQuantitySelector
                      quantity={quantity}
                      stock={product.stock}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                    />
                    <div className="mt-3">
                      <AddItemButton onClick={handleAddToCart} disabled={product.stock === 0} />
                    </div>
                  </>
                ) : (
                  <div className="mt-2">
                    <Alert variant="success" className="d-flex flex-column align-items-center text-center p-4 rounded border-0 shadow-sm">
                      <h5 className="alert-heading fw-bold mb-2">{MESSAGES.DETAIL.ADDED_SUCCESS}</h5>
                      <p className="small mb-3">You selected {quantity} units of this item.</p>
                      <div className="d-flex gap-2 w-100 justify-content-center">
                        <Button as={Link} to={ROUTES.CART} variant="success" className="px-4 py-2 fw-bold shadow-sm">
                          Go to Cart
                        </Button>
                        <Button as={Link} to={ROUTES.HOME} variant="outline-success" className="px-4 py-2 fw-semibold">
                          Continue Shopping
                        </Button>
                      </div>
                    </Alert>
                  </div>
                )}
              </>
            ) : (
              <Alert variant="danger" className="text-center p-3 shadow-sm border-0">
                {MESSAGES.DETAIL.OUT_OF_STOCK}
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};
