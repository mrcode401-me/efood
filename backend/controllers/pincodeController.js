import pincodeModel from "../models/pincodeModels.js";

const addPincode = async(req,res)=>{
    const {pincode,deliveryCharge,deliveryDuration} = req.body;
    if(!pincode || deliveryCharge < 0 ||deliveryDuration < 0){
        console.log("object")
        return res.json({success:false,message:"Invalid Details"})
    }
    try{
        const resPincode = await  pincodeModel.create({pincode,deliveryCharge,deliveryDuration});
        res.json({success:true,message:resPincode.pincode+" Pincode saved successfully"})
    }catch(error){
        console.log(error)
        return res.json({success:false,message:"An Error Occured"})
    }
}

const getPincodes = async(req,res)=>{
       try{
        const resPincode = await  pincodeModel.find({});
        res.json({success:true,data:resPincode})
    }catch(error){
        console.log(error)
        return res.json({success:false,message:"An Error Occured"})
    }
}


const removePincode = async(req,res)=>{
       try{
        const resPincode = await  pincodeModel.findOneAndDelete({_id:req.body.id});
        res.json({success:true,message:"Pincode removed successfully"})
    }catch(error){
        console.log(error)
        return res.json({success:false,message:"An Error Occured"})
    }
}

export {addPincode,getPincodes,removePincode}