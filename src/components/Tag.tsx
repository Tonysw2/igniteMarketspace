import { IPressableProps, Pressable, Text, useTheme } from 'native-base'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'
import { useState } from 'react'

type Props = IPressableProps & {
  text: string
}

export function Tag({ text, ...rest }: Props) {
  const [isSelected, setIsSelected] = useState(false)

  const { colors } = useTheme()

  return (
    <Pressable
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      py={1.5}
      pl={4}
      pr={isSelected ? 2 : 4}
      rounded={'full'}
      bg={isSelected ? 'blue.500' : 'gray.500'}
      onPress={() => setIsSelected((state) => !state)}
      {...rest}
    >
      <Text
        mr={isSelected ? 1 : 0}
        fontFamily={'heading'}
        fontSize={'xs'}
        color={isSelected ? 'gray.700' : 'gray.300'}
        textTransform={'uppercase'}
      >
        {text}
      </Text>

      {isSelected ? (
        <Icons
          name="close-circle"
          size={16}
          color={colors.gray[700]}
        />
      ) : null}
    </Pressable>
  )
}
