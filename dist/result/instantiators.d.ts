import { Result } from "./types";
export declare function ok<T, E>(value: T): Result<T, E>;
export declare function err<T, E>(value: E): Result<T, E>;
export declare function throwableToResult<T>(throwable: () => T): Result<T, unknown>;
export declare function throwableToResult<T, E>(throwable: () => T, converter: (error: unknown) => E): Result<T, E>;
export declare function throwableAsyncToResult<T>(throwable: () => Promise<T>): Promise<Result<T, unknown>>;
export declare function throwableAsyncToResult<T, E>(throwable: () => Promise<T>, converter: (error: unknown) => E): Promise<Result<T, E>>;
