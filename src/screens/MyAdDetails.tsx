import {
  Avatar,
  Box,
  Center,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from 'native-base'
import { Dimensions } from 'react-native'
import BikePNG from '@assets/bike.png'
import AvatarPNG from '@assets/avatar.png'
import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'
import { Carousel } from '@components/Carousel'

const { width } = Dimensions.get('screen')

const images = [BikePNG, BikePNG, BikePNG]

const isActive = true

export function MyAdDetails() {
  const { colors } = useTheme()

  return (
    <VStack
      flex={1}
      bg={'gray.600'}
    >
      <Box
        h={width / 4}
        bg={'gray.700'}
      >
        <ButtonIcon
          position={'absolute'}
          left={6}
          bottom={3}
          icon="arrow-left"
        />

        <ButtonIcon
          position={'absolute'}
          right={6}
          bottom={3}
          icon="square-edit-outline"
        />
      </Box>

      <ScrollView
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ pb: 5 }}
        bounces={false}
      >
        <Carousel
          images={images}
          isActive={isActive}
        />

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
            <Center
              alignSelf={'flex-start'}
              bg={'gray.500'}
              py={0.5}
              px={2}
              rounded={'full'}
            >
              <Text
                fontFamily={'heading'}
                fontSize={'xs'}
                color={'gray.100'}
                textTransform={'uppercase'}
              >
                novo
              </Text>
            </Center>

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

          <VStack space={2}>
            <Button
              icon="power"
              variant={isActive ? 'secondary' : 'primary'}
              text={`${isActive ? 'Desativar' : 'Reativar'} anúncio`}
            />
            <Button
              icon="trash-can-outline"
              text="Excluir anúncio"
            />
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
