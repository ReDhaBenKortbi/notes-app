import { Request, Response, NextFunction } from "express";
import { mainLogger } from "../config/logger";

export const errorMiddleware = (
  err: { statusCode?: number; message?: string; stack?: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = err.statusCode || 500;
  const message: string = err.message || "Something went wrong";
  // Log the error details using mainLogger
  mainLogger.error({
    message: err.message,
    status: err.statusCode || 500,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  res.status(status).json({
    status,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : {}, // Send stack trace only in development
  });
};
