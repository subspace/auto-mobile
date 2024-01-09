/**
 * Is Auto Id Verified
 */

import {
  isAutoIdVerified,
  generateAutoWallet,
  registerUser,
} from '../library/wallet';
import { cryptoWaitReady } from '@polkadot/util-crypto';

async function main() {
  console.log('\n=======Is Auto Id Verified========');
  await cryptoWaitReady(); // Wait for WASM crypto initialization
  const autoWallet = await generateAutoWallet(5);
  console.log('Auto ID:', autoWallet.autoId);

  // TODO: Register the user on-chain
  const txHash = await registerUser();
  console.log(
    `Transaction hash for registering the new user onchain: ${txHash}`
  );

  const isVerified = await isAutoIdVerified(autoWallet.autoId);
  console.log(`Is Auto ID verified: ${isVerified}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
