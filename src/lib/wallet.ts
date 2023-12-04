/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Keyring } from "@polkadot/api";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { Mnemonic, ethers } from "ethers";
import { getAutoIdFromSeed, getIdentityFromSeed } from "./did";

/**
 * TODO: Check for Auto ID if added on-chain to one of the EVM domains
 * (where DID registry is deployed).
 */
async function checkIfAutoIdExistsOnChain(
  api: string,
  seedPhrase: string
): Promise<boolean> {
  // TODO: connect to the main EVM domain (where DID registry is deployed)

  // get the identity from seed phrase
  const identity = getIdentityFromSeed(seedPhrase);

  // get the commitment
  const commitment = identity.commitment;

  // get the nullifier hash (poseidon)
  const nullifier = identity.nullifier;
  // get nullifier hash (poseidon) from the identity

  // call the DID registry contract to check if the identity exists

  // doesn't exist by default
  return false;
}

// Function to generate addresses from a seed phrase in EVM chain according to BIP-32
export function generateEvmAddressesFromSeed(
  seedPhrase: string,
  numOfAddresses: number
): string[] {
  const addresses: string[] = [];
  const mnemonic = Mnemonic.fromPhrase(seedPhrase); // Convert the seed phrase to mnemonic
  const masterNode = ethers.HDNodeWallet.fromMnemonic(mnemonic); // Create a master node from the seed phrase

  for (let i = 0; i < numOfAddresses; i++) {
    const path = `m/44'/60'/0'/0/${i}`; // Standard Ethereum derivation path according to BIP-44
    const childNode = masterNode.derivePath(path); // Derive child node
    addresses.push(childNode.address); // Extract address from child node
  }

  return addresses;
}

/**
 * Generate a new wallet with a random seed
 * returning the SS58 address and the EVM addresses
 * NOTE: for simplicity, considered only EVM based domains
 * @returns {SS58Address, [Address]} A new wallet
 */
export async function generateAutoWallet(
  mainEvmDomainRpcApiUrl: string,
  numOfEvmChains: number
): Promise<[string, string[], string | bigint]> {
  let subspaceAddress = "",
    evmAddresses: string[] = [];

  let seedPhrase = "";

  // Loop until a valid Auto ID is generated
  while (true) {
    // Generate a new random seed phrase
    seedPhrase = mnemonicGenerate();

    // TODO: Check for a valid Auto ID
    const isAutoIdPreExist = await checkIfAutoIdExistsOnChain(
      mainEvmDomainRpcApiUrl,
      seedPhrase
    );

    if (!isAutoIdPreExist) {
      // break the loop if the Auto ID doesn't pre-exist onchain
      break;
    }
  }

  // TODO: store the seed phrase in SSS scheme (store in a secure place)

  // get the Auto ID (valid that doesn't pre-existed onchain) from the seed phrase
  const autoId = getAutoIdFromSeed(seedPhrase);

  // Create a keyring instance from the seed for the Subspace relay chain
  const keyring = new Keyring({ type: "sr25519" });

  // Add the user to the keyring from the seed phrase
  const user = keyring.addFromUri(seedPhrase);

  // Get the SS58 address from the keyring
  subspaceAddress = user.address;

  // TODO: Get the EVM addresses from the seed phrase (BIP-32)
  evmAddresses = generateEvmAddressesFromSeed(seedPhrase, numOfEvmChains);

  return [subspaceAddress, evmAddresses, autoId];
}
