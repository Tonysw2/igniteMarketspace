import { IPressableProps, Pressable, useTheme } from 'native-base'
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons'

type Props = IPressableProps & {
  icon: keyof typeof Icons.glyphMap
}

export function ButtonIcon({ icon, ...rest }: Props) {
  const { colors } = useTheme()

  return (
    <Pressable {...rest}>
      <Icons
        name={icon}
        size={24}
        color={colors.gray[200]}
      />
    </Pressable>
  )
}
