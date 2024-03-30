import { None, Some } from "./types";
export declare function _isNil(value: unknown): value is undefined | null;
export declare function _isSome<T>(value: unknown): value is Some<T>;
export declare function _isNone(value: unknown): value is None;
