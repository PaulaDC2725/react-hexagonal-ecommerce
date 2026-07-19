// Componente contenedor: Maneja parámetros de ruta y estados del catálogo de productos
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useProducts } from '../../hooks/useProducts';
import { ItemList } from './ItemList';
import { MESSAGES } from '../../constants/messages';
import { STATUS } from '../../constants/status';

export const ItemListContainer = () => {
  const { categoryId } = useParams();
  const { products, status, error } = useProducts(categoryId);

  return (
    <Container className="my-5">
      <div className="text-center mb-5 p-4 bg-light rounded shadow-sm border-start border-primary border-4">
        <h1 className="display-5 fw-bold text-dark text-capitalize">
          {categoryId ? `Catálogo de ${categoryId}` : 'Explora Nuestra Tienda'}
        </h1>
        <p className="lead text-muted mb-0">
          {MESSAGES.CATALOG.WELCOME_GREETING}
        </p>
      </div>

      {status === STATUS.LOADING && (
        <div className="d-flex flex-column justify-content-center align-items-center my-5 py-5">
          <Spinner animation="border" variant="primary" role="status" className="mb-3" />
          <span className="text-muted fw-semibold">{MESSAGES.CATALOG.LOADING}</span>
        </div>
      )}

      {status === STATUS.ERROR && (
        <Alert variant="danger" className="text-center my-4 py-3 shadow-sm">
          <Alert.Heading>{MESSAGES.CATALOG.ERROR}</Alert.Heading>
          <p className="mb-0">{error?.message || 'Error de conexión inesperado.'}</p>
        </Alert>
      )}

      {status === STATUS.SUCCESS && products.length === 0 && (
        <Alert variant="info" className="text-center my-4 py-3 shadow-sm">
          <p className="mb-0 fw-semibold">{MESSAGES.CATALOG.NO_PRODUCTS_FOUND}</p>
        </Alert>
      )}

      {status === STATUS.SUCCESS && products.length > 0 && (
        <ItemList products={products} />
      )}
    </Container>
  );
};
