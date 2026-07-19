// Componente de presentación: Renderiza la cuadrícula de productos
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Item } from './Item';

export const ItemList = ({ products }) => {
  return (
    <Row className="g-4">
      {products.map((product) => (
        <Col key={product.id} xs={12} sm={6} md={4} className="d-flex align-items-stretch">
          <Item product={product} />
        </Col>
      ))}
    </Row>
  );
};
