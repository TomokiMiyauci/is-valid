// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { NULL } from "./_constants.ts";

/**
 * Whatever argument is type of `null` or not.
 *
 * @param val - Input any value
 * @returns The result of `val === null`
 *
 * @example
 * ```ts
 * isNull(null) // true
 * isNull(undefined) // false
 * ```
 *
 * @public
 */
const isNull = (val: unknown): val is null => val === NULL;

export { isNull };
