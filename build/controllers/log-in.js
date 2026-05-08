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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const user_details_1 = require("../models/user-details");
const errors_1 = require("../errors");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.Controllers = {
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { Email, password } = req.body;
        try {
            let user = yield user_details_1.UserDetails.findOne({
                Email,
            });
            if (!user) {
                return res.status(400).json({ msg: errors_1.ERRORS.USER_NOT_FOUND });
            }
            else {
                yield bcryptjs_1.default.compare(password, user.password).then((match) => {
                    if (!match) {
                        return res.status(400).json({ msg: errors_1.ERRORS.INVALID_CREDINTIALS });
                    }
                    else {
                        const accessToken = jsonwebtoken_1.default.sign({ Email }, process.env.JWT);
                        return res.status(200).json({ accessToken });
                    }
                });
                // await LogIn.create({ Email, password });
            }
        }
        catch (error) {
            res.status(500).json({ msg: errors_1.ERRORS.SERVER_ERROR });
        }
    }),
};
