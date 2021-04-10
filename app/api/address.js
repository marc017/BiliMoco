import client from './client';

const endPoint = '/address';

const addAddress = async (address, onUploadProgress) => {
  const data = {
    label: address.label,
    userId: address.user.userId,
    address: address.address,
    province: address.province,
    city: address.city,
    brgy: address.brgy,
    latitude: `${address.tempLoc.latitude}`,
    longitude: `${address.tempLoc.longitude}`,
  };
  return client.put(endPoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const updateAddress = async (address, onUploadProgress) => {
  const data = {
    id: address.id,
    label: address.label,
    userId: address.user.userId,
    address: address.address,
    province: address.province,
    city: address.city,
    brgy: address.brgy,
    latitude: `${address.tempLoc.latitude}`,
    longitude: `${address.tempLoc.longitude}`,
  };

  return client.post(endPoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const deleteAddress = async (addressId, onUploadProgress) => {
  return client.delete(`${endPoint}/${addressId}`, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getAddressList = async () => {
  return client.get(endPoint);
};

const getUserAddress = async () => {
  return client.get(`${endPoint}/user`);
};

const getStoreAddress = (storeId) => {
  return client.get(`${endPoint}/store/${storeId}`);
};

const setDefaultAddress = (addressId) =>
  client.put(`${endPoint}/default`, { addressId: addressId });

export default {
  addAddress,
  getAddressList,
  updateAddress,
  deleteAddress,
  getUserAddress,
  getStoreAddress,
  setDefaultAddress,
};
