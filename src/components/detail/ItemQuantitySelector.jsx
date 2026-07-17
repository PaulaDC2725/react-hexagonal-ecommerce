// Presentation Layer: Incremental numeric control for product quantities.
// Implements business constraints (stock limits and minimum purchase of 1) at component boundaries.

import React from 'react';
import { InputGroup, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

export const ItemQuantitySelector = ({ quantity, stock, onIncrement, onDecrement }) => {
  return (
    <div className="w-100 mb-4" style={{ maxWidth: '180px' }}>
      <Form.Label className="text-muted small fw-semibold mb-2">Quantity</Form.Label>
      <InputGroup className="shadow-sm border rounded">
        <Button 
          variant="light" 
          onClick={onDecrement} 
          disabled={quantity <= 1}
          className="border-0 px-3 bg-white"
        >
          <FontAwesomeIcon icon={faMinus} className="text-primary" />
        </Button>
        
        <Form.Control 
          type="text"
          readOnly 
          value={quantity} 
          className="text-center bg-white border-0 fw-bold text-dark"
        />
        
        <Button 
          variant="light" 
          onClick={onIncrement} 
          disabled={quantity >= stock}
          className="border-0 px-3 bg-white"
        >
          <FontAwesomeIcon icon={faPlus} className="text-primary" />
        </Button>
      </InputGroup>
      <div className="text-muted small mt-2">
        Available: {stock} units
      </div>
    </div>
  );
};
