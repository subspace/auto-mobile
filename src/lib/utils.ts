/**
 * Convert string to Uint8Array
 * @param {string} data The string
 * @returns {Uint8Array} The Uint8Array
 */
export function toUint8Array(data: string): Uint8Array {
  return new TextEncoder().encode(data);
}

/**
 * Encodes the given Uint8Array data into a base64 string.
 *
 * @param data - The Uint8Array data to be encoded.
 * @returns The base64 encoded string.
 */
export function encode(data: Uint8Array): string {
  return Buffer.from(data).toString("base64");
}

/**
 * Decodes the given base64 string into a Uint8Array.
 *
 * @param encodedData - The base64 encoded string to be decoded.
 * @returns The Uint8Array data.
 */
export function decode(encodedData: string): Uint8Array {
  return Buffer.from(encodedData, "base64");
}
