import type { NextFunction, Request, Response } from "express";
import type { ApiError } from "../lib/api/error.js";

export const asyncErrorHandler = (reqHandler: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(reqHandler(req, res, next)).catch(next);
  };
};
