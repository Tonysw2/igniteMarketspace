import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { AdDetails } from '@screens/AdDetails'
import { Home } from '@screens/Home'
import { MyAds } from '@screens/MyAds'
import { useTheme } from 'native-base'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'
import { MyAdDetails } from '@screens/MyAdDetails'

type AppRoutesType = {
  home: undefined
  myAds: undefined
  adDetails: undefined
  myAdDetails: undefined
  signOut: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesType>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesType>()

export function AppRoutes() {
  const { colors } = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icons
              name="home-variant-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => (
            <Icons
              name="tag-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Screen
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
        name="adDetails"
        component={AdDetails}
      />

      <Screen
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
        name="myAdDetails"
        component={MyAdDetails}
      />
    </Navigator>
  )
}
