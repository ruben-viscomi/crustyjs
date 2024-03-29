import { Option, _OptionBase } from "./types";
export declare class _Option<T> implements Option<T> {
    private _value;
    constructor(value: _OptionBase);
    match<A>(Some: (value: T) => A, None: () => A): A;
    unwrap(): T;
    unwrapOr(value: T): T;
    isSome(): boolean;
    isNone(): boolean;
}
