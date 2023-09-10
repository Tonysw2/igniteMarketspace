import { Avatar, HStack, Heading, Text, VStack } from 'native-base'
import { Button } from './Button'
import DefaultUserAvatarPNG from '@assets/avatar.png'

export function HomeHeader() {
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
        variant={'secondary'}
        text="Criar anúncio"
        icon="plus"
      />
    </HStack>
  )
}
