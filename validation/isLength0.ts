// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { ifElse, length, N, or } from "../deps.ts";
import { isArray } from "./isArray.ts";
import { isString } from "./isString.ts";

/**
 * Whatever argument length is `0` or not.
 *
 * @param val - Input any value
 * @returns The result of `!val.length` (if not have `length` property, `false`)
 *
 * @example
 * ```ts
 * isLength0([]) // true
 * isLength0([]) // true
 * isLength0('hello') // false
 * isLength0(undefined) // false
 * ```
 *
 * @beta
 */
const isLength0 = (val: unknown): boolean =>
  ifElse(
    or(isString(val), () => isArray(val)),
    () => N(length(val as string | unknown[])),
    false,
  );

export { isLength0 };
