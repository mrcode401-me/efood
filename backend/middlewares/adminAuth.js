import jwt from 'jsonwebtoken'

const adminAuth = (req,res,next)=>{
    const { admintoken }  = req.headers;
    if(!admintoken){
       return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try{
        const decode_adminToken = jwt.verify(admintoken,process.env.JWT_SECRET);
        req.body.adminId = decode_adminToken.id;
        next()
    }catch(err){
        console.log(err)
       return res.json({success:false,message:"Not Authorized Login Again"})
    }
}

export default adminAuth