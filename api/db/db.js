import mongoose from "mongoose";



export const DB = ()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{
        console.log("DB connected ")
    }).catch((err)=>{
        console.log(err)
    })

}