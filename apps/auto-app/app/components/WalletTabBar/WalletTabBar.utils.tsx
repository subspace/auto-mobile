import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { View, ViewStyle } from "react-native"
import { colors } from "../../theme"

const $iconLine: ViewStyle = {
  width: 24,
  borderWidth: 1,
  borderColor: colors.palette.primary500,
}
const $iconContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  rowGap: 2,
}

export function getTabBarIcon(routeName: string, focused: boolean) {
  console.log({ routeName })
  const iconSize = 28 // Customize the icon size as needed

  switch (routeName) {
    case "WalletHome":
      return (
        <View style={$iconContainer}>
          <AntDesign
            name="home"
            size={iconSize}
            color={colors.palette.primary500} // Customize active and inactive colors
          />
          {focused ? <View style={$iconLine} /> : null}
        </View>
      )
    case "WalletFaceId":
      return (
        <View style={$iconContainer}>
          <MaterialCommunityIcons
            name="face-recognition"
            size={iconSize}
            color={colors.palette.primary500}
          />
          {focused ? <View style={$iconLine} /> : null}
        </View>
      )

    case "WalletWelcome":
      return (
        <View style={$iconContainer}>
          <Ionicons name="wallet" size={iconSize} color={colors.palette.primary500} />
          {focused ? <View style={$iconLine} /> : null}
        </View>
      )
    case "WalletProfile":
      return (
        <View style={$iconContainer}>
          <AntDesign name="user" size={iconSize} color={colors.palette.primary500} />
          {focused ? <View style={$iconLine} /> : null}
        </View>
      )
    default:
      return null // Return a default icon or null if the route name is not recognized
  }
}
