// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
/**
 * Whatever argument is `Array` or not.
 *
 * @param val - Input any value
 * @returns The result of `Array.isArray(val)`
 *
 * @example
 * ```ts
 * isArray([]) // true
 * isArray(['hello', 'world']) // true
 * isArray({}) // false
 * ```
 *
 * @public
 */
const isArray = (val: unknown): val is unknown[] => Array.isArray(val);

export { isArray };
