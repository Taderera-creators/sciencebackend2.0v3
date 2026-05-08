"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInRouter = void 0;
const express_1 = __importDefault(require("express"));
const log_in_1 = require("../controllers/log-in");
const express_rate_limit_1 = require("express-rate-limit");
const app = (0, express_1.default)();
app.use(express_1.default.json);
const routers = express_1.default.Router();
exports.logInRouter = routers;
// limits number  of requests in 10 mins
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 10 * 60 * 1000,
    limit: 10,
    legacyHeaders: false,
    message: "to many requests"
});
routers.post("/", limiter, log_in_1.Controllers.post);
