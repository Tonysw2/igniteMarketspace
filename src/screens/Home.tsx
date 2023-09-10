import { AdsCard } from '@components/AdsCard'
import { FilterModal } from '@components/FilterModal'
import { HomeHeader } from '@components/HomeHeader'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import {
  HStack,
  Heading,
  Text,
  VStack,
  ScrollView,
  useTheme,
  Pressable,
} from 'native-base'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'
import { Dimensions, FlatList } from 'react-native'
import { useState } from 'react'

const { width, height } = Dimensions.get('window')
const COLUMN_GAP = width / 18.75

const products = Array.from({ length: 10 }).map((_, index) => index)

export function Home() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const { colors } = useTheme()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleCloseModal() {
    setIsFilterModalOpen(false)
  }

  function handleOpenModal() {
    setIsFilterModalOpen(true)
  }

  return (
    <ScrollView
      _contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        space={8}
        pt={16}
        px={6}
      >
        <HomeHeader />

        <VStack space={3}>
          <Text
            fontFamily={'body'}
            fontSize={'sm'}
            color={'gray.300'}
          >
            Seus produtos anunciados para venda
          </Text>

          <HStack
            py={3}
            px={4}
            alignItems={'center'}
            justifyContent={'space-between'}
            bg={'blue.501'}
            rounded={'md'}
          >
            <HStack
              alignItems={'center'}
              space={4}
            >
              <Icons
                name="tag"
                size={22}
                color={colors.blue[700]}
              />

              <VStack>
                <Heading
                  fontFamily={'heading'}
                  fontSize={'xl'}
                  color={'gray.200'}
                >
                  4
                </Heading>

                <Text
                  fontFamily={'body'}
                  fontSize={'xs'}
                  color={'gray.200'}
                >
                  Anúncios ativos
                </Text>
              </VStack>
            </HStack>

            <HStack
              alignItems={'center'}
              space={2}
            >
              <Text
                fontFamily={'heading'}
                fontSize={'sm'}
                color={'blue.700'}
              >
                Meus anúncios
              </Text>

              <Icons
                name="arrow-right"
                size={16}
                color={colors.blue[700]}
              />
            </HStack>
          </HStack>
        </VStack>

        <VStack
          flex={1}
          space={6}
        >
          <VStack space={3}>
            <Text>Compre produtos variados</Text>

            <Input
              placeholder="Buscar anúncio"
              icon="magnify"
              onPressIcon={handleOpenModal}
            />
          </VStack>

          <FlatList
            data={products}
            keyExtractor={(item) => String(item)}
            renderItem={() => (
              <Pressable onPress={() => navigation.navigate('adDetails')}>
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

        <FilterModal
          isOpen={isFilterModalOpen}
          onCloseModal={handleCloseModal}
        />
      </VStack>
    </ScrollView>
  )
}
