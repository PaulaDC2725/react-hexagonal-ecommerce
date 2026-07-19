// Componente de presentación: Coordinador del proceso de checkout y confirmación de compra
import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { Brief } from './Brief';
import { MESSAGES } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';
import { STATUS } from '../../constants/status';
import { productService } from '../../adapters/productService';

export const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    emailConfirm: ''
  });
  const [validated, setValidated] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(STATUS.IDLE);
  const [orderId, setOrderId] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validación manual de campos requeridos
    if (!formData.name || !formData.phone || !formData.email || !formData.emailConfirm) {
      setErrorMsg(MESSAGES.CHECKOUT.VALIDATION_ERROR);
      setValidated(true);
      return;
    }

    if (formData.email !== formData.emailConfirm) {
      setErrorMsg('Los correos electrónicos no coinciden.');
      setValidated(true);
      return;
    }

    // Enviar orden a la API
    setCheckoutStatus(STATUS.LOADING);
    
    const orderPayload = {
      buyer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      },
      items: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        title: item.title
      }))
    };

    productService.createOrder(orderPayload)
      .then((res) => {
        setOrderId(res.orderId);
        setCheckoutStatus(STATUS.SUCCESS);
        clearCart();
      })
      .catch((err) => {
        setErrorMsg(err.message || 'Error al procesar la compra');
        setCheckoutStatus(STATUS.ERROR);
      });
  };

  // Vista tras completar la compra con éxito
  if (checkoutStatus === STATUS.SUCCESS) {
    return (
      <Container className="my-5 py-5 text-center" style={{ maxWidth: '600px' }}>
        <Card className="border-0 shadow p-5 rounded bg-white">
          <div className="mb-4">
            <span className="display-1 text-success" style={{ fontSize: '5rem' }}>✓</span>
          </div>
          <Card.Title className="display-6 fw-bold text-success mb-3">
            {MESSAGES.CHECKOUT.SUCCESS_TITLE}
          </Card.Title>
          <Card.Text className="text-muted lead mb-4">
            {MESSAGES.CHECKOUT.SUCCESS_ORDER_ID} <strong className="text-dark">{orderId}</strong>
          </Card.Text>
          <div className="d-grid">
            <Button as={Link} to={ROUTES.HOME} variant="primary" size="lg" className="fw-semibold">
              Volver al Inicio
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  // Vista de carga / procesamiento
  if (checkoutStatus === STATUS.LOADING) {
    return (
      <Container className="my-5 py-5 text-center">
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} className="mb-4" />
          <h4 className="fw-semibold text-dark">{MESSAGES.CHECKOUT.PROCESSING}</h4>
          <p className="text-muted">Reservando stock y generando orden...</p>
        </div>
      </Container>
    );
  }

  // Vista si el carrito está vacío
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
    <Container className="my-5">
      <h1 className="fw-bold mb-4 text-dark">{MESSAGES.CHECKOUT.TITLE}</h1>
      <Row className="g-5">
        <Col lg={7}>
          <Card className="border-0 shadow p-4 rounded bg-white">
            <Card.Title className="fw-bold mb-4 text-dark">{MESSAGES.CHECKOUT.FORM_TITLE}</Card.Title>
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            
            <Form onSubmit={handleFormSubmit} noValidate>
              <Form.Group className="mb-3" controlId="formFullName">
                <Form.Label className="fw-semibold small text-muted">Nombre Completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre completo"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  isInvalid={validated && !formData.name}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {MESSAGES.VALIDATION.REQUIRED_FIELD}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label className="fw-semibold small text-muted">Número de Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Ej. +57 300 123 4567"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  isInvalid={validated && !formData.phone}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {MESSAGES.VALIDATION.REQUIRED_FIELD}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label className="fw-semibold small text-muted">Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isInvalid={validated && (!formData.email || !formData.email.includes('@'))}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {MESSAGES.VALIDATION.INVALID_EMAIL}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formEmailConfirm">
                <Form.Label className="fw-semibold small text-muted">Confirmar Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Reingresa tu correo electrónico"
                  name="emailConfirm"
                  value={formData.emailConfirm}
                  onChange={handleInputChange}
                  isInvalid={validated && (formData.email !== formData.emailConfirm)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Los correos electrónicos deben coincidir.
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" variant="primary" size="lg" className="w-100 py-3 fw-bold">
                {MESSAGES.CHECKOUT.PLACE_ORDER}
              </Button>
            </Form>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="border-0 shadow p-4 rounded bg-light">
            <Card.Title className="fw-bold mb-4 text-dark">{MESSAGES.CHECKOUT.ORDER_SUMMARY}</Card.Title>
            <Brief readOnly={false} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
