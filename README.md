# 🛒 React Hexagonal E-Commerce

Aplicación web de comercio electrónico desarrollada con **React**, **Vite** y **React-Bootstrap**, implementando los principios de la **Arquitectura Hexagonal (Ports & Adapters)**.

Incluye una **API independiente en Node.js** para la gestión de productos y procesamiento de órdenes de compra con actualización de stock en tiempo real.

---

## 🏛️ Estructura de Arquitectura Hexagonal

El proyecto está diseñado manteniendo una clara separación de responsabilidades:

- **Dominio / Estado (`src/context/CartContext.jsx`)**: Contiene la lógica de negocio central del carrito de compras, cálculo de totales y reglas de validación de stock.
- **Puertos / Hooks (`src/hooks/useProducts.js`)**: Abstracción que aísla la capa de presentación de la infraestructura de datos.
- **Adaptadores de Infraestructura (`src/adapters/productService.js`)**: Adaptador REST API responsable de realizar peticiones HTTP a los endpoints.
- **Servidor y Endpoints Independientes (`src/server/apiRouter.js`, `server.js`, `src/data/products.json`)**: Capa de API que gestiona los productos y procesa las compras actualizando el stock persistido en archivo JSON.
- **Capa de Presentación (`src/components/`)**: Componentes de UI divididos funcionalmente (`catalog`, `detail`, `cart`, `checkout`, `common`).

---

## 🚀 Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** (versión 18 o superior)
- **pnpm** o **npm**

---

## 🛠️ Instrucciones de Instalación y Ejecución

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/PaulaDC2725/react-hexagonal-ecommerce.git
cd react-hexagonal-ecommerce
pnpm install
# O usando npm:
# npm install
```

### 2. Ejecutar la Aplicación

#### Opción A (Recomendada - Servidor de Desarrollo + API Integrada)
Ejecuta el siguiente comando para iniciar el cliente React con los endpoints `/api` integrados automáticamente:

```bash
pnpm dev
# O usando npm:
# npm run dev
```
Accede en tu navegador a: `http://localhost:5173`

#### Opción B (Servidor API Independiente en Puerto 5000)
Si deseas ejecutar la API de productos de forma totalmente independiente:

```bash
pnpm server
# O usando npm:
# npm run server
```
La API estará disponible en `http://localhost:5000`:
- `GET http://localhost:5000/api/products` (Obtener productos / filtrar por `?category=...`)
- `GET http://localhost:5000/api/products/:id` (Obtener producto por ID)
- `POST http://localhost:5000/api/orders` (Crear orden y actualizar stock)

---

## 📋 Guía de Prueba y Evaluación Paso a Paso

Sigue esta secuencia para evaluar todas las funcionalidades del proyecto:

1. **Navegación por Catálogo**:
   - En la página principal (`/`), observa la lista de productos cargados desde el endpoint `/api/products`.
   - Utiliza la barra de navegación para filtrar por categoría (*Teclados*, *Ratones*, *Audio*, *Accesorios*).

2. **Detalle de Producto y Validación de Stock**:
   - Haz clic en cualquier producto para ver su vista detallada (`/item/:id`).
   - Verifica el stock disponible mostrado.
   - Incrementa la cantidad a llevar. El contador no te permitirá superar el stock disponible.
   - Haz clic en **"Agregar al Carrito"**.

3. **Gestión del Carrito de Compras**:
   - Ve al carrito mediante el ícono de la barra superior o desde el botón en el detalle.
   - Revisa el resumen de ítems, cantidades y el cálculo del total a pagar.

4. **Proceso de Checkout y Actualización de Stock en Tiempo Real**:
   - Haz clic en **"Proceder al Checkout"** (`/checkout`).
   - Completa el formulario de datos del comprador (Nombre, Teléfono, Email).
   - Haz clic en **"Confirmar Compra"**.
   - El sistema enviará un `POST /api/orders` a la API, la cual:
     - Valida el stock actual.
     - **Descuenta el stock** de los productos comprados directamente en la base de datos `src/data/products.json`.
     - Genera y devuelve un código de orden único (ej. `ORD-584920`).
   - Al finalizar, regresa al catálogo y verifica que el stock del producto comprado se ha reducido según la cantidad seleccionada.

---

## 🛠️ Comandos Principales

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor de desarrollo Vite con la API integrada |
| `pnpm server` | Inicia únicamente el servidor de API independiente Node.js |
| `pnpm build` | Compila la aplicación para producción en la carpeta `dist/` |

---

## 📄 Licencia

Este proyecto fue desarrollado como parte de un proyecto educativo y demostrativo de Arquitectura Hexagonal en React.
