import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Icon, Screen, Text, TextField } from "../../components"
import { WalletHeader } from "../../components/Wallet/WalletHeader"
import { useStores } from "../../models"

export const ProfileScreen: FC = () => {
  const {
    authenticationStore: { autoId, evmAddresses, subspaceAddress },
  } = useStores()

  const [showAutoId, setShowAutoId] = useState(false)
  return (
    <Screen safeAreaEdges={["top"]} style={$container} header={<WalletHeader />}>
      <View>
        <Text style={$section} preset="heading">
          Profile
        </Text>
        <View style={$formContainer}>
          <TextField
            secureTextEntry={!showAutoId}
            label="Auto ID"
            editable={false}
            style={$textInputStyle}
            inputWrapperStyle={$wrapperInputStyle}
            value={autoId}
            autoCapitalize="none"
            autoCorrect={false}
            RightAccessory={(props) => (
              <Icon
                icon={showAutoId ? "hidden" : "view"}
                color="#3E1C6C"
                onPress={() => setShowAutoId(!showAutoId)}
                containerStyle={props.style}
              />
            )}
          />
          <TextField
            label="Subspace Address"
            editable={false}
            style={$textInputStyle}
            inputWrapperStyle={$wrapperInputStyle}
            value={subspaceAddress}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={$evmAddressContainer}>
            <Text preset="formLabel">Evm Addresses</Text>
            <View style={$evmAddressFormContainer}>
              {evmAddresses.map((address) => (
                <TextField
                  key={address}
                  editable={false}
                  style={$textInputStyle}
                  inputWrapperStyle={$wrapperInputStyle}
                  value={address}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingHorizontal: 24,
  height: "100%",
}

const $section: ViewStyle = {
  marginTop: 48,
  marginVertical: 48,
}

const $wrapperInputStyle: ViewStyle = {
  borderRadius: 4,
  backgroundColor: "#e0ddf5",
  borderColor: "transparent",
  borderWidth: 0,
}

const $textInputStyle: TextStyle = {
  fontSize: 12,
  color: "#3E1C6C",
  fontWeight: "bold",
  width: "100%",
}

const $formContainer: ViewStyle = {
  rowGap: 12,
}

const $evmAddressContainer: ViewStyle = {
  rowGap: 12,
}

const $evmAddressFormContainer: ViewStyle = {
  rowGap: 12,
}
