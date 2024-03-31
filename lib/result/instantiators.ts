import { _Result } from "./implementation";
import { Err, Ok, Result } from "./types";
import {
    ERR_FIELD_VALUE,
    OK_FIELD_VALUE,
    RESULT_FIELD_DISCRIMINATOR,
    RESULT_ERR,
    RESULT_OK,
} from "./constants";

function _result<T, E>(value: Ok<T> | Err<E>): Result<T, E> {
    return new _Result(value);
}

/**
 * Wraps the value `T` inside an {@link Ok}.
 * @param value any value.
 * @returns an instance of {@link Ok}.
 */
export function ok<T, E>(value: T): Result<T, E> {
    return _result({
        [OK_FIELD_VALUE]: value,
        [RESULT_FIELD_DISCRIMINATOR]: RESULT_OK,
    });
}

/**
 * Wraps the value `E` inside an {@link Err}.
 * @param value any value.
 * @returns an instance of {@link Err}.
 */
export function err<T, E>(value: E): Result<T, E> {
    return _result({
        [ERR_FIELD_VALUE]: value,
        [RESULT_FIELD_DISCRIMINATOR]: RESULT_ERR,
    });
}

/**
 * Instantiates the {@link Result} from the provided function.
 * @param throwable function that can throw an error.
 * @param converter (optional) function to convert the thrown type to `E`, if not provided `E = unknown`.
 * @returns an instance of {@link Err} if `throwable` throws an error, {@link Ok} otherwise.
 */
export function toResult<T>(throwable: () => T): Result<T, unknown>;
export function toResult<T, E>(throwable: () => T, converter: (error: unknown) => E): Result<T, E>;
export function toResult<T, E = unknown>(throwable: () => T, converter?: (error: unknown) => E) {
    try {
        return ok(throwable())
    } catch (error) {
        return !!converter
            ? err(converter(error))
            : err(error);
    }
}

/**
 * The asynchronous version of {@link toResult}. Instantiates the {@link Result} from the provided async function.
 * @param throwable asynchronous function that can throw an error.
 * @param converter (optional) function to convert the thrown type to `E`, if not provided `E = unknown`.
 * @returns a {@link Promise} wrapping an instance of {@link Err} if `throwable` throws an error, {@link Ok} otherwise.
 */
export async function toResultAsync<T>(throwable: () => Promise<T>): Promise<Result<T, unknown>>
export async function toResultAsync<T, E>(throwable: () => Promise<T>, converter: (error: unknown) => E): Promise<Result<T, E>>
export async function toResultAsync<T, E = unknown>(throwable: () => Promise<T>, converter?: (error: unknown) => E) {
    try {
        return ok(await throwable());
    } catch (error) {
        return !!converter
            ? err(converter(error))
            : err(error);
    }
}