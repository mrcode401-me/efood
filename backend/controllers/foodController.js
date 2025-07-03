import foodModel from "../models/foodModels.js";
import fs from 'fs'


// add food item

// const addFood = async (req,res)=>{
//     console.log(req.body)
//         let image_filename = `${req.file.filename}`;

//         const food = new foodModel({
//                 name:req.body.name,
//                 description:req.body.description,
//                 price:req.body.price,
//                 category:req.body.category,
//                 image:image_filename
//         });
//         try{
//             await food.save();
//             res.json({success:true,message:"Food added"})
//         }
//         catch(err){
//             console.log(err)
//             res.json({success:false,message:"Error"})
//         }
// }

// add food item

const addFood = async (req,res)=>{
    console.log(req.body)
        let image_filename = `${req.files.image[0].filename}`;

        const image = req.files.image && req.files.image[0]
        const image1 = req.files.image1 && `${req.files.image1[0].filename}`
        const image2 = req.files.image2 && `${req.files.image2[0].filename}`
        const image3 = req.files.image3 && `${req.files.image3[0].filename}`
        const image4 = req.files.image4 && `${req.files.image4[0].filename}`

        let galleyImages = [];
        if(image1)

        if(image1){
            galleyImages.push(image1)
        }
        if(image2){
            galleyImages.push(image2)
        }
        if(image3){
            galleyImages.push(image3)
        }
        if(image4){
            galleyImages.push(image4)
        }

        const variation = req.body.variation && JSON.parse(req.body.variation);
        console.log(variation)
        // console.log([...variation][0])
        console.log(image_filename,image,image1,image2,image3,image4)
        
        const food = new foodModel({
                name:req.body.name,
                description:req.body.description,
                price:req.body.price,
                category:req.body.category,
                image:image_filename,
                galleyImage:galleyImages,
                variation
                
        });
        try{
            await food.save();
            res.json({success:true,message:"Food added"})
            // res.json({success:true})
        }
        catch(err){
            console.log(err)
            res.json({success:false,message:"Error"})
        }
        
}

// all food items list

const listFood = async(req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,message:foods.length,data:foods.reverse()})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:"An error Occured"})
    }
}

// remove food item

const removeFood = async (req,res)=>{
    console.log(req.body)
    try{
        const food = await foodModel.findById(req.body.id);
        console.log(food)
        fs.unlink(`uploads/${food.image}`,()=>{console.log('image deleted')})
        fs.unlink(`uploads/${food.galleyImage[0]}`,()=>{console.log('image 1 deleted')})
        fs.unlink(`uploads/${food.galleyImage[1]}`,()=>{console.log('image 2 deleted')})
        fs.unlink(`uploads/${food.galleyImage[2]}`,()=>{console.log('image 3 deleted')})
        fs.unlink(`uploads/${food.galleyImage[3]}`,()=>{console.log('image 4 deleted')})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:`Product Deleted named ${food.name}`})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:"Product not removed yet because of error, "+req.body})
    }
}


export {addFood,listFood,removeFood}