import Category from "../models/Category.js"



export const  createCat  = async(req, res, next)=>{
    try{
        const cat = new  Category({...req.body });
         res.status(200).json(cat)
    }catch(err){
        next(err) ;  
    }
}