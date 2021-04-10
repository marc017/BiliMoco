import client from './client';

const endPoint = '/deliveryRates';

const getDeliveryRates = async () => {
  return client.get(endPoint);
};

export default {
  getDeliveryRates,
};
