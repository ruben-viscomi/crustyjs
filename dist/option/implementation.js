"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Option = void 0;
const constants_1 = require("./constants");
const guards_1 = require("./guards");
class _Option {
    constructor(value) {
        this._value = value;
    }
    match(Some, None) {
        return (0, guards_1._isSome)(this._value)
            ? Some(this.unwrap())
            : None();
    }
    unwrap() {
        if ((0, guards_1._isSome)(this._value))
            return this._value[constants_1.SOME_FIELD_VALUE];
        throw TypeError("Cannot `unwrap` a `None`");
    }
    unwrapOr(value) {
        return (0, guards_1._isSome)(this._value)
            ? this.unwrap()
            : value;
    }
    isSome() {
        return (0, guards_1._isSome)(this._value);
    }
    isNone() {
        return (0, guards_1._isNone)(this._value);
    }
}
exports._Option = _Option;
