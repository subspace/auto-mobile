import { Options, defineConfig } from "tsup";

export default defineConfig((options: Options) => ({
  dts: true,
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  ...options,
}));
