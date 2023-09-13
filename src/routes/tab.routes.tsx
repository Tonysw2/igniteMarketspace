import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { Home } from '@screens/Home'
import { MyAds } from '@screens/MyAds'
import { Box, useTheme } from 'native-base'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'

export type TabParamList = {
  home: undefined
  myAds: undefined
  signOut: undefined
}

export type TabNavigatorRoutesProps = BottomTabNavigationProp<TabParamList>

const Tab = createBottomTabNavigator<TabParamList>()

export function TabRoutes() {
  const { colors } = useTheme()

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
          tabPress: (event) => {
            event.preventDefault()
          },
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
