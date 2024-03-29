import { Result, _ResultBase } from "./types";
export declare class _Result<T, E> implements Result<T, E> {
    private _value;
    constructor(value: _ResultBase);
    match<A>(Ok: (value: T) => A, Err: (error: E) => A): A;
    unwrap(): T;
    unwrapOr(value: T): T;
    unwrapErr(): E;
    isOk(): boolean;
    isErr(): boolean;
}
