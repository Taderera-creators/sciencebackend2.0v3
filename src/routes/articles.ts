import express,{Request,Response} from "express"
import multer from "multer";
import { Controllers } from "../controllers/articles"
import { validateTokenPost,  } from "../middleware/postMiddleware";
import { validateToken} from "../middleware/authMiddleware"



const routers = express.Router();
const app = express();


const upload = multer({
  
  
  /*
  fileFilter:(req,file,cb)=>{
    sharp(file.path).resize(400,400).toFormat("webp").toBuffer()
  },
  */
  
  storage:multer.memoryStorage()
  

});


routers.get("/" ,Controllers.get)
routers.post("/",upload.fields([{name:"image",maxCount:1}]), validateToken,Controllers.post)


export { routers as ArticlesRouter}