import mongoose from "mongoose";

export const connnectDB = async ()=>{
    await mongoose.connect("mongodb+srv://foodorder:foodorder123@cluster0.aqdv09b.mongodb.net/foodito").then(()=>{
        console.log("DB Connected")
    })
}