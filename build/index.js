"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const log_in_1 = require("./routes/log-in");
const user_details_1 = require("./routes/user-details");
const articles_1 = require("./routes/articles");
const feedbacks_1 = require("./routes/feedbacks");
require("dotenv").config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/user-details", user_details_1.userDetailsRouter);
app.use("/log-in", log_in_1.logInRouter);
app.use("/articles", articles_1.ArticlesRouter);
app.use("/feedback", feedbacks_1.FeedbackRouter);
///const port =   process.env.URL || "mongodb://localhost:27017"
mongoose_1.default.connect(process.env.URL
//port
//"mongodb://localhost:27017"
);
//leaving autoIndex to true cause a signficant poor perfomance
app.listen(8000, () => {
    console.log("server running");
});
