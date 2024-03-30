"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.some = exports.none = exports.option = void 0;
const constants_1 = require("./constants");
const guards_1 = require("./guards");
const implementation_1 = require("./implementation");
function _option(value) {
    return new implementation_1._Option(value);
}
function option(value) {
    return (0, guards_1._isNil)(value)
        ? none()
        : some(value);
}
exports.option = option;
function none() {
    return _option({
        [constants_1.OPTION_FIELD_DISCRIMINATOR]: constants_1.OPTION_NONE,
    });
}
exports.none = none;
function some(value) {
    return _option({
        [constants_1.SOME_FIELD_VALUE]: value,
        [constants_1.OPTION_FIELD_DISCRIMINATOR]: constants_1.OPTION_SOME,
    });
}
exports.some = some;
