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
exports.Controllers = void 0;
const user_details_1 = require("../models/user-details");
const errors_1 = require("../errors");
const feedbacks_1 = require("../models/feedbacks");
exports.Controllers = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const feedback = yield feedbacks_1.Feedbacks.find().populate("UserDetails").sort({ _id: -1 });
        res.status(200).json({
            feedback
        });
    }),
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.name;
        const { topic, error, page, admin } = req.body;
        console.log(email);
        try {
            const user = yield user_details_1.UserDetails.findOne({
                email
            });
            yield feedbacks_1.Feedbacks.create({
                topic,
                error,
                page,
                admin,
                UserDetails: user === null || user === void 0 ? void 0 : user._id
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: errors_1.ERRORS.SERVER_ERROR });
        }
    })
};
