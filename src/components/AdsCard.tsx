import {
  Avatar,
  Box,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
} from 'native-base'
import ShoesPNG from '@assets/shoes.png'
import DefaultUserAvatarPNG from '@assets/avatar.png'
import { Dimensions } from 'react-native'
import { useState } from 'react'
import { TagSimple } from './TagSimple'

const { width } = Dimensions.get('window')

const IMG_HEIGHT = width / 3.75
const IMG_WIDTH = width / 2.43

type Props = {
  isActive?: boolean
}

export function AdsCard({ isActive = true }: Props) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false)

  return (
    <VStack
      maxW={IMG_WIDTH}
      flex={1}
      zIndex={0}
    >
      <Box
        position={'relative'}
        h={IMG_HEIGHT}
        w={IMG_WIDTH}
      >
        {!imageIsLoaded ? (
          <Skeleton
            position={'absolute'}
            top={0}
            h={IMG_HEIGHT}
            w={IMG_WIDTH}
            rounded={'md'}
            alignSelf={'center'}
            startColor={'gray.400'}
            endColor={'gray.500'}
          />
        ) : null}

        <Image
          source={ShoesPNG}
          alt="produto"
          h={'full'}
          w={'full'}
          mb={1}
          rounded={'md'}
          alignSelf={'center'}
          onLoad={() => -setImageIsLoaded(true)}
        />

        <Avatar
          source={DefaultUserAvatarPNG}
          size={'xs'}
          position={'absolute'}
          top={1}
          left={1}
        />

        <TagSimple
          variant="primary"
          text="novo"
          position={'absolute'}
          top={1}
          right={1}
        />

        {!isActive ? (
          <Box
            position={'absolute'}
            h={'full'}
            w={'full'}
            bg={'black'}
            opacity={0.3}
            rounded={'md'}
          />
        ) : null}

        {!isActive ? (
          <Text
            position={'absolute'}
            left={1}
            bottom={1}
            textTransform={'uppercase'}
            fontFamily={'heading'}
            fontSize={'sm'}
            color={'gray.700'}
          >
            Anúncio desativado
          </Text>
        ) : null}
      </Box>

      <Box
        mb={1}
        px={1}
      >
        <Text
          fontFamily={'body'}
          fontSize={'sm'}
          color={isActive ? 'gray.200' : 'gray.400'}
        >
          Tênis vermelho
        </Text>

        <Heading
          fontFamily={'heading'}
          fontSize={'md'}
          color={isActive ? 'gray.100' : 'gray.400'}
        >
          R$ 59,90
        </Heading>
      </Box>
    </VStack>
  )
}
