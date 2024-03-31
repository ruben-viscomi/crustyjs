import { OPTION_FIELD_DISCRIMINATOR, OPTION_NONE, OPTION_SOME, SOME_FIELD_VALUE } from "./constants";
import { _isNil } from "./guards";
import { _Option } from "./implementation";
import { None, Option, Some } from "./types";

function _option<T>(value: Some<T> | None): Option<T> {
    return new _Option<T>(value);
}

/**
 * Instantiates an {@link Option} from the provided value.
 * @param value any value.
 * @returns an instance of {@link None} if `value` is "nullable", {@link Some} otherwise.
 */
export function option<T>(value?: T | null | undefined): Option<T> {
    return _isNil(value)
        ? none()
        : some(value);
}

/**
 * Instantiates an {@link Option} of type {@link None}.
 * @returns an instance of {@link None}.
 */
export function none<T>(): Option<T> {
    return _option({
        [OPTION_FIELD_DISCRIMINATOR]: OPTION_NONE,
    });
}

/**
 * Instantiates an {@link Option} of type {@link Some}.
 * @param value any "non-nullable" value.
 * @throws a {@link TypeError} if `value` is "nullable".
 * @returns an instance of {@link Some}.
 */
export function some<T>(value: T): Option<T> {
    if (_isNil(value))
        throw TypeError("Some must be a non null value.");

    return _option({
        [SOME_FIELD_VALUE]: value,
        [OPTION_FIELD_DISCRIMINATOR]: OPTION_SOME,
    });
}