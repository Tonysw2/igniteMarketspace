import {
  storageGetAuthToken,
  storageSaveAuthToken,
} from '@storage/storageAuthToken'
import { AppError } from '@utils/AppError'
import axios, { AxiosError, AxiosInstance } from 'axios'

type SignOut = () => void

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.1.15:3333',
  timeout: 1000 * 5, // 5 seconds
}) as APIInstanceProps

let failedQueue: PromiseType[] = []
let isRefreshing = false

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        if (
          error.response.data.message === 'token.invalid' ||
          error.response.data.message === 'token.expired'
        ) {
          const { refresh_token } = await storageGetAuthToken()

          if (!refresh_token) {
            signOut()
            return Promise.reject(error)
          }

          const originalRequestConfig = error.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.header = {
                    Authorization: `Bearer ${token}`,
                  }
                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                },
              })
            })
          }

          isRefreshing = true

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post('/sessions/refresh-token', {
                refresh_token,
              })

              await storageSaveAuthToken({
                token: data.token,
                refresh_token: data.refresh_token,
              })

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data,
                )
              }

              originalRequestConfig.header = {
                Authorization: `Bearer ${data.token}`,
              }
              api.defaults.headers.common.Authorization = `Bearer ${data.token}`

              failedQueue.forEach((request) => {
                request.onSuccess(data.token)
              })

              resolve(api(originalRequestConfig))
            } catch (error: any) {
              failedQueue.forEach((request) => {
                request.onFailure(error)
              })

              signOut()
              reject(error)
            } finally {
              failedQueue = []
              isRefreshing = false
            }
          })
        }

        signOut()
      }

      if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message))
      } else {
        return Promise.reject(error)
      }
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
