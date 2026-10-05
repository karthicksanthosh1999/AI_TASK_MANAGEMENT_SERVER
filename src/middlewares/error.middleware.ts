import { Request, Response, NextFunction } from "express";

export class ErrorMiddleware {
  handle(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    console.error(error);

    const message =
      error instanceof Error
        ? error.message
        : "Internal server error";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}

export const errorMiddleware =
  new ErrorMiddleware();