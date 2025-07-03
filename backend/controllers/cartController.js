import userModel from "../models/userModel.js";


const addToCart = async(req,res)=>{
    try{
        let userData = await userModel.findOne({_id:req.body.userId})
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] += 1; 
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Add to cart"});
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Product Not Added"});
    }
}

const removeToCart = async (req,res)=>{
    try{
            let userData = await userModel.findById(req.body.userId)
            let cartData = await userData.cartData; 
            if(cartData[req.body.itemId] >0){
            if(cartData[req.body.itemId] >1){
                cartData[req.body.itemId] -= 1
            }else{
                cartData[req.body.itemId] 
                delete cartData[req.body.itemId]; 
            }}else{
                return res.json({success:false,message:"Product not exists in cart"})
            }
            await userModel.findByIdAndUpdate(req.body.userId,{cartData})
            res.json({success:true,message:"Removed to cart"});
        }catch(err){
            console.log(err)
            res.json({success:false,message:"Product Not Removed"});
        }
}

const clearCart = async (req,res)=>{
    try{
            let userData = await userModel.findById(req.body.userId)
            let cartData = await userData.cartData; 
            await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
            res.json({success:true,message:"Clear cart"});
        }catch(err){
            console.log(err)
            res.json({success:false,message:"Error"});
        }
}

const getCart = async(req,res)=>{ 
    console.log("USeR id")
    console.log(req.body.userId)
        try{
            let userData = await userModel.findById(req.body.userId)
            let cartData = await userData.cartData;
            console.log(cartData,userData,req.body.userId)
            if(cartData){
                res.json({success:true,data:cartData})
            }else{
                res.json({success:false,message:"Not Found"})
            }
        }
        catch(err){
                console.log(err)
                res.json({success:false,message:"Not Found"})
        }
}

export {addToCart,removeToCart,getCart,clearCart}