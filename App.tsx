import React from 'react'
import { NativeBaseProvider, StatusBar } from 'native-base'
import {
  Karla_700Bold,
  Karla_400Regular,
  useFonts,
} from '@expo-google-fonts/karla'
import { THEME } from '@theme/index'
import { Loading } from '@components/Loading'
import { Routes } from '@routes/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@contexts/AuthContext'

const queryClient = new QueryClient()

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={THEME}>
          <StatusBar
            backgroundColor={'transparent'}
            translucent
            barStyle="dark-content"
          />

          {fontsLoaded ? <Routes /> : <Loading />}
        </NativeBaseProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}
