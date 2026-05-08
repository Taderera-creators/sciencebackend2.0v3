"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRouter = void 0;
const express_1 = __importDefault(require("express"));
const feedbacks_1 = require("../controllers/feedbacks");
const postMiddleware_1 = require("../middleware/postMiddleware");
const routers = express_1.default.Router();
exports.FeedbackRouter = routers;
const app = (0, express_1.default)();
app.use(express_1.default.json());
routers.get("/", feedbacks_1.Controllers.get);
routers.post("/", postMiddleware_1.validateTokenPost, feedbacks_1.Controllers.post);
