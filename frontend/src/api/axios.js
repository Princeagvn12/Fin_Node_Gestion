// axios instance placeholder
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const axiosClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})

export default axiosClient
