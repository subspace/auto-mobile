import { AntDesign, Ionicons } from "@expo/vector-icons"
import React, { FC } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../../theme"
import { Icon } from "../Icon"

interface TransactionHeaderProps {
  goBack?: () => void
}
export const TransactionHander: FC<TransactionHeaderProps> = ({ goBack }) => {
  return (
    <View style={$headerWrapperContainer}>
      <View style={$headerContainer}>
        <Icon icon="subspace" style={$iconStyle} />
      </View>
      <AntDesign style={$signoutStyle} name="infocirlceo" size={28} />
      <Ionicons style={$resetStyle} name="chevron-back" size={28} onPress={goBack} />
    </View>
  )
}

const $headerWrapperContainer: ViewStyle = {
  justifyContent: "flex-end",
}
const $headerContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.xs,
  flexDirection: "row",
}
const $iconStyle: ImageStyle = {
  height: spacing.xl,
  width: spacing.xl,
}

const $signoutStyle: TextStyle = {
  color: colors.palette.primary500,
  position: "absolute",
  right: spacing.sm,
  top: 10,
}

const $resetStyle: TextStyle = {
  color: colors.palette.primary500,
  position: "absolute",
  left: spacing.sm,
  top: 10,
}
