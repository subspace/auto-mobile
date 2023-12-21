import * as Crypto from 'expo-crypto';

export function getRandomBytes(numBytes: number): Uint8Array {
  return Crypto.getRandomValues(new Uint8Array(numBytes));
}
