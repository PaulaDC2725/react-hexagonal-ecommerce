// Componente de presentación: Tarjeta vista previa de producto individual
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const Item = ({ product }) => {
  const detailPath = ROUTES.DETAIL.replace(':itemId', product.id);

  return (
    <Card className="w-100 shadow-sm border-0 h-100" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}>
      <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
        <Card.Img 
          variant="top" 
          src={product.pictureUrl} 
          alt={product.title} 
          className="w-100 h-100" 
          style={{ objectFit: 'cover' }}
        />
        <Badge 
          bg="secondary" 
          className="position-absolute top-0 end-0 m-3 text-uppercase"
          style={{ fontSize: '0.75rem' }}
        >
          {product.category}
        </Badge>
      </div>
      
      <Card.Body className="d-flex flex-column justify-content-between p-4">
        <div>
          <Card.Title className="fw-bold text-dark fs-5 mb-2">{product.title}</Card.Title>
          <Card.Text className="text-muted small mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.description}
          </Card.Text>
        </div>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fs-4 fw-bold text-primary">${product.price.toLocaleString('es-CO')}</span>
            <span className="text-muted small">Stock: {product.stock}</span>
          </div>
          <Button 
            as={Link} 
            to={detailPath} 
            variant="outline-primary" 
            className="w-100 py-2 fw-semibold"
          >
            Ver detalle
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
