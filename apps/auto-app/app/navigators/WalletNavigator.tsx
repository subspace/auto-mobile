import {
  BottomTabBarProps,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { Platform, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Screen, Text } from "../components"
import { WelcomeScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { WalletHeader } from "../components/Wallet/WalletHeader"

const $iconLine: ViewStyle = {
  width: 24,
  borderWidth: 1,
  borderColor: colors.palette.primary500,
}
const $iconContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  rowGap: 2,
}

export function getTabBarIcon(routeName: string, focused: boolean) {
  const iconSize = 28 // Customize the icon size as needed

  switch (routeName) {
    case "WalletHome":
      return (
        <View style={$iconContainer}>
          <AntDesign
            name="home"
            size={iconSize}
            color={colors.palette.primary500} // Customize active and inactive colors
          />
          {focused ? <View style={$iconLine} /> : null}
        </View>
      )
    case "WalletFaceId":
      return (
        <View style={$iconContainer}>
          <MaterialCommunityIcons
            name="face-recognition"
            size={iconSize}
            color={colors.palette.primary500}
          />
          {focused ? <View style={$iconLine} /> : null}
        </View>
      )

    case "WalletWelcome":
      return (
        <View style={$iconContainer}>
          <Ionicons name="wallet" size={iconSize} color={colors.palette.primary500} />
          {focused ? <View style={$iconLine} /> : null}
        </View>
      )
    case "WalletContacts":
      return (
        <View style={$iconContainer}>
          <AntDesign name="user" size={iconSize} color={colors.palette.primary500} />
          {focused ? <View style={$iconLine} /> : null}
        </View>
      )
    default:
      return null // Return a default icon or null if the route name is not recognized
  }
}

const $myTabBarContainer: ViewStyle = {
  position: "absolute",
  bottom: Platform.OS === "ios" ? 24 : 64,
  elevation: 2,
  height: 62,
  left: 24,
  right: 24,
  backgroundColor: "#dfdcf0",
  borderRadius: 10,
  alignItems: "center",
  flexDirection: "row",
  padding: 8,
  justifyContent: "space-between",
  shadowColor: "#F7F5DF0",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
}

const $touchOpacityStyle: ViewStyle = {
  flex: 1,
}
function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={$myTabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={$touchOpacityStyle}
          >
            {getTabBarIcon(route.name, isFocused)}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export type WalletTabParamList = {
  WalletHome: undefined
  WalletFaceId: undefined
  WalletWelcome: undefined
  WalletContacts: undefined
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
      tabBar={(props) => <MyTabBar {...props} />}
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

      <Tab.Screen name="WalletWelcome" component={WelcomeScreen} />

      <Tab.Screen
        name="WalletContacts"
        component={function Contacts() {
          return (
            <Screen safeAreaEdges={["top"]} header={<WalletHeader />}>
              <View style={$container}>
                <Text style={$section} preset="heading">
                  Profile
                </Text>
              </View>
            </Screen>
          )
        }}
      />
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
