"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }
    try {
        const verify = jsonwebtoken_1.default.verify(authHeader, process.env.JWT);
        req.name = verify;
        if (verify) {
            next();
        }
    }
    catch (err) {
        return res.sendStatus(403);
    }
};
exports.validateToken = validateToken;
//module.exports = { validateToken };
