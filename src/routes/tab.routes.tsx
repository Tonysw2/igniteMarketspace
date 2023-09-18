import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { Home } from '@screens/Home'
import { MyAds } from '@screens/MyAds'
import { Box, useTheme, useToast } from 'native-base'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { EventArg } from '@react-navigation/native'

export type TabParamList = {
  home: undefined
  myAds: undefined
  signOut: undefined
}

export type TabNavigatorRoutesProps = BottomTabNavigationProp<TabParamList>

const Tab = createBottomTabNavigator<TabParamList>()

export function TabRoutes() {
  const { signOut } = useAuth()
  const { colors } = useTheme()
  const toast = useToast()

  async function handleSignOut(event: EventArg<'tabPress', true, undefined>) {
    event.preventDefault()

    try {
      await signOut()
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível sair da conta, tente novamente.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  return (
    <Tab.Navigator
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
      <Tab.Screen
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

      <Tab.Screen
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

      <Tab.Screen
        name="signOut"
        component={Box}
        listeners={{
          tabPress: handleSignOut,
        }}
        options={{
          tabBarIcon: () => (
            <Icons
              name="logout"
              size={24}
              color={colors.red[500]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
