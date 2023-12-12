import * as React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { e2eSeedRecovery, genAutoWallet } from './utils';

import { logger } from "react-native-logs";

const log = logger.createLogger();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [autoId, setAutoId] = React.useState<string | bigint>();
  const [recovery, setRecovery] = React.useState<string>();
  React.useEffect(() => {
    async function getAuthWallet() {
      try {
        setIsLoading(true);
        const autoWallet = await genAutoWallet();
        const recoveredSeedPhrase = await e2eSeedRecovery();
        setAutoId(autoWallet.autoId);
        setRecovery(recoveredSeedPhrase);
      } catch (e) {
        log.error("error gen auto wallet", e);
      } finally {
        setIsLoading(false);
      }
    }
    void getAuthWallet();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <>
        <Text>Auto Id: {autoId?.toString()}</Text>
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
