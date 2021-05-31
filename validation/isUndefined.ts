// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { typeComparisonFactory } from "./_utils.ts";

/**
 * Whatever argument is type of `undefined` or not.
 *
 * @param val - Input any value
 * @returns The result of `typeof val === 'undefined'`
 *
 * @example
 * ```ts
 * isUndefined(undefined) // true
 * isUndefined('hello') // false
 * ```
 *
 * @public
 */
const isUndefined = typeComparisonFactory<undefined>("undefined");

export { isUndefined };
