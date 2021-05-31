// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { typeComparisonFactory } from "./_utils.ts";

/**
 * Whatever argument is type of `boolean` or not.
 *
 * @param val - Input any value
 * @returns The result of `typeof val === 'boolean'`
 *
 * @example
 * ```ts
 * isBoolean(true) // true
 * isBoolean('hello') // false
 * ```
 *
 * @public
 */
const isBoolean = typeComparisonFactory<boolean>("boolean");

export { isBoolean };
