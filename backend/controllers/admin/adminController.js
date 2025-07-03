import adminModel from "../../models/adminModels.js"
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcrypt'


const adminLogin = async (req,res)=>{
    const {username,password} = req.body;

    try{
        const admin = await adminModel.findOne({username});
        console.log(admin)
        if(!admin){
            return res.json({success:false,message:"Admin does not exits"})
        }
        const isMatched = await bcrypt.compare(password,admin.password);
        if(!isMatched){
            return res.json({success:false,message:"username or password are incorrect"})
        }
        const adminToken = createToken(admin._id)
        res.json({success:true,adminToken,message:"Login Successfully"})

    }catch(err){
        console.log(err)
        res.json({success:false,message:"Invalid Credentials"})
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const adminRegister = async(req,res)=>{
    const {email,username,password} = req.body
        try{

            const exists = await adminModel.findOne({email});
            if(exists){
                return res.json({success:false,message:"Admin already exits"})
            }
    
            // validating format and strong password
            if(!validator.isEmail(email)){
                return res.json({success:false,message:"Please enter a valid email"})
            }
            if(password.length < 3){
                return res.json({success:false,message:"Please enter a strong email"})
            }

            //hashing password
            const hashPassword = await bcrypt.hash(password,10);
            const newAdmin =  new adminModel({email,username,password:hashPassword});
            const user = await newAdmin.save();
            
           const adminToken = createToken(user._id)     
           res.json({success:true,adminToken})      

        }
        catch(error){
            console.log(error)
            res.json({success:false,message:"An error occured"})
        }
}

export {adminLogin,adminRegister}