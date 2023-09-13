import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import {
  Center,
  HStack,
  Heading,
  ScrollView,
  Switch,
  Text,
  VStack,
  useTheme,
} from 'native-base'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import { Input } from '@components/Input'
import { RadioGroup } from '@components/RadioGroup'
import { CheckboxGroup } from '@components/CheckboxGroup'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps, StackParamList } from '@routes/app.routes'

const { width: screenWidth } = Dimensions.get('window')

const ITEM_SIZE = screenWidth / 3.75

type RouteProps = RouteProp<StackParamList, 'createAd'>

export function CreateAd() {
  const { colors } = useTheme()
  const { top } = useSafeAreaInsets()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const {
    params: { id, title },
  } = useRoute<RouteProps>()
  console.log(id, title)

  return (
    <VStack
      flex={1}
      mt={top}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ flexGrow: 1, pb: 10, px: 6 }}
        bounces={false}
      >
        <Center
          mt={5}
          mb={8}
        >
          <HStack alignItems={'center'}>
            <ButtonIcon
              icon="arrow-left"
              position={'absolute'}
              left={0}
              zIndex={999}
              onPress={() => {
                if (!!id) {
                  return navigation.navigate('myAdDetails')
                }

                navigation.navigate('userTab', {
                  screen: 'home',
                })
              }}
            />

            <Heading
              flex={1}
              textAlign={'center'}
              fontFamily={'heading'}
              fontSize={'xl'}
              color={'gray.100'}
            >
              {title}
            </Heading>
          </HStack>
        </Center>

        <VStack space={8}>
          <VStack space={4}>
            <VStack space={1}>
              <Heading
                fontFamily={'heading'}
                fontSize={'md'}
                color={'gray.200'}
              >
                Imagens
              </Heading>

              <Text
                fontFamily={'body'}
                fontSize={'sm'}
                color={'gray.300'}
              >
                Escolha até 3 imagens para mostrar o quando o seu produto é
                incrível!
              </Text>
            </VStack>

            <HStack space={2}>
              <Center
                h={ITEM_SIZE}
                w={ITEM_SIZE}
                bg={'gray.500'}
                rounded={'lg'}
              >
                <Icons
                  name="plus"
                  color={colors.gray[400]}
                  size={24}
                />
              </Center>
            </HStack>
          </VStack>

          <VStack space={4}>
            <Text>Sobre o produto</Text>

            <Input placeholder="Título do anúncio" />

            <Input
              multiline
              placeholder="Descrição do produto"
              h={32}
            />

            <RadioGroup />
          </VStack>

          <VStack space={4}>
            <Heading
              fontFamily={'heading'}
              fontSize={'md'}
              color={'gray.200'}
            >
              Venda
            </Heading>

            <Input
              placeholder="Valor do produto"
              prefix="R$"
            />

            <VStack space={3}>
              <Heading
                fontFamily={'heading'}
                fontSize={'md'}
                color={'gray.200'}
              >
                Aceitar troca?
              </Heading>

              <Switch
                onTrackColor={'blue.500'}
                offTrackColor={'gray.500'}
              />
            </VStack>

            <VStack space={3}>
              <Heading
                fontFamily={'heading'}
                fontSize={'md'}
                color={'gray.200'}
              >
                Meios de pagamento aceitos
              </Heading>
            </VStack>

            <CheckboxGroup />
          </VStack>
        </VStack>
      </ScrollView>

      <HStack
        pt={5}
        pb={7}
        px={6}
        space={3}
        bg={'gray.700'}
      >
        <Button
          flex={1}
          text="Cancelar"
          variant={'default'}
        />

        <Button
          flex={1}
          text="Avançar"
          variant={'secondary'}
        />
      </HStack>
    </VStack>
  )
}
