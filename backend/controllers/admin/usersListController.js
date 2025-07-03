import userModel from "../../models/userModel.js";

const usersList = async(req,res)=>{
        try{
            const users = await userModel.find({});
            res.json({success:true,users:users});
        }catch(err){
            console.log(err)
            res.json({success:false,message:"Not found"});
        }
}

export { usersList }