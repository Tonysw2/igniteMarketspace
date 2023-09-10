import { Dropdown } from '@components/Dropdown'
import { ButtonIcon } from '@components/ButtonIcon'
import { AdsCard } from '@components/AdsCard'
import {
  Center,
  FlatList,
  HStack,
  Heading,
  Pressable,
  Text,
  VStack,
} from 'native-base'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

const { width } = Dimensions.get('screen')
const COLUMN_GAP = width / 18.75

const options = ['Todos', 'Ativos', 'Inativos']
const products = Array.from({ length: 5 }).map((_, index) => ({ id: index }))

export function MyAds() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  return (
    <VStack
      flex={1}
      bg={'gray.600'}
      px={6}
    >
      <Center
        mt={16}
        mb={8}
      >
        <HStack>
          <Heading
            flex={1}
            textAlign={'center'}
            fontFamily={'heading'}
            fontSize={'xl'}
            color={'gray.100'}
          >
            Meus anúncios
          </Heading>

          <ButtonIcon
            icon="plus"
            position={'absolute'}
            right={0}
          />
        </HStack>
      </Center>

      <HStack
        mb={5}
        alignItems={'center'}
        justifyContent={'space-between'}
        zIndex={1}
      >
        <Text>9 anúncios</Text>

        <Dropdown options={options} />
      </HStack>

      <VStack>
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={() => (
            <Pressable onPress={() => navigation.navigate('myAdDetails')}>
              <AdsCard />
            </Pressable>
          )}
          numColumns={2}
          columnWrapperStyle={{ gap: COLUMN_GAP }}
          contentContainerStyle={{ gap: 24, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </VStack>
    </VStack>
  )
}
