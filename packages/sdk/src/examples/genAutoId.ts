/**
 * Get auto id
 */

import { getAutoIdFromSeed } from '../lib/did';

function main() {
  console.log('\n=======Generate Auto ID from seed phrase========');
  const seedPhrase =
    'lock frost nation imitate party medal knee cigar rough wine document immense';
  console.log('Seed phrase:', seedPhrase);

  const autoId = getAutoIdFromSeed(seedPhrase);
  console.log('Auto ID:', autoId);
}

main();
