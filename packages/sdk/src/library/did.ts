/**
 * DID module
 */

import { Identity } from '@semaphore-protocol/identity';

/**
 * Generate Auto ID (identity secret) from a seed phrase
 *
 * @param seedPhrase seed phrase to generate the Auto ID (deterministic)
 * @returns Semaphore Identity secret (trapdoor & nullifier) i.e. Auto ID
 */
export function getAutoIdFromSeed(seedPhrase: string): string | bigint {
  const identity = new Identity(seedPhrase);
  return identity.secret.toString();
}

/**
 * Generate Semaphore identity from a seed phrase
 *
 * @param seedPhrase seed phrase to generate the identity (deterministic)
 * @returns Semaphore identity
 */
export function getIdentityFromSeed(seedPhrase: string): Identity {
  const identity = new Identity(seedPhrase);
  return identity;
}
