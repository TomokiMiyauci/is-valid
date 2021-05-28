// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { AnyFn, N, tryCatch } from "../deps.ts";

const isValidTrue = <T extends unknown[]>(
  ...validators: ((...val: T) => boolean)[]
) =>
  (...args: T) =>
    tryCatch(() => validators.every((validator) => validator(...args)), false);

const isValidFalse = <T extends unknown[]>(
  ...validators: ((...val: T) => boolean)[]
) =>
  (...args: T) =>
    tryCatch(
      () => validators.every((validator) => N(validator(...args))),
      false,
    );

const isValid = <T extends AnyFn<any, boolean>>(...validations: readonly T[]) =>
  (...val: Parameters<T>) => validations.every((validation) => validation(val));

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

export { failOnFalse, failOnTrue, isValid, isValidFalse, isValidTrue };
