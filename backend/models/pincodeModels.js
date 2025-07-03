import mongoose from 'mongoose'

const pincodeSchema = new mongoose.Schema({
    pincode:{type:Number,required:true},
    deliveryCharge:{type:Number,requires:true},
    deliveryDuration:{type:Number,required:true}
})

const pincodeModel = mongoose.models.pincode || mongoose.model("pincode",pincodeSchema)

export default pincodeModel;