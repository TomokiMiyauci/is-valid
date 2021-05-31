// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { isBigint } from "./isBigint.ts";
import { isBoolean } from "./isBoolean.ts";
import { isNil } from "./isNil.ts";
import { isNumber } from "./isNumber.ts";
import { isString } from "./isString.ts";
import { isSymbol } from "./isSymbol.ts";
import { Primitive } from "../deps.ts";

/**
 * Whatever argument is `primitive` or not.
 *
 * @param val - Input any value
 * @returns The result of primitive or not
 *
 * @remarks
 * Definition of Primitive
 * - `string`
 * - `number`
 * - `bigint`
 * - `boolean`
 * - `symbol`
 * - `undefined`
 * - `null`
 *
 * @example
 * ```ts
 * isPrimitive(true) // true
 * isPrimitive([]) // false
 * ```
 *
 * @public
 */
const isPrimitive = (val: unknown): val is Primitive =>
  [isNil, isBoolean, isNumber, isString, isBigint, isSymbol].some((is) =>
    is(val)
  );

export { isPrimitive };
