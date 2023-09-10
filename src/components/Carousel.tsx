import { Box, VStack } from 'native-base'
import { useState } from 'react'
import { FlatList, Image } from 'native-base'
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'

const { width: screenWidth } = Dimensions.get('window')

type Props = {
  images: any[]
}

export function Carousel({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const index = Math.round(contentOffsetX / screenWidth)
    setCurrentIndex(index)
  }

  return (
    <VStack
      position={'relative'}
      flex={1}
    >
      <FlatList
        horizontal
        data={images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={item}
            alt="produto"
            resizeMode="cover"
            h={70}
            w={screenWidth}
          />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      />

      <Box
        position={'absolute'}
        bottom={0}
        left={0}
        right={0}
        flexDirection={'row'}
        justifyContent={'center'}
        p={3}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            flex={1}
            h={1}
            rounded={'full'}
            mx={1}
            bg={'gray.700'}
            opacity={index === currentIndex ? 1 : 0.5}
          />
        ))}
      </Box>
    </VStack>
  )
}
