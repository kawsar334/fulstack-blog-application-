import User from "../models/User.js"
import bcrypt from "bcrypt";
import Message from "../models/Message.js";


// UPDATE USER  
export const updateUser = async(req, res, next)=>{
    try{

        if(req.user.id === req.params.id){
            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password, 10);
            };
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true}) ;
            if(updateUser){
                res.status(200).json({message:"user updated succesfully !", updatedUser})
            }
        }else{
          return res.status(403).json("you can update only your account ")
        }
    }catch(err){
            next(err)
    }
}

//DELETE USER 

export const deleteUser = async (req, res, next) => {
    try {
        if(req.user.id === req.params.id){
            await User.findByIdAndDelete(req.params.id) ;
            res.status(200).json("Account hasbeen deleted ") ;
        }else{
            return res.status(422).json("you can delete only Your account ! ")
        }
    } catch (err) {

    }
}

//GET SINGLE USER 
export const getSingleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}


//GET  ALL USER 
export const getAllUser = async (req, res, next) => {
    try {

    const user = await User.find();
    res.status(200).json(user);

    } catch (err) {
        next(err);

    }
}



