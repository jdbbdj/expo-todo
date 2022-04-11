import React, { useEffect, memo } from 'react'
import { Pressable } from 'react-native'
import { Text, HStack, Box } from 'native-base'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  interpolateColor
} from 'react-native-reanimated'

interface Props {
  strikeThrough: boolean
  textColor: string
  inactiveTextColor: string
  onPress?: () => void
  children?: React.ReactNode
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
const AnimatedStack = Animated.createAnimatedComponent(HStack)
const AnimatedText = Animated.createAnimatedComponent(Text)

const AnimatedTaskLabel = memo((props: Props) => {
  const { strikeThrough, textColor, inactiveTextColor, onPress, children } =
    props

  const hstackOffset = useSharedValue(0)
  const hstackAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [{ translateX: hstackOffset.value }]
    }),
    [strikeThrough]
  )

  const textColorProgress = useSharedValue(0)
  const textColorAnimatedStyles = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      )
    }),
    [strikeThrough, textColor, inactiveTextColor]
  )

  useEffect(() => {
    const easing = Easing.out(Easing.quad)
    if (strikeThrough) {
      hstackOffset.value = withSequence(
        withTiming(4, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      )
      textColorProgress.value = withDelay(
        1000,
        withTiming(1, { duration: 400, easing })
      )
    } else {
      textColorProgress.value = withTiming(0, { duration: 400, easing })
    }
  })

  return (
    <Pressable onPress={onPress}>
      <AnimatedStack alignItems="center" style={[hstackAnimatedStyles]}>
        <AnimatedText
          style={[textColorAnimatedStyles]}
          fontSize={19}
          noOfLines={1}
          isTruncated
          px={1}
        >
          {children}
        </AnimatedText>
        <AnimatedBox position="absolute" h={1} borderBottomWidth={1} />
      </AnimatedStack>
    </Pressable>
  )
})

export default AnimatedTaskLabel
