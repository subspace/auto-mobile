import { AntDesign } from "@expo/vector-icons"
import React from "react"
import { ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { useStores } from "../../models"
import { colors, spacing } from "../../theme"
import { Icon } from "../Icon"
import { Text } from "../Text"

export const WalletHeader = () => {
  const {
    authenticationStore: { logout },
  } = useStores()

  console.log("WalletHeader", logout)

  return (
    <View style={$headerWrapperContainer}>
      <View style={$headerContainer}>
        <Icon icon="subspace" style={$iconStyle} />
      </View>
      <View style={$rightContainer}>
        <TouchableOpacity style={$addFundsStyle}>
          <Text size="xs" weight="light" style={{ color: colors.palette.primary500 }}>
            Add Funds
          </Text>
        </TouchableOpacity>
        <AntDesign style={$signoutStyle} name="infocirlceo" size={28} />
      </View>

      {/* <MaterialCommunityIcons style={$resetStyle} name="lock-reset" size={28} /> */}
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
}

const $rightContainer: ViewStyle = {
  position: "absolute",
  right: spacing.sm,
  top: 8,
  flexDirection: "row",
  columnGap: 16,
}

const $addFundsStyle: ViewStyle = {
  borderColor: colors.palette.primary500,
  borderWidth: 0.2,
  borderRadius: 24,
  padding: 4,
  width: 96,
  alignItems: "center",
}
