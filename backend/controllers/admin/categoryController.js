import categoryModel from "../../models/categoryModel.js";
import fs from 'fs'

const addCategory = async(req,res)=>{
    console.log("req.body")
    console.log(req.body)
    console.log(req.file)
    const file_name = `${req.file.filename}`

    const category = new categoryModel({
        name:req.body.name,
        description:req.body.description,
        image:file_name
    });

    try{
        await category.save()
        res.json({success:true,message:"Category Added name"+category.name})
    }catch(error){
        console.log(error)
        return res.json({success:false,message:"Category not added"})
    }
}


const listCateogries = async(req,res)=>{
    try{
        const categories = await categoryModel.find({});
        res.json({success:true,data:categories})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }
}


// remove food item

const removeCategory = async (req,res)=>{
    console.log(req.body)
    try{
        const category = await categoryModel.findById(req.body.id);
        if(!category){
            return res.json({success:false,message:"Category Not Exits"})
        }
        fs.unlink(`uploads/category_images/${category.image}`,()=>{})
        await categoryModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:`Category Deleted named ${category.name}`})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:"Category not removed yet because of error"})
    }
}


export {addCategory,listCateogries,removeCategory}