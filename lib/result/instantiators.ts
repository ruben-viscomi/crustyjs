import { _Result } from "./implementation";
import { Err, Ok, Result } from "./types";
import {
    ERR_FIELD_VALUE,
    OK_FIELD_VALUE,
    RESULT_FIELD_DISCRIMINATOR,
    RESULT_ERR,
    RESULT_OK,
} from "./constants";

function result<T, E>(value: Ok<T> | Err<E>): Result<T, E> {
    return new _Result(value);
}

export function ok<T, E>(value: T): Result<T, E> {
    return result({
        [OK_FIELD_VALUE]: value,
        [RESULT_FIELD_DISCRIMINATOR]: RESULT_OK,
    });
}

export function err<T, E>(value: E): Result<T, E> {
    return result({
        [ERR_FIELD_VALUE]: value,
        [RESULT_FIELD_DISCRIMINATOR]: RESULT_ERR,
    });
}
