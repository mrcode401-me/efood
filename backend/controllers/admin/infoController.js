import CompanyInfoModel from "../../models/CompanyInfoModels.js";

const changeCurrency = async(req,res)=>{
    const {currency} = req.body;
    try{
        const isHave = await CompanyInfoModel.findOne();
        if(!isHave){
            return res.json({success:false,message:"An error Occured"})
        }
        const newcrr = await CompanyInfoModel.findOneAndUpdate({currency:isHave.currency},{currency:currency});
        if(!newcrr){
            return res.json({success:false,message:"An error Occured"})
        }
        res.json({success:true,data:newcrr})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"An error Occured"})
    }
}

const findInfo = async(req,res)=>{
    try{
        const details = await CompanyInfoModel.findOne();
        if(!details){
            return res.json({success:false,message:"An error Occured"})
        }
        res.json({success:true,data:details})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"An error Occured"})
    }
}

export {changeCurrency,findInfo}