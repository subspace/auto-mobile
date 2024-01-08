import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text, TextField } from "../"
import { colors } from "../../theme"

interface PaymentPadProps {
  onAmountChange?: (amount: string) => void
  rateExchange: number
  currencyAmount: number
  currency?: string
}

export const PaymentPad = ({
  onAmountChange,
  rateExchange,
  currencyAmount,
  currency = "BTC",
}: PaymentPadProps) => {
  const [amount, setAmount] = useState("0")
  const onNumberClick = (value: string) => {
    let newAmount = amount + value

    // Handle the case where '0' is followed by a dot
    if (amount === "0" && value !== ".") {
      newAmount = value
    }

    // Prevent multiple dots in the amount
    if (value === "." && amount.includes(".")) {
      return
    }

    setAmount(newAmount)
    onAmountChange?.(newAmount)
  }

  const onDeleteClick = () => {
    if (amount.length > 1) {
      setAmount((prevAmount) => prevAmount.slice(0, prevAmount.length - 1))
      onAmountChange?.(amount.slice(0, -1))
    } else {
      setAmount("0")
      onAmountChange?.("0")
    }
  }

  return (
    <View>
      <View style={$textFieldWrapper}>
        <TextField
          keyboardAppearance="dark"
          value={amount}
          RightAccessory={(props) => (
            <TouchableOpacity {...props} style={{ ...props.style }}>
              <Text preset="bold" size="sm" style={$padTextStyle}>
                MAX
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={$textFieldHelperText}>
          <Text style={$padTextStyle} size="xxs">
            {currencyAmount} {currency} - the amount that you have in your wallet
          </Text>
          <Text style={$padTextStyle} size="xxs">
            {amount} = ${(Number(amount) * rateExchange).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={$padContaier}>
        <View style={$padLineWrapper}>
          <TouchableOpacity onPress={() => onNumberClick("1")} style={$padItemWraper}>
            <Text size="xxl" style={$padTextStyle}>
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberClick("2")} style={$padItemWraper}>
            <Text size="xxl" style={$padTextStyle}>
              2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberClick("3")} style={$padItemWraper}>
            <Text size="xxl" style={$padTextStyle}>
              3
            </Text>
          </TouchableOpacity>
        </View>
        <View style={$padLineWrapper}>
          <TouchableOpacity onPress={() => onNumberClick("4")} style={$padItemWraper}>
            <Text size="xxl" style={$padTextStyle}>
              4
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberClick("5")} style={$padItemWraper}>
            <Text size="xxl" style={$padTextStyle}>
              5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberClick("6")} style={$padItemWraper}>
            <Text size="xxl" style={$padTextStyle}>
              6
            </Text>
          </TouchableOpacity>
        </View>
        <View style={$padLineWrapper}>
          <TouchableOpacity onPress={() => onNumberClick("7")} style={$padItemWraper}>
            <Text size="xxl" style={$padTextStyle}>
              7
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberClick("8")} style={$padItemWraper}>
            <Text size="xxl" style={$padTextStyle}>
              8
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberClick("9")} style={$padItemWraper}>
            <Text size="xxl" style={$padTextStyle}>
              9
            </Text>
          </TouchableOpacity>
        </View>
        <View style={$padLineWrapper}>
          <TouchableOpacity onPress={() => onNumberClick(".")} style={$padItemWraper}>
            <Text size="xxl" style={$padTextStyle}>
              .
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberClick("0")} style={$padItemWraper}>
            <Text size="xxl" style={$padTextStyle}>
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteClick} style={$padItemWraper}>
            <Ionicons name="chevron-back" size={28} color={colors.palette.primary500} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const $textFieldWrapper: ViewStyle = {
  // flexDirection: "row",
}

const $textFieldHelperText: ViewStyle = {
  paddingHorizontal: 12,
  paddingTop: 4,
}
const $padContaier: ViewStyle = {
  marginTop: 8,
}

const $padLineWrapper: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}

const $padItemWraper: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  padding: 8,
  width: 72,
  height: 68,
}

const $padTextStyle: TextStyle = {
  color: colors.palette.primary500,
}
