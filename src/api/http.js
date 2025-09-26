import axios from 'axios'
import { useAuth } from '../store/auth'

const http = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000' })

http.interceptors.request.use(config => {
  const auth = useAuth()
  if (auth?.token) config.headers.Authorization = `Bearer ${auth.token}`
  return config
})

export default http
