// Componente de presentación: Botón reutilizable para agregar productos al carrito
import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MESSAGES } from '../../constants/messages';

export const AddItemButton = ({ onClick, disabled, label = MESSAGES.DETAIL.ADD_TO_CART }) => {
  return (
    <Button 
      variant="primary" 
      onClick={onClick} 
      disabled={disabled}
      className="d-flex align-items-center justify-content-center gap-2 py-2 px-4 fw-bold shadow-sm"
    >
      <FontAwesomeIcon icon={faPlus} />
      {label}
    </Button>
  );
};
