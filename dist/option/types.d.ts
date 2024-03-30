import { OPTION_FIELD_DISCRIMINATOR, OPTION_NONE, OPTION_SOME, OPTION_TYPES, SOME_FIELD_VALUE } from "./constants";
export type _OptionType = typeof OPTION_TYPES[number];
export interface _OptionBase {
    [OPTION_FIELD_DISCRIMINATOR]: _OptionType;
}
export interface Some<T> extends _OptionBase {
    [OPTION_FIELD_DISCRIMINATOR]: typeof OPTION_SOME;
    [SOME_FIELD_VALUE]: T;
}
export interface None extends _OptionBase {
    [OPTION_FIELD_DISCRIMINATOR]: typeof OPTION_NONE;
}
export interface Option<T> {
    match<A>(Some: (value: T) => A, None: () => A): A;
    unwrap(): T;
    unwrapOr(value: T): T;
    isSome(): boolean;
    isNone(): boolean;
}
