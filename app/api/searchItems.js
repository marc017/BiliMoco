import client from './client';

const endPoint = '/search/storeItems';

const searchStoreItem = (keyword, onUploadProgress) => {
  const data = {
    keyword: keyword
  };
  return client.post(endPoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
}

export default {
  searchStoreItem
};
