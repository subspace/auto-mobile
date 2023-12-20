/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogBox, Platform } from "react-native";

export interface Global {
  btoa: any;
  atob: any;
  self: any;
  Buffer: any;
  process: any;
  location: any;
}

declare let global: Global;
if (typeof global.self === "undefined") {
  global.self = global;
}

if (Platform.OS !== "web") {
  require("react-native-get-random-values");
  LogBox.ignoreLogs([
    "Warning: The provided value 'ms-stream' is not a valid 'responseType'.",
    "Warning: The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
  ]);
}

global.btoa = global.btoa || require("base-64").encode;
global.atob = global.atob || require("base-64").decode;

global.Buffer = require("buffer").Buffer;

global.process = require("process");
global.process.env.NODE_ENV = __DEV__ ? "development" : "production";
global.process.version = "v9.40";
// global.TextEncoder = require('text-encoding').TextEncoder;
global.location = {
  protocol: "https",
};