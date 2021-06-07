// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.

/**
 * Whatever argument is Upper case `string` or not.
 *
 * @param val - Any `string`
 * @returns The result of `val.toUpperCase() === val`
 *
 * @example
 * ```ts
 * isUpperCase('HELLO WORLD') // true
 * isUpperCase('hello world') // false
 * ```
 *
 * @beta
 */
const isUpperCase = (val: string): boolean => val.toUpperCase() === val;

export { isUpperCase };
