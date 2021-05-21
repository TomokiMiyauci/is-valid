import ts from "rollup-plugin-ts";
import { resolve } from "path";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import { main, module } from "./package.json";
const baseDir = resolve(__dirname);
const inputFilePath = resolve(baseDir, "mod.ts");
const banner =
  "/*! Copyright (c) 2021-present the is-valid authors. All rights reserved. MIT license. */";

const replaceOption = {
  ".ts": "",
  "https://deno.land/x/fonction@v1.8.0-beta.5/mod": "fonction",
  preventAssignment: true,
};

const config = [
  {
    input: inputFilePath,
    plugins: [
      replace(replaceOption),
      ts({
        transpiler: "babel",
        tsconfig: (resolvedConfig) => ({
          ...resolvedConfig,
          declaration: false,
        }),
      }),
      terser(),
    ],

    external: ["fonction"],

    output: {
      file: main,
      format: "cjs",
      sourcemap: true,
      banner,
    },
  },
  {
    input: inputFilePath,
    external: ["fonction"],

    plugins: [
      replace(replaceOption),
      ts({
        transpiler: "babel",
      }),
      terser(),
    ],

    output: {
      file: module,
      format: "es",
      sourcemap: true,
      banner,
    },
  },
];

export default config;
