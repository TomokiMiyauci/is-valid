// Copyright 2021-present the is-valid authors. All rights reserved. MIT license.
type TypeOf =
  | "bigint"
  | "boolean"
  | "function"
  | "number"
  | "object"
  | "string"
  | "symbol"
  | "undefined";

const typeComparisonFactory = <T>(type: TypeOf) =>
  (val: unknown): val is T => typeof val === type;

export { typeComparisonFactory };
