import express from 'express'
import { getPincodes } from '../controllers/pincodeController.js'

const pincodeRouter = express.Router()

pincodeRouter.post('/list',getPincodes);

export default pincodeRouter