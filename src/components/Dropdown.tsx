import {
  Button,
  FlatList,
  HStack,
  Input,
  Pressable,
  Text,
  VStack,
  useTheme,
} from 'native-base'
import { useState } from 'react'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'

type Props = {
  options: Array<string>
}

export function Dropdown({ options }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])

  const { colors } = useTheme()

  const toggleDropdown = () => {
    setIsVisible(!isVisible)
  }

  const selectOption = (option: string) => {
    setSelectedOption(option)
    setIsVisible(false)
  }

  return (
    <VStack
      w={'1/3'}
      position={'relative'}
    >
      <Pressable
        flexDirection={'row'}
        alignItems={'center'}
        py={2}
        px={3}
        onPress={toggleDropdown}
        bg={'transparent'}
        borderWidth={1}
        borderColor={isVisible ? colors.gray[400] : colors.gray[500]}
        rounded={'md'}
        _pressed={{ bg: 'transparent' }}
      >
        <Text
          flex={1}
          mr={2}
        >
          {selectedOption}
        </Text>

        <Icons
          name={isVisible ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={colors.gray[300]}
        />
      </Pressable>

      {isVisible ? (
        <VStack
          mt={0.5}
          position={'absolute'}
          top="full"
          left={0}
          right={0}
          backgroundColor="gray.700"
          borderRadius={'md'}
          shadow={'1'}
          zIndex={999}
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <Pressable
                p={0}
                bg={'transparent'}
                onPress={() => selectOption(item)}
              >
                <Text
                  fontFamily={selectedOption === item ? 'heading' : 'body'}
                  fontSize={'sm'}
                  color={'gray.200'}
                >
                  {item}
                </Text>
              </Pressable>
            )}
            contentContainerStyle={{ padding: 12, gap: 8 }}
          />
        </VStack>
      ) : null}
    </VStack>
  )
}
