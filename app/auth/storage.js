import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const key = 'authToken';
let storeId = 0;
const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.error('Error storing token', error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Error getting the stored token!', error);
  }
};

const removeToken = async () => {
  try {
    return await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Error getting the stored token!', error);
  }
};

const storeItem = async (itemKey, value) => {
  try {
    await SecureStore.setItemAsync(itemKey, value);
  } catch (error) {
    console.error('Error Storing Item');
  }
};
const getItem = async (itemKey) => {
  try {
    return await SecureStore.getItemAsync(itemKey);
  } catch (error) {
    console.error('Error getting the stored item!', error);
  }
};

export default {
  storeToken,
  removeToken,
  getUser,
  getToken,
  storeItem,
  getItem,
};
