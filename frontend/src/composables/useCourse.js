import axios from 'axios'

const API = 'http://localhost:5000/api/courses'

export const useCourse = () => {
  const getAll = async () => (await axios.get(API)).data
  const create = async (data) => (await axios.post(API, data)).data
  const remove = async (id) => (await axios.delete(`${API}/${id}`)).data

  return { getAll, create, remove }
}
