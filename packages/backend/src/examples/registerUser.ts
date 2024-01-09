/**
 * New user register its Auto ID (generated from the recovered seed phrase) onchain.
 */

import { NOVA_EXPLORER_URL } from '../library/constants';
import { getAutoWallet, registerUser } from '../library/wallet';

async function main() {
  console.log('\n=======Register New user========');
  const autoWallet = await getAutoWallet(5);
  console.log('Subspace address:', autoWallet.subspaceAddress);
  console.log('EVM addresses:', autoWallet.evmAddresses);
  console.log('Auto ID:', autoWallet.autoId);

  const txHash = await registerUser();
  console.log(
    `Transaction receipt for registering a new user onchain: ${NOVA_EXPLORER_URL}/tx/${txHash}`
  );
}

main()
  .catch(console.error)
  .finally(() => process.exit());
