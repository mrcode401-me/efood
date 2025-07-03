import express from 'express'
import adminAuth from '../../middlewares/adminAuth.js'
import {changeCurrency,findInfo} from '../../controllers/admin/infoController.js'

const infoRouter = express.Router()

infoRouter.post("/currency",adminAuth,changeCurrency)
infoRouter.post("/get",findInfo)

export default infoRouter