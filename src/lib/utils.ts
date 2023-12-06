import assert from "assert";
import { THRESHOLD } from "./recovery";

/**
 * Convert string to Uint8Array
 * @param data The string
 * @returns The Uint8Array
 */
export function toUint8Array(data: string): Uint8Array {
  return new TextEncoder().encode(data);
}

/**
 * Converts a Uint8Array to an ASCII string.
 *
 * @param data - The Uint8Array to convert.
 * @returns The ASCII string representation of the Uint8Array.
 */
export function Uint8ArrayToAsciiString(data: Uint8Array): string {
  return Array.from(data)
    .map((byte) => String.fromCharCode(byte))
    .join("");
}

/**
 * Encodes the given string using base64 encoding.
 *
 * @param data - The string to be encoded.
 * @returns The encoded string.
 */
export function encode(data: string): string {
  return Buffer.from(data).toString("base64");
}

/**
 * Decodes a base64 encoded string.
 *
 * @param encodedData The base64 encoded string to decode.
 * @returns The decoded string.
 */
export function decode(encodedData: string): string {
  return Buffer.from(encodedData, "base64").toString();
}

/**
 * Returns an array of 10 randomly selected shares from the given array of shares.
 * @param shares - The array of shares to select from.
 * @returns An array of 10 randomly selected shares.
 */
export function getRandom10Shares(shares: Uint8Array[]): Uint8Array[] {
  const randomShares: Uint8Array[] = [];
  const randomIndices: number[] = [];
  while (randomIndices.length < THRESHOLD) {
    const randomIndex = Math.floor(Math.random() * shares.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
      randomShares.push(shares[randomIndex]);
    }
  }

  assert.equal(
    randomShares.length,
    THRESHOLD,
    `Random shares length is not ${THRESHOLD}`
  );

  return randomShares;
}
