import jwt from 'jsonwebtoken'

const authMiddleware   = async (req,res,next)=>{
    const {token} = req.headers;
    if(!token){
       return res.json({success:true,message:"Not Authorized Login Again"})
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id;
        next();
    }catch(err){
        console.log(err)
       return res.json({success:true,message:{message:"error",error:err}})
    }
}

export default authMiddleware