// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { and, Empty, or } from "../deps.ts";
import { isArray } from "./isArray.ts";
import { isLength0 } from "./isLength0.ts";
import { isObject } from "./isObject.ts";
import { isString } from "./isString.ts";

/**
 * Returns `true` if the given value is its type's empty value; otherwise `false`.
 *
 * @param val - Input any value
 * @returns The result of empty or not
 *
 * @remarks
 * The definition of Empty
 * - `''`
 * - `{}`
 * - `[]`
 *
 * @example
 * ```ts
 * isEmpty('') // true
 * isEmpty({}) // true
 * isEmpty([]) // true
 *
 * isEmpty('hello world') // false
 * isEmpty(1000) // false
 * ```
 *
 * @public
 */
const isEmpty = (val: unknown): val is Empty => {
  if (or(isString(val), () => isArray(val))) return isLength0(val);
  else if (isObject(val)) {
    return and(isLength0(Object.keys(val)), () => val.constructor === Object);
  } else return false;
};

export { isEmpty };
