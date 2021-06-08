// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.

import { assertEquals } from "../dev_deps.ts";
import {
  isLeftTrimmable,
  isRightTrimmable,
  isTrimmable,
} from "./isTrimmable.ts";

Deno.test("isTrimmable", () => {
  const table: [string, boolean][] = [
    ["", false],
    ["a", false],
    ["hoge", false],
    [" hoge", true],
    ["hoge ", true],
    [" hoge ", true],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isTrimmable(val),
      expected,
      `isTrimmable(${val}) -> ${expected}`,
    );
  });
});

Deno.test("isLeftTrimmable", () => {
  const table: [string, boolean][] = [
    ["", false],
    ["a", false],
    ["hoge", false],
    [" hoge", true],
    ["hoge ", false],
    [" hoge ", true],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isLeftTrimmable(val),
      expected,
      `isLeftTrimmable(${val}) -> ${expected}`,
    );
  });
});

Deno.test("isRightTrimmable", () => {
  const table: [string, boolean][] = [
    ["", false],
    ["a", false],
    ["hoge", false],
    [" hoge", false],
    ["hoge ", true],
    [" hoge ", true],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      isRightTrimmable(val),
      expected,
      `isRightTrimmable(${val}) -> ${expected}`,
    );
  });
});
