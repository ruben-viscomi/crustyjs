import { SOME_FIELD_VALUE } from "./constants";
import { _isNone, _isSome } from "./guards";
import { Option, _OptionBase } from "./types";

export class _Option<T> implements Option<T> {
    private _value: _OptionBase;
    
    constructor(value: _OptionBase) {
        this._value = value;
    }

    match<A>(Some: (value: T) => A, None: () => A): A {
        return _isSome<T>(this._value)
            ? Some(this.unwrap())
            : None();
    }

    unwrap(): T {
        if (_isSome<T>(this._value))
            return this._value[SOME_FIELD_VALUE];
        throw TypeError("Cannot `unwrap` a `None`");
    }

    unwrapOr(value: T): T {
        return _isSome<T>(this._value)
            ? this.unwrap()
            : value;
    }

    isSome(): boolean {
        return _isSome<T>(this._value);
    }

    isNone(): boolean {
        return _isNone(this._value);
    }
}