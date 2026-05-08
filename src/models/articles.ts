import {Schema,model} from "mongoose"
import { IUserDetails } from "./user-details"

export interface IArticles{
  
  _id?:string
  
topic:string
heading:string
image:string
article:string
UserDetails?:IUserDetails
}


const ArticleSchema = new Schema<IArticles>({
    
  topic: {
    type: String,
    required: true,
  },
  
  heading: {
    type: String,
    required: true,
  },
  
  image: {
    type: String,
    required: false,
  },
  
  article: {
    type: String,
    required: true,
  },




UserDetails: { type: Schema.Types.ObjectId, ref: "UserDetails" },
});

export const Articles = model<IArticles| unknown>("Articles", ArticleSchema);
