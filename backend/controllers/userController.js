import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';


// login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            res.json({success:false,message:"User does not exists"})
        }
        else{
            const isMatched  = await bcrypt.compare(password,user.password);
            if(!isMatched){
                return res.json({success:false,message:"Invalid Credentials"})
            }
            const token = createToken(user._id);
            res.json({success:true,token})
            
        }
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Invalid Credentials"})
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        // checking is user already exists
        const exits = await userModel.findOne({email});
        if(exits){
            return res.json({success:false,message:"User already exists"})
        }

        // validating format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length < 3){
            return res.json({success:false,message:"Please enter a strong email"})
        }
        
        //hashing user password
        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new userModel({name,email,password:hashPassword});
        const user = await newUser.save()
        const token =  createToken(user._id)

        res.json({success:true,token})

    }catch(err){
        console.log(err)
        res.json({success:false,message:"An error occured"})
    }
}

// logout user
const logoutUser = async(req,res)=>{
    
}

export {loginUser,registerUser}

