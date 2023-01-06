import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true,
    },
    userId:{
        type:String, 
        required:true,

    },
    username:{
        type: String,
        required: true, 
    }

}, { timestamps: true });


const Message = mongoose.model("message", MessageSchema);
export default Message;
