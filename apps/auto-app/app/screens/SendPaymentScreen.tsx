import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { PaymentPad } from "../components/Payment/PaymentPad"
import { CurrencySelect } from "../components/Transaction/CurrencySelect"
import { TransactionHander } from "../components/Transaction/TransactionHeader"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

export const SendPaymentScreen: FC<AppStackScreenProps<"SendPayment">> = observer((props) => {
  const { navigation, route } = props
  const { fullName, selectedAutoId } = route.params

  const { transaction } = useStores()

  const onConfirm = () => {
    if (!transaction.amount) {
      return
    }
    props.navigation.navigate("LastDetails")
  }

  const onRequest = () => {
    console.log({ fullName, selectedAutoId, navigation })
  }
  return (
    <Screen
      safeAreaEdges={["top"]}
      header={<TransactionHander goBack={() => props.navigation.goBack()} />}
    >
      <View style={$container}>
        <View style={$section}>
          <Text preset="heading">Send Payment</Text>
          <Text size="xs">Pick a currency and specify the amount to send.</Text>
        </View>
        <View style={$currencyContainer}>
          <CurrencySelect
            data={["BNB", "BTC", "ETH"]}
            initialValue="BTC"
            onSelect={(currency) => transaction.setProp("currency", currency)}
          />
        </View>
        <View style={$paymentPadWrapper}>
          <PaymentPad
            currencyAmount={3}
            currency={transaction.currency}
            rateExchange={40000}
            onAmountChange={(amount) => transaction.setProp("amount", Number(amount))}
          />
        </View>
        <View style={$actionsContainer}>
          <View style={$actionsWrapper}>
            <Button style={$requestButton} onPress={onRequest}>
              Request
            </Button>
            <Button style={$confirmButton} preset="reversed" onPress={onConfirm}>
              Confirm
            </Button>
          </View>
        </View>
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  // paddingHorizontal: 24,
  paddingTop: 24,
  paddingRight: 24,
  paddingLeft: 24,
  height: "100%",
}

const $section: ViewStyle = {
  marginVertical: 24,
}

const $currencyContainer: ViewStyle = {
  alignItems: "center",
  width: "100%",
}

const $paymentPadWrapper: ViewStyle = {
  marginTop: 8,
}

const $confirmButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.primary500,
  borderRadius: spacing.xl,
  width: 164,
}

const $requestButton: ViewStyle = {
  marginTop: spacing.xs,
  borderRadius: spacing.xl,
  width: 164,
  borderColor: colors.palette.primary100,
}

const $actionsWrapper: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  columnGap: 24,
}

const $actionsContainer: ViewStyle = {
  marginTop: 8,
  alignItems: "center",
}
