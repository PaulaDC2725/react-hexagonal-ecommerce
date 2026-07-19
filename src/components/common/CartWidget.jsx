// Componente de presentación: Widget del carrito con indicador de cantidad
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import { ROUTES } from '../../constants/routes';

export const CartWidget = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <Link to={ROUTES.CART} className="d-flex align-items-center text-decoration-none text-light position-relative mx-3">
      <FontAwesomeIcon icon={faCartShopping} size="lg" className="text-secondary" style={{ transition: 'color 0.2s' }} />
      {totalItems > 0 && (
        <Badge 
          pill 
          bg="danger" 
          className="position-absolute translate-middle start-100 top-0"
          style={{ fontSize: '0.65rem', padding: '0.25em 0.5em' }}
        >
          {totalItems}
        </Badge>
      )}
    </Link>
  );
};
