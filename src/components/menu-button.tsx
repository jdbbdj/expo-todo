import React from 'react'
import {
  Button,
  Icon,
  useColorModeValue,
  IButtonProps,
  Text
} from 'native-base'

interface Props extends IButtonProps {
  active: boolean
  icon: string
  children: React.ReactNode
}

const TestIcon = () => {
  return (
    <Text color="white" fontSize="15px">
      Test
    </Text>
  )
}

const MenuButton = ({ active, icon, children, ...props }: Props) => {
  const colorScheme = useColorModeValue('blue', 'darkBlue')
  const inactiveTextColor = useColorModeValue('blue.500', undefined)
  const pressedBgColor = useColorModeValue('primary.100', 'primary.600')

  return (
    <Button
      size="lg"
      colorScheme={colorScheme}
      bg={active ? undefined : 'transparent'}
      _pressed={{
        bg: pressedBgColor
      }}
      _text={{
        color: active ? 'blue.50' : inactiveTextColor
      }}
      variant="solid"
      justifyContent="flex-start"
      pleftIcon={<Icon as={<TestIcon />} opacity={0.5} />}
      {...props}
    >
      {children}
    </Button>
  )
}

export default MenuButton
