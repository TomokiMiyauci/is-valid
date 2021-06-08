// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { trim, trimLeft, trimRight } from "../deps.ts";

/**
 * Whatever val is trimmable or not.
 *
 * @param val - Any `string`
 * @returns The result of `trim(val) !== val`
 *
 * @example
 * ```ts
 * isTrimmable(' test') // true
 * isTrimmable('test ') // true
 * isTrimmable(' test ') // true
 * ```
 */
const isTrimmable = (val: string) => trim(val) !== val;

/**
 * Whatever val is left side trimmable or not.
 *
 * @param val - Any `string`
 * @returns The result of `trimLeft(val) !== val`
 *
 * @example
 * ```ts
 * isLeftTrimmable('test ') // false
 * isLeftTrimmable(' test') // true
 * isLeftTrimmable(' test ') // true
 * ```
 */
const isLeftTrimmable = (val: string) => trimLeft(val) !== val;

/**
 * Whatever val is right side trimmable or not.
 *
 * @param val - Any `string`
 * @returns The result of `trimRight(val) !== val`
 *
 * @example
 * ```ts
 * isRightTrimmable(' test') // false
 * isRightTrimmable('test ') // true
 * isRightTrimmable(' test ') // true
 * ```
 */
const isRightTrimmable = (val: string) => trimRight(val) !== val;

export { isLeftTrimmable, isRightTrimmable, isTrimmable };
