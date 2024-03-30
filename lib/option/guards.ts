import { OPTION_FIELD_DISCRIMINATOR, OPTION_NONE, OPTION_SOME, SOME_FIELD_VALUE } from "./constants";
import { None, Some } from "./types";

export function _isNil(value: unknown): value is undefined | null {
    return value === undefined || value === null;
}

export function _isSome<T>(value: unknown): value is Some<T> {
    return (value as Some<T>)?.[OPTION_FIELD_DISCRIMINATOR] === OPTION_SOME
        && !_isNil((value as Some<T>)?.[SOME_FIELD_VALUE]);
}

export function _isNone(value: unknown): value is None {
    return (value as None)[OPTION_FIELD_DISCRIMINATOR] === OPTION_NONE;
}