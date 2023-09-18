import {
  Avatar,
  Center,
  Heading,
  Icon,
  Pressable,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base'
import LogoSVG from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Entypo } from '@expo/vector-icons'
import DefaultUserAvatarSVG from '@assets/avatar.png'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { signUpSchema } from '@utils/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { api } from '@services/api'
import { AxiosError } from 'axios'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'

type SignUpDataType = z.infer<typeof signUpSchema>

export function SignUp() {
  const [isSecurityText, setIsSecurityText] = useState(true)
  const [photoState, setPhotoState] = useState<{
    photoFile: any
    isLoading: boolean
  }>({
    photoFile: {},
    isLoading: false,
  })

  const {
    control,
    formState: { errors, isSubmitting },
    watch,
    handleSubmit,
  } = useForm<SignUpDataType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      cellphone: '',
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
    },
  })

  const toast = useToast()

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const { signIn } = useAuth()

  const { name } = watch()

  function navigateToSignIn() {
    navigation.goBack()
  }

  async function handleUserPhotoSelect() {
    try {
      setPhotoState((state) => ({ ...state, isLoading: true }))

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (photoSelected.canceled) {
        return
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
        )

        if (photoInfo.exists) {
          if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
            return toast.show({
              title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
              placement: 'top',
              bgColor: 'red.500',
            })
          }

          const fileExtension = photoSelected.assets[0].uri.split('.').pop()

          const photoFile = {
            name: `${name.split(' ')[0]}.${fileExtension}`.toLowerCase(),
            uri: photoSelected.assets[0].uri,
            type: `${photoSelected.assets[0].type}/${fileExtension}`,
          } as any

          setPhotoState((state) => ({
            ...state,
            photoFile,
          }))
        }
      }
    } catch (error) {
      console.error('Erro ao escolher a imagem:', error)
      toast.show({
        color: 'red.500',
      })
    } finally {
      setPhotoState((state) => ({ ...state, isLoading: false }))
    }
  }

  async function onSignUp(data: SignUpDataType) {
    try {
      const formData = new FormData()

      formData.append('avatar', photoState.photoFile as any)
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('tel', data.cellphone)
      formData.append('password', data.password)

      await api.post('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.show({
        title: 'Conta criada com sucesso! 🚀',
        placement: 'top',
        bgColor: 'green.500',
      })

      await signIn({ email: data.email, password: data.password })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta, tente novamente.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })

      console.log(error)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
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
                Crie sua conta e use o espaço para comprar itens variados e
                vender seus produtos
              </Text>
            </Center>
          </Center>

          <Center mb={12}>
            <VStack
              space={4}
              mb={6}
            >
              {photoState.isLoading ? (
                <Skeleton
                  h={24}
                  w={24}
                  rounded={'full'}
                  alignSelf={'center'}
                  startColor={'gray.400'}
                  endColor={'gray.500'}
                />
              ) : (
                <Avatar
                  source={
                    photoState.photoFile.uri
                      ? { uri: photoState.photoFile.uri }
                      : DefaultUserAvatarSVG
                  }
                  h={24}
                  w={24}
                  alignSelf={'center'}
                  bg={'blue.500'}
                >
                  <Avatar.Badge
                    size={10}
                    borderWidth={0}
                    bg={'blue.500'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Pressable onPress={handleUserPhotoSelect}>
                      <Icon
                        as={Entypo}
                        name="pencil"
                        color={'gray.700'}
                      />
                    </Pressable>
                  </Avatar.Badge>
                </Avatar>
              )}

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Nome"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    keyboardType="email-address"
                    placeholder="E-mail"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="cellphone"
                render={({ field: { onChange, value } }) => (
                  <Input
                    keyboardType="phone-pad"
                    placeholder="Telefone"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.cellphone?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    secureTextEntry={isSecurityText}
                    icon={isSecurityText ? 'eye-off-outline' : 'eye-outline'}
                    onPressIcon={() => setIsSecurityText((state) => !state)}
                    placeholder="Senha"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <Input
                    secureTextEntry
                    placeholder="Confirmar senha"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />
            </VStack>

            <Button
              w="full"
              text="Criar"
              variant={'secondary'}
              isLoading={isSubmitting}
              onPress={handleSubmit(onSignUp)}
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
    </KeyboardAvoidingView>
  )
}
