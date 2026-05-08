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
const uuid_1 = require("uuid");
const storage_1 = require("@google-cloud/storage");
const articles_1 = require("../models/articles");
const user_details_1 = require("../models/user-details");
const errors_1 = require("../errors");
exports.Controllers = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const article = yield articles_1.Articles.find().populate("UserDetails").sort({ _id: -1 })
            .limit(limit)
            .skip(page * limit);
        const totalArticles = yield articles_1.Articles.countDocuments();
        const pageCount = Math.ceil(totalArticles / limit);
        /**
                const articleDetails ={
        
                    pageCount,
                    article,
                    page:page +1,
                    pageLimit:limit,
                    totalArticles
        
                }
                    */
        res.status(200).json({
            pageCount,
            article,
            page: page + 1,
            pageLimit: limit,
        });
    }),
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const { email } = req.name;
        const { topic, heading, article } = req.body;
        console.log(topic);
        const imageBuffer = (_b = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image[0]) === null || _b === void 0 ? void 0 : _b.buffer;
        //console.log(imageBuffer)
        /* uploading images to google cloud*/
        //process.env.PROJECTID
        const storage = new storage_1.Storage({
            //"avid-compound-422809-v5"
            projectId: process.env.PROJECTID,
            //keyFilename: process.env.KEYFILENAME,
            credentials: {
                type: process.env.type,
                project_id: process.env.project_id,
                private_key_id: process.env.private_key_id,
                private_key: process.env.private_key,
                client_email: process.env.client_email,
                client_id: process.env.client_id,
                //auth_uri: "https://accounts.google.com/o/oauth2/auth",
                // token_uri "https://oauth2.googleapis.com/token",
                // auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
                // client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/maishopcloudstorage%40avid-compound-422809-v5.iam.gserviceaccount.com",
                universe_domain: process.env.universe_domain
            }
        });
        const bucket = storage.bucket(process.env.BUCKETNAME);
        const file = req.files;
        const imageId = (0, uuid_1.v4)() + ((_c = file === null || file === void 0 ? void 0 : file.image[0]) === null || _c === void 0 ? void 0 : _c.originalname);
        const fileUpload = bucket.file(imageId);
        try {
            const writerId = yield user_details_1.UserDetails.findOne({
                email
            });
            yield fileUpload.save(imageBuffer);
            yield articles_1.Articles.create({
                topic,
                heading,
                image: imageId,
                article,
                UserDetails: writerId === null || writerId === void 0 ? void 0 : writerId._id
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: errors_1.ERRORS.SERVER_ERROR });
        }
    })
};
