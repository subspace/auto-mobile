import { observer } from "mobx-react-lite"
import React, { useCallback, useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { WalletHeader } from "../components/Wallet/WalletHeader"
import { useStores } from "../models"
import { WalletWelcomeStackScreenProps } from "../navigators/WalletWelcomeNavigator"
import { colors, spacing } from "../theme"

export interface WalletWelcomeScreenProps extends WalletWelcomeStackScreenProps<"Welcome"> {}
export const WalletWelcomeScreen = observer(function WelcomeScreen(
  props: WalletWelcomeScreenProps,
) {
  const { navigation } = props
  const {
    authenticationStore: { fullname },
    balance,
  } = useStores()

  const makeTransactionHandler = useCallback(() => {
    navigation.navigate("SearchFriend")
  }, [navigation])

  const [currencyIndex, setCurrentIndex] = useState(0)

  const onCurrencySelect = (idx: number) => () => {
    setCurrentIndex(idx)
  }

  useEffect(() => {
    balance.fetchCurerncies()
  }, [])

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
            <Text preset="heading" style={$balanceAmountStyle}>
              {balance.currencies[currencyIndex]?.amountInDollar}
            </Text>
          </View>
          <View style={$balanceDivider} />
        </View>
        {balance.currencies.length ? (
          <View style={$currenciesContainer}>
            <Text preset="subheading" size="lg" style={$currencyTitle}>
              {balance.currencies[currencyIndex]?.title}
            </Text>
            <View style={$currenciesWrapper}>
              {balance.currencies?.map((currency, index) => (
                <TouchableOpacity
                  key={currency.id}
                  style={$currencyContainer}
                  onPress={onCurrencySelect(index)}
                >
                  <Text preset="bold" style={$currentText}>
                    {currency.amount} {currency.currencyLabel} - ${currency.amountInDollar}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={$emptyWalletSection}>
            <View style={$emptyWallet}>
              <Text style={$emptyWalletText}>Your wallet is empty. Add your crypto here</Text>
            </View>
          </View>
        )}

        <View style={$makeTransactionWrapper}>
          <Button
            style={$makeTransactionButton}
            onPress={makeTransactionHandler}
            preset="reversed"
            text="Make a Transaction"
          />
        </View>
      </View>
      {/* <View style={$footer}>{renderIcons()}</View> */}
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: 24,
  height: "100%",
}

const $section: ViewStyle = {
  marginTop: "12%",
  // marginVertical: "10%",
}

const $balanceSection: ViewStyle = {
  marginTop: "12%",
}

const $emptyWalletSection: ViewStyle = {
  marginVertical: "12%",
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

const $currencyTitle: TextStyle = {
  color: "#403F46",
  fontSize: 14,
  marginVertical: 12,
}
const $balanceAmountStyle: TextStyle = {
  color: colors.palette.primary500,
  fontSize: 40,
}

const $currenciesWrapper: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 8,
}

const $currencyContainer: ViewStyle = {
  paddingHorizontal: 12,
  paddingVertical: 8,
  backgroundColor: "#ddd9f0",
  borderRadius: 50,
  width: 160,
  alignItems: "center",
}

const $currentText: TextStyle = {
  color: colors.palette.primary500,
}

const $currenciesContainer: ViewStyle = {
  marginBottom: "8%",
}
