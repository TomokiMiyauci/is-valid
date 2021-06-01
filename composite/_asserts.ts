export const assertEqual = <T, U extends T = T>(_actual?: U): void => {};
export const assertReturnType = <T>(_fn: (...args: any[]) => T): void => {};
