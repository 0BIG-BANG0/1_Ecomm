//1.Import 
import express from 'express';
import { UserController } from './user.controller.js';
import userValidation from '../../middlewares/userValidation.middleware.js'
import jwtAuth from '../../middlewares/jwt.middleware.js';


//2.Initialize Express Router
const userRouter = express.Router();

const userController = new UserController();

//All the paths to cintroller methods

userRouter.post('/signup',userValidation, (req, res, next)=>{userController.signUp(req, res, next)})
userRouter.post('/signin', userValidation, (req, res)=>{userController.signIn(req, res)})
userRouter.put('/resetPassword', jwtAuth, (req, res, next)=>{userController.resetPassword(req, res, next)})


export default userRouter