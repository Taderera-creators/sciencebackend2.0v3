"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetails = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    profileImage: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    }
});
exports.UserDetails = (0, mongoose_1.model)("UserDetails", UserSchema);
