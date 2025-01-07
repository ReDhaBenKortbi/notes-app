import { Request, Response, NextFunction } from "express";
import { mainLogger } from "../config/logger.js";

export const errorMiddleware = (
  err: { statusCode?: number; message?: string; stack?: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = err.statusCode || 500;
  const message: string = err.message || "Something went wrong";

  // Log error details for debugging
  mainLogger.error({
    message,
    status,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  res.status(status).json({
    status,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Include stack trace only in development
  });
};
