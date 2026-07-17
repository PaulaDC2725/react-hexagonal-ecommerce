// Presentation Layer: Layout navigation bar.
// Displays the brand, links to category views, and embeds the CartWidget.

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { CartWidget } from './CartWidget';
import { ROUTES } from '../../constants/routes';

export const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={Link} to={ROUTES.HOME} className="fw-bold fs-4">
          <span className="text-primary">HEXA</span>STORE
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto ms-4">
            <Nav.Link as={NavLink} to={ROUTES.HOME} end className={({ isActive }) => isActive ? "text-primary fw-semibold mx-2" : "text-light-50 mx-2"}>
              All Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/category/keyboards" className={({ isActive }) => isActive ? "text-primary fw-semibold mx-2" : "text-light-50 mx-2"}>
              Keyboards
            </Nav.Link>
            <Nav.Link as={NavLink} to="/category/mice" className={({ isActive }) => isActive ? "text-primary fw-semibold mx-2" : "text-light-50 mx-2"}>
              Mice
            </Nav.Link>
            <Nav.Link as={NavLink} to="/category/audio" className={({ isActive }) => isActive ? "text-primary fw-semibold mx-2" : "text-light-50 mx-2"}>
              Audio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/category/accessories" className={({ isActive }) => isActive ? "text-primary fw-semibold mx-2" : "text-light-50 mx-2"}>
              Accessories
            </Nav.Link>
          </Nav>
          
          <Nav className="ms-auto align-items-center">
            <CartWidget />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
