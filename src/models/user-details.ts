import {Schema,model} from "mongoose"


export interface IUserDetails{
  
  _id?:string
username:string
password:string
email:string
bio:String
profileImage:string
}



const UserSchema = new Schema<IUserDetails>({
  profileImage: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },


  email: {

    type: String,
    required: true,
  },
  bio:{
    
    type: String,
    required: false,

  }
  

});

export const UserDetails = model<IUserDetails| unknown>("UserDetails", UserSchema);
