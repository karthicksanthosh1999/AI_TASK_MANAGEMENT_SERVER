import {
  Request,
  Response,
  NextFunction,
} from "express";

import { JWTService } from "../lib/JWTService";
import { ApiError } from "../lib/ApiError";

export class AuthMiddleware {

  static authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {

    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(
        "Authentication required",
        401
      );
    }

    try {

      const payload =
        JWTService.verifyAccessToken(token);

      req.user = {
        id: payload.id,
        role: payload.role,
        email: payload.email,
      };

      next();

    } catch (error) {

      throw new ApiError(
        "Invalid or expired access token",
        401
      );
    }
  }
}