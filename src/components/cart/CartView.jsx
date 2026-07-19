// Componente de presentación: Vista principal del carrito de compras
import React, { useContext } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { Brief } from '../checkout/Brief';
import { MESSAGES } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';

export const CartView = () => {
  const { cart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <Container className="my-5 text-center py-5">
        <Card className="p-5 border-0 shadow-sm rounded mx-auto" style={{ maxWidth: '600px' }}>
          <h2 className="fw-bold mb-3">{MESSAGES.CART.EMPTY_TITLE}</h2>
          <p className="text-muted mb-4">{MESSAGES.CART.EMPTY_SUBTITLE}</p>
          <Button as={Link} to={ROUTES.HOME} variant="primary" className="mx-auto px-4 py-2">
            Continuar Comprando
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <h1 className="fw-bold mb-4 text-dark">{MESSAGES.CART.ITEMS_COUNT}</h1>
      <Card className="border-0 shadow p-4 rounded bg-white">
        <Brief readOnly={false} />
        <div className="d-grid mt-4">
          <Button as={Link} to={ROUTES.CHECKOUT} variant="primary" size="lg" className="fw-bold py-3 shadow-sm">
            {MESSAGES.CART.CHECKOUT}
          </Button>
        </div>
      </Card>
    </Container>
  );
};
