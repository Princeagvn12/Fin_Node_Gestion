// import axios from 'axios'

// const API = 'http://localhost:5000/api/departments'

// export const useDepartment = () => {
//   const getAll = async () => (await axios.get(API)).data
//   const create = async (data) => (await axios.post(API, data)).data
//   const remove = async (id) => (await axios.delete(`${API}/${id}`)).data

//   return { getAll, create, remove }
// }


// src/composables/useDepartement.js
import axiosClient from '../api/axios'
// const API = 'http://localhost:5000/api/departments'

export const useDepartment = () => {
  
  const getAll = async () => {
    const res = await axiosClient.get('/departments')
    return res.data   // ✅ Important
  }

  const create = async (data) => (await axiosClient.post('/departments', data)).data
  const remove = async (id) => (await axiosClient.delete(`/departments/${id}`)).data

  return { getAll, create, remove }
}
