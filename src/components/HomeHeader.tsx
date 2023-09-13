import { Avatar, HStack, Heading, Text, VStack } from 'native-base'
import { Button } from './Button'
import DefaultUserAvatarPNG from '@assets/avatar.png'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

type Props = {
  goToCreateAdd: () => void
}

export function HomeHeader({ goToCreateAdd }: Props) {
  return (
    <HStack space={2}>
      <HStack
        space={3}
        flexGrow={1}
      >
        <Avatar
          source={{ uri: 'https://github.com/tonysw2.png' }}
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
            fontFamily={'heading'}
            fontSize={'md'}
            color={'gray.100'}
          >
            Maria!
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
