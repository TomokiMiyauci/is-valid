// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { assertEquals } from "../dev_deps.ts";
import { isPrimitive } from "./isPrimitive.ts";
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

Deno.test("isPrimitive", () => {
  const table: [unknown, boolean][] = [
    [EMPTY_STRING, true],
    ["test", true],
    [false, true],
    [true, true],
    [ZERO, true],
    [ONE, true],
    [BIG1, true],
    [SYMBOL, true],
    [null, true],
    [undefined, true],
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
      isPrimitive(val),
      expected,
      `isPrimitive(${isSymbol(val) ? "symbol" : val}) -> ${expected}`,
    );
  });
});
