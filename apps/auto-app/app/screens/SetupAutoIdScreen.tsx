import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"
import { genAutoWallet } from "../utils/genAutoWallet"

interface SetupAutoIdProps extends AppStackScreenProps<"SetupAutoId"> {}

interface ProgressBarProps {
  progress: number
  height?: number
  outerBackgroundColor?: string
  innerBackgroundColor?: string
  padded?: boolean
  style?: ViewStyle
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  outerBackgroundColor,
  innerBackgroundColor,
  padded = true,
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          height,
          backgroundColor: outerBackgroundColor,
          paddingHorizontal: padded ? 3 : 0,
        },
      ]}
    >
      <LinearGradient
        colors={["#4A237F", "#9A21D3"]}
        start={[0, 1]}
        end={[1, 0]}
        style={[
          styles.content,
          {
            height: padded ? height / 2 : height,
            backgroundColor: innerBackgroundColor,
            width: `${progress}%`,
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    borderRadius: 16,
    justifyContent: "center",
    width: "100%",
  },
  content: {
    borderRadius: 16,
  },
})
function useAsyncIncrementalNumber(
  asyncFunction: () => Promise<void>,
  delay: number | undefined = 200,
): number {
  const [incrementalNumber, setIncrementalNumber] = React.useState<number>(0.01)

  React.useEffect(() => {
    let isMounted = true

    const timer = setInterval(() => {
      setIncrementalNumber((prevNumber) => {
        const nextNumber = prevNumber + 0.01
        return nextNumber <= 1 ? nextNumber : 1
      })
    }, delay)
    asyncFunction()
      .then(() => {
        if (isMounted) {
          setIncrementalNumber(1)
        }
        clearInterval(timer)
      })
      .catch(() => {
        clearInterval(timer)
      })

    return () => {
      isMounted = false
      clearInterval(timer)
    }
  }, [delay])

  return incrementalNumber
}

export const SetupAutoIdScreen = observer(function SetupAutoId(props: SetupAutoIdProps) {
  const store = useStores()
  const asyncFunction = async () => {
    try {
      await new Promise((resolve) =>
        setTimeout(async () => {
          // Simulate an asynchronous operation, e.g., fetching data from an API
          const autoWallet = await genAutoWallet() // Simulated delay
          store.authenticationStore.setAutoId(autoWallet.autoId)
          store.authenticationStore.setSubspaceAddress(autoWallet.subspaceAddress)
          store.authenticationStore.setEvmAddresses(autoWallet.evmAddresses)
          props.navigation.navigate("RecoveryPhrase")
          const seedPhraseWords = autoWallet.recoveredSeedPhrase.split(" ")
          store.recoveryStore.setWord1(seedPhraseWords[0])
          store.recoveryStore.setWord2(seedPhraseWords[1])
          store.recoveryStore.setWord3(seedPhraseWords[2])
          store.recoveryStore.setWord4(seedPhraseWords[3])
          store.recoveryStore.setWord5(seedPhraseWords[4])
          store.recoveryStore.setWord6(seedPhraseWords[5])
          store.recoveryStore.setWord7(seedPhraseWords[6])
          store.recoveryStore.setWord8(seedPhraseWords[7])
          store.recoveryStore.setWord9(seedPhraseWords[8])
          store.recoveryStore.setWord10(seedPhraseWords[9])
          store.recoveryStore.setWord11(seedPhraseWords[10])
          store.recoveryStore.setWord12(seedPhraseWords[11])
          resolve(undefined)
          return undefined
        }, 5000),
      )
    } catch (e) {
      console.log("error", { e })
      store.authenticationStore.setAutoId("")
      props.navigation.navigate("Login")
    }
  }

  const progress = useAsyncIncrementalNumber(asyncFunction, 50)

  // React.useEffect(() => {
  //   if (progress === 1) {
  //     props.navigation.navigate("RecoveryPhrase")
  //     // The number has reached 1, and the async function has completed
  //     console.log("Async operation completed")
  //   }
  // }, [progress])

  return (
    <Screen preset="auto" style={$screenContentContainer} safeAreaEdges={["top", "bottom"]} header>
      <View style={$loaderContainer}>
        <Text style={$titleStyle}>Setting Up your Account</Text>
        <ProgressBar
          style={$progressStyle}
          padded={false}
          height={16}
          progress={progress * 100}
          outerBackgroundColor="#FFFFFF"
        />
        <Text style={$progressPercentageStyle}>{Number(progress * 100).toFixed(0)}%</Text>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $loaderContainer: ViewStyle = {
  backgroundColor: "#e0ddf5",
  borderRadius: 20,
  height: 196,
  paddingHorizontal: 4,
  paddingVertical: 8,
  alignItems: "center",
  marginTop: 160,
}

const $titleStyle: TextStyle = {
  fontSize: 18,
  fontWeight: "600",
  paddingVertical: 16,
}

const $progressStyle: ViewStyle = {
  height: 12,
  marginBottom: 24,
  marginTop: 32,
}

const $progressPercentageStyle: TextStyle = {
  fontWeight: "600",
  fontSize: 16,
  marginTop: 8,
}
