/**
 * Example showing how to pay to an address on Nova.
 */

import { NOVA_EXPLORER_URL } from '../library/constants';
import { payOnNova } from '../library/pay';
import { ethers } from 'ethers';

async function main() {
  console.log('\n=======Send TSSC on Nova========');

  const txHash = await payOnNova(
    '0x1D1cf575Cc0A8988fA274D36018712dA4632FbDD',
    ethers.utils.parseEther('0.1')
  );
  console.log(`Transaction receipt: ${NOVA_EXPLORER_URL}/tx/${txHash}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
