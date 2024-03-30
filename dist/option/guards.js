"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._isNone = exports._isSome = exports._isNil = void 0;
const constants_1 = require("./constants");
function _isNil(value) {
    return value === undefined || value === null;
}
exports._isNil = _isNil;
function _isSome(value) {
    return (value === null || value === void 0 ? void 0 : value[constants_1.OPTION_FIELD_DISCRIMINATOR]) === constants_1.OPTION_SOME
        && !_isNil(value === null || value === void 0 ? void 0 : value[constants_1.SOME_FIELD_VALUE]);
}
exports._isSome = _isSome;
function _isNone(value) {
    return value[constants_1.OPTION_FIELD_DISCRIMINATOR] === constants_1.OPTION_NONE;
}
exports._isNone = _isNone;
