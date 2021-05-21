// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { gt, gte, length, lt, lte, pipe } from "../deps.ts";

/**
 * Create length validator of greater then `val`. It's exclusive.
 *
 * @param val - `Number` of check length
 * @returns Function what validate length is greater than `val` or not
 *
 * @example
 * ```ts
 * const gtLength3 = gtLength(3)
 * gtLength3('bad') // false
 * gtLength3(['hello', 'world', 'tom']) // false
 * gtLength3('good') // true
 * ```
 *
 * @beta
 */
const gtLength = (val: number) =>
  pipe(length, (length: number): boolean => gt(length, val));

/**
 * Create length validator of greater equal then `val`. It's inclusive.
 *
 * @param val - `Number` of check length
 * @returns Function what validate length is greater equal than `val` or not
 *
 * @example
 * ```ts
 * const gteLength5 = gteLength(5)
 * gteLength5('good') // false
 * gteLength5('hello') // true
 * gteLength5([1, 2, 3, 4, 5]) // true
 * ```
 *
 * @beta
 */
const gteLength = (val: number) =>
  pipe(length, (length: number): boolean => gte(length, val));

/**
 * Create length validator of less then `val`. It's exclusive.
 *
 * @param val - `Number` of check length
 * @returns Function what validate length is less than `val` or not
 *
 * @example
 * ```ts
 * const ltLength3 = ltLength(3)
 * gtLength3('bad') // false
 * gtLength3(['hello', 'world', 'tom']) // false
 * gtLength3('to') // true
 * ```
 *
 * @beta
 */
const ltLength = (val: number) =>
  pipe(length, (length: number): boolean => lt(length, val));

/**
 * Create length validator of less equal then `val`. It's inclusive.
 *
 * @param val - `Number` of check length
 * @returns Function what validate length is less equal than `val` or not
 *
 * @example
 * ```ts
 * const lteLength5 = lteLength(5)
 * lteLength5('good') // true
 * lteLength5('hello') // true
 * lteLength5([1, 2, 3, 4, 5]) // true
 * ```
 *
 * @beta
 */
const lteLength = (val: number) =>
  pipe(length, (length: number): boolean => lte(length, val));

export { gteLength, gtLength, lteLength, ltLength };
