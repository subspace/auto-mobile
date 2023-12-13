/**
 * Seed Recovery using Threshold schemes like Shamir's Secret Sharing (SSS)
 * that breaks a seed phrase into shares and distributes them to either
 * p2p (non-trusted) or friends (trusted) setup.
 * The shares can be recovered to reconstruct the seed phrase.
 *
 * As it's a GF(2^8) scheme, the shares count can be of:
 * - Maximum shares: 255
 * - Minimum shares: 2
 *
 * Here,
 * - no. of shares = 255 (max. 'n' used to ensure at least 'k' nodes availability).
 * - threshold = 10 (not too low like 2 (min) where both could collate & retrieve the secret).
 *
 *
 * More on this: https://www.notion.so/subspacelabs/Account-Recovery-Technical-c9a23398a96b4c7c999ba1e239479b8d#1c8f8e2ca12345b6b080e591525487eb
 */

import { NUM_OF_SHARES, THRESHOLD } from './constants';
import { combine, split } from '../shamir-secret-sharing';
import { Uint8ArrayToAsciiString, toUint8Array } from './utils';
/**
 * Generate SSS shares from a seed phrase
 *
 * @param seedPhrase The seed phrase
 * @returns The SSS shares
 */
export async function generateSssSharesFrom(
  seedPhrase: string
): Promise<Uint8Array[]> {
  // TODO:
  // convert to 8-bit bytes i.e. byte array
  const secret = toUint8Array(seedPhrase);
  const shares = await split(secret, NUM_OF_SHARES, THRESHOLD);

  // NOTE: Base64 encoding or toString not used as there was an issue related to different size of shares
  // during encoding/conversion. Thereby, needed to pad the shares to the same length. So, we don't use either.

  // TODO: write/distribute shares to trusted/non-trusted setup
  // Here, we need to maintain a DB that stores the nodes for each user.

  return shares;
}

/**
 * Recover seed phrase from SSS shares
 *
 * @param shares The SSS shares at least {THRESHOLD} shares
 * @returns The reconstructed seed phrase as ASCII string
 */
export async function recoverSeedFrom(shares: Uint8Array[]): Promise<string> {
  if (shares.length < THRESHOLD) {
    throw new Error(`At least ${THRESHOLD} shares are required for recovery`);
  }
  // TODO: read/retrieve/fetch shares (string) from trusted/non-trusted setup

  // reconstruct the secret
  const reconstructedSeedPhrase = await combine(shares);

  // Convert Uint8Array to ASCII string
  const seedPhrase = Uint8ArrayToAsciiString(reconstructedSeedPhrase);

  return seedPhrase;
}
