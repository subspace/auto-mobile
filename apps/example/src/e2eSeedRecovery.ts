import {
  NUM_OF_SHARES,
  generateSssSharesFrom,
  getRandom10Shares,
  recoverSeedFrom,
} from "@subspace/core";
import { equal, strictEqual } from "assert";

export async function e2eSeedRecovery() {
  console.log("\n=======E2E Seed Recovery========");
  const seedPhrase =
    "lock frost nation imitate party medal knee cigar rough wine document immense";
  const shares = await generateSssSharesFrom(seedPhrase);
  equal(shares.length, NUM_OF_SHARES);

  // select any random 10 shares
  const randomShares: Uint8Array[] = getRandom10Shares(shares);

  // recover seed phrase from random shares
  const recoveredSeedPhrase = await recoverSeedFrom(randomShares);

  strictEqual(
    recoveredSeedPhrase,
    seedPhrase,
    "Recovered seed phrase does not match the original seed phrase"
  );
}

// e2eSeedRecovery()
//   .catch((err) => console.error(err))
//   .finally(() => process.exit(0));