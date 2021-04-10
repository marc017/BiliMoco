import client from './client';

const endPoint = '/categories';

const getCategoryList = async () => {
  return client.get(endPoint);
};

export default {
  getCategoryList,
};
