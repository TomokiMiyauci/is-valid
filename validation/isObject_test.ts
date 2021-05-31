// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { assertEquals } from "../dev_deps.ts";
import { isObject } from "./isObject.ts";
import { isSymbol } from "./isSymbol.ts";
import {
  BIG1,
  DATE,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  EMPTY_STRING,
  MAP,
  ONE,
  SET,
  SYMBOL,
  VOID_FN,
  VOID_PROMISE,
  WEAK_MAP,
  WEAK_SET,
  ZERO,
} from "./testdata/constants.ts";

Deno.test("isObject", () => {
  const table: [unknown, boolean][] = [
    [EMPTY_OBJECT, true],
    [{ nest: {} }, true],
    [EMPTY_ARRAY, true],
    [[[]], true],
    [MAP, true],
    [SET, true],
    [WEAK_MAP, true],
    [WEAK_SET, true],
    [VOID_FN, true],
    [VOID_PROMISE, true],
    [DATE, true],
    [ZERO, false],
    [ONE, false],
    [EMPTY_STRING, false],
    ["test", false],
    [false, false],
    [true, false],
    [BIG1, false],
    [SYMBOL, false],
    [null, false],
    [undefined, false],
  ];
  table.forEach(([val, expected]) => {
    assertEquals(
      isObject(val),
      expected,
      `isObject(${isSymbol(val) ? "symbol" : val}) -> ${expected}`,
    );
  });
});
