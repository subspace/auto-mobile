import React, { useCallback, useState } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { colors } from "../../theme"

interface CurrencySelectProps {
  initialValue?: string
  data: string[]
  onSelect?: (text: string) => void
}
export const CurrencySelect = ({ data, onSelect, initialValue }: CurrencySelectProps) => {
  const [value, setValue] = useState<string | undefined>(initialValue)

  const onSelectCurrency = useCallback((currency: string) => {
    setValue(currency)
    onSelect?.(currency)
  }, [])
  return (
    <View style={$currenciesWrapper}>
      {data.map((currency, index) => {
        const isSelected = currency === value
        const $containerStyle = [$currencyContainer, isSelected && $currencyContainerSelected]
        const $textStyle = [$currencyText, isSelected && $currencyTextSelected]
        return (
          <TouchableOpacity
            key={`${currency}_${index}`}
            style={$containerStyle}
            onPress={() => onSelectCurrency(currency)}
          >
            <Text preset="bold" style={$textStyle}>
              {currency}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
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
  width: 68,
  alignItems: "center",
}

const $currencyText: TextStyle = {
  color: colors.palette.primary500,
}

const $currencyContainerSelected: ViewStyle = {
  backgroundColor: colors.palette.primary500,
}

const $currencyTextSelected: TextStyle = {
  color: "white",
}
