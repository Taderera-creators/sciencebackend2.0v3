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
        const storage = new storage_1.Storage({
            projectId: process.env.PROJECTID,
            credentials: {
                client_email: "maishopcloudstorage@avid-compound-422809-v5.iam.gserviceaccount.com",
                private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/p6rAZxGZd9kL\nv/QXbxn7ecFVNdYr+gDGVrels+7gzTXzQY5U1+LwXBSqkKryaK1RQUSD3t+QI2Vc\nJZ7CYu+G0AeHdw1V/EEsqQQJGMkWU+A1mo4B0yuXy2MWIU+a4WXGVieIl85OTMbz\n+EZ2o4il23WsfpLJMpzC1cq1jyv3cZJDEkGLZeqRsAqtX57p8FpcIFq8NHOlmoQC\n3G1/OiLTakySlSwdINlL6j6tX7Gb6zdFfTVMq5QoWP22ILQ+6CjtPJiTAYR2E0J/\nA9cuiJ0VF3S7gQYSR/Gjj/kLEnblaf9FOCSyQwiGy/q9LFZMkOyO8rDUxClq0f9d\nKS3T15vxAgMBAAECggEABj1ZiXgRkkiHms1TZMFA5vdjfE22ElUfr1VlbJH7cKWI\nYHS9mIo1dj6D4bsMsGWzYYDZeohICQj4pNOzY9VqwkiFkOXRsP9Mc+gbcdxft51g\nIFP5fu+2wfNk33SS2JJcCOVcgM2dxt4oYAsGPZiSEKxLcXk8ItbF/xs3b/UgU6b4\nKpduZGqOzHicoJlhnUrl8rVQI9pL35biS99oCU+vpcnj+HSiE/sGDS0W7oNgZqHY\nRGqmqD/WZ6ERnjxvU1TNPgDXGYYLUxpXzlH/wIVC4t/2lVQQtPJwEesBGdTl1GxY\nbN3Kmb4WA+XnCbZmZe71SozIzcLbsvDchyQSe75y0QKBgQDft7Xn5Ceo9QNBAIZd\nTOaNAnT5hu6hR9HZ9AytIKNmQ847s7m8jgZNxmrJEUO1qt/2c8/wR17iTgVYK4fx\n25+PatFt8z3zCDsPphHDzXtZRjOjNQk576mC5iV097l4v7sRMKl0gcIfqf+ygY6+\nqcrVFPQKCMyJhxAQK4fceJb17QKBgQDbT4nTNm1DXkaDD5eZ1rpOQeG/2nl8ja97\nX9WkNTBHCtiGfZmU/9+12dPpzJ/vEAJ3dYqBlUw3YD+9dgiYLrdu+r/7G5t4+amd\n6T8YUOSK3FiLlMmzTDHtb/qw7aI40cufqsmz9v16rn698NCSMlk947qo5BWGUVpq\nDex4nMU9lQKBgGpZ2BTz5lKwnypgiH+EFjnEiD0zAvASx1T4aqpG0MbFxx2kk9Bq\nJ98DSzJojaqoH632YkyUcSvd8TZ4AzlbsZ+pJQRC1RlauVD4HovZfCD1eYjFpqwv\nHYNHy1iuhzI620ARxQzIvrL0ysReSLCk4PKo8lZu1mUumtlFCGIrxYAFAoGASbJt\nx0tH5lac7VflAu5Uhw2+leEN6BwYtyXaPicdhRIQ9wjn/lkJzStY+f0oVYaUvZ4D\nIE6SYR137evnMXSpcaLTtsdtNHb5V7ZU3I/6bOtk2ery6MyXDooNvTztwZhGi+4x\nf8dlIL/YmW1+OVKwCIspY63Zydw2vOLW7yUHZw0CgYEAmv+RXaq6pZFSIV44Rzee\nFQtLe2VgZsxxSOCD257ycrD1RnwYmoizhMqetQgmU7F1P6NoyGJ1VEzU9E2cTScM\ndB4iAbP30bJOSQwI0+Q1l54coKx/jy6/FZakYGYgf3xb8KLpxsRy3jtdmRG/FY9S\nZlMasTyH0zc2YO/8ZFf2KhU=\n-----END PRIVATE KEY-----\n",
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
