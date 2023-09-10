import { Avatar, Center, Heading, Icon, Text, VStack } from 'native-base'
import LogoSVG from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Entypo } from '@expo/vector-icons'
import DefaultUserAvatarSVG from '@assets/avatar.png'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function SignUp() {
  const navigation = useNavigation()

  function navigateToSignIn() {
    navigation.goBack()
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack
        flex={1}
        bg={'gray.600'}
        py={16}
        px={12}
      >
        <Center mb={8}>
          <LogoSVG
            height={40}
            width={60}
          />

          <Center mt={3}>
            <Heading
              fontFamily={'heading'}
              fontSize={'xl'}
              color={'gray.100'}
              mb={2}
            >
              Boas vindas!
            </Heading>

            <Text
              fontFamily={'body'}
              fontSize={'sm'}
              color={'gray.200'}
              textAlign={'center'}
            >
              Crie sua conta e use o espaço para comprar itens variados e vender
              seus produtos
            </Text>
          </Center>
        </Center>

        <Center mb={12}>
          <VStack
            space={4}
            mb={6}
          >
            <Avatar
              source={DefaultUserAvatarSVG}
              alignSelf={'center'}
              size={'xl'}
              bg={'blue.500'}
            >
              <Avatar.Badge
                size={10}
                borderWidth={0}
                bg={'blue.500'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Icon
                  as={Entypo}
                  name="pencil"
                  color={'gray.700'}
                />
              </Avatar.Badge>
            </Avatar>

            <Input placeholder="Nome" />

            <Input placeholder="E-mail" />

            <Input placeholder="Telefone" />

            <Input placeholder="Senha" />

            <Input placeholder="Confirmar senha" />
          </VStack>

          <Button
            w="full"
            text="Criar"
            variant={'secondary'}
          />
        </Center>

        <Center>
          <Heading
            mb={4}
            fontFamily={'body'}
            fontSize={'sm'}
            color={'gray.200'}
          >
            Ainda não tem acesso?
          </Heading>

          <Button
            w="full"
            text="Ir para o login"
            onPress={navigateToSignIn}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
