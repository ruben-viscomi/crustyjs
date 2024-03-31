import { OPTION_FIELD_DISCRIMINATOR, OPTION_NONE, OPTION_SOME, OPTION_TYPES, SOME_FIELD_VALUE } from "./constants";
export type _OptionType = typeof OPTION_TYPES[number];
export interface _OptionBase {
    [OPTION_FIELD_DISCRIMINATOR]: _OptionType;
}
/**
 * This interface represents the {@link Some} type in an {@link Option}.
 * Wraps the value `T`.
 */
export interface Some<T> extends _OptionBase {
    [OPTION_FIELD_DISCRIMINATOR]: typeof OPTION_SOME;
    [SOME_FIELD_VALUE]: T;
}
/**
 * This interface represents the {@link None} type in an {@link Option}.
 */
export interface None extends _OptionBase {
    [OPTION_FIELD_DISCRIMINATOR]: typeof OPTION_NONE;
}
/**
 * This interface represents a {@link Option} type.
 * An {@link Option} can either be of type {@link Some} or {@link None}.
 */
export interface Option<T> {
    /**
     * Match provides some syntactic sugar to pattern match the enum-like {@link Option}.
     * @param Some the function executed if {@link Option} is of type {@link Some}.
     * @param None the function executed if {@link Option} is of type {@link None}.
     * @returns whatever is returned by the provided callbacks.
     */
    match<A>(Some: (value: T) => A, None: () => A): A;
    /**
     * Returns the wrapped value.
     * @throws a {@link TypeError} in case {@link Option} is not of type {@link Some}.
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
     * Checks if the {@link Option} is of type {@link Some}.
     * @returns `true` if the {@link Option} is of type {@link Some}, `false` otherwise.
     */
    isSome(): boolean;
    /**
     * Checks if the {@link Option} is of type {@link None}.
     * @returns `true` if the {@link Option} is of type {@link None}, `false` otherwise.
     */
    isNone(): boolean;
}
