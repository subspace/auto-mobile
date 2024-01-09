/**
 * Generate Auto wallet for an individual as unified account with
 * multiple addresses on Subspace Network (consensus + domains).
 */
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { generateAutoWallet } from '../library/wallet';

async function main() {
  console.log(
    '\n=======Generate Auto Wallet (Unified Subspace account)========'
  );
  await cryptoWaitReady(); // Wait for WASM crypto initialization
  const [autoWallet, txHash] = await generateAutoWallet(5);
  console.log('Subspace address:', autoWallet.subspaceAddress);
  console.log('EVM addresses:', autoWallet.evmAddresses);
  console.log('Auto ID:', autoWallet.autoId);
  console.log(`Transaction hash for adding the new user to group: ${txHash}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
