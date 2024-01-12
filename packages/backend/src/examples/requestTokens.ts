import { ethers } from 'ethers';
import { NOVA_EXPLORER_URL, NOVA_RPC_URL } from '../library/constants';
import { requestFaucetTokens } from '../library/faucet';
import { viewNovaBalanceOf } from '../library/utils';

console.log('\n=======User request faucet tokens by themselves========');
requestFaucetTokens(
  1002,
  '0x0370D871f1D4B256E753120221F3Be87A40bd246',
  'github',
  '0x0370D871f1D4B256E753120221F3Be87A40bd246'
)
  .then((txHash) =>
    console.log(`Transaction receipt: ${NOVA_EXPLORER_URL}/tx/${txHash}}`)
  )
  .catch((error) => console.error(error));

// Show the balance of the user after the faucet request
console.log('\n=======Show my balance========');
const provider = new ethers.providers.JsonRpcProvider(NOVA_RPC_URL);
viewNovaBalanceOf(provider)
  .then((balanceWei) => {
    const ethersbalance = ethers.utils.formatEther(balanceWei);
    console.log(`My latest balance: ${ethersbalance} TSSC`);
  })
  .catch((error) => console.error(error));
