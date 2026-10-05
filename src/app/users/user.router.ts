import { Router } from "express";
import { UserController } from "./user.controller";
import { createUserSchema } from "./dto/user.schema";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', ValidationMiddleware.validate(createUserSchema), userController.create);
userRouter.get('/', userController.findAll)
userRouter.get('/email/:email', userController.findByEmail)
userRouter.get('/:id', userController.findById)
userRouter.delete('/:id',  AuthMiddleware.authenticate, userController.delete)
userRouter.put('/',  AuthMiddleware.authenticate, userController.update)

export default userRouter;