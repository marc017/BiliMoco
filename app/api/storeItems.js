import client from './client';

const endPoint = '/storeItems';

const getStoreItemList = (storeId) => {
  return client.get(`${endPoint}/${storeId}`);
};

const addStoreItem = (storeItem, onUploadProgress) => {
  const data = new FormData();
  data.append('store_id', storeItem.storeId);
  data.append('item_name', storeItem.name);
  data.append('item_category_id', storeItem.categoryId);
  data.append('price', storeItem.price);
  data.append('stock_qty', storeItem.stockQty);
  data.append('commission', storeItem.commission);
  data.append('item_desc', storeItem.description);

  storeItem.images.forEach((image, index) => {
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

const updateStoreItem = (storeItem, onUploadProgress) => {
  const data = new FormData();
  data.append('store_id', storeItem.storeId);
  data.append('item_name', storeItem.name);
  data.append('item_category_id', storeItem.categoryId);
  data.append('price', storeItem.price);
  data.append('stock_qty', storeItem.stockQty);
  data.append('commission', storeItem.commission);
  data.append('item_desc', storeItem.description);
  data.append('id', storeItem.id);

  storeItem.images.forEach((image, index) => {
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
  getStoreItemList,
  addStoreItem,
  updateStoreItem,
};
