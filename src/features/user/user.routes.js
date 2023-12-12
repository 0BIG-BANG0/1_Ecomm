//1.Import 
import express from 'express';
import { UserController } from './user.controller.js';
import userValidation from '../../middlewares/userValidation.middleware.js'
//2.Initialize Express Router
const userRouter = express.Router();

const userController = new UserController();

//All the paths to cintroller methods

userRouter.post('/signup',userValidation, userController.signUp)
userRouter.post('/signin', userValidation, userController.signIn)


export default userRouter