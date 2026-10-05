import { Request, Response, NextFunction } from "express";

export class NotFoundMiddleware {
  handle(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    return res.status(404).json({
      success: false,
      message: `Route ${req.method} ${req.originalUrl} not found`,
    });
  }
}

export const notFoundMiddleware =
  new NotFoundMiddleware();