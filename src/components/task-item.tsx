import React, { useCallback } from 'react'
import { Pressable, TextInputChangeEventData } from 'react-native'
import { Text, NativeSyntheticEvent, TouchableOpacity } from 'react-native'
import {
  Box,
  HStack,
  useTheme,
  themeTools,
  useColorModeValue,
  Input,
  Icon
} from 'native-base'
import AnimatedCheckbox from './animated-checkbox'
import AnimatedTaskLabel from './animated-task-label'
import SwipeView from './swipable-view'

import { PanGestureHandlerProps } from 'react-native-gesture-handler'
interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  isDone: boolean
  isEditing: boolean
  onToggleCheckbox: () => void
  onPressLabel?: () => void
  onRemove?: () => void
  onChangeSubject?: (subject: string) => void
  onFinishedEditing?: () => void
  subject: string
}

const TrashIconHolder = () => {
  return (
    <TouchableOpacity>
      <Text style={{ color: 'white' }}>Delete</Text>
    </TouchableOpacity>
  )
}

const TaskItem = (props: Props) => {
  const {
    isDone,
    onToggleCheckbox,
    onPressLabel,
    onRemove,
    subject,
    simultaneousHandlers,
    isEditing,
    onChangeSubject,
    onFinishedEditing
  } = props
  const theme = useTheme()
  const highlightColor = themeTools.getColor(
    theme,
    useColorModeValue('blue.500', 'blue.400')
  )

  const boxStroke = themeTools.getColor(
    theme,
    useColorModeValue('muted.300', 'muted.500')
  )

  const checkMarkColor = themeTools.getColor(
    theme,
    useColorModeValue('white', 'white')
  )

  const activeText = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText')
  )

  const doneTextColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.600')
  )

  const handleChangeSubject = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text)
    },
    [onChangeSubject]
  )

  return (
    <SwipeView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Box
          w="full"
          h="full"
          bg="red.500"
          alignItems="flex-end"
          justifyContent="center"
          pr={4}
        >
          <Icon as={<TrashIconHolder />} color="white" size="sm" />
        </Box>
      }
    >
      <HStack
        alignItems="center"
        w="full"
        px={4}
        py={2}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
        <Box width={30} height={30} mr={2}>
          <Pressable onPress={onToggleCheckbox}>
            <AnimatedCheckbox
              highlightColor={highlightColor}
              checkmarkColor={checkMarkColor}
              boxOutlineColor={boxStroke}
              checked={isDone}
            />
          </Pressable>
        </Box>
        {isEditing ? (
          <Input
            placeholder="Tasks"
            value={subject}
            variant="unstyled"
            px={1}
            py={0}
            autoFocus
            blurOnSubmit
            onChange={handleChangeSubject}
            onBlur={onFinishedEditing}
          />
        ) : (
          <AnimatedTaskLabel
            textColor={activeText}
            inactiveTextColor={doneTextColor}
            strikeThrough={isDone}
            onPress={onPressLabel}
          >
            {subject}
          </AnimatedTaskLabel>
        )}
      </HStack>
    </SwipeView>
  )
}

export default TaskItem
