import express from "express";
const router = express.Router();
import { createMessage } from "../controllers/message.js";
import { verifyToken } from "../verifyToken.js";



router.post("/createmsg", verifyToken, createMessage);



export default router