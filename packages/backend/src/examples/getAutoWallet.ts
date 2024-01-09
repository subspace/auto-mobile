/**
 * Get/Retrieve Auto Wallet (Subspace Unified account/wallet)
 */

import { getAutoWallet } from '../library/wallet';

async function main() {
  console.log('\n=======Retrieve Auto Wallet from seed phrase========');

  const autoWallet = await getAutoWallet(5);
  console.log('Subspace address:', autoWallet.subspaceAddress);
  console.log('EVM addresses:', autoWallet.evmAddresses);
  console.log('Auto ID:', autoWallet.autoId);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
