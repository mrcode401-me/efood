import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import stripe from 'stripe'

// placing user order from fronted
const placeOrder = async(req,res)=>{
    try{
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        // var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

        //     instance.orders.create({
        //     amount: 5000,
        //     currency: "INR",
        //     receipt: "receipt#1",
        //     notes: {
        //         key1: "value3",
        //         key2: "value2"
        //     }
        //     })

        res.json({success:true,message:"Order placed successfully"})


        
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// get all orders
const userOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders.reverse()})
    }catch(error){
        res.json({success:false,message:"Error"})
        console.log(error)
    }
}


const listOrder = async(req,res)=>{
    try{
        const orders = await orderModel.find({})
        res.json({success:true,data:orders.reverse()})
    }catch(error){
        res.json({success:false,message:"Error"})
        console.log(error)
    }
}

const orderStatus = async(req,responses)=>{
     try{
        const status = await orderModel.findOneAndUpdate({_id:req.body.orderId},{status:req.body.status})
        responses.json({success:true,message:"Order Updated to"+req.body.status})
        console.log(status)
    }catch(error){
        responses.json({success:false,message:"Error"})
        console.log(error)
    }
}   

export { placeOrder, userOrders,listOrder,orderStatus }