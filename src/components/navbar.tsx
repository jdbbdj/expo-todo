import React, { useCallback } from 'react'
import { HStack, IconButton, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import ThemeToggle from './theme-toggle'
const NavBar = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  return (
    <HStack
      w="full"
      h={40}
      alignItems="center"
      justifyContent="space-between"
      p={4}
      display="flex"
    >
      <TouchableOpacity onPress={handlePressMenuButton}>
        <Text fontSize={30}>=</Text>
      </TouchableOpacity>
      <ThemeToggle />
    </HStack>
  )
}

export default NavBar
