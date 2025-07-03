import mongoose  from "mongoose";

const bannerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true}
})

const bannerModel = mongoose.models.banner || mongoose.model("banner",bannerSchema)

export default bannerModel