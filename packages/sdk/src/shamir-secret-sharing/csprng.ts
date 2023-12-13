import 'react-native-get-random-values';
export function getRandomBytes(numBytes: number): Uint8Array {
  // @ts-expect-error
  return crypto.getRandomValues(new Uint8Array(numBytes));
}
