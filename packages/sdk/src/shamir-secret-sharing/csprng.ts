import 'react-native-get-random-values';
export function getRandomBytes(numBytes: number): Uint8Array {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return crypto.getRandomValues(new Uint8Array(numBytes));
}
