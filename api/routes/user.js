import express from "express";
import { deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/user.js";
const router = express.Router();
import { verifyToken } from "../verifyToken.js";




///update user
router.put("/:id", verifyToken, updateUser)
//delete user 
router.delete("/:id", verifyToken, deleteUser)
//get a user 
router.get("/find/:id", verifyToken, getSingleUser)
//get all user 
router.get("/", getAllUser);

export default router ;