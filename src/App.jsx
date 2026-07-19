// Componente principal: Orquestación de rutas y proveedores de estado
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { NavBar } from './components/common/NavBar';
import { ItemListContainer } from './components/catalog/ItemListContainer';
import { ItemDetailContainer } from './components/detail/ItemDetailContainer';
import { CartView } from './components/cart/CartView';
import { Checkout } from './components/checkout/Checkout';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        
        <main className="main-content py-4 bg-light">
          <Routes>
            <Route path={ROUTES.HOME} element={<ItemListContainer />} />
            <Route path={ROUTES.CATEGORY} element={<ItemListContainer />} />
            <Route path={ROUTES.DETAIL} element={<ItemDetailContainer />} />
            <Route path={ROUTES.CART} element={<CartView />} />
            <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
          </Routes>
        </main>
        
        <footer className="bg-dark text-light py-4 border-top border-secondary mt-auto">
          <div className="container text-center">
            <p className="mb-1 fw-semibold">&copy; 2026 HEXASTORE. Todos los derechos reservados.</p>
            <p className="text-muted small mb-0">Arquitectura Hexagonal en React</p>
          </div>
        </footer>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
