import { THEME } from '@theme/index'
import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
  Pressable,
  Text,
} from 'native-base'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'

type Props = IInputProps & {
  icon?: keyof typeof Icons.glyphMap
  prefix?: string
  errorMessage?: string
  onPressIcon?: () => void
}

export function Input({
  icon,
  prefix,
  errorMessage,
  isInvalid,
  onPressIcon,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput
        w={'full'}
        py={3}
        px={4}
        bgColor={'gray.700'}
        borderWidth={0}
        fontFamily={'body'}
        fontSize={'md'}
        color={'gray.200'}
        placeholderTextColor={'gray.400'}
        rounded={'md'}
        InputLeftElement={
          prefix ? (
            <Text
              ml={4}
              fontFamily={'body'}
              fontSize={'md'}
              color={'gray.200'}
            >
              {prefix}
            </Text>
          ) : undefined
        }
        InputRightElement={
          icon ? (
            <Pressable
              py={3}
              px={4}
              onPress={onPressIcon}
            >
              <Icons
                name={icon}
                size={20}
                color={THEME.colors.gray[300]}
              />
            </Pressable>
          ) : undefined
        }
        _focus={{
          borderWidth: 1,
          borderColor: 'gray.300',
        }}
        {...rest}
      />

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
