// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import { failOnFalse, failOnTrue } from "./is_valid.ts";
import { assertEquals } from "../dev_deps.ts";
import { AnyFn } from "../deps.ts";
import { gtLength, ltLength } from "../validation/length.ts";

Deno.test("failOnFalse", () => {
  const table: [[AnyFn<any, boolean>, unknown][], unknown, unknown][] = [
    [[[(a: string) => a === "hello", "error"]], "", "error"],
    [[[(a: string) => a === "hello", "error"]], "hello", undefined],
    [[[gtLength(4), "error"]], "aaa", "error"],
    [[[gtLength(4), "error"]], "aaaaa", undefined],
    [
      [[gtLength(4), "error"], [ltLength(10), "error2"]],
      "aaaaaaaaaaaaaaa",
      "error2",
    ],
  ];
  table.forEach(([validations, val, expected]) => {
    assertEquals(
      failOnFalse(validations)(val),
      expected,
      `failOnFalse(${validations})(${val}) -> ${expected}`,
    );
  });
});

Deno.test("failOnTrue", () => {
  const table: [[AnyFn<any, boolean>, unknown][], unknown, unknown][] = [
    [[[(a: string) => a === "hello", "error"]], "", undefined],
    [[[(a: string) => a === "hello", "error"]], "hello", "error"],
    [[[gtLength(4), "error"]], "aaa", undefined],
    [[[gtLength(4), "error"]], "aaaaa", "error"],
    [
      [[gtLength(4), "error"], [ltLength(10), "error2"]],
      "aaaaaaaaaaaaaaa",
      "error",
    ],
  ];
  table.forEach(([validations, val, expected]) => {
    assertEquals(
      failOnTrue(validations)(val),
      expected,
      `failOnTrue(${validations})(${val}) -> ${expected}`,
    );
  });
});
