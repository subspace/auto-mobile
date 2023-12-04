/**
 * Generate Auto wallet for an individual as unified account with
 * multiple addresses on Subspace Network (relay + domains).
 */
import { generateAutoWallet } from "../index";
import { cryptoWaitReady } from "@polkadot/util-crypto";

async function main() {
  await cryptoWaitReady(); // Wait for WASM crypto initialization
  const novaEvmDomainRpcApiUrl = "https://nova.gemini-3g.subspace.network/ws";
  const autoWallet = await generateAutoWallet(novaEvmDomainRpcApiUrl, 5);
  console.log("Subspace address:", autoWallet[0]);
  console.log("EVM addresses:", autoWallet[1]);
  console.log("Auto ID:", autoWallet[2]);
}

main();
