"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.some = exports.none = void 0;
const implementation_1 = require("./implementation");
function option(value) {
    return new implementation_1._Option(value);
}
function none() {
    return option({
        [OPTION_FIELD_DISCRIMINATOR]: OPTION_NONE,
    });
}
exports.none = none;
function some(value) {
    return option({
        [SOME_FIELD_VALUE]: value,
        [OPTION_FIELD_DISCRIMINATOR]: OPTION_SOME,
    });
}
exports.some = some;
