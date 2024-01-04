import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { WalletHeader } from "../components/Wallet/WalletHeader"
import { useStores } from "../models"
import { colors, spacing } from "../theme"

const currencies = [
  {
    cryptoCurrency: "BTC",
    cryptoAmount: 1,
    dollarAmount: "40,000",
  },
  {
    cryptoCurrency: "BNB",
    cryptoAmount: 3,
    dollarAmount: "600",
  },
  {
    cryptoCurrency: "ETH",
    cryptoAmount: 10,
    dollarAmount: "20,000",
  },
]
export const WelcomeScreen: FC = observer(function WelcomeScreen(_props) {
  const {
    authenticationStore: { fullname },
  } = useStores()

  const [currencyIndex, setCurrentIndex] = useState(0)

  const onCurrencySelect = (idx: number) => () => {
    setCurrentIndex(idx)
  }
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
              {currencies[currencyIndex].dollarAmount}
            </Text>
          </View>
          <View style={$balanceDivider} />
        </View>
        {currencies.length ? (
          <View style={$currenciesContainer}>
            <Text preset="subheading" size="lg" style={$currencyTitle}>
              Ethereum Chain
            </Text>
            <View style={$currenciesWrapper}>
              <TouchableOpacity style={$currencyContainer} onPress={onCurrencySelect(0)}>
                <Text preset="bold" style={$currentText}>
                  3 BNB - $600
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={$currencyContainer} onPress={onCurrencySelect(1)}>
                <Text preset="bold" style={$currentText}>
                  3 BTC - $40,000
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={$currencyContainer} onPress={onCurrencySelect(2)}>
                <Text preset="bold" style={$currentText}>
                  10 ETH - $20,000
                </Text>
              </TouchableOpacity>
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
          <Button style={$makeTransactionButton} preset="reversed" text="Make a Transaction" />
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
  marginTop: 48,
  marginVertical: 48,
}

const $balanceSection: ViewStyle = {
  marginTop: 48,
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
  marginBottom: 48,
}
