import React, { useState } from "react"

import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Text, Toggle } from "../../components"

import { colors, spacing } from "../../theme"

import { CurrencySelect } from "../../components/Transaction/CurrencySelect"

export type FeeType = "fee1" | "fee2"

export interface ContactDetailsProps {
  onConfirm?: () => void
}
export const ContactDetails = ({ onConfirm }: ContactDetailsProps) => {
  const [conversionRate, setConversionRate] = useState<FeeType>("fee2")

  const onFeeSelection = (value: FeeType) => {
    setConversionRate(value)
  }

  return (
    <View style={$selectedContactContainer}>
      <Text preset="bold" size="lg" style={$textStyle}>
        Details
      </Text>
      <View>
        <Text style={$textStyle} size="sm">
          Blockchain Types:
        </Text>
        <Text style={$textStyle} size="sm" preset="bold">
          Ethereum, Bitcoin
        </Text>
      </View>
      <View>
        <Text style={$textStyle} size="sm">
          Preferred Currencies:
        </Text>
        <View>
          <CurrencySelect data={["BTC", "ETH"]} />
        </View>
      </View>
      <View>
        <Text style={$textStyle} preset="bold" size="sm">
          Conversion Preferred
        </Text>
        <View style={$conversionPreferredContainer}>
          <View style={$conversionPreferredItemContainer}>
            <View>
              <Text style={$textStyle} size="xs">
                Transaction fee:{" "}
                <Text style={$textStyle} size="xs" preset="bold">
                  0.0001
                </Text>{" "}
                BNB - $
                <Text style={$textStyle} size="xs" preset="bold">
                  5
                </Text>
              </Text>
            </View>
            <View>
              <Toggle
                onPress={() => onFeeSelection("fee1")}
                variant="checkbox"
                value={conversionRate === "fee1"}
                inputOuterStyle={$checkboxStyle}
              />
            </View>
          </View>
          <View style={$conversionPreferredItemContainer}>
            <View>
              <Text style={$textStyle} size="xs">
                Transaction fee:{" "}
                <Text style={$textStyle} size="xs" preset="bold">
                  0.0002
                </Text>{" "}
                BNB - $
                <Text style={$textStyle} size="xs" preset="bold">
                  10
                </Text>
              </Text>
            </View>
            <View>
              <Toggle
                onPress={() => onFeeSelection("fee2")}
                variant="checkbox"
                value={conversionRate === "fee2"}
                inputOuterStyle={$checkboxStyle}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={$confirmWrapper}>
        <Button style={$confirmButton} preset="reversed" onPress={onConfirm}>
          Confirm
        </Button>
      </View>
    </View>
  )
}

const $selectedContactContainer: ViewStyle = {
  rowGap: 12,
}

const $conversionPreferredContainer: ViewStyle = {
  rowGap: 8,
}

const $conversionPreferredItemContainer: ViewStyle = {
  flexDirection: "row",
  columnGap: 8,
  alignItems: "center",
  justifyContent: "space-between",
}

const $textStyle: TextStyle = {
  color: colors.palette.primary500,
}

const $checkboxStyle: ViewStyle = { height: 24, width: 24 }

const $confirmWrapper: ViewStyle = {
  marginTop: 24,
  alignItems: "center",
  justifyContent: "center",
}
const $confirmButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.primary500,
  borderRadius: spacing.xl,
  width: 164,
}
