import { Box, Center, HStack, Pressable, Text } from 'native-base'
import { useState } from 'react'

const dotSize = 6

export function RadioGroup() {
  const [selectedOption, setSelectedOption] = useState(null)

  const options = [
    { id: 1, label: 'Produto novo' },
    { id: 2, label: 'Produto usado' },
  ]

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option)
  }

  return (
    <HStack space={5}>
      {options.map((option) => (
        <Pressable
          key={option.id}
          onPress={() => handleOptionSelect(option.id)}
        >
          <HStack
            space={3}
            alignItems={'center'}
          >
            <Center
              h={dotSize}
              w={dotSize}
              rounded={'full'}
              borderWidth={1.5}
              borderColor={
                option.id === selectedOption ? 'blue.500' : 'gray.400'
              }
            >
              {selectedOption === option.id ? (
                <Box
                  h={dotSize - 2}
                  w={dotSize - 2}
                  rounded={'full'}
                  bg={'blue.500'}
                />
              ) : null}
            </Center>

            <Text
              fontFamily={'body'}
              fontSize={'md'}
              color={'gray.200'}
            >
              {option.label}
            </Text>
          </HStack>
        </Pressable>
      ))}
    </HStack>
  )
}
