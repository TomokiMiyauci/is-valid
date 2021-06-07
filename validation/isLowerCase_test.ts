// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.

import { assertEquals } from "../dev_deps.ts";
import { isLowerCase } from "./isLowerCase.ts";

Deno.test("isLowerCase", () => {
  const table: [string, boolean][] = [
    ["", true],
    ["a", true],
    ["hoge", true],
    ["Hello", false],
    ["heLlo", false],
    ["hello Everyone", false],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isLowerCase(val),
      expected,
      `isLowerCase(${val}) -> ${expected}`,
    );
  });
});
