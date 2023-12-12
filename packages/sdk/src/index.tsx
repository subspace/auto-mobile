import '@ethersproject/shims';
import 'react-native-get-random-values';
// @ts-ignore
import { polyfill as polyfillEncoding } from 'react-native-polyfill-globals/src/encoding';
// @ts-ignore
import { polyfill as polyfillCrypto } from 'react-native-polyfill-globals/src/crypto';
polyfillEncoding();
polyfillCrypto();
export * from './constants';
export * from './lib/did';
export * from './lib/recovery';
export * from './lib/utils';
export * from './lib/wallet';
