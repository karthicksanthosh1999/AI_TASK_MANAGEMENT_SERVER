import { Request, Response, NextFunction } from "express";

export class LoggerMiddleware {
  handle(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
    );

    next();
  }
}

export const loggerMiddleware =
  new LoggerMiddleware();