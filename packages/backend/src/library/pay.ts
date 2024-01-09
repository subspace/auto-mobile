/**
 * Payment module for Auto.
 */

import { ethers, BigNumber } from 'ethers';
import { NOVA_RPC_URL, SIGNER_PRIVATE_KEY } from './constants';
import { checkBalance } from './utils';

/**
 * Sends a payment transaction on the Nova network.
 *
 * @param recipient - The address of the recipient.
 * @param amount - The amount (in Wei) of the payment.
 * @param sender - (Optional) The signer of the transaction. If not provided, a new signer will be created using the private key.
 * @returns A promise that resolves to the transaction hash.
 * @throws An error if the sender has insufficient balance.
 */
export async function payOnNova(
  recipient: string,
  amount: BigNumber,
  sender?: ethers.Wallet
): Promise<string> {
  // provider/client
  const provider = new ethers.providers.JsonRpcProvider(NOVA_RPC_URL);

  // get the signer if available
  sender = sender || new ethers.Wallet(`0x${SIGNER_PRIVATE_KEY}`, provider);
  await checkBalance(sender);

  // Send the transaction
  const tx = await sender.sendTransaction({
    to: recipient,
    value: amount,
  });

  // Wait for the transaction to be mined
  await tx.wait();

  // Return the transaction hash
  return tx.hash;
}
