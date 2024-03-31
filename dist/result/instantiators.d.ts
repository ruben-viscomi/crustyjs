import { Result } from "./types";
/**
 * Wraps the value `T` inside an {@link Ok}.
 * @param value any value.
 * @returns an instance of {@link Ok}.
 */
export declare function ok<T, E>(value: T): Result<T, E>;
/**
 * Wraps the value `E` inside an {@link Err}.
 * @param value any value.
 * @returns an instance of {@link Err}.
 */
export declare function err<T, E>(value: E): Result<T, E>;
/**
 * Instantiates the {@link Result} from the provided function.
 * @param throwable function that can throw an error.
 * @param converter (optional) function to convert the thrown type to `E`, if not provided `E = unknown`.
 * @returns an instance of {@link Err} if `throwable` throws an error, {@link Ok} otherwise.
 */
export declare function toResult<T, E = unknown>(throwable: () => T): Result<T, E>;
export declare function toResult<T, E>(throwable: () => T, converter: (error: unknown) => E): Result<T, E>;
/**
 * The asynchronous version of {@link toResult}. Instantiates the {@link Result} from the provided async function.
 * @param throwable asynchronous function that can throw an error.
 * @param converter (optional) function to convert the thrown type to `E`, if not provided `E = unknown`.
 * @returns a {@link Promise} wrapping an instance of {@link Err} if `throwable` throws an error, {@link Ok} otherwise.
 */
export declare function toResultAsync<T, E = unknown>(throwable: () => Promise<T>): Promise<Result<T, E>>;
export declare function toResultAsync<T, E>(throwable: () => Promise<T>, converter: (error: unknown) => E): Promise<Result<T, E>>;
