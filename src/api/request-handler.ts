import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const getPoomasiAccountToken = (): string | null => {
  return localStorage.getItem('account_token')
}

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 3000,
})

instance.interceptors.request.use(
  (config) => {
    const account_token = getPoomasiAccountToken()

    if (account_token) {
      config.headers.Authorization = account_token
    }

    return config
  },
  (error) => {}
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {}
)

export default async function <T>(args: AxiosRequestConfig): Promise<T> {
  const { data } = await instance(args)
  return data['data']
}
