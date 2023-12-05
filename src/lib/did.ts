/**
 * DID module
 */

import { Identity } from "@semaphore-protocol/identity";

/**
 * Generate Auto ID from a seed phrase
 *
 * @param seedPhrase seed phrase to generate the Auto ID (deterministic)
 * @returns Semaphore commitment i.e. Auto ID
 */
export function getAutoIdFromSeed(seedPhrase: string): string | bigint {
  const identity = new Identity(seedPhrase);
  return identity.commitment.toString();
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
