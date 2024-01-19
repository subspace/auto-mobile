// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

/**
 * Faucet library for the backend.
 */
import { NOVA_FAUCET_RPC_URL } from './constants';
import { recoverAndValidateAutoId } from './utils';

// Define the types for the response
interface BigNumberResponse {
  type: string;
  hex: string;
}

interface TxResponse {
  type: number;
  chainId: number;
  nonce: number;
  maxPriorityFeePerGas: BigNumberResponse | null;
  maxFeePerGas: BigNumberResponse | null;
  gasPrice: BigNumberResponse | null;
  gasLimit: BigNumberResponse;
  to: string;
  value: BigNumberResponse;
  data: string;
  accessList: string[];
  hash: string;
  v: number;
  r: string;
  s: string;
  from: string;
  confirmations: number;
}

interface ApiResponse {
  message: string;
  txResponse: TxResponse;
}

/**
 * Any (registered/non-registered) user request faucet tokens on the Nova network.
 *
 * @returns A promise that resolves to the transaction hash.
 * @throws An error
 */
export async function requestFaucetTokens(
  chainId: number,
  address: string,
  accountType: string,
  accountId: string
): Promise<string> {
  const body = JSON.stringify({
    chainId,
    address,
    accountType,
    accountId,
  });

  try {
    await recoverAndValidateAutoId();

    const response = await fetch(NOVA_FAUCET_RPC_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    return data.txResponse.hash;
  } catch (error) {
    console.error('Error making request:', error);
    throw error;
  }
}
