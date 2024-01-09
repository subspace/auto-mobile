# Auto

## Description

This project is a monorepo that has built-in the core modules.

**Modules**:

-   <u>Wallet</u>: The wallet module is responsible for generating the user's wallet for Subspace Network (Consensus & domains).
-   <u>DID</u>: The DID module is responsible for generating the user's DID for the entire Subspace network during the onboarding process. This also includes the addition of the user's DID to the Subspace Network's DID registry. And one can verify the user's DID by using the Subspace Network's DID registry.
-   <u>Recovery</u>: The recovery module is responsible for recovering the user's wallet for Subspace Network (Consensus & domains). Here, the seed phrase is stored & recovered via Shamir's Secret Sharing (SSS) Scheme.

> Details on each is available on Subspace Notion.

## Install

```sh
pnpm install
```

## Dev environment

```sh
pnpm dev
```

### Dev ios environment

```sh
pnpm ios
```

### Dev android environment

```sh
pnpm android
```

## Build

```sh
pnpm build
```

## Lint

```sh
pnpm lint
```

## Clean Output files

```sh
pnpm clean
```

## Clean all the output files

```sh
pnpm clean:all
```
