// import axios from 'axios';

// const BASE_URL = '/users';

// export const getUsers = () => {
//   return axios.get(BASE_URL);
// };

// export const getUser = (id) => {
//   return axios.get(`${BASE_URL}/${id}`);
// };

// export const createUser = (userData) => {
//   return axios.post(BASE_URL, userData);
// };

// export const updateUser = (id, userData) => {
//   return axios.put(`${BASE_URL}/${id}`, userData);
// };

// export const deleteUser = (id) => {
//   return axios.delete(`${BASE_URL}/${id}`);
// };

// import axiosClient from "./axios";

// export const useUsers = () => {
//     const getAllUsers = async () => (await axiosClient.get('/users')).data
//     const createUser = async (data) => (await axiosClient.post('/users', data)).data
//     const removeUser = async (id) => (await axiosClient.put(`/users/${id}`)).data
// const deleteUser = async (id) => (await axiosClient.delete(`/users/${id}`)).data

//     return { getAllUsers, createUser, removeUser,deleteUser }
// }