import express,{Request,Response} from "express"
import multer from "multer";
import {v4} from "uuid"
import {Storage} from "@google-cloud/storage"

import {Controllers} from  "../controllers/userDetails"
import { IUserDetails, UserDetails } from "../models/user-details";

import { validateToken } from "../middleware/authMiddleware";
import { validateTokenPost } from "../middleware/postMiddleware";
import { rateLimit } from "express-rate-limit"

const routers = express.Router();
const app = express();
//const { check } = require("express-validator");

/*updating profile images */

const limiter = rateLimit({
  windowMs:10*60*1000,
  limit:10,
  legacyHeaders:false,
  message:"to many requests"
})

app.use(express.json());
// validateToken,
routers.get("/", validateToken, Controllers.get);

routers.post(
  "/",
  limiter,

  Controllers.post
);

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

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 5 * 1024 * 1024,
  },
});

routers.put(
  "/profile-image",
  validateToken,
  upload.single("image"),
  async (req:Request, res:Response) => {

      const {email} = req.name


    const storage = new Storage({
      //"avid-compound-422809-v5".
      projectId: process.env.PROJECTID,
      keyFilename: process.env.KEYFILENAME,
    });
  
    const backetName = process.env.BUCKETNAME;

    const file = req.file;
    const fileName = v4() + file.originalname;

  const bucket = storage.bucket(process.env.PROFILEBUCKET);
   const fileUpload = bucket.file(fileName);



   
    try {

        const user:IUserDetails =  await UserDetails.findOne({
                email
        })

       /*another version*/
      await fileUpload.save(req.file.buffer);


      await UserDetails.updateOne(
        { _id: user?._id },
        { $set: { profileImage: fileName } }
      );
      res.status(200)
      
    } catch (error) {

      res.status(500);
    }
  }
);

routers.put("/bio",validateTokenPost,async(req:Request,res:Response)=>{
  
      const {email} = req.name
      const {bio} = req.body



      try {
        const user:IUserDetails =  await UserDetails.findOne({
                email
        })

       
      await UserDetails.updateOne(
        { _id: user?._id },
        { $set: { bio } }
      );
      } catch (error) {
        
      }
      


})






export {routers as userDetailsRouter };
