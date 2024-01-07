import { observer } from "mobx-react-lite"
import React from "react"
import { Platform, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
import { TransactionHander } from "../../components/Transaction/TransactionHeader"
import { useStores } from "../../models"
import { WalletWelcomeStackScreenProps } from "../../navigators/WalletWelcomeNavigator"
import { colors, spacing } from "../../theme"

interface PaymentDoneScreenProps extends WalletWelcomeStackScreenProps<"PaymentDone"> {}

export const PaymentDoneScreen = observer((props: PaymentDoneScreenProps) => {
  const { authenticationStore, transaction } = useStores()

  const onDashboardReturn = () => {
    props.navigation.navigate("Wallet", { screen: "WalletWelcome", params: { screen: "Welcome" } })
  }
  return (
    <Screen
      safeAreaEdges={["top"]}
      header={<TransactionHander goBack={() => props.navigation.goBack()} />}
      style={$container}
    >
      <View style={$section}>
        <Text preset="heading">Congrats, {authenticationStore.fullname}!</Text>
        <Text preset="default">Your payment to {transaction.fullName} was successful</Text>
      </View>
      <View style={$detailsContainer}>
        <Text preset="subheading" size="sm" style={$textStyle}>
          {transaction.amount} {transaction.currency} or $
          {((transaction.amount ?? 0) * (transaction.rateExchange ?? 1)).toFixed(2)} was sent to{" "}
          {transaction.fullName}
        </Text>
        <TouchableOpacity>
          <Text style={$textStyle}>View Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={$textStyle}>Share this receipt with {transaction.fullName}</Text>
        </TouchableOpacity>
      </View>
      <View style={$actionsContainer}>
        <Button style={$returnDashboardButton} preset="reversed" onPress={onDashboardReturn}>
          Return to Dashboard
        </Button>
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: 24,
  height: "100%",
}

const $section: ViewStyle = {
  marginVertical: 32,
}

const $detailsContainer: ViewStyle = {
  backgroundColor: "#e0ddf5",
  borderRadius: 20,
  height: 196,
  paddingHorizontal: 16,
  paddingVertical: 24,
  alignItems: "center",
  marginTop: 92,
  rowGap: 24,
}

const $textStyle: TextStyle = {
  color: colors.palette.primary500,
}

const $actionsContainer: ViewStyle = {
  marginTop: Platform.OS === "android" ? 128 : "36%",
  alignItems: "center",
}

const $returnDashboardButton: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  borderRadius: spacing.xl,
  width: 192,
}
