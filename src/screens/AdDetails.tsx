import { Dimensions } from 'react-native'
import {
  Avatar,
  Box,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from 'native-base'
import { Button } from '@components/Button'
import { Carousel } from '@components/Carousel'
import { ButtonIcon } from '@components/ButtonIcon'

import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'

import BikePNG from '@assets/bike.png'
import AvatarPNG from '@assets/avatar.png'
import { TagSimple } from '@components/TagSimple'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

const { width } = Dimensions.get('screen')

const images = [BikePNG, BikePNG, BikePNG]

export function AdDetails() {
  const { colors } = useTheme()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  return (
    <VStack
      flex={1}
      bg={'gray.600'}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          h={width / 4}
          bg={'gray.700'}
        >
          <ButtonIcon
            position={'absolute'}
            left={6}
            bottom={3}
            icon="arrow-left"
            onPress={() =>
              navigation.navigate('userTab', {
                screen: 'home',
              })
            }
          />
        </Box>

        <Carousel images={images} />

        <VStack
          flex={1}
          space={6}
          p={6}
        >
          <HStack
            alignItems={'center'}
            space={2}
          >
            <Avatar
              source={AvatarPNG}
              size={'sm'}
            />
            <Text
              fontFamily={'body'}
              fontSize={'sm'}
              color={'gray.100'}
            >
              Anthony Ribeiro
            </Text>
          </HStack>

          <VStack space={2}>
            <TagSimple
              text="novo"
              alignSelf={'flex-start'}
            />

            <HStack
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Text
                fontFamily={'heading'}
                fontSize={'xl'}
                color={'gray.200'}
              >
                Bicicleta
              </Text>
              <Text
                fontFamily={'heading'}
                fontSize={'xl'}
                color={'blue.500'}
              >
                R$ 120,00
              </Text>
            </HStack>

            <Text
              fontFamily={'body'}
              fontSize={'sm'}
              color={'gray.200'}
            >
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
              nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus
              iaculis in aliquam.
            </Text>
          </VStack>

          <VStack space={4}>
            <HStack
              alignItems={'center'}
              space={2}
            >
              <Heading
                fontFamily={'heading'}
                fontSize={'sm'}
                color={'gray.200'}
              >
                Aceita troca?
              </Heading>

              <Text
                fontFamily={'body'}
                fontSize={'sm'}
                color={'gray.200'}
              >
                Sim
              </Text>
            </HStack>

            <VStack space={2}>
              <Heading
                fontFamily={'heading'}
                fontSize={'sm'}
                color={'gray.200'}
              >
                Meios de pagamento:
              </Heading>

              <VStack space={1}>
                <HStack
                  alignItems={'center'}
                  space={2}
                >
                  <Icons
                    name="barcode"
                    size={18}
                    color={colors.gray[100]}
                  />

                  <Text
                    fontFamily={'body'}
                    fontSize={'sm'}
                    color={'gray.200'}
                  >
                    Boleto
                  </Text>
                </HStack>
                <HStack
                  alignItems={'center'}
                  space={2}
                >
                  <Icons
                    name="qrcode"
                    size={18}
                    color={colors.gray[100]}
                  />

                  <Text
                    fontFamily={'body'}
                    fontSize={'sm'}
                    color={'gray.200'}
                  >
                    Pix
                  </Text>
                </HStack>
                <HStack
                  alignItems={'center'}
                  space={2}
                >
                  <Icons
                    name="cash"
                    size={18}
                    color={colors.gray[100]}
                  />

                  <Text
                    fontFamily={'body'}
                    fontSize={'sm'}
                    color={'gray.200'}
                  >
                    Dinheiro
                  </Text>
                </HStack>
                <HStack
                  alignItems={'center'}
                  space={2}
                >
                  <Icons
                    name="credit-card"
                    size={18}
                    color={colors.gray[100]}
                  />

                  <Text
                    fontFamily={'body'}
                    fontSize={'sm'}
                    color={'gray.200'}
                  >
                    Cartão de crédito
                  </Text>
                </HStack>
                <HStack
                  alignItems={'center'}
                  space={2}
                >
                  <Icons
                    name="bank"
                    size={18}
                    color={colors.gray[100]}
                  />

                  <Text
                    fontFamily={'body'}
                    fontSize={'sm'}
                    color={'gray.200'}
                  >
                    Cartão de débito
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>

      <HStack
        h={width / 4}
        pt={5}
        pb={7}
        px={6}
        alignItems={'center'}
        justifyContent={'space-between'}
        bg={'gray.700'}
      >
        <Heading
          fontFamily={'heading'}
          fontSize={'2xl'}
          color={'blue.700'}
        >
          R$ 120,00
        </Heading>

        <Button
          flexGrow={0}
          text="Entrar em contato"
          leftIcon={
            <Icons
              name="whatsapp"
              size={18}
              weight="fill"
              color={colors.gray[700]}
            />
          }
          variant={'primary'}
        />
      </HStack>
    </VStack>
  )
}
