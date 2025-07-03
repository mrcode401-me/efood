import express from 'express'
import { adminLogin,adminRegister } from '../../controllers/admin/adminController.js'

const adminRouter = express.Router()

adminRouter.post('/login',adminLogin);
adminRouter.post('/register',adminRegister);

export default adminRouter