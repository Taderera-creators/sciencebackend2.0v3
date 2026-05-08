import {Request,Response} from "express"
import {v4} from "uuid"


import {Storage} from "@google-cloud/storage"
import { IUserDetails, UserDetails } from "../models/user-details"
import { ERRORS } from "../errors"
import { Feedbacks } from "../models/feedbacks"




export const Controllers = {
    get:async(req:Request,res:Response)=>{


        
        const feedback =  await Feedbacks.find().populate("UserDetails").sort({_id:-1})
        


        res.status(200).json({
            feedback
            
        })
        

    },
    post:async(req:Request,res:Response)=>{
     
        const {email} = req.name
        const {topic,error,page,admin} = req.body
        console.log(email)
        
        try {

        const user:IUserDetails =  await UserDetails.findOne({
                email
        })

    
        await Feedbacks.create({
            topic,
            error,
            page,
            admin,
            UserDetails:user?._id
        })

                 
        } catch (error) {
            console.log(error)

            res.status(500).json({msg:ERRORS.SERVER_ERROR})
            
        }
        

    }
}