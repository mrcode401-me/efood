import express from 'express'
import adminAuth from '../middlewares/adminAuth.js';
import { addBanner,getBanner,removeBanner } from '../controllers/bannerController.js'
import multer from 'multer';

const bannerRouter = express.Router()
// Category Image Storing 

const storage = multer.diskStorage({
    destination:"uploads/banner_images/",
    filename:(req,file,callBack)=>{
        return callBack(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

bannerRouter.post('/add',[upload.single("image")],addBanner)
bannerRouter.post('/remove',removeBanner)
bannerRouter.post('/get',getBanner)

export default bannerRouter;