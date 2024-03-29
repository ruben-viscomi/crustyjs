import { Err, Ok } from "./types";
export declare function _isOk<T>(value: unknown): value is Ok<T>;
export declare function _isErr<T>(value: unknown): value is Err<T>;
