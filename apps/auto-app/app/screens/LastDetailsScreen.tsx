import { observer } from "mobx-react-lite"
import React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { TransactionHander } from "../components/Transaction/TransactionHeader"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

export interface LastDetailsScreenProps extends AppStackScreenProps<"LastDetails"> {}
export const LastDetailsScreen = observer((props: LastDetailsScreenProps) => {
  const { transaction } = useStores()
  const onCancel = () => {
    props.navigation.navigate("Wallet", { screen: "WalletWelcome", params: { screen: "Welcome" } })
  }

  const onPay = () => {
    props.navigation.navigate("SendingPayment")
  }
  return (
    <Screen
      safeAreaEdges={["top"]}
      header={<TransactionHander goBack={() => props.navigation.goBack()} />}
    >
      <View style={$container}>
        <View style={{}}>
          <View style={$section}>
            <Text preset="heading">Last details</Text>
            <Text size="xs">Make sure that you send the right thing.</Text>
          </View>
          <View style={$textFieldWrapper}>
            <Text preset="subheading" size="sm" style={$textStyle}>
              Send{" "}
              <Text preset="bold" style={$textStyle}>
                {transaction.amount}
              </Text>{" "}
              {transaction.currency} to{" "}
              <Text preset="bold" style={$textStyle}>
                {transaction.fullName}
              </Text>
            </Text>
            <TextField
              keyboardAppearance="dark"
              value={transaction.amount?.toString()}
              RightAccessory={(props) => (
                <TouchableOpacity {...props} style={{ ...props.style }}>
                  <Text preset="bold" size="sm" style={$textStyle}>
                    {transaction.currency}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={$textFieldHelperText}>
              <Text style={$textStyle} size="xxs">
                {transaction.amount} = $
                {(Number(transaction.amount) * (transaction.rateExchange ?? 1)).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        <View style={$actionsContainer}>
          <View style={$actionsWrapper}>
            <Button style={$cancelButton} onPress={onCancel}>
              Cancel
            </Button>
            <Button style={$payButton} preset="reversed" onPress={onPay}>
              Pay
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
  paddingBottom: 64,
  height: "100%",
  justifyContent: "space-between",
}

const $section: ViewStyle = {
  marginVertical: 24,
  padding: 4,
}

const $textFieldWrapper: ViewStyle = {
  marginTop: 12,
  backgroundColor: "#e6e3f7",
  borderRadius: 16,
  paddingVertical: 20,
  paddingHorizontal: 20,
  rowGap: 8,
}

const $textFieldHelperText: ViewStyle = {
  paddingHorizontal: 12,
  paddingTop: 4,
}

const $textStyle: TextStyle = {
  color: colors.palette.primary500,
}

const $payButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.primary500,
  borderRadius: spacing.xl,
  width: 164,
}

const $cancelButton: ViewStyle = {
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
