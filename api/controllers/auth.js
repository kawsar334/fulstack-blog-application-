
import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async(req, res, next )=>{
    try{
        const user = new User({
            ...req.body,
            password:await bcrypt.hash(req.body.password, 10)  
        })
        const saveUser = await user.save();
        res.status(200).json(saveUser)
    }catch(err){
        next(err)
    }

}

export const signin = async(req , res, next)=>{
    try {
        const user = await User.findOne({email:req.body.email}) ;
        if(!user) {return res.status(422).json("user not found ")
    }else{
        const hashedPassword = await bcrypt.compare(req.body.password,user.password) ;
        if(!hashedPassword){
            return res.status(422).json("invalid credintials!");
        }else{
            const token = await jwt.sign({ id: user._id, user: user, }, process.env.SECRET);
            const {password, ...others}= user._doc
            res.cookie("acces_token", token,{httpOnly:true,expIn:"7d"}).json({token, user:others}) ; 
        }
    }

    } catch (err) {
        next(err)
    }

}
