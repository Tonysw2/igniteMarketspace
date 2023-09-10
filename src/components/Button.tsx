import { THEME } from '@theme/index'
import { IButtonProps, Button as NativeBaseButton, Text } from 'native-base'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'

type Props = IButtonProps & {
  icon?: keyof typeof Icons.glyphMap
  text: string
  variant?: 'primary' | 'secondary' | 'default'
}

export function Button({ text, icon, variant = 'default', ...rest }: Props) {
  return (
    <NativeBaseButton
      p={3}
      rounded={'md'}
      alignItems={'center'}
      justifyContent={'center'}
      bg={
        variant === 'primary'
          ? 'blue.500'
          : variant === 'secondary'
          ? 'gray.100'
          : 'gray.500'
      }
      variant={variant}
      leftIcon={
        icon ? (
          <Icons
            name={icon}
            size={16}
            color={
              variant === 'default'
                ? THEME.colors.gray[300]
                : THEME.colors.gray[700]
            }
          />
        ) : undefined
      }
      _pressed={{
        bg:
          variant === 'primary'
            ? 'blue.700'
            : variant === 'secondary'
            ? 'gray.200'
            : 'gray.400',
      }}
      {...rest}
    >
      <Text
        ml={icon ? 2 : 0}
        fontFamily={'heading'}
        fontSize={'sm'}
        color={variant === 'default' ? 'gray.200' : 'gray.700'}
      >
        {text}
      </Text>
    </NativeBaseButton>
  )
}
