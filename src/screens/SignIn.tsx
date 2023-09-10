import { Center, Heading, Text, VStack } from 'native-base'
import LogoSVG from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export function SignIn() {
  const [isSecurityText, setIsSecurityText] = useState(true)

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function navigateToSignUp() {
    navigation.navigate('signUp')
  }

  return (
    <VStack
      flex={1}
      bg={'gray.700'}
    >
      <VStack
        bgColor={'gray.600'}
        flex={5}
        py={16}
        px={10}
        justifyContent={'center'}
        rounded={'3xl'}
      >
        <Center mb={16}>
          <LogoSVG />

          <Heading
            fontFamily={'heading'}
            fontSize={'4xl'}
            color={'gray.100'}
          >
            marketspace
          </Heading>

          <Text
            fontFamily={'body'}
            fontSize={'md'}
            color={'gray.300'}
          >
            Seu espaço de compra e venda
          </Text>
        </Center>

        <VStack
          alignItems={'center'}
          space={4}
          mb={8}
        >
          <Text
            fontFamily={'body'}
            fontSize={'sm'}
            color={'gray.200'}
          >
            Acesse sua conta
          </Text>

          <Input placeholder="E-mail" />

          <Input
            icon={isSecurityText ? 'eye-off-outline' : 'eye-outline'}
            placeholder="Senha"
            secureTextEntry={isSecurityText}
            onPressIcon={() => setIsSecurityText((state) => !state)}
          />
        </VStack>

        <Button
          text="Entrar"
          variant={'primary'}
          icon="sun-wireless"
        />
      </VStack>

      <Center
        flex={2}
        px={10}
        bg={'gray.700'}
      >
        <Heading
          mb={4}
          fontFamily={'body'}
          fontSize={'sm'}
          color={'gray.200'}
        >
          Ainda não tem acesso?
        </Heading>

        <Button
          w={'full'}
          text="Criar uma conta"
          onPress={navigateToSignUp}
        />
      </Center>
    </VStack>
  )
}
