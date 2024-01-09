import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Screen, Text } from "../components"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

import { WalletHeader } from "../components/Wallet/WalletHeader"
import { WalletTabBar } from "../components/WalletTabBar"
import { ProfileScreen } from "../screens/Wallet/ProfileScreen"
import { WalletWallecomeParamList, WalletWelcomeNavigator } from "./WalletWelcomeNavigator"

export type TransactionParamList = {
  SearchFriend: undefined
  SendPayment: { selectedAutoId?: string; fullName?: string }
  LastDetails: undefined
  SendingPayment: undefined
  PaymentDone: undefined
}

export type WalletTabParamList = {
  WalletHome: undefined
  WalletFaceId: undefined
  WalletWelcome: NavigatorScreenParams<WalletWallecomeParamList>
  WalletProfile: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type WalletTabScreenProps<T extends keyof WalletTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<WalletTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<WalletTabParamList>()

export function WalletNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      initialRouteName="WalletWelcome"
      tabBar={(props) => {
        console.log("walletTabbar")
        return <WalletTabBar {...props} />
      }}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="WalletHome"
        component={function Home() {
          return (
            <Screen safeAreaEdges={["top"]} header={<WalletHeader />}>
              <View style={$container}>
                <Text style={$section} preset="heading">
                  Home
                </Text>
              </View>
            </Screen>
          )
        }}
      />

      <Tab.Screen
        name="WalletFaceId"
        component={function FaceId() {
          return (
            <Screen safeAreaEdges={["top"]} header={<WalletHeader />}>
              <View style={$container}>
                <Text style={$section} preset="heading">
                  Auto ID
                </Text>
              </View>
            </Screen>
          )
        }}
      />

      <Tab.Screen name="WalletWelcome" component={WalletWelcomeNavigator} />

      <Tab.Screen name="WalletProfile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}

const $container: ViewStyle = {
  paddingHorizontal: 24,
  height: "100%",
}

const $section: ViewStyle = {
  marginTop: 48,
  marginVertical: 48,
}
