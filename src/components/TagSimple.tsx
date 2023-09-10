import { Center, ICenterProps, Text } from 'native-base'

type Props = ICenterProps & {
  text: string
  variant?: 'default' | 'primary' | 'secondary'
}

export function TagSimple({ text, variant = 'default', ...rest }: Props) {
  return (
    <Center
      bg={
        variant === 'default'
          ? 'gray.500'
          : variant === 'primary'
          ? 'blue.700'
          : 'gray.200'
      }
      py={0.5}
      px={2}
      rounded={'full'}
      {...rest}
    >
      <Text
        fontFamily={'heading'}
        fontSize={'xs'}
        color={variant === 'default' ? 'gray.200' : 'gray.700'}
      >
        {text}
      </Text>
    </Center>
  )
}
