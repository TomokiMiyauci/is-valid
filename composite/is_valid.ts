// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { AnyFn, N, tryCatch } from "../deps.ts";
import { isFunction } from "../validation/isFunction.ts";

type ValueOrReturnType<T> = T extends AnyFn ? ReturnType<T> : T;

/**
 * Iteration of validators that returns `true` when everything are `true`.
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
    validators.every((validator) => tryCatch(() => validator(...args), false));

/**
 * Iteration of validators that returns `true` when everything are `false`.
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
    validators.every((validator) =>
      tryCatch(() => N(validator(...args)), false)
    );

/**
 * Iteration of validators that returns `true` when some validators are `true`.
 * @param validators - Any number of validators that return a `boolean`
 * @returns A function that takes an argument of `validators[0]`
 *
 * @remarks
 * Never throw an error. If an error occurs, the validation will skip and next.
 *
 * @example
 * ```ts
 * const isValidPassword = someTrue(gtLength(8), hasCapitalLetter, hasSpecialLetter, hasNumber)
 * isValidPassword('fail') // false
 * isValidPassword('greater-than-8') // true
 * isValidPassword('Has cap') // true
 * isValidPassword('Has!') // true
 * ```
 *
 * @example
 * ```ts
 * const dangerValidation = someTrue((val: any) => val.size === 1, isNull)
 * // null.size will occur TypeError but skip and next
 * dangerValidation(null) // true
 * ```
 *
 * @public
 */
const someFalse = <T extends unknown[]>(
  ...validators: ((...val: T) => boolean)[]
) =>
  (...args: T): boolean =>
    validators.some((validator) =>
      tryCatch(() => N(validator(...args)), false)
    );

/**
 * Iteration of validators that returns `true` when some validators are `false`.
 * @param validators - Any number of validators that return a `boolean`
 * @returns A function that takes an argument of `validators[0]`
 *
 * @remarks
 * Never throw an error. If an error occurs, the validation will skip and next.
 *
 * @example
 * ```ts
 * const isValidPassword = someFalse(gtLength(8), hasCapitalLetter, hasSpecialLetter, hasNumber)
 * isValidPassword('7letter') // true
 * isValidPassword('hasCapital!100') // false
 * ```
 *
 * @example
 * ```ts
 * const dangerValidation = someFalse((val: any) => val.size === 1, isNull)
 * // null.size will occur TypeError but skip and next
 * dangerValidation(null) // false
 * ```
 *
 * @public
 */
const someTrue = <T extends unknown[]>(
  ...validators: ((...val: T) => boolean)[]
) =>
  (...args: T): boolean =>
    validators.some((validator) => tryCatch(() => validator(...args), false));

/**
 * Receives a validator and message pair and returns a message when validation is `true`.
 * @param tuple - Tuple of [Validator, ReturnValue]
 * @returns Return `tuple[1]` when `tuple[0]` is `true`; otherwise undefined.
 *
 * @beta
 */
const trueThen = <
  R,
  T extends AnyFn,
  U extends AnyFn<Parameters<T>, R> | R,
  P extends [T, U],
>(...tuple: P[]) =>
  (...args: Parameters<P[0]>): ValueOrReturnType<P[1]> | undefined => {
    for (const [validator, msgFn] of tuple) {
      if (validator(...args)) {
        if (isFunction(msgFn)) {
          return msgFn(...args) as any;
        }
        return msgFn as any;
      }
    }
    return undefined;
  };

/**
 * Receives a validator and message pair and returns all message `array` when validation is `true`.
 * @param tuple - Tuple of [Validator, ReturnValue]
 * @returns Return array of `tuple[1]` when `tuple[0]` is `true`; otherwise empty `array`.
 *
 * @beta
 */
const trueThenAll = <
  R,
  T extends AnyFn,
  U extends AnyFn<Parameters<T>, R> | R,
  P extends [T, U],
>(...tuple: P[]) =>
  (...args: Parameters<P[0]>): ValueOrReturnType<P[1]>[] | [] => {
    const messages = [];

    for (const [validator, msgFn] of tuple) {
      if (validator(...args)) {
        if (isFunction(msgFn)) {
          messages.push(msgFn(...args));
        } else {
          messages.push(msgFn);
        }
      }
    }

    return messages as ValueOrReturnType<P[1]>[] | [];
  };

/**
 * Receives a validator and message pair and returns a message when validation is `false`.
 * @param tuple - Tuple of [Validator, ReturnValue]
 * @returns Return `tuple[1]` when `tuple[0]` is `false`; otherwise undefined.
 *
 * @beta
 */
const falseThen = <
  R,
  T extends AnyFn,
  U extends AnyFn<Parameters<T>, R> | R,
  P extends [T, U],
>(...tuple: P[]) =>
  (...args: Parameters<P[0]>): ValueOrReturnType<P[1]> | undefined => {
    for (const [validator, msgFn] of tuple) {
      if (!validator(...args)) {
        if (isFunction(msgFn)) {
          return msgFn(...args) as any;
        }
        return msgFn as any;
      }
    }
    return undefined;
  };

/**
 * Receives a validator and message pair and returns all message `array` when validation is `false`.
 * @param tuple - Tuple of [Validator, ReturnValue]
 * @returns Return array of `tuple[1]` when `tuple[0]` is `false`; otherwise empty `array`.
 *
 * @beta
 */
const falseThenAll = <
  R,
  T extends AnyFn,
  U extends AnyFn<Parameters<T>, R> | R,
  P extends [T, U],
>(...tuple: P[]) =>
  (...args: Parameters<P[0]>): ValueOrReturnType<P[1]>[] | [] => {
    const messages = [];

    for (const [validator, msgFn] of tuple) {
      if (!validator(...args)) {
        if (isFunction(msgFn)) {
          messages.push(msgFn(...args));
        } else {
          messages.push(msgFn);
        }
      }
    }

    return messages as ValueOrReturnType<P[1]>[] | [];
  };

export {
  everyFalse,
  everyTrue,
  falseThen,
  falseThenAll,
  someFalse,
  someTrue,
  trueThen,
  trueThenAll,
};
