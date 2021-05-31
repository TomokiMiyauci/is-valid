// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { and, ifElse, N } from "../deps.ts";
import { JSON_OBJECT } from "./_constants.ts";
import { isNil } from "./isNil.ts";

/**
 * Safe getter for `constructor.name`.
 * @param val - Any value
 * @returns If `val` is `null` or `undefined`, empty string; otherwise `constructor.name`
 *
 * @example
 * ```ts
 * constructorName(null) // ''
 * constructorName(undefined) // ''
 * constructorName({}) // 'Object'
 * constructorName('') // 'String'
 * ```
 *
 * @internal
 */
const constructorName = (val: unknown): string =>
  ifElse(
    and(N(isNil(val)), () => (val as Record<string, unknown>).constructor),
    () => (val as Record<string, unknown>).constructor.name ?? "",
    "",
  );

/**
 * Whatever argument is JSON Object or not.
 *
 * @param val - Input any value
 * @returns if `val` is JSON Object `true` otherwise; `false`
 *
 * @example
 * ```ts
 * isJSONObject({ hoge: 'huga'}) // true
 * isJSONObject(Object()) // true
 * isJSONObject(new Object()) // true
 *
 * isJSONObject([]) // false
 * isJSONObject(new Set()) // false
 * ```
 *
 * @public
 */
const isJSONObject = (val: unknown): val is Record<PropertyKey, unknown> =>
  constructorName(val) === JSON_OBJECT;

export { isJSONObject };
