"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const articles_1 = require("../controllers/articles");
const authMiddleware_1 = require("../middleware/authMiddleware");
const routers = express_1.default.Router();
exports.ArticlesRouter = routers;
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({
    /*
    fileFilter:(req,file,cb)=>{
      sharp(file.path).resize(400,400).toFormat("webp").toBuffer()
    },
    */
    storage: multer_1.default.memoryStorage()
});
routers.get("/", articles_1.Controllers.get);
routers.post("/", upload.fields([{ name: "image", maxCount: 1 }]), authMiddleware_1.validateToken, articles_1.Controllers.post);
