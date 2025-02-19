import express from 'express';
import UserController from './user.controller.js';
let userRouter = express.Router();
let userController = new UserController();
userRouter.post('/Sign-up',userController.register.bind(userController));
userRouter.post('/Sign-in',userController.logIn.bind(userController));
userRouter.post('/reset-password',userController.getResetPassword.bind(userController));
userRouter.post('/set-password',userController.setPassword.bind(userController));
userRouter.post('/Sign-out',userController.logOut);

export default userRouter;