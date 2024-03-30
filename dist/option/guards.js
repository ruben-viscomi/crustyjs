"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._isNone = exports._isSome = exports._isNil = void 0;
function _isNil(value) {
    return value === undefined || value === null;
}
exports._isNil = _isNil;
function _isSome(value) {
    return (value === null || value === void 0 ? void 0 : value[OPTION_FIELD_DISCRIMINATOR]) === OPTION_SOME
        && !_isNil(value === null || value === void 0 ? void 0 : value[SOME_FIELD_VALUE]);
}
exports._isSome = _isSome;
function _isNone(value) {
    return value[OPTION_FIELD_DISCRIMINATOR] === OPTION_NONE;
}
exports._isNone = _isNone;
