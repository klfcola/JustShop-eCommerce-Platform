// const port = process.env.PORT || 5001;

export const BASE_URL =
  // `http://localhost:${port}`
  process.env.REACT_APP_API_URL;
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
export const UPLOADS_URL = "api/upload";
