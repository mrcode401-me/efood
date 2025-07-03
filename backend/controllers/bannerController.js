import bannerModel from "../models/bannerModels.js"
import fs from 'fs'

const addBanner = async(req,res)=>{
    const {name} = req.body;
    const image_name = req.file.filename

    const banner = new bannerModel({
        name:name,
        image:image_name
    });

    try{
        await banner.save()
        res.json({success:true,message:"Banner Add named "+name})
    }catch(err){
        res.json({success:false,message:"An error Occured"})
        console.log(err)
    }
}
const getBanner = async(req,res)=>{
    try{
        const bannerList = await bannerModel.find({});
        res.json({success:true,data:bannerList})
    }catch(err){
        res.json({success:false,message:"An error Occured"})
        console.log(err)
    }
}

const removeBanner = async(req,res)=>{
    try{
        const banner = await bannerModel.findById(req.body.id);
        if(!banner){
            return res.json({success:false,message:"Banner not exits"})
        }
        fs.unlink(`uploads/banner_images/${banner.image}`,()=>{})
        await bannerModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:`Banner Deleted name ${banner.name}`})
    }catch(err){
        res.json({success:false,message:"An error Occured"})
        console.log(err)
    }
}

export{addBanner,getBanner,removeBanner}