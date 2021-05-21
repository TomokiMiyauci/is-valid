// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { gteLength, gtLength, lteLength, ltLength } from "./length.ts";
import { assertEqual, assertEquals } from "../dev_deps.ts";

Deno.test("gtLength", () => {
  const table: [number, string | unknown[], boolean][] = [
    [0, "", false],
    [0, "1", true],
    [0, [], false],
    [0, [[]], true],
    [10, "abcdefghij", false],
    [10, "abcdefghijk", true],
    [10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], false],
    [10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1], true],
    [-1, "", true],
    [-1, "abc", true],
  ];
  table.forEach(([a, b, expected]) => {
    assertEquals(
      gtLength(a)(b),
      expected,
      `gtLength(${a}, ${b}) -> ${expected}`,
    );
  });

  assertEqual<boolean>(gtLength(0)([]));
});

Deno.test("gteLength", () => {
  const table: [number, string | unknown[], boolean][] = [
    [0, "", true],
    [0, "1", true],
    [0, [], true],
    [0, [[]], true],
    [10, "abcdefghi", false],
    [10, "abcdefghij", true],
    [10, "abcdefghijk", true],
    [10, [1, 2, 3, 4, 5, 6, 7, 8, 9], false],
    [10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], true],
    [10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1], true],
    [-1, "", true],
    [-1, "abc", true],
  ];
  table.forEach(([a, b, expected]) => {
    assertEquals(
      gteLength(a)(b),
      expected,
      `gteLength(${a}, ${b}) -> ${expected}`,
    );
  });

  assertEqual<boolean>(gteLength(0)([]));
});

Deno.test("ltLength", () => {
  const table: [number, string | unknown[], boolean][] = [
    [0, "", false],
    [0, "1", false],
    [0, [], false],
    [0, [[]], false],
    [10, "abcdefghi", true],
    [10, "abcdefghij", false],
    [10, "abcdefghijk", false],
    [10, [1, 2, 3, 4, 5, 6, 7, 8, 9], true],
    [10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], false],
    [10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1], false],
    [-1, "", false],
    [-1, "abc", false],
  ];
  table.forEach(([a, b, expected]) => {
    assertEquals(
      ltLength(a)(b),
      expected,
      `ltLength(${a}, ${b}) -> ${expected}`,
    );
  });

  assertEqual<boolean>(ltLength(0)([]));
});

Deno.test("lteLength", () => {
  const table: [number, string | unknown[], boolean][] = [
    [0, "", true],
    [0, "1", false],
    [0, [], true],
    [0, [[]], false],
    [10, "abcdefghi", true],
    [10, "abcdefghij", true],
    [10, "abcdefghijk", false],
    [10, [1, 2, 3, 4, 5, 6, 7, 8, 9], true],
    [10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], true],
    [10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1], false],
    [-1, "", false],
    [-1, "abc", false],
  ];
  table.forEach(([a, b, expected]) => {
    assertEquals(
      lteLength(a)(b),
      expected,
      `lteLength(${a}, ${b}) -> ${expected}`,
    );
  });

  assertEqual<boolean>(lteLength(0)([]));
});
