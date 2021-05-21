import axios, { AxiosRequestConfig } from 'axios'

let baseConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}

if (process.env.NODE_ENV === 'production') {
  baseConfig = {
    ...baseConfig,
    baseURL: 'https://api.github.com',
  }
}

const axiosInstance = axios.create(baseConfig)

export default axiosInstance
