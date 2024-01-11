/**
 * Payment module for Auto.
 * Here, the user who has already registered on-chain can send a payment transaction on Nova & Consensus chain.
 */

import { ethers, BigNumber, Wallet } from 'ethers';
import { NOVA_RPC_URL } from './constants';
import { checkBalance } from './utils';
import { recoverSeedFrom } from './recovery';
import { isAutoIdVerified } from './wallet';
import { getAutoIdFromSeed } from './did';

/**
 * Registered user sends a payment transaction on the Nova network.
 * NOTE: The pre-requisites are:
 *  - The sender must have already registered their Auto ID on-chain.
 *  - The sender must have sufficient balance to send the payment.
 *
 * @param recipient - The address of the recipient.
 * @param amount - The amount (in Wei) of the payment.
 * @returns A promise that resolves to the transaction hash.
 * @throws An error if the sender is not registered on-chain or has insufficient balance.
 */
export async function payOnNova(
  recipient: string,
  amount: BigNumber
): Promise<string> {
  try {
    // recover seed phrase from SSS shares stored in local DB
    const recoveredSeedPhrase = await recoverSeedFrom();

    // generate the Auto ID from the seed phrase
    const autoId = getAutoIdFromSeed(recoveredSeedPhrase as string);

    // Ensure the user had already registered
    if (!(await isAutoIdVerified(autoId))) {
      throw new Error(`Auto ID ${autoId} is not verified`);
    }

    // client
    const provider = new ethers.providers.JsonRpcProvider(NOVA_RPC_URL);

    // get the sender (from Nova chain) if available with the recovered seed phrase
    // & derivation path (1st index).
    // NOTE: The derivation path indicates the index of the chain.
    // So, accordingly the derivation path has been used.
    const sender: Wallet = ethers.Wallet.fromMnemonic(
      recoveredSeedPhrase as string,
      `m/44'/60'/0'/0/0`
    );
    await checkBalance(sender.address, provider);

    // Send the transaction
    const tx = await sender.sendTransaction({
      to: recipient,
      value: amount,
    });

    // Wait for the transaction to be mined
    await tx.wait();

    // Return the transaction hash
    return tx.hash;
  } catch (error) {
    throw new Error(`Error thrown during paying on Nova: ${error}`);
  }
}
