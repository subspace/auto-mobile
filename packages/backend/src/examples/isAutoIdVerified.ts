/**
 * Is Auto Id Verified
 */

import { isAutoIdVerified, generateAutoWallet } from '../library/wallet';
import { cryptoWaitReady } from '@polkadot/util-crypto';

async function main() {
  console.log('\n=======Is Auto Id Verified========');
  await cryptoWaitReady(); // Wait for WASM crypto initialization
  const [autoWallet, txHash] = await generateAutoWallet(5);
  console.log('Auto ID:', autoWallet.autoId);
  console.log(`Transaction hash for adding the new user to group: ${txHash}`);

  const isVerified = await isAutoIdVerified(autoWallet.autoId);
  console.log(`Is Auto ID verified: ${isVerified}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
