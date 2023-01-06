import express from "express";
const router = express.Router();

import {createCat} from "../controllers/category.js"

//CREATE CATEGORY 
router.post("/cat", createCat) ;
export default router