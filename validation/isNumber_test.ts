// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { assertEquals } from "../dev_deps.ts";
import { isNumber } from "./isNumber.ts";
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

Deno.test("isNumber", () => {
  const table: [unknown, boolean][] = [
    [ZERO, true],
    [ONE, true],
    [NaN, true],
    [Infinity, true],
    [EMPTY_STRING, false],
    ["test", false],
    [false, false],
    [true, false],
    [BIG1, false],
    [SYMBOL, false],
    [null, false],
    [undefined, false],
    [EMPTY_OBJECT, false],
    [{ nest: {} }, false],
    [EMPTY_ARRAY, false],
    [[[]], false],
    [MAP, false],
    [SET, false],
    [WEAK_MAP, false],
    [WEAK_SET, false],
    [VOID_FN, false],
    [VOID_PROMISE, false],
    [DATE, false],
  ];
  table.forEach(([val, expected]) => {
    assertEquals(
      isNumber(val),
      expected,
      `isNumber(${isSymbol(val) ? "symbol" : val}) -> ${expected}`,
    );
  });
});
