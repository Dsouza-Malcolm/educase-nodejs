import type { Request, Response, Errback, NextFunction } from "express";
import { ApiError } from "../lib/api/error.js";
import logger from "../lib/logger.js";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  if (err instanceof Error) {
    logger.error(err.message, {
      method: req.method,
      url: req.originalUrl,
      statusCode,
      stack: err.stack,
      name: err.name,
    });
  } else {
    logger.error(message, {
      method: req.method,
      url: req.originalUrl,
      statusCode,
      error: err,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
