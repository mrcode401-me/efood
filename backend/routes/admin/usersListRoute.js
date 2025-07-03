import express from 'express'
import { usersList } from '../../controllers/admin/usersListController.js';
import adminAuth from '../../middlewares/adminAuth.js';

const usersListRouter = express.Router();

usersListRouter.post('/users-list',adminAuth,usersList);


export default usersListRouter;