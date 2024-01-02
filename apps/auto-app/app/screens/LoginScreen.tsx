import { observer } from "mobx-react-lite"
import React, { FC, useRef } from "react"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(props) {
  const authPasswordInput = useRef<TextInput>(null)
  const {
    authenticationStore: { fullname, setFullname, validationError },
  } = useStores()

  function login() {
    if (validationError) {
      return
    }
    props.navigation.navigate("SetupAutoId")

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    // setIsSubmitted(false)
    // setFullname("")

    // We'll mock this with a fake token.
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
      header
    >
      <Text text="Personal Details" preset="heading" style={$signIn} />
      <Text
        preset="default"
        text="We need some info from you to get started"
        style={$enterDetails}
      />

      <View style={$formContainer}>
        <TextField
          value={fullname}
          onChangeText={setFullname}
          containerStyle={$textField}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="John Doe"
          helper={validationError}
          status={validationError ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <Button text="Confirm" style={$tapButton} preset="reversed" onPress={login} />
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.primary500,
  borderRadius: spacing.xl,
  width: 200,
}

const $formContainer: ViewStyle = {
  marginTop: 80,
}
