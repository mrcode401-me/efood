import express from 'express';
import adminAuth from '../../middlewares/adminAuth.js'
import {addCategory, listCateogries, removeCategory} from '../../controllers/admin/categoryController.js'
import multer from 'multer';

const categoryRouter = express.Router();

// Category Image Storing 

const storage = multer.diskStorage({
    destination:"uploads/category_images",
    filename:(req,file,callBack)=>{
        return callBack(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

categoryRouter.post("/add",[upload.single("image")],addCategory);
categoryRouter.post("/list",adminAuth,listCateogries);
categoryRouter.post("/remove",adminAuth,removeCategory);

export default categoryRouter;