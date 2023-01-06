import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/auth.js"

//SIGNUP
router.post("/signup", signup)

//SIGNUP
router.post("/signin", signin)






export default router