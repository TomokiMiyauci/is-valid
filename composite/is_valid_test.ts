// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import {
  failOnFalse,
  failOnTrue,
  isValidFalse,
  isValidTrue,
} from "./is_valid.ts";
import { assertEquals } from "../dev_deps.ts";
import { AnyFn, not } from "../deps.ts";
import { gtLength, ltLength } from "../validation/length.ts";
import { isString } from "../validation/isString.ts";

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

Deno.test("isValidTrue", () => {
  const table: [AnyFn<any, boolean>[], unknown, boolean][] = [
    [[isString], "", true],
    [[isString], undefined, false],
    [[isString, gtLength(4)], undefined, false],
    [[isString, gtLength(4)], "und", false],
    [[isString, gtLength(4)], "undefined", true],
    [[isString, gtLength(4), ltLength(6)], "undefined", false],
    [[isString, gtLength(4), ltLength(6)], "abcde", true],
    [[isString, gtLength(4), ltLength(6)], "abcdef", false],
    // internal error
    [[gtLength(4), ltLength(6)], undefined, false],
  ];

  table.forEach(([validations, val, expected]) => {
    assertEquals(
      isValidTrue(...validations)(val),
      expected,
      `isValidTrue(${validations})(${val}) -> ${expected}`,
    );
  });
});

Deno.test("isValidFalse", () => {
  const table: [AnyFn<any, boolean>[], unknown, boolean][] = [
    [[isString], "", false],
    [[isString], undefined, true],
    [[isString, gtLength(4)], undefined, false],
    [[not(isString), gtLength(4)], "und", true],
    [[not(isString), gtLength(4)], "undefined", false],
    // internal error
    [[gtLength(4), ltLength(6)], undefined, false],
  ];

  table.forEach(([validations, val, expected]) => {
    assertEquals(
      isValidFalse(...validations)(val),
      expected,
      `isValidFalse(${validations})(${val}) -> ${expected}`,
    );
  });
});
