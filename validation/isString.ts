// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { typeComparisonFactory } from "./_utils.ts";

/**
 * Whatever argument is type of `string` or not.
 *
 * @param val - Input any value
 * @returns The result of `typeof val === 'string'`
 *
 * @example
 * ```ts
 * isString('hello world') // true
 * isString(1000) // false
 * ```
 *
 * @public
 */
const isString = typeComparisonFactory<string>("string");

export { isString };
