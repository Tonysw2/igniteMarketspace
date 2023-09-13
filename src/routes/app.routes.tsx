import { AdDetails } from '@screens/AdDetails'

import { MyAdDetails } from '@screens/MyAdDetails'
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { CreateAd } from '@screens/CreateAd'
import { AdPreview } from '@screens/AdPreview'
import { TabParamList, TabRoutes } from './tab.routes'
import { NavigatorScreenParams } from '@react-navigation/native'

export type StackParamList = {
  userTab: NavigatorScreenParams<TabParamList>
  adDetails: undefined
  myAdDetails: undefined
  createAd: { id?: number; title: string }
  adPreview: undefined
  updateAd: undefined
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<StackParamList>

const Stack = createNativeStackNavigator<StackParamList>()

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="userTab"
        component={TabRoutes}
      />
      <Stack.Screen
        name="adDetails"
        component={AdDetails}
      />
      <Stack.Screen
        name="myAdDetails"
        component={MyAdDetails}
      />
      <Stack.Screen
        name="createAd"
        component={CreateAd}
      />
      <Stack.Screen
        name="adPreview"
        component={AdPreview}
      />
    </Stack.Navigator>
  )
}
