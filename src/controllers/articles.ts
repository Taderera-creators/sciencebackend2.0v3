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
    const storage = new Storage({
      projectId: process.env.PROJECTID,
      
      credentials:{

        
  client_email: "maishopcloudstorage@avid-compound-422809-v5.iam.gserviceaccount.com" ,
  private_key:   "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/p6rAZxGZd9kL\nv/QXbxn7ecFVNdYr+gDGVrels+7gzTXzQY5U1+LwXBSqkKryaK1RQUSD3t+QI2Vc\nJZ7CYu+G0AeHdw1V/EEsqQQJGMkWU+A1mo4B0yuXy2MWIU+a4WXGVieIl85OTMbz\n+EZ2o4il23WsfpLJMpzC1cq1jyv3cZJDEkGLZeqRsAqtX57p8FpcIFq8NHOlmoQC\n3G1/OiLTakySlSwdINlL6j6tX7Gb6zdFfTVMq5QoWP22ILQ+6CjtPJiTAYR2E0J/\nA9cuiJ0VF3S7gQYSR/Gjj/kLEnblaf9FOCSyQwiGy/q9LFZMkOyO8rDUxClq0f9d\nKS3T15vxAgMBAAECggEABj1ZiXgRkkiHms1TZMFA5vdjfE22ElUfr1VlbJH7cKWI\nYHS9mIo1dj6D4bsMsGWzYYDZeohICQj4pNOzY9VqwkiFkOXRsP9Mc+gbcdxft51g\nIFP5fu+2wfNk33SS2JJcCOVcgM2dxt4oYAsGPZiSEKxLcXk8ItbF/xs3b/UgU6b4\nKpduZGqOzHicoJlhnUrl8rVQI9pL35biS99oCU+vpcnj+HSiE/sGDS0W7oNgZqHY\nRGqmqD/WZ6ERnjxvU1TNPgDXGYYLUxpXzlH/wIVC4t/2lVQQtPJwEesBGdTl1GxY\nbN3Kmb4WA+XnCbZmZe71SozIzcLbsvDchyQSe75y0QKBgQDft7Xn5Ceo9QNBAIZd\nTOaNAnT5hu6hR9HZ9AytIKNmQ847s7m8jgZNxmrJEUO1qt/2c8/wR17iTgVYK4fx\n25+PatFt8z3zCDsPphHDzXtZRjOjNQk576mC5iV097l4v7sRMKl0gcIfqf+ygY6+\nqcrVFPQKCMyJhxAQK4fceJb17QKBgQDbT4nTNm1DXkaDD5eZ1rpOQeG/2nl8ja97\nX9WkNTBHCtiGfZmU/9+12dPpzJ/vEAJ3dYqBlUw3YD+9dgiYLrdu+r/7G5t4+amd\n6T8YUOSK3FiLlMmzTDHtb/qw7aI40cufqsmz9v16rn698NCSMlk947qo5BWGUVpq\nDex4nMU9lQKBgGpZ2BTz5lKwnypgiH+EFjnEiD0zAvASx1T4aqpG0MbFxx2kk9Bq\nJ98DSzJojaqoH632YkyUcSvd8TZ4AzlbsZ+pJQRC1RlauVD4HovZfCD1eYjFpqwv\nHYNHy1iuhzI620ARxQzIvrL0ysReSLCk4PKo8lZu1mUumtlFCGIrxYAFAoGASbJt\nx0tH5lac7VflAu5Uhw2+leEN6BwYtyXaPicdhRIQ9wjn/lkJzStY+f0oVYaUvZ4D\nIE6SYR137evnMXSpcaLTtsdtNHb5V7ZU3I/6bOtk2ery6MyXDooNvTztwZhGi+4x\nf8dlIL/YmW1+OVKwCIspY63Zydw2vOLW7yUHZw0CgYEAmv+RXaq6pZFSIV44Rzee\nFQtLe2VgZsxxSOCD257ycrD1RnwYmoizhMqetQgmU7F1P6NoyGJ1VEzU9E2cTScM\ndB4iAbP30bJOSQwI0+Q1l54coKx/jy6/FZakYGYgf3xb8KLpxsRy3jtdmRG/FY9S\nZlMasTyH0zc2YO/8ZFf2KhU=\n-----END PRIVATE KEY-----\n",
  


  
      }

      
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