"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articles = void 0;
const mongoose_1 = require("mongoose");
const ArticleSchema = new mongoose_1.Schema({
    topic: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    article: {
        type: String,
        required: true,
    },
    UserDetails: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserDetails" },
});
exports.Articles = (0, mongoose_1.model)("Articles", ArticleSchema);
