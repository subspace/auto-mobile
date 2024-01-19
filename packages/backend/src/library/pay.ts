// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

/**
 * Payment module for Auto.
 * Here, the user who has already registered on-chain can send/request a payment transaction on Nova & Consensus chain.
 */

import { BigNumber, Contract, Wallet, ethers } from 'ethers';
import { NOVA_RPC_URL, SENDERS_TREASURY_ADDRESS } from './constants';
import { checkBalance, recoverAndValidateAutoId } from './utils';

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
    const { recoveredSeedPhrase } = await recoverAndValidateAutoId();

    // client
    const provider = new ethers.providers.JsonRpcProvider({
      url: NOVA_RPC_URL,
      skipFetchSetup: true,
    });

    // get the sender (from Nova chain) if available with the recovered seed phrase
    // & derivation path (1st index).
    // NOTE: The derivation path indicates the index of the chain.
    // So, accordingly the derivation path has been used.
    const sender: Wallet = ethers.Wallet.fromMnemonic(
      recoveredSeedPhrase as string,
      `m/44'/60'/0'/0/0`
    ).connect(provider);
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

// Import the DidRegistry ABI from the JSON file
import SendersTreasuryJson from '../../abi/SendersTreasury.json';
const abi = SendersTreasuryJson.abi;

export async function requestPay(
  sender: string,
  amount: BigNumber
): Promise<string> {
  try {
    const { recoveredSeedPhrase } = await recoverAndValidateAutoId();

    // client
    const provider = new ethers.providers.JsonRpcProvider(NOVA_RPC_URL);

    // get the sender (from Nova chain) if available with the recovered seed phrase
    // & derivation path (1st index).
    const signerWallet: Wallet = ethers.Wallet.fromMnemonic(
      recoveredSeedPhrase,
      `m/44'/60'/0'/0/0`
    ).connect(provider);
    await checkBalance(signerWallet.address, provider);

    const sendersTreasuryContract: Contract = new ethers.Contract(
      SENDERS_TREASURY_ADDRESS,
      abi,
      provider
    );

    // Send the transaction for requesting pay
    const tx = await sendersTreasuryContract
      .connect(signerWallet)
      .requestPay(sender, amount);

    // Wait for the transaction to be mined
    await tx.wait();

    // Return the transaction hash
    return tx.hash;
  } catch (error) {
    throw new Error(`Error thrown during paying on Nova: ${error}`);
  }
}

// copied from solidity contract
// variants start from 1.
enum PayRequestStatus {
  REQUESTED = 1,
  SIGNED,
  DONE,
}
interface PayRequest {
  status: PayRequestStatus; // 1: requested payment, 2: signed requested payment, 3: payment done
  sender: string;
  receiver: string;
  amount: BigNumber;
  signature: string;
}

// get the requested pay ids for sender/receiver
export async function getRequestedPayIds(
  senderOrReceiver: string
): Promise<BigNumber[]> {
  try {
    const provider = new ethers.providers.JsonRpcProvider(NOVA_RPC_URL);

    const sendersTreasuryContract: Contract = new ethers.Contract(
      SENDERS_TREASURY_ADDRESS,
      abi,
      provider
    );

    const requestedPayIds: BigNumber[] =
      await sendersTreasuryContract.getRequestedPayIdsOf(senderOrReceiver);

    return requestedPayIds;
  } catch (error) {
    throw new Error(`Error thrown during getting requested pay ids: ${error}`);
  }
}

// get the next requested pay id for sender/receiver with given status
export async function getNextPayIdFor(
  address: string,
  status: PayRequestStatus
): Promise<BigNumber> {
  try {
    const provider = new ethers.providers.JsonRpcProvider(NOVA_RPC_URL);

    const sendersTreasuryContract: Contract = new ethers.Contract(
      SENDERS_TREASURY_ADDRESS,
      abi,
      provider
    );

    const requestedPayIds: BigNumber[] =
      await sendersTreasuryContract.getRequestedPayIdsOf(address);

    let payId: BigNumber = BigNumber.from(0);

    // get the next pay id that matches with the status code
    for (const pid of requestedPayIds) {
      const payRequest: PayRequest =
        await sendersTreasuryContract.getPaymentRequest(pid);

      if (payRequest.status === status) {
        payId = pid;
        break;
      }
    }

    if (!payId.toNumber()) {
      throw new Error(`No payment found for ${address} with status ${status}`);
    }

    return payId;
  } catch (error) {
    throw new Error(`Error thrown during getting pay ids: ${error}`);
  }
}

export async function authorizePay(requestId: BigNumber): Promise<string> {
  try {
    const { recoveredSeedPhrase } = await recoverAndValidateAutoId();

    // client
    const provider = new ethers.providers.JsonRpcProvider(NOVA_RPC_URL);

    // get the sender (from Nova chain) if available with the recovered seed phrase
    // & derivation path (1st index).
    const signerWallet: Wallet = ethers.Wallet.fromMnemonic(
      recoveredSeedPhrase,
      `m/44'/60'/0'/0/0`
    ).connect(provider);
    await checkBalance(signerWallet.address, provider);

    const sendersTreasuryContract: Contract = new ethers.Contract(
      SENDERS_TREASURY_ADDRESS,
      abi,
      provider
    );

    // Send the transaction for signing/authorizing requested payment
    const tx = await sendersTreasuryContract
      .connect(signerWallet)
      .signPayReq(requestId);

    // Wait for the transaction to be mined
    await tx.wait();

    // Return the transaction hash
    return tx.hash;
  } catch (error) {
    throw new Error(`Error thrown when authorize requested payment: ${error}`);
  }
}

// receiver claims the payment when signed by sender
export async function claimPay(requestId: BigNumber): Promise<string> {
  try {
    const { recoveredSeedPhrase } = await recoverAndValidateAutoId();

    // client
    const provider = new ethers.providers.JsonRpcProvider(NOVA_RPC_URL);

    // get the sender (from Nova chain) if available with the recovered seed phrase
    // & derivation path (1st index).
    const signerWallet: Wallet = ethers.Wallet.fromMnemonic(
      recoveredSeedPhrase,
      `m/44'/60'/0'/0/0`
    ).connect(provider);
    await checkBalance(signerWallet.address, provider);

    const sendersTreasuryContract: Contract = new ethers.Contract(
      SENDERS_TREASURY_ADDRESS,
      abi,
      provider
    );

    // Send the transaction for signing/authorizing requested payment
    const tx = await sendersTreasuryContract
      .connect(signerWallet)
      .claimPayment(requestId);

    // Wait for the transaction to be mined
    await tx.wait();

    // Return the transaction hash
    return tx.hash;
  } catch (error) {
    throw new Error(`Error thrown when claim requested payment: ${error}`);
  }
}
