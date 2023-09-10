import { Center, Spinner } from 'native-base'

export function Loading() {
  return (
    <Center
      flex={1}
      bgColor={'gray.700'}
    >
      <Spinner
        size={'sm'}
        color={'blue.700'}
      />
    </Center>
  )
}
