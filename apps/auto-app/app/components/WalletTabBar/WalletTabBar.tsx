import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import React from "react"
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native"
import { getTabBarIcon } from "./WalletTabBar.utils"

const ListOfTabs = ["Transaction"]
export function WalletTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={$myTabBarContainer}>
      {state.routes
        .filter((route) => !ListOfTabs.includes(route.name))
        .map((route, index) => {
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
