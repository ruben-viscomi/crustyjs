import { _isErr, _isOk } from "./guards";
import { Result, _ResultBase } from "./types";
import { ERR_FIELD_VALUE, OK_FIELD_VALUE } from "./constants";

export class _Result<T, E> implements Result<T, E> {
    private _value: _ResultBase;

    constructor(value: _ResultBase) {
        this._value = value;
    }

    match<A>(Ok: (value: T) => A, Err: (error: E) => A): A {
        return _isOk<T>(this._value)
            ? Ok(this.unwrap())
            : Err(this.unwrapErr());
    }

    unwrap(): T {
        if (_isOk<T>(this._value))
            return this._value[OK_FIELD_VALUE];
        throw Error("Cannot `unwrap` an `Err`.");
    }

    unwrapOr(value: T): T {
        return _isOk<T>(this._value)
            ? this.unwrap()
            : value;
    }

    unwrapErr(): E {
        if (_isErr<E>(this._value))
            return this._value[ERR_FIELD_VALUE];
        throw Error ("Cannot `unwrapErr` an `Ok`");
    }

    isOk(): boolean {
        return _isOk<T>(this._value);
    }

    isErr(): boolean {
        return _isErr<E>(this._value);
    }
}