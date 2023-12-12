// NOTE: As the `shamir-secret-sharing` package is not yet published,
// `index.d.ts` file needs to be generated during `$ yarn` or `$ yarn install`
// in the root folder
import assert from 'assert';
import crypto from 'crypto';
import { toUint8Array } from '../lib/utils';
import { combine, split } from '../shamir-secret-sharing';

/// Example of splitting user input
async function splitUserInput() {
  const seedPhrase =
    'lock frost nation imitate party medal knee cigar rough wine document immense';
  const secret = toUint8Array(seedPhrase);
  const [share1, share2, share3] = await split(secret, 3, 2);

  console.log('splitUserInput', { share1, share2, share3 });

  const reconstructed = await combine([share1!, share3!]);

  assert.strictEqual(
    Buffer.from(reconstructed).toString('base64'),
    Buffer.from(secret).toString('base64'),
    'Reconstructed secret does not match the original secret'
  );
}

/// Example of splitting random entropy
async function splitRandomEntropy() {
  const randomEntropy = crypto.getRandomValues(new Uint8Array(16));
  const [share1, share2, share3] = await split(randomEntropy, 3, 2);

  const reconstructed = await combine([share2!, share3!]);

  console.log('splitUserInput', { share1, share2, share3 });

  assert.strictEqual(
    Buffer.from(reconstructed).toString('base64'),
    Buffer.from(randomEntropy).toString('base64'),
    'Reconstructed secret does not match the original random entropy'
  );
}

// Example of splitting symmetric key
async function splitSymmetricKey() {
  const key = await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
  const exportedKeyBuffer = await crypto.subtle.exportKey('raw', key);
  const exportedKey = new Uint8Array(exportedKeyBuffer);
  const [share1, share2, share3] = await split(exportedKey, 3, 2);
  const reconstructed = await combine([share2!, share1!]);

  console.log('splitUserInput', { share1, share2, share3 });

  assert.strictEqual(
    Buffer.from(reconstructed).toString('base64'),
    Buffer.from(exportedKey).toString('base64'),
    'Reconstructed secret does not match the original exported key'
  );
}

async function main() {
  console.log('\n=======SSS Examples========');
  await splitUserInput();
  await splitRandomEntropy();
  await splitSymmetricKey();
}

main()
  .catch(console.error)
  .finally(() => process.exit());
