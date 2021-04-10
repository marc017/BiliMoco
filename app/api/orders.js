import client from './client';

const endPoint = '/orders';

const createOrder = async (
  orders,
  total_price,
  cartId,
  storeId,
  delivery_fee,
  onUploadProgress
) => {
  const data = {
    cart_id: cartId,
    total_price: total_price,
    store_id: storeId,
    delivery_fee: delivery_fee,
    items: orders,
  };
  return client.post(endPoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getOrderList = async () => {
  return client.get(endPoint);
};

const cancelOrder = async (orderInfo) => {
  return client.put(endPoint, orderInfo);
};

const ownerCancelOrder = async (orderInfo) => {
  return client.put(`${endPoint}/owner/cancel`, orderInfo);
};

const orderActionUpdate = async (orderInfo) => {
  return client.post(`${endPoint}/owner/actions`, orderInfo);
};


const getStoreOrderList = async () => {
  return client.get(`${endPoint}/store`);
};

export default {
  createOrder,
  cancelOrder,
  getOrderList,
  getStoreOrderList,
  ownerCancelOrder,
  orderActionUpdate
};
