"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = void 0;
var ERRORS;
(function (ERRORS) {
    ERRORS["SERVER_ERROR"] = "Server error";
    ERRORS["INVALID_CREDINTIALS"] = "invalid credentials";
    ERRORS["WRONG_PASSWORD"] = "password not matching";
    ERRORS["USER_NOT_FOUND"] = "user not found";
    ERRORS["USER_AREADY_EXISTS"] = "user already exists";
    ERRORS["UNAUTHORIZED"] = "Unauthorized";
})(ERRORS || (exports.ERRORS = ERRORS = {}));
