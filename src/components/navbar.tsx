import React, { useCallback } from 'react'
import { HStack, IconButton, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'

const NavBar = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  return (
    <HStack w="full" h={40} alignItems="center" alignContent="center" p={4}>
      <TouchableOpacity onPress={handlePressMenuButton}>
        <Text>MENU</Text>
      </TouchableOpacity>
    </HStack>
  )
}

export default NavBar
