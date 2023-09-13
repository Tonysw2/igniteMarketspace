import {
  Checkbox,
  HStack,
  Heading,
  IModalProps,
  Modal,
  Pressable,
  Switch,
  VStack,
  useTheme,
} from 'native-base'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'
import { Tag } from './Tag'
import { Button } from './Button'
import { Dimensions } from 'react-native'

const { height } = Dimensions.get('screen')

type Props = IModalProps & {
  onCloseModal: () => void
}

export function FilterModal({ onCloseModal, ...rest }: Props) {
  const { colors } = useTheme()

  return (
    <Modal
      animationPreset="fade"
      bg={'#00000060'}
      justifyContent={'flex-end'}
      {...rest}
    >
      <VStack
        h={height / 1.5}
        w={'full'}
        bg={'gray.700'}
        rounded={'3xl'}
        pt={12}
        pb={8}
        px={6}
        justifyContent={'space-between'}
      >
        <VStack space={6}>
          <Heading
            fontFamily={'heading'}
            fontSize={'xl'}
          >
            Filtrar anúncios
          </Heading>

          <Pressable
            p={0}
            bg={'transparent'}
            position={'absolute'}
            top={0}
            right={0}
            onPress={onCloseModal}
          >
            <Icons
              name="close"
              size={24}
              color={colors.gray[400]}
            />
          </Pressable>

          <VStack space={3}>
            <Heading
              fontFamily={'heading'}
              fontSize={'sm'}
              color={'gray.200'}
            >
              Condição
            </Heading>

            <HStack space={2}>
              <Tag text="novo" />
              <Tag text="usado" />
            </HStack>
          </VStack>

          <VStack space={3}>
            <Heading
              fontFamily={'heading'}
              fontSize={'sm'}
              color={'gray.200'}
            >
              Aceita troca?
            </Heading>

            <Switch
              onTrackColor={'blue.500'}
              offTrackColor={'gray.500'}
            />
          </VStack>

          <VStack space={3}>
            <Checkbox
              value="teste"
              _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
            >
              Boleto
            </Checkbox>
            <Checkbox
              value="teste"
              _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
            >
              Pix
            </Checkbox>
            <Checkbox
              value="teste"
              _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
            >
              Dinheiro
            </Checkbox>
            <Checkbox
              value="teste"
              _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
            >
              Cartão de crédito
            </Checkbox>
            <Checkbox
              value="teste"
              _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
            >
              Depósito bancário
            </Checkbox>
          </VStack>
        </VStack>

        <HStack space={3}>
          <Button
            flex={1}
            text="Remover filtros"
            variant={'default'}
          />

          <Button
            flex={1}
            text="Aplicar filtros"
            variant={'secondary'}
          />
        </HStack>
      </VStack>
    </Modal>
  )
}
