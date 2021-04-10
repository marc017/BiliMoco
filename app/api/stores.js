import client from './client';

const endPoint = '/stores';

const getStoreList = (keyword) => {
  return client.get(`${endPoint}/search/${keyword}`);
};

const getUserStoreList = () => {
  return client.get(`${endPoint}/user`);
};

const addStore = (store, onUploadProgress) => {
  const data = new FormData();
  data.append('storeName', store.storeName);
  data.append('storeDesc', store.storeDesc);
  data.append('storeUrl', store.storeUrl);
  data.append('addressId', store.address_id);

  store.images.forEach((image, index) => {
    data.append('images', {
      name: 'image' + index,
      type: 'image/jpeg',
      uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
    });
  });
  return client.post(endPoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const updateStore = (store, onUploadProgress) => {
  const data = new FormData();
  data.append('storeName', store.storeName);
  data.append('storeDesc', store.storeDesc);
  data.append('storeUrl', store.storeUrl);
  data.append('addressId', store.address_id);
  data.append('categoryId', store.category_id);
  data.append('mobileNo', store.mobileNo);
  data.append('email', store.email);
  
  data.append('id', store.id);

  store.images.forEach((image, index) => {
    data.append('images', {
      name: 'image' + index,
      type: 'image/jpeg',
      uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
    });
  });
  return client.put(endPoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getStoreList,
  addStore,
  getUserStoreList,
  updateStore,
};
