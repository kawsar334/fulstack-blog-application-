import express from "express";
const router = express.Router();

import { createPost, updatePost, deletePost, getsinglePost, getAllPosts, getRecomendedPost, getpostByUser } from "../controllers/post.js"

import {verifyToken} from "../verifyToken.js"
//CREATE POST
router.post("/create", verifyToken, createPost) 

//UPDATE POST 
router.put("/:id", verifyToken, updatePost) ;
//DELETE POST 
router.delete("/:id", verifyToken, deletePost) ;
// GET A SINGLE  POST 
router.get("/find/:id", getsinglePost) ;
 

// GET ALL POST BY CATEGORY 
router.get("/", getAllPosts); 

router.get("/recomended", getRecomendedPost)
router.get("/getbyuser/:userId", getpostByUser)



export default router ;