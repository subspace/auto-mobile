import * as React from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { genAutoWallet } from './utils';

import { logger } from "react-native-logs";

const log = logger.createLogger();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [autoId, setAutoId] = React.useState<string | bigint>();
  const [recovery, setRecovery] = React.useState<string>();
  const [evm, setEvm] = React.useState<string[]>([])
  const handler = () => {
    async function getAuthWallet() {
      try {
        setIsLoading(true);
        const autoWallet = await genAutoWallet();
        // const recoveredSeedPhrase = await e2eSeedRecovery();
        setAutoId(autoWallet.autoId);
        setEvm(autoWallet.evmAddresses);
        // setRecovery(recoveredSeedPhrase);
      } catch (e) {
        log.error("error gen auto wallet", e);
      } finally {
        setIsLoading(false);
      }
    }
    void getAuthWallet();
  };

  return (
    <View style={styles.container}>
      <Button onPress={handler} title="Generate Recovery" />
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <>
        <Text>Auto Id: {autoId?.toString()}</Text>
        <Text>EVM: {evm.toString()}</Text>
        <Text>Recovered Seed phrase: {recovery}</Text></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
