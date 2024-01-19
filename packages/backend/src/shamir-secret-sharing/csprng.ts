import { getRandomValues } from 'expo-crypto';
export function getRandomBytes(numBytes: number): Uint8Array {
  return getRandomValues(new Uint8Array(numBytes));
}
