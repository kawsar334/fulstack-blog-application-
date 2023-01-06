import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({ 
    username:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default:false,
    },
    messages:{
        type:[String]
    },
    profilePicture:{
        type:String, 

    }

}, {timestamps:true}) ;


const User = mongoose.model("user", userSchema);
export default User ;
