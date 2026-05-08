"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenPost = void 0;
//const jwt = require("jsonwebtoken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors = require("../errors");
const validateTokenPost = (req, res, next) => {
    const authHeader = req.body.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401).json({ msg: errors.UNAUTHORIZED });
    }
    try {
        const verify = jsonwebtoken_1.default.verify(authHeader, process.env.JWT);
        req.name = verify;
        console.log(req.name);
        if (verify) {
            next();
        }
    }
    catch (err) {
        return res.sendStatus(403);
    }
};
exports.validateTokenPost = validateTokenPost;
//module.exports = { validateTokenPost };
