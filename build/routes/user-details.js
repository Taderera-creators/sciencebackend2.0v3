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
exports.userDetailsRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const storage_1 = require("@google-cloud/storage");
const userDetails_1 = require("../controllers/userDetails");
const user_details_1 = require("../models/user-details");
const authMiddleware_1 = require("../middleware/authMiddleware");
const postMiddleware_1 = require("../middleware/postMiddleware");
const express_rate_limit_1 = require("express-rate-limit");
const routers = express_1.default.Router();
exports.userDetailsRouter = routers;
const app = (0, express_1.default)();
//const { check } = require("express-validator");
/*updating profile images */
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 10 * 60 * 1000,
    limit: 10,
    legacyHeaders: false,
    message: "to many requests"
});
app.use(express_1.default.json());
// validateToken,
routers.get("/", authMiddleware_1.validateToken, userDetails_1.Controllers.get);
routers.post("/", limiter, userDetails_1.Controllers.post);
/*updating userDetails*/
/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueId = v4();
    return cb(null, uniqueId + file.originalname);
  },
});
*/
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fieldSize: 5 * 1024 * 1024,
    },
});
routers.put("/profile-image", authMiddleware_1.validateToken, upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.name;
    const storage = new storage_1.Storage({
        //"avid-compound-422809-v5".
        projectId: process.env.PROJECTID,
        keyFilename: process.env.KEYFILENAME,
    });
    const backetName = process.env.BUCKETNAME;
    const file = req.file;
    const fileName = (0, uuid_1.v4)() + file.originalname;
    const bucket = storage.bucket(process.env.PROFILEBUCKET);
    const fileUpload = bucket.file(fileName);
    try {
        const user = yield user_details_1.UserDetails.findOne({
            email
        });
        /*another version*/
        yield fileUpload.save(req.file.buffer);
        yield user_details_1.UserDetails.updateOne({ _id: user === null || user === void 0 ? void 0 : user._id }, { $set: { profileImage: fileName } });
        res.status(200);
    }
    catch (error) {
        res.status(500);
    }
}));
routers.put("/bio", postMiddleware_1.validateTokenPost, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.name;
    const { bio } = req.body;
    try {
        const user = yield user_details_1.UserDetails.findOne({
            email
        });
        yield user_details_1.UserDetails.updateOne({ _id: user === null || user === void 0 ? void 0 : user._id }, { $set: { bio } });
    }
    catch (error) {
    }
}));
