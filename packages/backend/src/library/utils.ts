import * as SecureStorage from 'expo-secure-store';
import { SECRET_SHARES, NUM_OF_SHARES, THRESHOLD } from './constants';
import { ethers } from 'ethers';
import type { BigNumber, BigNumberish, Wallet } from 'ethers';
import { SemaphoreSubgraph } from '@semaphore-protocol/data';
import { recoverSeedFrom } from './recovery';
import { getAutoIdFromSeed } from './did';

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
    .join('');
}

/**
 * Encodes the given string using base64 encoding.
 *
 * @param data - The string to be encoded.
 * @returns The encoded string.
 */
export function encode(data: string): string {
  return Buffer.from(data).toString('base64');
}

/**
 * Decodes a base64 encoded string.
 *
 * @param encodedData The base64 encoded string to decode.
 * @returns The decoded string.
 */
export function decode(encodedData: string): string {
  return Buffer.from(encodedData, 'base64').toString();
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
      const share = shares[randomIndex];
      if (share) {
        randomShares.push(share);
      }
    }
  }

  if (randomShares.length !== THRESHOLD) {
    throw new Error(`Random shares length is not ${THRESHOLD}`);
  }

  return randomShares;
}

/**
 * Defers the execution of a task and returns a promise that resolves with the result of the task.
 * @param task The task to be executed.
 * @returns A promise that resolves with the result of the task.
 */
export const deferTask = <T>(task: () => T) => {
  return new Promise<T>((resolve) => setTimeout(() => resolve(task())));
};

/**
 * Stores securely encrypted data in the device storage.
 * @param key - The unique identifier for the stored data.
 * @param value - The data to be stored securely. It will be serialized to JSON.
 */
export const storeSecureData = async <T>(key: string, value: T) => {
  const jsonValue = JSON.stringify(value);
  await SecureStorage.setItemAsync(key, jsonValue);
};

/**
 * Retrieves securely stored data from the device storage.
 * @param key - The unique identifier for the data to retrieve.
 * @returns The retrieved data of the specified type, or undefined if not found.
 */
export const getSecureData = async <T>(key: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const value = await SecureStorage.getItemAsync(key);
    if (value !== null) {
      return JSON.parse(value) as T;
    }
    return undefined;
  } catch (e) {
    throw e;
  }
};

/**
 * Stores an array of secure shares in the device storage.
 * @param shares - An array of Uint8Array shares to be stored securely.
 */
export const storeSecureShares = (shares: Uint8Array[]) => {
  const promises = shares.map((share, index) => {
    const strShares = JSON.stringify([...share]);
    return storeSecureData(`${SECRET_SHARES}_${index}`, strShares);
  });
  return Promise.all(promises);
};

/**
 * Retrieves securely stored shares from device storage.
 * @returns An array of Uint8Array shares retrieved from storage.
 * @throws Error if any share is not found.
 */
export const getSecureStoredShares = async () => {
  const sharesIndex = new Array(NUM_OF_SHARES).fill(null);
  const promises = sharesIndex.map(async (_, index) => {
    const value = await SecureStorage.getItemAsync(`${SECRET_SHARES}_${index}`);
    if (value !== null) {
      const strShare = JSON.parse(value) as string;
      return new Uint8Array(JSON.parse(strShare));
    }
    throw new Error('Secret shares could not be found!');
  });
  const resolvedResult = await Promise.all(promises);
  return resolvedResult.filter((result) => !!result).flat();
};

// Check if the signer has enough balance to send transactions
export async function checkBalance(
  user: string,
  provider: ethers.providers.JsonRpcProvider
) {
  const [gasPrice, balance] = await Promise.all([
    provider.getGasPrice(),
    provider.getBalance(user),
  ]);

  // Check if the signer has enough required gas
  if (balance.lt(gasPrice.mul(21000))) {
    throw Error(
      `The address ${user} does not have sufficient balance to send transactions`
    );
  }
}

/**
 * Retrieves the balance of a specified user address or the address generated from the recovered seed phrase.
 *
 * @param {ethers.providers.JsonRpcProvider} provider - The JSON-RPC provider to use for the operation.
 * @param {string} [userAddress] - The address of the user to retrieve the balance for. If not provided, the function will attempt to recover the seed phrase and derive the address from it.
 *
 * @returns {Promise<BigNumber>} - A promise that resolves to the balance of the specified address.
 *
 * @throws {Error} - Throws an error if the seed phrase cannot be recovered or if the address derived from the seed phrase is not found.
 */
export async function viewNovaBalanceOf(
  provider: ethers.providers.JsonRpcProvider,
  userAddress?: string
): Promise<BigNumber> {
  try {
    // If userAddress is provided, directly get the balance and return
    if (userAddress) {
      const balance = await provider.getBalance(userAddress);
      return balance;
    }

    // If userAddress is not provided, proceed with existing logic
    const recoveredSeedPhrase = await recoverSeedFrom();
    if (!recoveredSeedPhrase) {
      throw Error('ViewBalanceOf: Seed phrase not found!');
    }

    // get the signer & then address (from Nova chain) if available with the recovered seed phrase
    const myWallet: Wallet = ethers.Wallet.fromMnemonic(
      recoveredSeedPhrase as string,
      `m/44'/60'/0'/0/0`
    ).connect(provider);

    if (myWallet.address === '0') {
      throw new Error(
        `${provider.network.name} Address not found for the recovered seed phrase`
      );
    }

    const balance = await provider.getBalance(myWallet.address);
    return balance;
  } catch (error) {
    throw new Error(`Error thrown during viewing balance: ${error}`);
  }
}

// Approach-1
// Using `SemaphoreSubgraph`
// Doc: https://www.notion.so/subspacelabs/Semaphore-61b59172253b4bc88872a8559aafb0ba?pvs=4#fc2880da2cb14d0bb8501f15e793f42d
export async function approach1(
  groupId: BigNumberish,
  identityCommitment: bigint
): Promise<boolean> {
  const semaphoreSubgraph = new SemaphoreSubgraph(
    'https://subgraph.satsuma-prod.com/c74ef9357a5b/subspace/semaphore-test/version/v0.0.1-new-version/api'
  );
  // using `SemaphoreSubgraph`
  return await semaphoreSubgraph.isGroupMember(
    groupId.toString(),
    identityCommitment.toString()
  );
}

interface SeedAutoId {
  recoveredSeedPhrase: string;
  autoId: string | bigint;
}

// recover and validate auto ID on Nova
export async function recoverAndValidateAutoId(): Promise<SeedAutoId> {
  // recover seed phrase from SSS shares stored in local DB
  const recoveredSeedPhrase = await recoverSeedFrom();
  if (!recoveredSeedPhrase) {
    throw new Error('Seed phrase not recovered');
  }

  // generate the Auto ID from the seed phrase
  const autoId = getAutoIdFromSeed(recoveredSeedPhrase as string);
  if (!autoId) {
    throw new Error("Auto ID doesn't exist");
  }

  // Ensure the user had already registered
  // FIXME: Issue: https://github.com/subspace/auto-mobile/issues/28
  // if (!(await isAutoIdVerified(autoId))) {
  //   throw new Error(`Auto ID ${autoId} is not verified`);
  // }

  return { recoveredSeedPhrase, autoId };
}
