// Presentation Layer: Checkout process coordinator.
// Manages customer billing forms, validation rules, mock order serialization, and rendering success/processing screens.

import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { Brief } from './Brief';
import { MESSAGES } from '../../constants/messages';
import { ROUTES } from '../../constants/routes';
import { STATUS } from '../../constants/status';

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

    // Simple manual validation checks
    if (!formData.name || !formData.phone || !formData.email || !formData.emailConfirm) {
      setErrorMsg(MESSAGES.CHECKOUT.VALIDATION_ERROR);
      setValidated(true);
      return;
    }

    if (formData.email !== formData.emailConfirm) {
      setErrorMsg('Email addresses do not match.');
      setValidated(true);
      return;
    }

    // Pass: Simulate async order submission
    setCheckoutStatus(STATUS.LOADING);
    
    // Simulate database insertion and order confirmation
    setTimeout(() => {
      const generatedId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setCheckoutStatus(STATUS.SUCCESS);
      clearCart(); // Domain Rule: Clear cart once order is confirmed
    }, 1500);
  };

  // Success view after completing purchase
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
              Return to Home
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  // Loading/Processing View
  if (checkoutStatus === STATUS.LOADING) {
    return (
      <Container className="my-5 py-5 text-center">
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} className="mb-4" />
          <h4 className="fw-semibold text-dark">{MESSAGES.CHECKOUT.PROCESSING}</h4>
          <p className="text-muted">Securing stock and preparing order summary...</p>
        </div>
      </Container>
    );
  }

  // Cart is Empty view
  if (cart.length === 0) {
    return (
      <Container className="my-5 text-center py-5">
        <Card className="p-5 border-0 shadow-sm rounded mx-auto" style={{ maxWidth: '600px' }}>
          <h2 className="fw-bold mb-3">{MESSAGES.CART.EMPTY_TITLE}</h2>
          <p className="text-muted mb-4">{MESSAGES.CART.EMPTY_SUBTITLE}</p>
          <Button as={Link} to={ROUTES.HOME} variant="primary" className="mx-auto px-4 py-2">
            Continue Shopping
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="fw-bold mb-4 text-dark">{MESSAGES.CHECKOUT.TITLE}</h1>
      <Row className="g-5">
        {/* Customer Information Form */}
        <Col lg={7}>
          <Card className="border-0 shadow p-4 rounded bg-white">
            <Card.Title className="fw-bold mb-4 text-dark">{MESSAGES.CHECKOUT.FORM_TITLE}</Card.Title>
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            
            <Form onSubmit={handleFormSubmit} noValidate>
              <Form.Group className="mb-3" controlId="formFullName">
                <Form.Label className="fw-semibold small text-muted">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
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
                <Form.Label className="fw-semibold small text-muted">Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="e.g. +1 555-0199"
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
                <Form.Label className="fw-semibold small text-muted">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
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
                <Form.Label className="fw-semibold small text-muted">Confirm Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Re-enter name@example.com"
                  name="emailConfirm"
                  value={formData.emailConfirm}
                  onChange={handleInputChange}
                  isInvalid={validated && (formData.email !== formData.emailConfirm)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Email addresses must match.
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" variant="primary" size="lg" className="w-100 py-3 fw-bold">
                {MESSAGES.CHECKOUT.PLACE_ORDER}
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Order Brief Summary */}
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
