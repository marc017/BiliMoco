import client from './client';

const endPoint = '/shoppingCart';
const cartItemEndPoint = '/shoppingCartItems';

const getCartList = async () => {
  return client.get(endPoint);
};

const addToCart = async (storeItem) => {
  return client.put(cartItemEndPoint, storeItem);
};

const removeFromCart = async (cartId, cartItemId) => {
  return client.delete(`${cartItemEndPoint}/${cartId}/${cartItemId}`);
};

const updateCartItem = async (cartId, cartItem) => {
  return client.post(cartItemEndPoint, cartItem);
};

const updateCart = async (cart) => {
  return client.post(endPoint, cart);
};

export default {
  getCartList,
  addToCart,
  removeFromCart,
  updateCartItem,
  updateCart,
};
