/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Wallet module for Auto.
 * This module creates
 * - a new wallet with a random seed phrase with
 * addresses for consensus chain and EVM chains (based on BIP-32) and
 * an Auto ID (based on Semaphore Identity).
 * - an unified account with a unique Auto ID (based on Semaphore Identity) added
 * on-chain to one of the EVM domains (where DID registry is deployed).
 *
 * Doc: https://www.notion.so/subspacelabs/Subspace-Unified-Account-Technical-6b73858668984751bc3e10356721990b
 */

import { Keyring } from '@polkadot/api';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import type { BigNumberish } from 'ethers';
import { Contract, Wallet, ethers } from 'ethers';
import { DID_REGISTRY_ADDRESS, NOVA_RPC_URL } from './constants';
import { getAutoIdFromSeed } from './did';
import { generateSssSharesFrom, recoverSeedFrom } from './recovery';
import {
  approach1,
  checkBalance,
  deferTask,
  recoverAndValidateAutoId,
} from './utils';

// Import the DidRegistry ABI from the JSON file
import DidRegistryJson from '../../abi/DidRegistry.json';
const abi = DidRegistryJson.abi;

const provider = new ethers.providers.JsonRpcProvider(NOVA_RPC_URL);

/**
 * Generates Ethereum addresses from a given seed phrase following BIP-32.
 *
 * @param seedPhrase - The seed phrase used to generate the addresses.
 * @param numOfAddresses - The number of addresses to generate.
 * @returns An array of generated Ethereum addresses.
 */
export function generateEvmAddressesFromSeed(
  seedPhrase: string,
  numOfAddresses: number
): string[] {
  const addresses: string[] = [];
  const masterNode = ethers.utils.HDNode.fromMnemonic(seedPhrase); // Create a master node from the seed phrase

  for (let i = 0; i < numOfAddresses; i++) {
    const path = `m/44'/60'/0'/0/${i}`; // Standard Ethereum derivation path according to BIP-44
    const childNode = masterNode.derivePath(path); // Derive child node
    addresses.push(childNode.address); // Extract address from child node
  }

  return addresses;
}

/**
 * Generates a Subspace address from a given seed phrase.
 *
 * @param seedPhrase - The seed phrase used to generate the address.
 * @returns The Subspace address generated from the seed phrase.
 */
function generateSubspaceAddress(seedPhrase: string): string {
  // Create a keyring instance from the seed for the Subspace consensus chain
  const keyring = new Keyring({ type: 'sr25519' });

  // Add the user to the keyring from the seed phrase
  const user = keyring.addFromUri(seedPhrase);

  // Get the SS58 address from the keyring
  return user.address;
}

/**
 * Represents an AutoWallet object.
 */
export interface AutoWallet {
  subspaceAddress: string;
  evmAddresses: string[];
  autoId: string | bigint;
}

/**
 * Generates an AutoWallet with a unique Auto ID and performs various operations related to the wallet.
 * Random seed is used to generate the addresses for consensus chain and EVM chains (based on BIP-32).
 * NOTE: for simplicity, considered only EVM based domains
 *
 * @param numOfEvmChains The number of EVM chains to generate addresses for.
 * @returns A promise that resolves to an array containing the generated AutoWallet and the transaction hash.
 * @throws If an error occurs during Auto account generation.
 */
export async function generateAutoWallet(
  numOfEvmChains: number
): Promise<AutoWallet> {
  try {
    let seedPhrase = '',
      autoId: string | bigint = '';

    // TODO: Might remove later after confirming no security risk.
    // Loop until a valid Auto ID is generated
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // Generate a new random seed phrase
      seedPhrase = await deferTask(() => mnemonicGenerate());

      // get the Auto ID (valid that doesn't pre-existed onchain) from the seed phrase
      autoId = await deferTask(() => getAutoIdFromSeed(seedPhrase));

      // WARN: might take some time to find the unique Auto ID
      // FIXME: Issue: https://github.com/subspace/auto-mobile/issues/28
      // Check for a valid/unique Auto ID
      // const isAutoIdPreExist = await isAutoIdVerified(autoId);

      // if (!isAutoIdPreExist) {
      // break the loop if the Auto ID doesn't pre-exist onchain
      // break;
      // }
      break;
    }

    // store the seed phrase
    await generateSssSharesFrom(seedPhrase);

    // Get the Subspace address, the EVM addresses from the seed phrase (BIP-32)
    const [subspaceAddress, evmAddresses] = await Promise.all([
      deferTask(() => generateSubspaceAddress(seedPhrase)),
      deferTask(() => generateEvmAddressesFromSeed(seedPhrase, numOfEvmChains)),
    ]);

    return { subspaceAddress, evmAddresses, autoId };
  } catch (error) {
    throw new Error(`Error thrown during Auto wallet generation: ${error}`);
  }
}

/**
 * This function registers a user on the blockchain using a recovered seed phrase by adding
 * the Auto ID to the group on-chain to one of the EVM domains (where DID registry is deployed) i.e. Nova domain
 *
 * NOTE: The signer used here is formed just not from the recovered seed phrase,
 * but also the path `m/44'/60'/0'/0/0` (1st index of the BIP-32 derivation path).
 *
 * @returns {Promise<string>} The transaction hash of the registration transaction.
 *
 * @throws {Error} If any error occurs during the registration process, an error is thrown with a message detailing what went wrong.
 *
 * @async
 */
export async function registerUser(): Promise<string> {
  try {
    const { recoveredSeedPhrase, autoId } = await recoverAndValidateAutoId();

    // register the Auto ID on-chain to one of the EVM domains (where DID registry is deployed) i.e. Nova domain
    // get the signer (from Nova chain) if available with the recovered seed phrase
    // & derivation path (1st index).
    // NOTE: The derivation path indicates the index of the chain.
    // So, accordingly the derivation path has been used.
    // Also, connect the signer to the provider
    const signer: Wallet = ethers.Wallet.fromMnemonic(
      recoveredSeedPhrase,
      `m/44'/60'/0'/0/0`
    ).connect(provider);
    await checkBalance(signer.address, provider);

    // instantiate the DID Registry contract instance via the address & provider
    // contract instance
    const didRegistryContract: Contract = new ethers.Contract(
      DID_REGISTRY_ADDRESS,
      abi,
      provider
    );

    // send the transaction to register user to the group onchain
    const tx = await didRegistryContract.connect(signer).register(autoId);

    // wait for the transaction to be mined
    await tx.wait();

    return tx.hash;
  } catch (error) {
    throw new Error(`Error thrown during registering user: ${error}`);
  }
}

/**
 * Get/Retrieve the AutoWallet from given seed phrase
 * NOTE: No on-chain transaction is performed here
 */
export async function getAutoWallet(
  numOfEvmChains: number,
  seedPhrase?: string
): Promise<AutoWallet> {
  try {
    // recover seed phrase from SSS shares stored in local DB
    const recoveredSeedPhrase = (await recoverSeedFrom()) || seedPhrase;
    const seedString = String(recoveredSeedPhrase);

    // get the Auto ID (already added to the group),
    const autoId = await deferTask(() => getAutoIdFromSeed(seedString));

    // get the Subspace, EVM addresses (BIP-32) from the seed phrase.
    const [subspaceAddress, evmAddresses] = await Promise.all([
      deferTask(() => generateSubspaceAddress(seedString)),
      deferTask(() => generateEvmAddressesFromSeed(seedString, numOfEvmChains)),
    ]);

    return { subspaceAddress, evmAddresses, autoId };
  } catch (error) {
    throw new Error(`Error thrown during retrieving Auto wallet: ${error}`);
  }
}

/**
 * Verifies if the given AutoId is verified.
 *
 * @param autoId - The AutoId to be verified.
 * @returns A Promise that resolves to a boolean indicating if the AutoId is verified.
 * @throws An error if there is an issue verifying the AutoId.
 */
export async function isAutoIdVerified(
  autoId: string | bigint
): Promise<boolean> {
  try {
    const didRegistryContract: Contract = new ethers.Contract(
      DID_REGISTRY_ADDRESS,
      abi,
      provider
    );

    // get the group ID
    const groupId: BigNumberish = await didRegistryContract.groupId();

    return await approach1(groupId, BigInt(autoId));
  } catch (error) {
    throw new Error(`Error thrown when verifying AutoId: ${error}`);
  }
}
