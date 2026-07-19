// Centralización de todos los mensajes de texto de la interfaz de usuario
export const MESSAGES = {
  CATALOG: {
    WELCOME_GREETING: '¡Bienvenido a nuestra tienda Tech! Encuentra los mejores accesorios para tu setup.',
    NO_PRODUCTS_FOUND: 'No se encontraron productos en esta categoría.',
    LOADING: 'Cargando catálogo de productos...',
    ERROR: 'No se pudieron cargar los productos. Por favor intenta de nuevo más tarde.',
  },
  DETAIL: {
    LOADING: 'Cargando detalles del producto...',
    ERROR: 'Producto no encontrado o fallo al cargar.',
    OUT_OF_STOCK: 'Agotado',
    LOW_STOCK: '¡Quedan pocas unidades!',
    ADD_TO_CART: 'Agregar al Carrito',
    BACK_TO_CATALOG: 'Volver al Catálogo',
    ADDED_SUCCESS: '¡Producto agregado al carrito con éxito!',
  },
  CART: {
    EMPTY_TITLE: 'Tu carrito de compras está vacío',
    EMPTY_SUBTITLE: 'Explora nuestro catálogo para agregar productos.',
    CLEAR_CART: 'Vaciar Carrito',
    TOTAL: 'Total',
    SUBTOTAL: 'Subtotal',
    ITEMS_COUNT: 'Productos en el carrito',
    REMOVE_ITEM: 'Eliminar',
    CHECKOUT: 'Proceder al Checkout',
  },
  CHECKOUT: {
    TITLE: 'Proceso de Checkout',
    ORDER_SUMMARY: 'Resumen del Pedido',
    FORM_TITLE: 'Datos de Facturación y Envío',
    PLACE_ORDER: 'Confirmar Compra',
    PROCESSING: 'Procesando tu orden...',
    SUCCESS_TITLE: '¡Gracias por tu compra!',
    SUCCESS_ORDER_ID: 'Tu código de orden es:',
    VALIDATION_ERROR: 'Por favor completa todos los campos correctamente.',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'Este campo es obligatorio.',
    INVALID_EMAIL: 'Ingresa un correo electrónico válido.',
    INVALID_PHONE: 'Ingresa un número de teléfono válido.',
  }
};
