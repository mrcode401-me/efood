import express from 'express'
import {listCateogries} from '../controllers/admin/categoryController.js'
import authMiddleware from '../middlewares/auth.js';

const userCategoryRouter = express.Router();

userCategoryRouter.post('/list',listCateogries);

export default userCategoryRouter;