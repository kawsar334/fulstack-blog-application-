import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    desc:{
        type: String,
        required: true,
    },
    photo:{
        type: String,
        
    },
    categories:{
        type:[String] ,

    },
    userId:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    }
}, { timestamps: true });


const Post = mongoose.model("post", PostSchema);
export default Post;
