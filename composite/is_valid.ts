// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { AnyFn, N, tryCatch } from "../deps.ts";
/**
 * Iteration of validators that returns `true` when everything is `true`.
 * @param validators - Any number of validators that return a `boolean`
 * @returns - A function that takes an argument of `validators[0]`
 *
 * @remarks
 * Never throw an error. Returns `false` on error.
 *
 * @example
 * ```ts
 * const isValidPassword = everyTrue(isString, gtLength(8), ltLength(30))
 * isValidPassword('this-is-valid-password') // true
 * ```
 *
 * @example
 * ```ts
 * const dangerValidation = everyTrue((val: any) => val.size === 1)
 * // null.size will occur TypeError but catch and return false
 * dangerValidation(null) // false
 * ```
 *
 * @public
 */
const everyTrue = <T extends unknown[]>(
  ...validators: ((...val: T) => boolean)[]
) =>
  (...args: T): boolean =>
    tryCatch(() => validators.every((validator) => validator(...args)), false);

/**
 * Iteration of validators that returns `true` when everything is `false`.
 * @param validators - Any number of validators that return a `boolean`
 * @returns - A function that takes an argument of `validators[0]`
 *
 * @remarks
 * Never throw an error. Returns `false` on error.
 *
 * @example
 * ```ts
 * const isNotNil = everyFalse(isNull, isUndefined)
 * isNotNil('this-is-not-nil') // true
 * isNotNil(null) // false
 * isNotNil(undefined) // false
 * ```
 *
 * @example
 * ```ts
 * const dangerValidation = everyFalse((val: any) => val.size === 1)
 * // null.size will occur TypeError but catch and return false
 * dangerValidation(null) // false
 * ```
 *
 * @public
 */
const everyFalse = <T extends unknown[]>(
  ...validators: ((...val: T) => boolean)[]
) =>
  (...args: T): boolean =>
    tryCatch(
      () => validators.every((validator) => N(validator(...args))),
      false,
    );

const failOnFalse = <T extends AnyFn<any, boolean>, U extends unknown>(
  validations: [T, U][],
) =>
  (...val: Parameters<T>) => {
    for (const [validate, msg] of validations) {
      if (N(validate(...val))) {
        return msg;
      }
    }
    return;
  };

const failOnTrue = <T extends AnyFn<any, boolean>, U extends unknown>(
  validations: [T, U][],
) =>
  (...val: Parameters<T>) => {
    for (const [validate, msg] of validations) {
      if (validate(...val)) {
        return msg;
      }
    }
    return;
  };

export { everyFalse, everyTrue, failOnFalse, failOnTrue };
