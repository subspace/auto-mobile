/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Seed Recovery using Threshold schemes like Shamir's Secret Sharing (SSS)
 * Breaks a seed phrase into shares and distributes them to IPFS peers.
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

import { split, combine } from "shamir-secret-sharing";
import { toUint8Array, Uint8ArrayToAsciiString } from "./utils";

export const NUM_OF_SHARES = 255;
export const THRESHOLD = 10;

/**
 * Write shares to IPFS peers
 *
 * @param shares The SSS shares
 */
// async function writeToIpfs(rpcApiUrl: string, shares: string[]) {}

/**
 * Read shares from IPFS peers
 * @param shares The SSS shares
 */
// async function readFromIpfs(
//   rpcApiUrl: string,
//   shares: string[]
// ): Promise<string> {
//   return "";
// }

/**
 * Generate SSS shares from a seed phrase
 *
 * @param seedPhrase The seed phrase
 * @returns The SSS shares
 */
export async function generateSssSharesFrom(
  seedPhrase: string
): Promise<Uint8Array[]> {
  // TODO: const shares = sss.splitSecret(seedPhrase, {
  // convert to 8-bit bytes i.e. byte array
  const secret = toUint8Array(seedPhrase);
  const shares = await split(secret, NUM_OF_SHARES, THRESHOLD);

  // NOTE: Base64 encoding or toString not used as there was an issue related to different size of shares
  // during encoding/conversion. Hence, needed to pad the shares to the same length. So, we don't use either.
  // Now, the shares can be stored as is in IPFS.

  // TODO: write/distribute shares (as base64 string) to IPFS peers
  // writeToIpfs(sharesAsString);

  // Then, we need to maintain a lookup table (p2p DB) of the CID of the shares
  // for the user to retrieve the shares from IPFS peers.

  return shares;
}

/**
 * Recover seed phrase from SSS shares
 *
 * @param shares The SSS shares at least 10 shares
 * @returns The reconstructed seed phrase as ASCII string
 */
export async function recoverSeedFrom(shares: Uint8Array[]): Promise<string> {
  if (shares.length < 10) {
    throw new Error(`At least ${THRESHOLD} shares are required for recovery`);
  }
  // TODO: read/retrieve/fetch shares (string) from IPFS peers
  // const shares = await readFromIpfs()

  // reconstruct the secret
  const reconstructedSeedPhrase = await combine(shares);

  // Convert Uint8Array to ASCII string
  const seedPhrase = Uint8ArrayToAsciiString(reconstructedSeedPhrase);

  return seedPhrase;
}
