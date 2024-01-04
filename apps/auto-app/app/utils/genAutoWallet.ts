import {
  NUM_OF_SHARES,
  generateAutoWallet,
  generateSssSharesFrom,
  recoverSeedFrom,
} from "@auto/sdk"
import { cryptoWaitReady } from "@polkadot/util-crypto"

export async function genAutoWallet() {
  await cryptoWaitReady() // Wait for WASM crypto initialization
  const [autoWallet, txHash] = await generateAutoWallet(5)

  console.log("Subspace address:", autoWallet.subspaceAddress)
  console.log("EVM addresses:", autoWallet.evmAddresses)
  console.log("Auto ID:", autoWallet.autoId)
  console.log(`Transaction hash for adding the new user to group: ${txHash}`)
  const recoveredSeedPhrase = await recoverSeedFrom()
  return { ...autoWallet, recoveredSeedPhrase }
}

export async function e2eSeedRecovery() {
  console.log("\n=======E2E Seed Recovery========")
  const seedPhrase = "lock frost nation imitate party medal knee cigar rough wine document immense"
  console.log("before generateSssSharesFrom", generateSssSharesFrom)
  const shares = await generateSssSharesFrom(seedPhrase)
  console.log("after")

  if (shares.length !== NUM_OF_SHARES) {
    throw new Error(`Expected ${NUM_OF_SHARES} shares but got ${shares.length}`)
  }

  // recover seed phrase from random shares
  const recoveredSeedPhrase = await recoverSeedFrom()
  if (recoveredSeedPhrase !== seedPhrase) {
    throw new Error("Recovered seed phrase does not match the original seed phrase")
  }

  return recoveredSeedPhrase
}
export const deferTask = <T>(task: () => T) => {
  return new Promise<T>((resolve) => setTimeout(() => resolve(task())))
}
