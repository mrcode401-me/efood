import { addPincode, getPincodes, removePincode } from '../../controllers/pincodeController.js';
import adminAuth from '../../middlewares/adminAuth.js';
import express from 'express'
const adminPincodeRouter = express.Router()

adminPincodeRouter.post("/add-pincode",adminAuth,addPincode);
adminPincodeRouter.post("/get-pincode",adminAuth,getPincodes);
adminPincodeRouter.post("/remove",adminAuth,removePincode);


export default adminPincodeRouter;