/* eslint-disable @typescript-eslint/no-unused-vars */
// NOTE: As the `shamir-secret-sharing` package is not yet published,
// `index.d.ts` file needs to be generated during `$ yarn` or `$ yarn install`
// in the root folder
import { toUint8Array } from "@subspace/core";
import { combine, split } from "@subspace/shamir-secret-sharing";
// import { strictEqual } from "assert";
import { getRandomValues, subtle } from "crypto";

/// Example of splitting user input
async function splitUserInput() {
  const seedPhrase =
    "lock frost nation imitate party medal knee cigar rough wine document immense";
  const secret = toUint8Array(seedPhrase);
  const [share1, share2, share3] = await split(secret, 3, 2);

  const reconstructed = await combine([share1, share3]);

  if (
    Buffer.from(reconstructed).toString("base64") !==
    Buffer.from(secret).toString("base64")
  ) {
    throw new Error("Reconstructed secret does not match the original secret");
  }
  // strictEqual(
  //   Buffer.from(reconstructed).toString("base64"),
  //   Buffer.from(secret).toString("base64"),
  //   "Reconstructed secret does not match the original secret"
  // );
}

/// Example of splitting random entropy
async function splitRandomEntropy() {
  const randomEntropy = getRandomValues(new Uint8Array(16));
  const [share1, share2, share3] = await split(randomEntropy, 3, 2);
  const reconstructed = await combine([share2, share3]);

  if (
    Buffer.from(reconstructed).toString("base64") !==
    Buffer.from(randomEntropy).toString("base64")
  ) {
    throw new Error(
      "Reconstructed secret does not match the original random entropy"
    );
  }

  // strictEqual(
  //   Buffer.from(reconstructed).toString("base64"),
  //   Buffer.from(randomEntropy).toString("base64"),
  //   "Reconstructed secret does not match the original random entropy"
  // );
}

// Example of splitting symmetric key
async function splitSymmetricKey() {
  const key = await subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  const exportedKeyBuffer = await subtle.exportKey("raw", key);
  const exportedKey = new Uint8Array(exportedKeyBuffer);
  const [share1, share2, share3] = await split(exportedKey, 3, 2);
  const reconstructed = await combine([share2, share1]);

  if (
    Buffer.from(reconstructed).toString("base64") !==
    Buffer.from(exportedKey).toString("base64")
  ) {
    throw new Error(
      "Reconstructed secret does not match the original exported key"
    );
  }

  // strictEqual(
  //   Buffer.from(reconstructed).toString("base64"),
  //   Buffer.from(exportedKey).toString("base64"),
  //   "Reconstructed secret does not match the original exported key"
  // );
}

export async function sss() {
  console.log("\n=======SSS Examples========");
  await splitUserInput();
  await splitRandomEntropy();
  await splitSymmetricKey();
}

sss()
  .catch(console.error)
  .finally(() => process.exit());
