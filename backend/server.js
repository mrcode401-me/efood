import express from 'express'
import cors from 'cors'
import { connnectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import adminRouter from './routes/admin/adminRoute.js';
import usersListRouter from './routes/admin/usersListRoute.js'
import categoryRouter from './routes/admin/categoryRoute.js';
import userCategoryRouter from './routes/userCategoryRoute.js'
import adminPincodeRouter from './routes/admin/adminPincodeRoute.js';
import pincodeRouter from './routes/pincodeRoute.js';
import infoRouter from './routes/admin/infoRoute.js';
import bannerRouter from './routes/bannerRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json())
app.use(cors())

// db connnection
connnectDB();


app.use('/api/banner',bannerRouter);

//api endpoints for admin
app.use('/api/admin',adminRouter)
app.use('/api/admin',usersListRouter);
app.use('/api/admin/category',categoryRouter);
app.use("/api/admin/pincode",adminPincodeRouter)
app.use("/api/admin/company-info",infoRouter)

// api endpoints
app.use('/api/food',foodRouter);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)
app.use("/api/pincode",pincodeRouter)
app.use('/api/user/category',userCategoryRouter);



// make uploads(images) folder public
app.use("/images",express.static("uploads"))

app.get('/',(req,res)=>{
    res.send("THis is the real word")
})


//run server
app.listen(port,()=>{
    console.log(`The port is listening on  http://localhost:${port}`)
})


//mongodb+srv://foodorder:foodorder123@cluster0.aqdv09b.mongodb.net/?