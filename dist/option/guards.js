"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._isNone = exports._isSome = void 0;
function _isSome(value) {
    return typeof value === "object"
        && !!value
        && value[OPTION_FIELD_DISCRIMINATOR] === OPTION_SOME;
}
exports._isSome = _isSome;
function _isNone(value) {
    return typeof value === "object"
        && !!value
        && value[OPTION_FIELD_DISCRIMINATOR] === OPTION_NONE;
}
exports._isNone = _isNone;
