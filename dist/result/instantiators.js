"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.err = exports.ok = void 0;
const implementation_1 = require("./implementation");
const constants_1 = require("./constants");
function result(value) {
    return new implementation_1._Result(value);
}
function ok(value) {
    return result({
        [constants_1.OK_FIELD_VALUE]: value,
        [constants_1.RESULT_FIELD_DISCRIMINATOR]: constants_1.RESULT_OK,
    });
}
exports.ok = ok;
function err(value) {
    return result({
        [constants_1.ERR_FIELD_VALUE]: value,
        [constants_1.RESULT_FIELD_DISCRIMINATOR]: constants_1.RESULT_ERR,
    });
}
exports.err = err;
