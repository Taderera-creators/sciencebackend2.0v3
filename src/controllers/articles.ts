import {Request,Response} from "express"
import {v4} from "uuid"


import {Storage} from "@google-cloud/storage"
import { Articles} from "../models/articles"
import { IUserDetails, UserDetails } from "../models/user-details"
import { ERRORS } from "../errors"




export const Controllers = {
    get:async(req:Request,res:Response)=>{


        

      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
        const article =  await Articles.find().populate("UserDetails").sort({_id:-1})
        .limit(limit)
        .skip(page * limit)
const totalArticles = await Articles.countDocuments()
         const pageCount = Math.ceil(totalArticles/ limit);
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
            page:page + 1 ,
            pageLimit:limit,
        })
        

    },
    post:async(req:Request,res:Response)=>{
     
        const {email} = req.name
        const {topic,heading,article} = req.body
        console.log(topic)
const imageBuffer = req?.files?.image[0]?.buffer
//console.log(imageBuffer)



    /* uploading images to google cloud*/
    //process.env.PROJECTID
    const storage = new Storage({
      //"avid-compound-422809-v5"
      projectId: process.env.PROJECTID,
      keyFilename: process.env.KEYFILENAME,
    });

    

    const bucket = storage.bucket(process.env.BUCKETNAME);




    const file = req.files


    const imageId = v4() + file?.image[0]?.originalname 
    const fileUpload = bucket.file(imageId);



        try {

        const writerId:IUserDetails =  await UserDetails.findOne({
                email
        })

         await fileUpload.save(imageBuffer);
        await Articles.create({
            topic,
            heading,
            image:imageId,
            article,
            UserDetails:writerId?._id
        
        })

                 
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:ERRORS.SERVER_ERROR})
            
        }
        

    }
}