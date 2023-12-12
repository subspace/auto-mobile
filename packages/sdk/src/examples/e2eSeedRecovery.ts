import assert from 'assert';
import { NUM_OF_SHARES } from '../constants';
import { generateSssSharesFrom, recoverSeedFrom } from '../lib/recovery';
import { getRandom10Shares } from '../lib/utils';

async function main() {
  console.log('\n=======E2E Seed Recovery========');
  const seedPhrase =
    'lock frost nation imitate party medal knee cigar rough wine document immense';
  const shares = await generateSssSharesFrom(seedPhrase);
  assert.equal(shares.length, NUM_OF_SHARES);

  // select any random 10 shares
  const randomShares: Uint8Array[] = getRandom10Shares(shares);

  // recover seed phrase from random shares
  const recoveredSeedPhrase = await recoverSeedFrom(randomShares);

  assert.strictEqual(
    recoveredSeedPhrase,
    seedPhrase,
    'Recovered seed phrase does not match the original seed phrase'
  );
}

main()
  .catch((err) => console.error(err))
  .finally(() => process.exit(0));
