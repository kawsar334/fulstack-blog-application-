
import Post from "../models/Post.js"
import User from "../models/User.js";



//CREATE POST 

export const createPost= async(req, res, next)=>{
    try{
        const username = req.user.user.username
        const post = new Post({...req.body, userId:req.user.id, username:username});
        const savePost = await post.save();
        res.status(200).json(savePost);
    }catch(err){
        next(err)
    }
}


export const updatePost = async (req, res, next) => {
    try {
        const id = await Post.findByIdAndUpdate(req.params.id) 
        if(req.user.id === id.userId){
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body}, {new:true})
        return res.status(200).json(updatedPost)
        }else{
          return  res.status(422).json("you can update only your post ")
        }
    } catch (err) { 
        next(err)
    }
} 

//DELETE POST 
export const deletePost = async (req, res, next) => {
    try {
        const id = await Post.findByIdAndUpdate(req.params.id) 
        if(req.user.id === id.userId){
         const deltedPost =    await Post.findByIdAndDelete(req.params.id);

            if (!deltedPost){
            res.status(404).json("post not found")
         }else{
            res.status(200).json("Post hasbeen deleted !")
         }
            
        }else{
            return res.status(422).json("you can delete only your post !");
        }
    } catch (err) {
        next(err)
    }
}

//GET A POST 
export const getsinglePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
           return  res.status(404).json("post not found!");
        }else{
          return  res.status(200).json(post)
        }
    } catch (err) {
        next(err)
    }
}


//GET ALL POST 


export const getAllPosts = async (req, res, next) => {

    const userName = req.query.username ;
    const cat = req.query.cat ;
    
    try {
        let posts ;
        if(userName){
         posts =   await Post.find().limit(40);
        }else if(cat){
            posts = await Post.find({
                categories:{
                    $in:[cat]
                }
            });
        }else{
            posts = await Post.aggregate([{$sample:{size:40}}])
        }
        res.status(200).json(posts);
    } catch (err) {
        next(err) ;
    }
}


// getRecomendedPost
export const getRecomendedPost = async (req, res, next) => {  
    try {
       
        // const posts = await Post.aggregate([{$sample:{size:1}}])
        const posts = await Post.find().limit(8)

        res.status(200).json(posts)
        
    } catch (err) {
        console.log(err)
        // next(err);
    }
}


// getpostByUser
 
export const getpostByUser = async (req, res, next) => {

    const id = req.params.userId

    try {
        const user = await Post.find({userId:id})
        res.status(200).json(user);
        
       
    } catch (err) {
        next(err);
    }
}