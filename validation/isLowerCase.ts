// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.

/**
 * Whatever argument is Lower case `string` or not.
 *
 * @param val - Any `string`
 * @returns The result of `val.toLowerCase() === val`
 *
 * @example
 * ```ts
 * isLowerCase('hello world') // true
 * isLowerCase('Hello world') // false
 * ```
 *
 * @beta
 */
const isLowerCase = (val: string): boolean => val.toLowerCase() === val;

export { isLowerCase };
