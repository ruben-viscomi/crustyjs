import {
    ERR_FIELD_VALUE,
    OK_FIELD_VALUE,
    RESULT_ERR,
    RESULT_FIELD_DISCRIMINATOR,
    RESULT_OK,
    RESULT_TYPES,
} from "./constants";

type _ResultType = typeof RESULT_TYPES[number];

export interface _ResultBase {
    [RESULT_FIELD_DISCRIMINATOR]: _ResultType;
}

export interface Ok<T> extends _ResultBase {
    [RESULT_FIELD_DISCRIMINATOR]: typeof RESULT_OK;
    [OK_FIELD_VALUE]: T;
}

export interface Err<E> extends _ResultBase {
    [RESULT_FIELD_DISCRIMINATOR]: typeof RESULT_ERR;
    [ERR_FIELD_VALUE]: E;
}

export interface Result<T, E> {
    match<A>(
        Ok: (value: T) => A,
        Err: (error: E) => A
    ): A;
    unwrap(): T;
    unwrapOr(value: T): T;
    unwrapErr(): E;
    isOk(): boolean;
    isErr(): boolean;
}