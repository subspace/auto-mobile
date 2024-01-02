import { NUM_OF_SHARES, generateAutoWallet, generateSssSharesFrom, recoverSeedFrom } from "@auto/sdk";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { logger } from "react-native-logs";

const log = logger.createLogger();

export async function genAutoWallet() {
  log.info(
    "\n=======Generate Auto Wallet (Unified Subspace account)========"
  );
  await cryptoWaitReady(); // Wait for WASM crypto initialization
  const novaEvmDomainRpcApiUrl = "https://nova.gemini-3g.subspace.network/ws";
  const autoWallet = await generateAutoWallet(novaEvmDomainRpcApiUrl, 5);
  console.log("autoWallet", autoWallet)
  log.info({ autoWallet })
  log.info("Subspace address:", autoWallet.subspaceAddress);
  log.info("EVM addresses:", autoWallet.evmAddresses);
  log.info("Auto ID:", autoWallet.autoId);

  return autoWallet;
}

export async function e2eSeedRecovery() {
  log.info("\n=======E2E Seed Recovery========");
  // log.info("\n=======E2E Seed Recovery========");
  const seedPhrase =
    "lock frost nation imitate party medal knee cigar rough wine document immense";
    log.info("before generateSssSharesFrom", generateSssSharesFrom)
    const shares = await generateSssSharesFrom(seedPhrase);
    log.info("after")
  
  if (shares.length !== NUM_OF_SHARES) {
    throw new Error(`Expected ${NUM_OF_SHARES} shares but got ${shares.length}`);
  }
  
  // recover seed phrase from random shares
  const recoveredSeedPhrase = await recoverSeedFrom();
  if (recoveredSeedPhrase !== seedPhrase) {
    throw new Error(
      "Recovered seed phrase does not match the original seed phrase"
    );
  }

  // strictEqual(
  //   recoveredSeedPhrase,
  //   seedPhrase,
  //   "Recovered seed phrase does not match the original seed phrase"
  // );

  return recoveredSeedPhrase;
}
