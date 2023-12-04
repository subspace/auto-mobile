# Typescript SDK for Auto

## Description

**Modules**:

- <u>Wallet</u>: The wallet module is responsible for generating the user's wallet for Subspace Network (Relay & domains).
- <u>DID</u>: The DID module is responsible for generating the user's DID for the entire Subspace network during the onboarding process. This also includes the addition of the user's DID to the Subspace Network's DID registry. And one can verify the user's DID by using the Subspace Network's DID registry.
- <u>Recovery</u>: The recovery module is responsible for recovering the user's wallet for Subspace Network (Relay & domains). Here, the seed phrase is stored & recovered via Shamir's Secret Sharing (SSS) Scheme.

> Details on each is available on Subspace Notion.

## Install

```sh
yarn
```

## Build

```sh
yarn build
```

## Lint

```sh
yarn lint
```

## Examples

```sh
yarn eg:gen-evm-addrs
yarn eg:gen-autoid
```
