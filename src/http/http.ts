// httpClient.js
import { TOKEN, URL_ENDPOINT } from '@/constants/environment'
import axios from 'axios'

// Base structure of the HTTP client
export const httpClient = axios.create({
  baseURL: URL_ENDPOINT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor
httpClient.interceptors.request.use(
  (config) => {
    if (TOKEN) {
      config.headers.Authorization = `Bearer ${TOKEN}`
    }
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  },
)

httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return Promise.reject(error)
  },
)
