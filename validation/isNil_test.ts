// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { assertEquals } from "../dev_deps.ts";
import { isNil } from "./isNil.ts";
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

Deno.test("isNil", () => {
  const table: [unknown, boolean][] = [
    [null, true],
    [undefined, true],
    [ZERO, false],
    [ONE, false],
    [EMPTY_STRING, false],
    ["test", false],
    [false, false],
    [true, false],
    [BIG1, false],
    [SYMBOL, false],
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
      isNil(val),
      expected,
      `isNil(${isSymbol(val) ? "symbol" : val}) -> ${expected}`,
    );
  });
});
