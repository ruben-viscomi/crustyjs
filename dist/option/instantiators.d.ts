import { Option } from "./types";
export declare function option<T>(value?: T | null | undefined): Option<T>;
export declare function none<T>(): Option<T>;
export declare function some<T>(value: T): Option<T>;
