// import axios from 'axios'

// const API = 'http://localhost:5000/api/departments'

// export const useDepartment = () => {
//   const getAll = async () => (await axios.get(API)).data
//   const create = async (data) => (await axios.post(API, data)).data
//   const remove = async (id) => (await axios.delete(`${API}/${id}`)).data

//   return { getAll, create, remove }
// }


// src/composables/useDepartement.js
import axios from 'axios'
const API = 'http://localhost:5000/api/departments'

export const useDepartment = () => {
  
  const getAll = async () => {
    const res = await axios.get(API)
    return res.data   // ✅ Important
  }

  const create = async (data) => (await axios.post(API, data)).data
  const remove = async (id) => (await axios.delete(`${API}/${id}`)).data

  return { getAll, create, remove }
}
