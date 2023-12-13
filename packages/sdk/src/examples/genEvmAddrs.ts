/**
 * Generate EVM addresses (following BIP-32) from a seed phrase
 */

import { generateEvmAddressesFromSeed } from '../library/wallet';

function main() {
  console.log('\n=======Generate EVM addresses from seed phrase========');

  const seedPhrase =
    'lock frost nation imitate party medal knee cigar rough wine document immense';
  console.log('Seed phrase:', seedPhrase);

  const addresses = generateEvmAddressesFromSeed(seedPhrase, 5);
  console.log('Addresses:', addresses);
}

main();
