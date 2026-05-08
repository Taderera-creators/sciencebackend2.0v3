import { UserDetails } from "../models/user-details";
import { Request,Response } from "express";
import jwt from  "jsonwebtoken"
import bcrypt from  "bcryptjs"
import {v4} from  "uuid"
import nodemailer from  "nodemailer"
import Mailgen from "mailgen"
import { config} from  "dotenv"
import { ERRORS } from "../errors";
import * as dotenv from  "dotenv"

import {body } from  "express-validator"
import path from "path";

export const Controllers = {
  get: async (req:Request, res:Response) => {
    try {
      const email = req.name.email;
      const userDetails = await UserDetails.findOne({ email });
      console.log(userDetails)
      res.status(200).json(userDetails);
    } catch (err) {
      res.status(401).json({ msg: ERRORS.UNAUTHORIZED });
    }
  },

  post: async (req:Request, res:Response) => {
    const { username, password, email} =
      req.body;
    // The user cannot register with an email which already exists
    console.log(username)

    let users = await UserDetails.findOne({ email: email });

    if (users) {
      return res.status(400).json({ msg: ERRORS.USER_AREADY_EXISTS });
    }
    //harsh password
    const hashedPassword = await bcrypt.hash(password, 10);

    const accessToken = jwt.sign(
      { email:email},
      process.env.JWT
    
    );
    try {
      const newUser = new UserDetails({
        username,
        password: hashedPassword,
        email,
      });
      await newUser.save();

      res.status(200).json({ accessToken });

      {/****  
const transporter = nodemailer.createTransport({
  "service":"gmail",
  auth:{
    user:"tadereratinodaishe@gmail.com",
  pass:"nwithgnqqzxxjzdl"
  }

})
const mailOptions = {
  from:"tadereratinodaishe@gmail.com",
  to:"maishopapp@gmail.com",
  subject:"Successful registration",
              
  html:`

    <div style="background-color:white"> 
  <div style="align-items: center;justify-content: center; padding:10px">
    <h1 style="margin-left: 23%;">maiShop.com </h1> 
  <img src="cid:icon-image" alt ="image"    height ="200" style="margin-left: 25%;"/>
  <h2 style= "margin-left: 23%;">Welcome to maishop ! </h2>
  </div>
  <p style="background-color:rgb(240, 240, 250);padding: 10px;font-size: medium;">Your registration has been completed , you can now buy and sell your products on maishop platform <brstyle="margin-top:5px ;">Thank you</p>
  </div>
  `,
  
  attachments:[
    {
    filename:"icon.png",
    path:path.join(__dirname,"icon.png"),
    cid:"icon-image"
    }

  ]


}

transporter.sendMail(mailOptions,function(error,info){
  if(error){
    console.log(error) 
  }else{
    console.log("email send")
  }})

*/}   

    } catch (error) {
      console.log(error)
      return res.status(500).json({ msg: ERRORS.SERVER_ERROR });
    }
  },
};
