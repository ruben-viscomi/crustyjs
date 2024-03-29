import { _Option } from "./implementation";
import { None, Option, Some } from "./types";

function option<T>(value: Some<T> | None): Option<T> {
    return new _Option<T>(value);
}

export function none<T>(): Option<T> {
    return option({
        [OPTION_FIELD_DISCRIMINATOR]: OPTION_NONE,
    });
}

export function some<T>(value: T): Option<T> {
    return option({
        [SOME_FIELD_VALUE]: value,
        [OPTION_FIELD_DISCRIMINATOR]: OPTION_SOME,
    });
}