"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedbacks = void 0;
const mongoose_1 = require("mongoose");
const FeedbackSchema = new mongoose_1.Schema({
    topic: {
        type: String,
        required: true,
    },
    error: {
        type: String,
        required: true,
    },
    page: {
        type: Number,
        required: false,
    },
    admin: {
        type: String,
        required: true,
    },
    UserDetails: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserDetails" },
});
exports.Feedbacks = (0, mongoose_1.model)("Feedbacks", FeedbackSchema);
