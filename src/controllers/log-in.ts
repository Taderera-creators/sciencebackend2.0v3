import { Request,Response } from "express";
import { IUserDetails, UserDetails } from "../models/user-details";
import { ERRORS } from "../errors";
import   bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

export const Controllers = {
  post: async (req:Request, res:Response) => {
    const { Email, password } = req.body;
    try {
      let user:IUserDetails = await UserDetails.findOne({
        Email,
      });
      if (!user) {
        return res.status(400).json({ msg: ERRORS.USER_NOT_FOUND });
      } else {
        await bcrypt.compare(password, user.password).then((match) => {
          if (!match) {
            return res.status(400).json({ msg: ERRORS.INVALID_CREDINTIALS });
          } else {
            const accessToken = jwt.sign(
              { Email },
              process.env.JWT
            );
            return res.status(200).json({ accessToken });
          }
        });

        // await LogIn.create({ Email, password });
      }
    } catch (error) {
      res.status(500).json({ msg: ERRORS.SERVER_ERROR });
    }
  },
};
