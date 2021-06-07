// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.

import { assertEquals } from "../dev_deps.ts";
import { isUpperCase } from "./isUpperCase.ts";

Deno.test("isUpperCase", () => {
  const table: [string, boolean][] = [
    ["", true],
    ["a", false],
    ["hoge", false],
    ["Hello", false],
    ["heLlo", false],
    ["hello Everyone", false],
    ["A", true],
    ["ABC", true],
    ["ABC DEF", true],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isUpperCase(val),
      expected,
      `isUpperCase(${val}) -> ${expected}`,
    );
  });
});
