import { Option } from "./types";
export declare function none<T>(): Option<T>;
export declare function some<T>(value: T): Option<T>;
