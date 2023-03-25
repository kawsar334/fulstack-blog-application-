import express from "express";
const app = express();
import env from "dotenv"; 
env.config();
const PORT = process.env.PORT; 
import {DB} from "./db/db.js"
import cookiParser from "cookie-parser";
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import messageRoute from "./routes/message.js"
import postRoute from "./routes/post.js"
import categoryRoute from "./routes/category.js";
import multer from "multer";
import path from "path" ;
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename,)


app.use(express.json())
app.use(cookiParser());
app.use("/images", express.static(path.join(__dirname,"/images")));



//  
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/message", messageRoute)
app.use("/api/post", postRoute)
app.use("/api/cat", categoryRoute)
 

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "images")
    },
    filename:(req, file, cb)=>{
        cb(null, req.body.name)
    }
})




const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req, res)=>{
    res.status(200).json("file hasbeen uploaded ") ;
})

   
app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong !" ;
    return res.status(status).json({
        message,
        success:false,  
        status, 
    })
})


DB();

app.listen(PORT, ()=>{
    console.log(`server running on port number ${PORT}`)
})

