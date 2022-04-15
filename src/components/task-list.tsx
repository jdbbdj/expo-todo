import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import { Text } from 'native-base'
import {
  PanGestureHandlerProps,
  ScrollView
} from 'react-native-gesture-handler'
import TaskItem from './task-item'
import { makeStyledComponents } from '../utils/styled'

const TaskList = () => {
  return <Text>Hey IM LIST</Text>
}

export default TaskList
