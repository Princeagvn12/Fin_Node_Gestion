import axiosClient from '../api/axios'

// const API = 'http://localhost:5000/api/courses'

export const useCourse = () => {
  const getAll = async () => (await axiosClient.get('/courses')).data
  const create = async (data) => (await axiosClient.post('/courses', data)).data
  const remove = async (id) => (await axiosClient.delete(`/courses/${id}`)).data

  return { getAll, create, remove }
}
