// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
import {
  everyFalse,
  everyTrue,
  failOnFalse,
  failOnTrue,
  someFalse,
  someTrue,
} from "./is_valid.ts";
import { assertEquals, isUndefined } from "../dev_deps.ts";
import { AnyFn, not } from "../deps.ts";
import { gtLength, ltLength } from "../validation/length.ts";
import { isString } from "../validation/isString.ts";
import { assertEqual } from "./_asserts.ts";

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

Deno.test("everyTrue", () => {
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
      everyTrue(...validations)(val),
      expected,
      `everyTrue(${validations})(${val}) -> ${expected}`,
    );
  });

  assertEqual<(a: unknown) => boolean>(everyTrue(isString));
  assertEqual<(a: string) => boolean>(everyTrue(isString, gtLength(4)));
});

Deno.test("someTrue", () => {
  const table: [AnyFn<any, boolean>[], unknown, boolean][] = [
    [[isString], "", true],
    [[isString], undefined, false],
    [[isString, gtLength(4)], undefined, false],
    [[isString, (a: any) => a.size > 3], undefined, false],
    [[isString, (a: any) => a.size > 3, isUndefined], undefined, true],
    [[gtLength(4)], "und", false],
    [[gtLength(4), gtLength(2)], "und", true],
    [[gtLength(4), gtLength(2)], "un", false],
    [[gtLength(4), ltLength(6)], "undefined", true],
    [[gtLength(4), ltLength(6)], "abcde", true],
    [[gtLength(4), ltLength(6)], "abcdef", true],
  ];

  table.forEach(([validations, val, expected]) => {
    assertEquals(
      someTrue(...validations)(val),
      expected,
      `someTrue(${validations})(${val}) -> ${expected}`,
    );
  });

  assertEqual<(a: unknown) => boolean>(everyTrue(isString));
  assertEqual<(a: string) => boolean>(everyTrue(isString, gtLength(4)));
});

Deno.test("everyFalse", () => {
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
      everyFalse(...validations)(val),
      expected,
      `everyFalse(${validations})(${val}) -> ${expected}`,
    );
  });
  assertEqual<(a: unknown) => boolean>(everyFalse(isString));
  assertEqual<(a: string) => boolean>(everyFalse(isString, gtLength(4)));
});

Deno.test("someFalse", () => {
  const table: [AnyFn<any, boolean>[], unknown, boolean][] = [
    [[isString], "", false],
    [[isString], undefined, true],
    [[gtLength(4)], undefined, false],
    [[isString, gtLength(4)], "und", true],
    [[isString, gtLength(4)], "undefined", false],
    [[gtLength(4), ltLength(6)], undefined, false],
  ];

  table.forEach(([validations, val, expected]) => {
    assertEquals(
      someFalse(...validations)(val),
      expected,
      `someFalse(${validations})(${val}) -> ${expected}`,
    );
  });
  assertEqual<(a: unknown) => boolean>(everyFalse(isString));
  assertEqual<(a: string) => boolean>(everyFalse(isString, gtLength(4)));
});
