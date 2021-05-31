// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { typeComparisonFactory } from "./_utils.ts";

/**
 * Whatever argument is type of `number` or not.
 *
 * @param val - Input any value
 * @returns The result of `typeof val === 'number'`
 *
 * @example
 * ```ts
 * isNumber(0) // true
 * isNumber('hello') // false
 * ```
 *
 * @public
 */
const isNumber = typeComparisonFactory<number>("number");

export { isNumber };
