/**
 * Payment module for Auto.
 */

import { ethers, BigNumber } from 'ethers';
import { NOVA_RPC_URL, SIGNER_PRIVATE_KEY } from './constants';

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
  sender?: ethers.Signer
): Promise<string> {
  // provider/client
  const provider = new ethers.providers.JsonRpcProvider(NOVA_RPC_URL);

  // get the signer if available
  sender = sender || new ethers.Wallet(`0x${SIGNER_PRIVATE_KEY}`, provider);

  // Get the balance of the signer
  const balance = await sender.getBalance();

  const gasPrice = await provider.getGasPrice();

  // Check if the signer has enough balance including required gas
  if (balance.lt(amount.add(gasPrice.mul(21000)))) {
    throw new Error('Insufficient balance');
  }

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
