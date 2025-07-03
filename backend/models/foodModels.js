import mongoose from "mongoose";
import { type } from "os";

const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
    galleyImage:{type:Array,default:[]},
    variation:{type:Array,default:[]},
    date:{type:Number,default:Date.now()}
})


const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel;