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
import { MyAdDetails } from '@screens/MyAdDetails'
import { AdDetails } from '@screens/AdDetails'
import { CreateAd } from '@screens/CreateAd'

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle="dark-content"
      />

      {fontsLoaded ? <CreateAd /> : <Loading />}
    </NativeBaseProvider>
  )
}
