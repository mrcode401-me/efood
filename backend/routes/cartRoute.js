import express from 'express';
import { addToCart,removeToCart,getCart, clearCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/auth.js';


const cartRouter = express.Router();

cartRouter.post('/get',authMiddleware,getCart)
cartRouter.post('/add',authMiddleware,addToCart);
cartRouter.post('/remove',authMiddleware,removeToCart)
cartRouter.post('/clear',authMiddleware,clearCart)


export default cartRouter