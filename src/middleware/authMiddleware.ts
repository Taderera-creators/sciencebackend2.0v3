import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

export const validateToken = (req:Request|any, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
       
    return res.sendStatus(401);
  }
  try {
    const verify = jwt.verify(
      authHeader,
      process.env.JWT
    );
    req.name = verify;

    if (verify) {
      next();
    }
  } catch (err) {
    return res.sendStatus(403);
  }
};

//module.exports = { validateToken };
