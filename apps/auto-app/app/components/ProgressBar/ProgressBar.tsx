import { LinearGradient } from "expo-linear-gradient"
import * as React from "react"
import { StyleSheet, View, ViewStyle } from "react-native"

interface ProgressBarProps {
  progress: number
  height?: number
  outerBackgroundColor?: string
  innerBackgroundColor?: string
  padded?: boolean
  style?: ViewStyle
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  outerBackgroundColor,
  innerBackgroundColor,
  padded = true,
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          height,
          backgroundColor: outerBackgroundColor,
          paddingHorizontal: padded ? 3 : 0,
        },
      ]}
    >
      <LinearGradient
        colors={["#4A237F", "#9A21D3"]}
        start={[0, 1]}
        end={[1, 0]}
        style={[
          styles.content,
          {
            height: padded ? height / 2 : height,
            backgroundColor: innerBackgroundColor,
            width: `${progress}%`,
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    borderRadius: 16,
    justifyContent: "center",
    width: "100%",
  },
  content: {
    borderRadius: 16,
  },
})
