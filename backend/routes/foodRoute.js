import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();

// Image Storage Engine

// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// });

// const upload = multer({storage:storage})

// foodRouter.post('/add',upload.single("image"),addFood)

// Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
});

const upload = multer({storage:storage})

foodRouter.post('/add',upload.fields([{name:"image",maxCount:1},{name:"image1",maxCount:2},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addFood)

foodRouter.get("/list",listFood)

foodRouter.post("/remove",removeFood)



export default foodRouter;