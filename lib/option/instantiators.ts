import { OPTION_FIELD_DISCRIMINATOR, OPTION_NONE, OPTION_SOME, SOME_FIELD_VALUE } from "./constants";
import { _isNil } from "./guards";
import { _Option } from "./implementation";
import { None, Option, Some } from "./types";

function _option<T>(value: Some<T> | None): Option<T> {
    return new _Option<T>(value);
}

export function option<T>(value?: T | null | undefined): Option<T> {
    return _isNil(value)
        ? none()
        : some(value);
}

export function none<T>(): Option<T> {
    return _option({
        [OPTION_FIELD_DISCRIMINATOR]: OPTION_NONE,
    });
}

export function some<T>(value: T): Option<T> {
    if (_isNil(value))
        throw TypeError("Some must be a non null value.");

    return _option({
        [SOME_FIELD_VALUE]: value,
        [OPTION_FIELD_DISCRIMINATOR]: OPTION_SOME,
    });
}