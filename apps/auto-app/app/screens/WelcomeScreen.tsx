import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { WalletHeader } from "../components/Wallet/WalletHeader"
import { useStores } from "../models"
import { colors, spacing } from "../theme"

export const WelcomeScreen: FC = observer(function WelcomeScreen(_props) {
  const {
    authenticationStore: { fullname },
  } = useStores()

  return (
    <Screen header={<WalletHeader />} preset="auto" safeAreaEdges={["top", "bottom"]}>
      <View style={$container}>
        <View style={$section}>
          <Text preset="heading">Hello {fullname}</Text>
          <Text preset="default">Ready to make a payment?</Text>
        </View>
        <View style={$balanceSection}>
          <Text preset="subheading">Your Balance:</Text>
          <View style={$balanceRow}>
            <Text preset="subheading">$ </Text>
            <Text preset="heading" style={$balanceAmoutStyle}>
              160,000
            </Text>
          </View>
          <View style={$balanceDivider} />
        </View>
        <View style={$emptyWalletSection}>
          <View style={$emptyWallet}>
            <Text style={$emptyWalletText}>Your wallet is empty. Add your crypto here</Text>
          </View>
        </View>
        <View style={$makeTransactionWrapper}>
          <Button style={$makeTransactionButton} preset="reversed" text="Make a Transaction" />
        </View>
      </View>
      {/* <View style={$footer}>{renderIcons()}</View> */}
    </Screen>
  )
})

export function renderIcons() {
  const iconStyles: ViewStyle = {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <>
      <View style={iconStyles}>
        <AntDesign name="home" size={28} color={colors.palette.primary500} />
      </View>
      <View style={iconStyles}>
        <MaterialCommunityIcons
          name="face-recognition"
          size={28}
          color={colors.palette.primary500}
        />
      </View>
      <View style={iconStyles}>
        <Ionicons name="wallet" size={28} color={colors.palette.primary500} />
      </View>
      <View style={iconStyles}>
        <AntDesign name="user" size={28} color={colors.palette.primary500} />
      </View>
    </>
  )
}

const $container: ViewStyle = {
  paddingHorizontal: 24,
  height: "100%",
}

const $section: ViewStyle = {
  marginTop: 48,
  marginVertical: 48,
}

const $balanceSection: ViewStyle = {
  marginVertical: 48,
}

const $emptyWalletSection: ViewStyle = {
  marginVertical: 48,
  justifyContent: "center",
  alignItems: "center",
}

const $makeTransactionWrapper: ViewStyle = {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}

const $makeTransactionButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.primary500,
  borderRadius: spacing.xl,
  width: 200,
}

const $emptyWalletText: TextStyle = {
  color: "#403F4666",
}

const $emptyWallet: ViewStyle = {
  width: 178,
  alignItems: "center",
}

// const $footer: ViewStyle = {
//   height: 62,
//   width: "100%",
//   backgroundColor: "#D5D1E6",
//   borderRadius: 10,
//   marginTop: "auto",
//   alignItems: "center",
//   flexDirection: "row",
//   padding: 8,
//   justifyContent: "space-between",
// }

const $balanceRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "baseline",
}

const $balanceDivider: ViewStyle = {
  borderWidth: 0.5,
  width: "100%",
  borderColor: "#3E1C6C69",
}

const $balanceAmoutStyle: TextStyle = {
  color: colors.palette.primary500,
  fontSize: 40,
}
