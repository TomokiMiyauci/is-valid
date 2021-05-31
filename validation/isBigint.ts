// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { typeComparisonFactory } from "./_utils.ts";

/**
 * Whatever argument is type of `bigint` or not.
 *
 * @param val - input any value
 * @returns The result of `typeof val === 'bigint'`
 *
 * @example
 * ```ts
 * isBigint(1n) // true
 * isBigint(1000) // false
 * ```
 *
 * @public
 */
const isBigint = typeComparisonFactory<bigint>("bigint");

export { isBigint };
