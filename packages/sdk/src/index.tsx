import '@ethersproject/shims';
import 'react-native-get-random-values';
// @ts-ignore
import { polyfill as polyfillEncoding } from 'react-native-polyfill-globals/src/encoding';
// @ts-ignore
import { polyfill as polyfillCrypto } from 'react-native-polyfill-globals/src/crypto';
polyfillEncoding();
polyfillCrypto();
export * from './constants';
export * from './library/did';
export * from './library/recovery';
export * from './library/utils';
export * from './library/wallet';
