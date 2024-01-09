import { AntDesign } from "@expo/vector-icons"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { colors } from "../../theme"
import { getInitials } from "../../utils/contact"
import { formatDate } from "../../utils/formatDate"
import { Text } from "../Text"
export interface ContactItemProps {
  fullName: string
  currency: string
  amount: number | string
  latestTransactionDate: string | number | Date
  isFavorite?: boolean
  onPress?: () => void
}

export const ContactItem = ({
  fullName,
  currency,
  amount,
  latestTransactionDate,
  isFavorite,
  onPress,
}: ContactItemProps) => {
  const formattedDate = formatDate(new Date(latestTransactionDate).toISOString(), "dd.MM.yyyy")
  const initials = getInitials(fullName)
  return (
    <TouchableOpacity onPress={onPress} style={$contactResultItemContainer}>
      <View style={$avatarContactInfoContainer}>
        <View style={$avatarContainer}>
          <Text preset="bold" style={$avatarTextStyle}>
            {initials}
          </Text>
        </View>
        <View style={$contactDetailContainer}>
          <Text preset="formLabel" size="sm">
            {fullName}
          </Text>
          <Text preset="formHelper" size="xxs">
            Sent {amount} {currency} on {formattedDate}
          </Text>
        </View>
      </View>

      {isFavorite && (
        <View>
          <AntDesign name="star" size={14} color={colors.palette.primary500} />
        </View>
      )}
    </TouchableOpacity>
  )
}

const $contactResultItemContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  width: "100%",
}

const $avatarContactInfoContainer: ViewStyle = { flexDirection: "row", columnGap: 8 }

const $avatarContainer: ViewStyle = {
  borderRadius: 50,
  width: 48,
  height: 48,
  backgroundColor: "#c1bbe0",
  alignItems: "center",
  justifyContent: "center",
}

const $avatarTextStyle: TextStyle = {
  color: colors.palette.primary300,
}

const $contactDetailContainer: ViewStyle = {}
