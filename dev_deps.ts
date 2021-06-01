// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
export { assertEquals } from "https://deno.land/std/testing/asserts.ts";
export { isUndefined } from "https://deno.land/x/fonction@v1.8.0-beta.6/mod.ts";

export const assertEqual = <T, U extends T = T>(_actual?: U): void => {};
export const assertReturnType = <T>(_fn: (...args: any[]) => T): void => {};
