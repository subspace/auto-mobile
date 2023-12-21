import { Entypo } from "@expo/vector-icons"
import * as clipboard from "expo-clipboard"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Alert, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface RecoveryPhraseScreenProps extends AppStackScreenProps<"RecoveryPhrase"> {}

export const RecoveryPhraseScreen = observer(function RecoveryPhraseScreen(
  props: RecoveryPhraseScreenProps,
) {
  const { recoveryStore } = useStores()
  const word1Input = React.useRef<TextInput>()

  const onSubmit = React.useCallback(async () => {
    if (seedPhraseCheckError) {
      Alert.alert("Please make sure you've filled all the inputs")
      return
    }
    // console.log("words", recoveryStore.seedPhrase, recoveryStore.validationError)

    props.navigation.navigate("Wallet", { screen: "WalletWelcome" })
  }, [recoveryStore.seedPhrase, recoveryStore.validationError])

  const seedPhraseCheckError = !!recoveryStore.validationError

  const onCopySeedPhrase = React.useCallback(() => {
    if (seedPhraseCheckError) {
      Alert.alert("Please make sure you've filled all the inputs")
      return
    }
    clipboard.setStringAsync(recoveryStore.seedPhrase)
  }, [seedPhraseCheckError, recoveryStore.seedPhrase])
  return (
    <Screen preset="auto" style={$screenContentContainer} safeAreaEdges={["top", "bottom"]} header>
      <Text text="Recovery Phrase" preset="heading" style={$titleStyle} />
      <Text preset="default" text="We will store this on our end for you" style={$subTitleStyle} />

      <View style={$formContainer}>
        <TextField
          style={$textInputStyle}
          inputWrapperStyle={$wrapperInputStyle}
          value={recoveryStore.word1}
          onChangeText={recoveryStore.setWord1}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Word 1"
          onSubmitEditing={() => word1Input.current?.focus()}
        />
        <TextField
          style={$textInputStyle}
          inputWrapperStyle={$wrapperInputStyle}
          value={recoveryStore.word2}
          onChangeText={recoveryStore.setWord2}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Word 2"
          onSubmitEditing={() => word1Input.current?.focus()}
        />
        <TextField
          style={$textInputStyle}
          inputWrapperStyle={$wrapperInputStyle}
          value={recoveryStore.word3}
          onChangeText={recoveryStore.setWord3}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Word 3"
          onSubmitEditing={() => word1Input.current?.focus()}
        />
        <TextField
          style={$textInputStyle}
          inputWrapperStyle={$wrapperInputStyle}
          value={recoveryStore.word4}
          onChangeText={recoveryStore.setWord4}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Word 4"
          onSubmitEditing={() => word1Input.current?.focus()}
        />
        <TextField
          style={$textInputStyle}
          inputWrapperStyle={$wrapperInputStyle}
          value={recoveryStore.word5}
          onChangeText={recoveryStore.setWord5}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Word 5"
          onSubmitEditing={() => word1Input.current?.focus()}
        />
        <TextField
          style={$textInputStyle}
          inputWrapperStyle={$wrapperInputStyle}
          value={recoveryStore.word6}
          onChangeText={recoveryStore.setWord6}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Word 6"
          onSubmitEditing={() => word1Input.current?.focus()}
        />
        <TextField
          style={$textInputStyle}
          inputWrapperStyle={$wrapperInputStyle}
          value={recoveryStore.word7}
          onChangeText={recoveryStore.setWord7}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Word 7"
          onSubmitEditing={() => word1Input.current?.focus()}
        />
        <TextField
          style={$textInputStyle}
          inputWrapperStyle={$wrapperInputStyle}
          value={recoveryStore.word8}
          onChangeText={recoveryStore.setWord8}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Word 8"
          onSubmitEditing={() => word1Input.current?.focus()}
        />
        <TextField
          style={$textInputStyle}
          inputWrapperStyle={$wrapperInputStyle}
          value={recoveryStore.word9}
          onChangeText={recoveryStore.setWord9}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Word 9"
          onSubmitEditing={() => word1Input.current?.focus()}
        />
        <TextField
          style={$textInputStyle}
          inputWrapperStyle={$wrapperInputStyle}
          value={recoveryStore.word10}
          onChangeText={recoveryStore.setWord10}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Word 10"
          onSubmitEditing={() => word1Input.current?.focus()}
        />
        <TextField
          style={$textInputStyle}
          inputWrapperStyle={$wrapperInputStyle}
          value={recoveryStore.word11}
          onChangeText={recoveryStore.setWord11}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Word 11"
          onSubmitEditing={() => word1Input.current?.focus()}
        />
        <TextField
          style={$textInputStyle}
          inputWrapperStyle={$wrapperInputStyle}
          value={recoveryStore.word12}
          onChangeText={recoveryStore.setWord12}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Word 12"
          onSubmitEditing={() => word1Input.current?.focus()}
        />
      </View>
      <TouchableOpacity
        // disabled={seedPhraseCheckError}
        accessibilityRole="button"
        onPress={onCopySeedPhrase}
        style={$clipboardWrapperStyle}
      >
        <Entypo name="popup" size={16} color="#3E1C6C" />
        <Text size="sm" text="Copy Recovery Phrase" />
      </TouchableOpacity>
      <View style={$submitButtonWrapper}>
        <Button text="Confirm" style={$submitButton} preset="reversed" onPress={onSubmit} />
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $titleStyle: TextStyle = {
  marginBottom: spacing.sm,
}

const $subTitleStyle: TextStyle = {
  marginBottom: spacing.lg,
}

const $formContainer: ViewStyle = {
  backgroundColor: "#e0ddf5",
  borderRadius: 20,
  padding: 4,
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 60,
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  rowGap: 4,
  columnGap: 2,
}

const $submitButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.primary500,
  borderRadius: spacing.xl,
  width: 200,
}

const $wrapperInputStyle: ViewStyle = {
  borderRadius: 4,
  backgroundColor: "#e0ddf5",
  borderColor: "transparent",
  borderWidth: 0,
  width: 86,
}

const $textInputStyle: TextStyle = {
  fontSize: 12,
  color: "#3E1C6C",
  fontWeight: "bold",
}

const $submitButtonWrapper: ViewStyle = {
  marginTop: 24,
}

const $clipboardWrapperStyle: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  gap: 4,
  alignItems: "center",
  marginTop: 12,
  padding: 2,
}
