import {Schema,model} from "mongoose"
import { IUserDetails } from "./user-details"

export interface IFeedback{
  
  _id?:string 
topic:string
error:string
page:number
admin:string
UserDetails?:IUserDetails
}


const FeedbackSchema = new Schema<IFeedback>({
    
  topic: {
    type: String,
    required: true,
  },
  
  error: {
    type: String,
    required: true,
  },
  
  page: {
    type: Number,
    required: false,
  },
  
  admin: {
    type: String,
    required: true,
  },




UserDetails: { type: Schema.Types.ObjectId, ref: "UserDetails" },
});

export const Feedbacks = model<IFeedback| unknown>("Feedbacks", FeedbackSchema);
