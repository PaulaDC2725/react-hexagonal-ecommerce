// Componente contenedor: Carga el detalle del producto mediante la URL y maneja los estados de carga
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import { useProduct } from '../../hooks/useProducts';
import { ItemDetail } from './ItemDetail';
import { MESSAGES } from '../../constants/messages';
import { STATUS } from '../../constants/status';
import { ROUTES } from '../../constants/routes';

export const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const { product, status, error } = useProduct(itemId);

  return (
    <Container className="my-5">
      <div className="mb-4">
        <Button as={Link} to={ROUTES.HOME} variant="link" className="text-decoration-none ps-0 text-muted">
          &larr; {MESSAGES.DETAIL.BACK_TO_CATALOG}
        </Button>
      </div>

      {status === STATUS.LOADING && (
        <div className="d-flex flex-column justify-content-center align-items-center my-5 py-5">
          <Spinner animation="border" variant="primary" role="status" className="mb-3" />
          <span className="text-muted fw-semibold">{MESSAGES.DETAIL.LOADING}</span>
        </div>
      )}

      {status === STATUS.ERROR && (
        <Alert variant="danger" className="text-center my-4 py-3 shadow-sm">
          <Alert.Heading>{MESSAGES.DETAIL.ERROR}</Alert.Heading>
          <p className="mb-0">{error?.message || 'Error de conexión inesperado.'}</p>
        </Alert>
      )}

      {status === STATUS.SUCCESS && !product && (
        <Alert variant="warning" className="text-center my-4 py-3 shadow-sm">
          <p className="mb-0 fw-semibold">{MESSAGES.DETAIL.ERROR}</p>
        </Alert>
      )}

      {status === STATUS.SUCCESS && product && (
        <ItemDetail product={product} />
      )}
    </Container>
  );
};
