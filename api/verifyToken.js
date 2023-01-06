import jwt from "jsonwebtoken";



export const verifyToken = async(req, res, next)=>{
    const token = req.cookies.acces_token ;

    if(!token){
        return res.status(403).json("you are not authenticated!")
    }else{
        jwt.verify(token, process.env.SECRET, (err, user)=>{
            if(err){
                return res.status(403).json("token is not Valid !")
            }else{
                req.user = user ;
                next() ;
            }
        })
    }
}


