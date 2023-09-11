import { Center, HStack, Icon, Pressable, VStack, useTheme } from 'native-base'
import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'

const options = [
  { id: 1, label: 'Boleto' },
  { id: 2, label: 'Pix' },
  { id: 3, label: 'Dinheiro' },
  { id: 4, label: 'Cartão de crédito' },
  { id: 5, label: 'Depósito bancário' },
]

export function CheckboxGroup() {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])

  const { colors } = useTheme()

  const toggleOption = (option: (typeof options)[0]) => {
    if (selectedOptions.includes(option.id)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option.id))
    } else {
      setSelectedOptions([...selectedOptions, option.id])
    }
  }

  return (
    <VStack
      space={2}
      alignSelf={'flex-start'}
    >
      {options.map((option) => (
        <Pressable
          key={option.id}
          onPress={() => toggleOption(option)}
        >
          <HStack
            alignItems={'center'}
            space={2}
          >
            <Center
              h={6}
              w={6}
              bg={
                selectedOptions.includes(option.id) ? 'blue.500' : 'transparent'
              }
              borderWidth={1}
              borderColor={
                selectedOptions.includes(option.id) ? 'blue.500' : 'gray.400'
              }
              rounded={'xs'}
            >
              {selectedOptions.includes(option.id) && (
                <Icons
                  name="check"
                  size={16}
                  color={colors.gray[700]}
                />
              )}
            </Center>

            <Text style={styles.optionLabel}>{option.label}</Text>
          </HStack>
        </Pressable>
      ))}
    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    width: 16,
    height: 16,
    backgroundColor: 'blue',
  },
  optionLabel: {
    fontSize: 16,
  },
})
