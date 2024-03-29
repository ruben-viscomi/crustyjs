import { RESULT_FIELD_DISCRIMINATOR, RESULT_ERR, RESULT_OK } from "./constants";
import { Err, Ok } from "./types";

export function _isOk<T>(value: unknown): value is Ok<T> {
    return typeof value === "object"
        && !!value
        && (value as Ok<T>)[RESULT_FIELD_DISCRIMINATOR] === RESULT_OK;
}

export function _isErr<T>(value: unknown): value is Err<T> {
    return typeof value == "object"
        && !!value
        && (value as Err<T>)[RESULT_FIELD_DISCRIMINATOR] === RESULT_ERR;
}