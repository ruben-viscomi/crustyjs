"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toResultAsync = exports.toResult = exports.err = exports.ok = void 0;
const implementation_1 = require("./implementation");
const constants_1 = require("./constants");
function _result(value) {
    return new implementation_1._Result(value);
}
function ok(value) {
    return _result({
        [constants_1.OK_FIELD_VALUE]: value,
        [constants_1.RESULT_FIELD_DISCRIMINATOR]: constants_1.RESULT_OK,
    });
}
exports.ok = ok;
function err(value) {
    return _result({
        [constants_1.ERR_FIELD_VALUE]: value,
        [constants_1.RESULT_FIELD_DISCRIMINATOR]: constants_1.RESULT_ERR,
    });
}
exports.err = err;
function toResult(throwable, converter) {
    try {
        return ok(throwable());
    }
    catch (error) {
        return !!converter
            ? err(converter(error))
            : err(error);
    }
}
exports.toResult = toResult;
function toResultAsync(throwable, converter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return ok(yield throwable());
        }
        catch (error) {
            return !!converter
                ? err(converter(error))
                : err(error);
        }
    });
}
exports.toResultAsync = toResultAsync;
