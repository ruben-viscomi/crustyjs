import { None, Some } from "./types";

export function _isSome<T>(value: unknown): value is Some<T> {
    return typeof value === "object"
        && !!value
        && (value as Some<T>)[OPTION_FIELD_DISCRIMINATOR] === OPTION_SOME;
}

export function _isNone(value: unknown): value is None {
    return typeof value === "object"
        && !!value
        && (value as None)[OPTION_FIELD_DISCRIMINATOR] === OPTION_NONE;
}