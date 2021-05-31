// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import type { AnyFn } from "../deps.ts";
import { typeComparisonFactory } from "./_utils.ts";

/**
 * Whatever argument is type of `function` or not.
 *
 * @param val - Input any value
 * @returns The result of `typeof val === 'function'`
 *
 * @example
 * ```ts
 * isFunction(function) // true
 * isFunction('hello') // false
 * ```
 *
 * @public
 */
const isFunction = typeComparisonFactory<AnyFn>("function");

export { isFunction };
