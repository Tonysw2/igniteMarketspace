import { Avatar, HStack, Heading, Text, VStack } from 'native-base'
import { Button } from './Button'
import DefaultUserAvatarPNG from '@assets/avatar.png'
import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'

type Props = {
  goToCreateAdd: () => void
}

export function HomeHeader({ goToCreateAdd }: Props) {
  const { user } = useAuth()

  return (
    <HStack space={2}>
      <HStack
        space={3}
        flexGrow={1}
      >
        <Avatar
          source={
            user.avatar
              ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
              : DefaultUserAvatarPNG
          }
          borderWidth={1}
          borderColor={'blue.500'}
          bg={'blue.500'}
        />

        <VStack>
          <Text
            fontFamily={'body'}
            fontSize={'md'}
            color={'gray.100'}
          >
            Boas vindas,
          </Text>
          <Heading
            textTransform={'capitalize'}
            fontFamily={'heading'}
            fontSize={'md'}
            color={'gray.100'}
          >
            {user.name.split(' ')[0]}!
          </Heading>
        </VStack>
      </HStack>

      <Button
        icon="plus"
        variant={'secondary'}
        text="Criar anúncio"
        onPress={goToCreateAdd}
      />
    </HStack>
  )
}
