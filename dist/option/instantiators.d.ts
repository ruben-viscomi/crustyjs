import { Option } from "./types";
/**
 * Instantiates an {@link Option} from the provided value.
 * @param value any value.
 * @returns an instance of {@link None} if `value` is "nullable", {@link Some} otherwise.
 */
export declare function option<T>(value?: T | null | undefined): Option<T>;
/**
 * Instantiates an {@link Option} of type {@link None}.
 * @returns an instance of {@link None}.
 */
export declare function none<T>(): Option<T>;
/**
 * Instantiates an {@link Option} of type {@link Some}.
 * @param value any "non-nullable" value.
 * @throws a {@link TypeError} if `value` is "nullable".
 * @returns an instance of {@link Some}.
 */
export declare function some<T>(value: T): Option<T>;
