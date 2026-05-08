import express from "express"
import { Controllers } from  "../controllers/log-in";
import {rateLimit} from "express-rate-limit";
const app = express();
app.use(express.json);
const routers = express.Router();

// limits number  of requests in 10 mins
const limiter = rateLimit({
  windowMs:10*60*1000,
  limit:10,
  legacyHeaders:false,
  message:"to many requests"
})

routers.post("/",limiter,Controllers.post);

export { routers as logInRouter};
