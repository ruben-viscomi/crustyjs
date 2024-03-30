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

export function ok<T, E>(value: T): Result<T, E> {
    return _result({
        [OK_FIELD_VALUE]: value,
        [RESULT_FIELD_DISCRIMINATOR]: RESULT_OK,
    });
}

export function err<T, E>(value: E): Result<T, E> {
    return _result({
        [ERR_FIELD_VALUE]: value,
        [RESULT_FIELD_DISCRIMINATOR]: RESULT_ERR,
    });
}

export function throwableToResult<T>(throwable: () => T): Result<T, unknown>;
export function throwableToResult<T, E>(throwable: () => T, converter: (error: unknown) => E): Result<T, E>;
export function throwableToResult<T, E = unknown>(throwable: () => T, converter?: (error: unknown) => E) {
    try {
        return ok(throwable())
    } catch (error) {
        return !!converter
            ? err(converter(error))
            : err(error);
    }
}

export async function throwableAsyncToResult<T>(throwable: () => Promise<T>): Promise<Result<T, unknown>>
export async function throwableAsyncToResult<T, E>(throwable: () => Promise<T>, converter: (error: unknown) => E): Promise<Result<T, E>>
export async function throwableAsyncToResult<T, E = unknown>(throwable: () => Promise<T>, converter?: (error: unknown) => E) {
    try {
        return ok(await throwable());
    } catch (error) {
        return !!converter
            ? err(converter(error))
            : err(error);
    }
}