import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'
import {
  storageGetAuthToken,
  storageRemoveAuthToken,
  storageSaveAuthToken,
} from '@storage/storageAuthToken'
import {
  storageRemoveUser,
  storageUserGet,
  storageUserSave,
} from '@storage/storageUser'
import React, { createContext, useState, ReactNode, useEffect } from 'react'

type AuthContextProps = {
  user: UserDTO
  isLoadingUserStorageData: boolean
  signIn: ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => Promise<void>
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
  }

  async function storageSaveUserAndToken(
    userData: UserDTO,
    token: string,
    refresh_token: string,
  ) {
    try {
      await storageUserSave(userData)
      await storageSaveAuthToken({
        token,
        refresh_token,
      })
    } catch (error) {
      throw error
    }
  }

  async function signIn({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token && data.refresh_token) {
        await storageSaveUserAndToken(data.user, data.token, data.refresh_token)
        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)

      setUser({} as UserDTO)
      await storageRemoveUser()
      await storageRemoveAuthToken()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const loggedUser = await storageUserGet()
      const { token } = await storageGetAuthToken()

      if (loggedUser.id && token) {
        setUser(loggedUser)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoadingUserStorageData, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
