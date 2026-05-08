import  express  from "express"
import { Controllers } from "../controllers/feedbacks";
import {validateTokenPost}  from "../middleware/postMiddleware"

const routers = express.Router()

const app = express()
app.use(express.json());


routers.get("/",Controllers.get)
routers.post("/",validateTokenPost,Controllers.post)

export { routers as FeedbackRouter}