import mongoose from 'mongoose'

const CompanyInfoSchema = new mongoose.Schema({
        currency:{type:String,required:true,default:"₹"},
        number:{type:String,required:true,minLength:[13,"Enter valid contact number"]},
        email:{type:String,required:true,minLength:[6,"Enter valid email"]},
        cod:{type:Boolean,required:true,default:true},
        onlinePayment:{type:Boolean,required:true,default:false}
})

const CompanyInfoModel = mongoose.models.companyInfo || mongoose.model("companyInfo",CompanyInfoSchema);

export default CompanyInfoModel