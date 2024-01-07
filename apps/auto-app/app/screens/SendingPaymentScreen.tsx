import { observer } from "mobx-react-lite"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { ProgressBar } from "../components/ProgressBar/ProgressBar"
import { TransactionHander } from "../components/Transaction/TransactionHeader"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useAsyncIncrementalNumber } from "../utils/useAsyncIncrementalNumber"

interface SendingPaymentProps extends AppStackScreenProps<"SendingPayment"> {}

export const SendingPaymentScreen = observer((props: SendingPaymentProps) => {
  const { transaction } = useStores()

  const asyncFunction = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined)
        props.navigation.navigate("Wallet", {
          screen: "WalletWelcome",
          params: { screen: "PaymentDone" },
        })
      }, 1500)
    })
  }

  const progress = useAsyncIncrementalNumber(asyncFunction, 10)

  const onCancel = () => {
    props.navigation.goBack()
  }

  return (
    <Screen
      style={$screenContentContainer}
      safeAreaEdges={["top"]}
      header={<TransactionHander goBack={() => props.navigation.goBack()} />}
    >
      <View style={$loaderContainer}>
        <Text preset="subheading" size="sm" style={$textStyle}>
          Sending{" "}
          <Text preset="bold" style={$textStyle}>
            {transaction.amount}
          </Text>{" "}
          {transaction.currency} to{" "}
          <Text preset="bold" style={$textStyle}>
            {transaction.fullName}
          </Text>
        </Text>
        <ProgressBar
          style={$progressStyle}
          padded={false}
          height={16}
          progress={progress * 100}
          outerBackgroundColor="#FFFFFF"
        />
        <Text size="xs" weight="light" style={$textStyle}>
          Transaction Submitted
        </Text>
      </View>
      <View style={$actionsContainer}>
        <Button style={$cancelButton} onPress={onCancel}>
          Cancel
        </Button>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $loaderContainer: ViewStyle = {
  backgroundColor: "#e0ddf5",
  borderRadius: 20,
  height: 196,
  paddingHorizontal: 16,
  paddingVertical: 24,
  alignItems: "center",
  marginTop: 160,
}

const $textStyle: TextStyle = {
  color: colors.palette.primary500,
}

const $progressStyle: ViewStyle = {
  height: 12,
  marginBottom: 24,
  marginTop: 32,
}

const $actionsContainer: ViewStyle = {
  marginTop: 192,
  alignItems: "center",
}

const $cancelButton: ViewStyle = {
  marginTop: spacing.xs,
  borderRadius: spacing.xl,
  width: 164,
  borderColor: colors.palette.primary100,
}
