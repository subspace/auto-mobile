import { TypedIntArray } from 'react-native-get-random-values';
declare global {
  interface crypto {
    getRandomValues<T extends TypedIntArray>(array: T): T | null;
  }
}

declare type crypto = {
  getRandomValues<T extends TypedIntArray>(array: T): T | null;
};
