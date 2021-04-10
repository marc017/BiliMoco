import client from './client';

const register = (userInfo) => client.post('/users', userInfo);

const getUserById = async (userId) => {
  return client.get(`/user/${userId}`);
};

export default { register, getUserById };
