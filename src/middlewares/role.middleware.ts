import {
  Request,
  Response,
  NextFunction,
} from "express";

import { ApiError } from "../lib/ApiError";

export class RoleMiddleware {

  static authorize(...allowedRoles: string[]) {

    return (
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {

      if (!req.user) {
        throw new ApiError(
          "Authentication required",
          401
        );
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new ApiError(
          "Access denied",
          403
        );
      }

      next();
    };
  }
}