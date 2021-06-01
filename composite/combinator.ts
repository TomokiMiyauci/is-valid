// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.

/**
 * Utility function to convert arguments.
 * @param conversion - Any function
 * @param fn - A function that takes the return value of `conversion` as an argument
 * @returns A function that takes a `conversion` argument as an argument
 *
 * @example
 * ```ts
 * const fn = cv(() => 1, (val) => val + 1)
 * fn() // 2
 *
 * const upcast = cv((val: unknown) => val as string, (val) => val.length > 8)
 * upcast('hello-world' as unknown) // true
 *
 * const mailHeader = cv((user: { name: string }) => user.name, (name) => `Dear ${name}` )
 * mailHeader({ name: 'Tom' }) // 'Dear Tom'
 * ```
 */
const cv = <
  A extends unknown,
  T extends (...args: any[]) => A,
  R,
>(
  conversion: T,
  fn: (a: ReturnType<T>) => R,
) => (...b: Parameters<T>): R => fn(conversion(...b) as ReturnType<T>);

/**
 * A function that casts the return value of a function.
 * @returns A function whose return value is cast to the specified type
 *
 * @example
 * ```ts
 * const castString = cast<string>()
 * castString // types: (val: unknown) => string
 * ```
 */
const cast = <R, T extends unknown = unknown>() => (val: T): R => val as R;

export { cast, cv };
