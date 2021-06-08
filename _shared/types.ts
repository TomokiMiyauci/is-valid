import { AnyFn } from "../deps.ts";
type ValueOrReturnType<T> = T extends AnyFn ? ReturnType<T> : T;

export type { ValueOrReturnType };
