"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Result = void 0;
const guards_1 = require("./guards");
const constants_1 = require("./constants");
class _Result {
    constructor(value) {
        this._value = value;
    }
    match(Ok, Err) {
        return (0, guards_1._isOk)(this._value)
            ? Ok(this.unwrap())
            : Err(this.unwrapErr());
    }
    unwrap() {
        if ((0, guards_1._isOk)(this._value))
            return this._value[constants_1.OK_FIELD_VALUE];
        throw TypeError("Cannot `unwrap` an `Err`.");
    }
    unwrapOr(value) {
        return (0, guards_1._isOk)(this._value)
            ? this.unwrap()
            : value;
    }
    unwrapErr() {
        if ((0, guards_1._isErr)(this._value))
            return this._value[constants_1.ERR_FIELD_VALUE];
        throw TypeError("Cannot `unwrapErr` an `Ok`");
    }
    isOk() {
        return (0, guards_1._isOk)(this._value);
    }
    isErr() {
        return (0, guards_1._isErr)(this._value);
    }
}
exports._Result = _Result;
