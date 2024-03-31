"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.some = exports.none = exports.option = void 0;
const constants_1 = require("./constants");
const guards_1 = require("./guards");
const implementation_1 = require("./implementation");
function _option(value) {
    return new implementation_1._Option(value);
}
/**
 * Instantiates an {@link Option} from the provided value.
 * @param value any value.
 * @returns an instance of {@link None} if `value` is "nullable", {@link Some} otherwise.
 */
function option(value) {
    return (0, guards_1._isNil)(value)
        ? none()
        : some(value);
}
exports.option = option;
/**
 * Instantiates an {@link Option} of type {@link None}.
 * @returns an instance of {@link None}.
 */
function none() {
    return _option({
        [constants_1.OPTION_FIELD_DISCRIMINATOR]: constants_1.OPTION_NONE,
    });
}
exports.none = none;
/**
 * Instantiates an {@link Option} of type {@link Some}.
 * @param value any "non-nullable" value.
 * @throws a {@link TypeError} if `value` is "nullable".
 * @returns an instance of {@link Some}.
 */
function some(value) {
    if ((0, guards_1._isNil)(value))
        throw TypeError("Some must be a non null value.");
    return _option({
        [constants_1.SOME_FIELD_VALUE]: value,
        [constants_1.OPTION_FIELD_DISCRIMINATOR]: constants_1.OPTION_SOME,
    });
}
exports.some = some;
