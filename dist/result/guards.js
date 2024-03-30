"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._isErr = exports._isOk = void 0;
const constants_1 = require("./constants");
function _isOk(value) {
    return (value === null || value === void 0 ? void 0 : value[constants_1.RESULT_FIELD_DISCRIMINATOR]) === constants_1.RESULT_OK;
}
exports._isOk = _isOk;
function _isErr(value) {
    return (value === null || value === void 0 ? void 0 : value[constants_1.RESULT_FIELD_DISCRIMINATOR]) === constants_1.RESULT_ERR;
}
exports._isErr = _isErr;
