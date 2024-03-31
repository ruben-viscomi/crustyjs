import { ERR_FIELD_VALUE, OK_FIELD_VALUE, RESULT_ERR, RESULT_FIELD_DISCRIMINATOR, RESULT_OK, RESULT_TYPES } from "./constants";
type _ResultType = typeof RESULT_TYPES[number];
export interface _ResultBase {
    [RESULT_FIELD_DISCRIMINATOR]: _ResultType;
}
/**
 * This interface represents the {@link Ok} type in a {@link Result}.
 * Wraps the value `T`.
 */
export interface Ok<T> extends _ResultBase {
    [RESULT_FIELD_DISCRIMINATOR]: typeof RESULT_OK;
    [OK_FIELD_VALUE]: T;
}
/**
 * This interface represents the {@link Err} type in a {@link Result}.
 * Wraps the error value `E`.
 */
export interface Err<E> extends _ResultBase {
    [RESULT_FIELD_DISCRIMINATOR]: typeof RESULT_ERR;
    [ERR_FIELD_VALUE]: E;
}
/**
 * This interface represents a {@link Result} type.
 * A {@link Result} can either be of type {@link Err} or {@link Ok}.
 */
export interface Result<T, E> {
    /**
     * Match provides some syntactic sugar to pattern match the enum-like {@link Result}.
     * @param Ok the function executed if {@link Result} is of type {@link Ok}.
     * @param Err the function executed if {@link Result} is of type {@link Err}.
     * @returns whatever is returned by the provided callbacks.
     */
    match<A>(Ok: (value: T) => A, Err: (error: E) => A): A;
    /**
     * Returns the wrapped value.
     * @throws a {@link TypeError} in case {@link Result} is not of type {@link Ok}.
     * @returns the wrapped value of type `T`.
     */
    unwrap(): T;
    /**
     * Returns the wrapped value or fallbacks to `value`.
     * @param value the value to use as fallback.
     * @returns the wrapped value of type `T`.
     */
    unwrapOr(value: T): T;
    /**
     * Returns the wrapped error.
     * @throws a {@link TypeError} in case {@link Result} is not of type {@link Err}.
     * @returns the wrapped error of type `E`.
     */
    unwrapErr(): E;
    /**
     * Checks if the {@link Result} is of type {@link Ok}.
     * @returns `true` if the {@link Result} is of type {@link Ok}, `false` otherwise.
     */
    isOk(): boolean;
    /**
     * Checks if the {@link Result} is of type {@link Err}.
     * @returns `true` if the {@link Result} is of type {@link Err}, `false` otherwise.
     */
    isErr(): boolean;
}
export {};
