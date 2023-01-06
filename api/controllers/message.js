
import Message from "../models/Message.js"
import User from "../models/User.js";


export const createMessage = async(req,res, next)=>{
    const username = req.user.user.username
    const id = req.user.id
    try{
        const message = new Message({...req.body, userId:req.user.id, username:username}) ;
        const saveMessage = await message.save();
        const user = await User.findByIdAndUpdate(id, { $push: { messages:saveMessage.desc}}) ;
         return res.status(200).json({saveMessage, user})
       
    }catch(err){
        next(err) ;
    }
}



