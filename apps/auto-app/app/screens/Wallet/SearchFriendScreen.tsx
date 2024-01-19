import React, { FC, useState } from "react"

import { AntDesign } from "@expo/vector-icons"
import { View, ViewStyle } from "react-native"
import { ListView, Screen, Text, TextField } from "../../components"
import { TransactionHander } from "../../components/Transaction/TransactionHeader"

import { WalletWelcomeStackScreenProps } from "../../navigators/WalletWelcomeNavigator"
import { colors } from "../../theme"

import { observer } from "mobx-react-lite"
import { Contact, contacts } from "../../../data/contacts"
import { ContactItem } from "../../components/Contatcs/ContactItem"
import { ContactDetails } from "../../components/Transaction/ContactDetails"
import { useStores } from "../../models"

export const SearchFriendScreen: FC<WalletWelcomeStackScreenProps<"SearchFriend">> = observer(
  (props) => {
    const [searchValue, setSearchValue] = useState<string>()
    const [selectedContact, setSelectedContact] = useState<Contact>()

    const { transaction } = useStores()
    const data = contacts.filter((contact) =>
      searchValue ? contact.fullName.includes(searchValue) : true,
    )

    const onContactSelected = (contact: Contact) => {
      setSelectedContact(contact)
    }

    const onConfirm = () => {
      if (!selectedContact) return
      props.navigation.navigate("SendPayment", {
        selectedAutoId: selectedContact.fullName,
        fullName: selectedContact.fullName,
      })
      transaction.setProp("fullName", selectedContact.fullName)
      transaction.setProp("sentAutoId", selectedContact.fullName)
    }

    const inputStatus = data.length === 0 ? "error" : undefined
    const inputErrorText = "This Auto ID address doesn’t exist in your contacts"

    return (
      <Screen
        safeAreaEdges={["top"]}
        header={<TransactionHander goBack={() => props.navigation.goBack()} />}
      >
        <View style={$container}>
          <View style={$section}>
            <Text preset="heading">Search for your friend</Text>
            <Text preset="default">Various ways to search for your friends</Text>
          </View>
          <View style={$formContainer}>
            <TextField
              value={searchValue}
              onChangeText={(text) => setSearchValue(text)}
              inputWrapperStyle={$searcInputWrapper}
              placeholder="Search ..."
              RightAccessory={(props) => (
                <View {...props}>
                  <AntDesign name="qrcode" size={24} color={colors.palette.primary500} />
                </View>
              )}
              status={inputStatus}
              helper={inputStatus && inputErrorText}
              HelperTextProps={{ style: { paddingHorizontal: 8, fontSize: 14 } }}
            />
            <View style={$searchResultContainer}>
              {selectedContact ? (
                <ContactDetails onConfirm={onConfirm} />
              ) : (
                <ListView
                  estimatedItemSize={20}
                  data={data}
                  renderItem={({ item }) => (
                    <View style={$contactItemWrapper}>
                      <ContactItem
                        fullName={item.fullName}
                        currency={item.currency}
                        amount={item.amount}
                        latestTransactionDate={item.latestTransactionDate}
                        isFavorite={item.id % 2 === 1}
                        onPress={() => onContactSelected(item)}
                      />
                    </View>
                  )}
                />
              )}
            </View>
          </View>
        </View>
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  paddingHorizontal: 24,
  height: "100%",
}

const $section: ViewStyle = {
  marginVertical: 32,
}

const $formContainer: ViewStyle = {}

const $searcInputWrapper: ViewStyle = {
  backgroundColor: "#e6e3f7",
  borderColor: "#c1bbe0",
}

const $searchResultContainer: ViewStyle = {
  marginTop: 12,
  backgroundColor: "#e6e3f7",
  borderRadius: 16,
  height: "65%",
  maxHeight: "65%",
  paddingVertical: 12,
  paddingHorizontal: 20,
}

const $contactItemWrapper: ViewStyle = {
  marginVertical: 12,
}
