import { Response,Request,NextFunction } from "express";
//const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken"
const errors = require("../errors");
import * as dotenv from "dotenv"
export const validateTokenPost = (req:Request|any, res:Response, next:NextFunction) => {
  const authHeader = req.body.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(401).json({ msg: errors.UNAUTHORIZED });
  }
  try {
    const verify = jwt.verify(
      authHeader,
      process.env.JWT
    );
    req.name = verify;
    console.log(req.name)

    if (verify) {
      next();
    }
  } catch (err) {
    return res.sendStatus(403);
  }
};
//module.exports = { validateTokenPost };
