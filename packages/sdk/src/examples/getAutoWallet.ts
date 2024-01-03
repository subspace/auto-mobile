/**
 * Get/Retrieve Auto Wallet (Subspace Unified account/wallet)
 */

import { getAutoWallet } from '../library/wallet';

async function main() {
  console.log('\n=======Retrieve Auto Wallet from seed phrase========');
  const seedPhrase =
    'lock frost nation imitate party medal knee cigar rough wine document immense';
  console.log('Seed phrase:', seedPhrase);

  const autoWallet = await getAutoWallet(seedPhrase, 5);
  console.log('Subspace address:', autoWallet.subspaceAddress);
  console.log('EVM addresses:', autoWallet.evmAddresses);
  console.log('Auto ID:', autoWallet.autoId);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
