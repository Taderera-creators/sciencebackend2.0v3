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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const user_details_1 = require("../models/user-details");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = require("../errors");
exports.Controllers = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = req.name.email;
            const userDetails = yield user_details_1.UserDetails.findOne({ email });
            console.log(userDetails);
            res.status(200).json(userDetails);
        }
        catch (err) {
            res.status(401).json({ msg: errors_1.ERRORS.UNAUTHORIZED });
        }
    }),
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password, email } = req.body;
        // The user cannot register with an email which already exists
        console.log(username);
        let users = yield user_details_1.UserDetails.findOne({ email: email });
        if (users) {
            return res.status(400).json({ msg: errors_1.ERRORS.USER_AREADY_EXISTS });
        }
        //harsh password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const accessToken = jsonwebtoken_1.default.sign({ email: email }, process.env.JWT);
        try {
            const newUser = new user_details_1.UserDetails({
                username,
                password: hashedPassword,
                email,
            });
            yield newUser.save();
            res.status(200).json({ accessToken });
            { /****
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
      
      */
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ msg: errors_1.ERRORS.SERVER_ERROR });
        }
    }),
};
