/**
 * Generate Auto wallet for an individual as unified account with
 * multiple addresses on Subspace Network (relay + domains).
 */
import { generateAutoWallet } from "../index";
import { cryptoWaitReady } from "@polkadot/util-crypto";

async function main() {
  console.log(
    "\n=======Generate Auto Wallet (Unified Subspace account)========",
  );
  await cryptoWaitReady(); // Wait for WASM crypto initialization
  const novaEvmDomainRpcApiUrl = "https://nova.gemini-3g.subspace.network/ws";
  const autoWallet = await generateAutoWallet(novaEvmDomainRpcApiUrl, 5);
  console.log("Subspace address:", autoWallet.subspaceAddress);
  console.log("EVM addresses:", autoWallet.evmAddresses);
  console.log("Auto ID:", autoWallet.autoId);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
