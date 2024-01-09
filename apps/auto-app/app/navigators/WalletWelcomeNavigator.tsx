import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { WalletWelcomeScreen } from "../screens"
import { PaymentDoneScreen } from "../screens/Wallet/PaymentDoneScreen"
import { SearchFriendScreen } from "../screens/Wallet/SearchFriendScreen"
import { colors } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type WalletWallecomeParamList = {
  Welcome: undefined
  SearchFriend: undefined
  PaymentDone: undefined
}

export type WalletWelcomeStackScreenProps<T extends keyof WalletWallecomeParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<WalletWallecomeParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >

const Stack = createNativeStackNavigator<WalletWallecomeParamList>()

export const WalletWelcomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={WalletWelcomeScreen} />
      <Stack.Screen name="SearchFriend" component={SearchFriendScreen} />
      <Stack.Screen name="PaymentDone" component={PaymentDoneScreen} />
    </Stack.Navigator>
  )
}
