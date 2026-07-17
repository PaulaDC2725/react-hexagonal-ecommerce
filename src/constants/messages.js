// Responsibility: Centralize all UI text messages, errors, warnings, and notifications to avoid Magic Strings.
export const MESSAGES = {
  CATALOG: {
    WELCOME_GREETING: 'Welcome to our premium Tech Store! Find the best gear for your setup.',
    NO_PRODUCTS_FOUND: 'No products found in this category.',
    LOADING: 'Fetching latest products...',
    ERROR: 'Unable to load products. Please try again later.',
  },
  DETAIL: {
    LOADING: 'Fetching product details...',
    ERROR: 'Product not found or failed to load.',
    OUT_OF_STOCK: 'Out of stock',
    LOW_STOCK: 'Only a few items left!',
    ADD_TO_CART: 'Add to Cart',
    BACK_TO_CATALOG: 'Back to Catalog',
    ADDED_SUCCESS: 'Product successfully added to cart!',
  },
  CART: {
    EMPTY_TITLE: 'Your Shopping Cart is Empty',
    EMPTY_SUBTITLE: 'Browse our catalog and add items to get started.',
    CLEAR_CART: 'Clear Cart',
    TOTAL: 'Total',
    SUBTOTAL: 'Subtotal',
    ITEMS_COUNT: 'Items in cart',
    REMOVE_ITEM: 'Remove',
    CHECKOUT: 'Proceed to Checkout',
  },
  CHECKOUT: {
    TITLE: 'Checkout Process',
    ORDER_SUMMARY: 'Order Summary',
    FORM_TITLE: 'Billing & Shipping Information',
    PLACE_ORDER: 'Place Order',
    PROCESSING: 'Processing your order...',
    SUCCESS_TITLE: 'Thank you for your purchase!',
    SUCCESS_ORDER_ID: 'Your order ID is:',
    VALIDATION_ERROR: 'Please fill in all fields correctly.',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PHONE: 'Please enter a valid phone number.',
  }
};
