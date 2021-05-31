// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { or } from "../deps.ts";
import { isNull } from "./isNull.ts";
import { isUndefined } from "./isUndefined.ts";

/**
 * Whatever argument is type of `undefined` or `null`.
 *
 * @param val - Input any value
 * @returns The result of type of `val` is `undefined` or `null`
 *
 * @example
 * ```ts
 * isNil(undefined) // true
 * isNil(null) // true
 * isNil([]) // false
 * ```
 *
 * @public
 *
 */
const isNil = (val: unknown): val is null | undefined =>
  or(isUndefined(val), () => isNull(val));

export { isNil };
