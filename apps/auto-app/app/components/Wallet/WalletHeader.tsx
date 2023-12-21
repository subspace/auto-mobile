import { Feather } from "@expo/vector-icons"
import React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { useStores } from "../../models"
import { colors, spacing } from "../../theme"
import { Icon } from "../Icon"

export const WalletHeader = () => {
  const {
    authenticationStore: { logout },
  } = useStores()

  return (
    <View style={$headerWrapperContainer}>
      <View style={$headerContainer}>
        <Icon icon="subspace" style={$iconStyle} />
      </View>
      <Feather style={$signoutStyle} name="log-out" size={28} onPress={logout} />
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
