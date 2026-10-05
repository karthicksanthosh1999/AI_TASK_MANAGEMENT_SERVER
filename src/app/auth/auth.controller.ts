import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { APIResponse } from "../../lib/APIResponse";
import jwt from "jsonwebtoken";
import { UserService } from "../users/user.service";
import { ApiError } from "../../lib/ApiError";

export class AuthController{

    private readonly authService: AuthService;
    constructor(
        private readonly userService = new UserService()
    ){ 
        this.authService = new AuthService(); }
    ;

    login = async(req: Request, res: Response) => {
        const { email, password } = req.body;

        const loginUser = await this.authService.login({ email, password });

        res.cookie('accessToken', loginUser.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15 * 60 * 1000,
        });
          res.cookie('refreshToken', loginUser.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json( new APIResponse("User Login Successfully", 200, loginUser.user));
    };

    logout = async(req: Request, res: Response):Promise<void> => {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(200).json( new APIResponse("User Logout Successfully", 200, null));
    };

    me = async(req: Request, res: Response):Promise<void> => {
        const user = await this.authService.me(req.user?.id!);
        res.status(200).json( new APIResponse("User Fetch Successfully", 200, user));
    };

    forgetPassword = async(req: Request, res: Response): Promise<void> => {
        const {email} = req.body;
        if(!email) throw new ApiError("Email is required", 400);
        const user = await this.authService.forgetPassword(email);
        res.status(200).json(new APIResponse("OTP has been sent your email", 200, user))
    };

    verifiedOtp = async(req: Request, res: Response): Promise<void> => {
        const { email, otp } = req.body;
        if(!email) throw new ApiError("Email is required", 400);
        const user = await this.authService.verifyOTP(email, otp);
        res.status(200).json(new APIResponse("OTP has been verified", 200, user))
    };

    updatePassword = async(req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
         if(!email && !password) throw new ApiError("Email and Password is required", 400);
         const user = await this.authService.updatePassword(email, password);
         res.status(200).json( new APIResponse("User password updated successfully", 200, user))
    }
}