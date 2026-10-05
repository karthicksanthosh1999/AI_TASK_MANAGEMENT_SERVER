import { Router } from "express";
import { AuthController } from "./auth.controller";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";
import { loginSchema } from "./auth.validation";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

const authRoute = Router();

const authController = new AuthController();

authRoute.post('/login', ValidationMiddleware.validate(loginSchema), authController.login);
authRoute.post('/logout', authController.logout);
authRoute.get('/me', AuthMiddleware.authenticate , authController.me.bind(authController));
authRoute.post('/forget-password', authController.forgetPassword);
authRoute.post('/verified-otp', authController.verifiedOtp);
authRoute.post('/update-password', authController.updatePassword)

export default authRoute;