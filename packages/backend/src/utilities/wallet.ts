import { cryptoWaitReady } from '@polkadot/util-crypto';
import { recoverSeedFrom } from '../library/recovery';
import { generateAutoWallet } from '../library/wallet';

export async function genAutoWallet() {
  await cryptoWaitReady(); // Wait for WASM crypto initialization
  const autoWallet = await generateAutoWallet(5);

  console.log('Subspace address:', autoWallet.subspaceAddress);
  console.log('EVM addresses:', autoWallet.evmAddresses);
  console.log('Auto ID:', autoWallet.autoId);
  const recoveredSeedPhrase = await recoverSeedFrom();
  return { ...autoWallet, recoveredSeedPhrase };
}
