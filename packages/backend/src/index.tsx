// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { polyfill as polyfillEncoding } from 'react-native-polyfill-globals/src/encoding';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { polyfill as polyfillCrypto } from 'react-native-polyfill-globals/src/crypto';
polyfillEncoding();
// polyfillCrypto();
export * from './library/constants';
export * from './library/did';
export * from './library/recovery';
export * from './library/utils';
export * from './library/wallet';

export * from './utilities/wallet';
