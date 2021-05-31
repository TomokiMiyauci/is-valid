// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { typeComparisonFactory } from "./_utils.ts";

/**
 * Whatever argument is type of `symbol` or not.
 *
 * @param val - Input any value
 * @returns The result of `typeof val === 'symbol'`
 *
 * @example
 * ```ts
 * isSymbol(Symbol('hello')) // true
 * isSymbol('hello') // false
 * ```
 *
 * @public
 */
const isSymbol = typeComparisonFactory<symbol>("symbol");

export { isSymbol };
