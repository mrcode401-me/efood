import express from 'express'
import { listOrder, placeOrder,userOrders,orderStatus } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/auth.js'
import adminAuth from '../middlewares/adminAuth.js';

const orderRouter = express.Router();


orderRouter.post('/place-order',authMiddleware,placeOrder);
orderRouter.post("/my-orders",authMiddleware,userOrders);
orderRouter.get("/list",listOrder)
orderRouter.post("/status",orderStatus)

export default orderRouter;