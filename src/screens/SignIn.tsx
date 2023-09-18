import { Center, Heading, Text, VStack, useToast } from 'native-base'
import LogoSVG from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { signInSchema } from '@utils/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import { ScrollView } from 'react-native'
import { AppError } from '@utils/AppError'

type SignInDataType = z.infer<typeof signInSchema>

export function SignIn() {
  const { signIn } = useAuth()
  const [isSecurityText, setIsSecurityText] = useState(true)

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const toast = useToast()

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignInDataType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function navigateToSignUp() {
    navigation.navigate('signUp')
  }

  async function handleSignIn(data: SignInDataType) {
    try {
      await signIn(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível fazer o login, tente novamente.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })

      console.log(error)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <VStack
        flex={1}
        bg={'gray.700'}
      >
        <VStack
          flex={2}
          bgColor={'gray.600'}
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

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  icon={isSecurityText ? 'eye-off-outline' : 'eye-outline'}
                  placeholder="Senha"
                  secureTextEntry={isSecurityText}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  onPressIcon={() => setIsSecurityText((state) => !state)}
                />
              )}
            />
          </VStack>

          <Button
            text="Entrar"
            variant={'primary'}
            isLoading={isSubmitting}
            onPress={handleSubmit(handleSignIn)}
          />
        </VStack>

        <Center
          flex={3}
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
    </ScrollView>
  )
}
