import { Router } from "express";
import userController from "../contollers/user.controller";
import Authorization from "../middlewares/auth";

const userRoute = Router()

    userRoute.get('/', Authorization, userController.listAll);
    userRoute.get('/:id', Authorization, userController.getOneById);
    userRoute.post('/', userController.Add);
    userRoute.post('/login', userController.login)

export default userRoute