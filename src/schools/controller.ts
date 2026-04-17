import type { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { schoolSchema } from "./schema.js";
import { ApiError } from "../lib/api/error.js";

export const addSchool = asyncErrorHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const incomingData = req.body;

    const validatedData = schoolSchema.safeParse(incomingData);
    if (!validatedData.success) {
      throw new ApiError(400, "Validation Error");
    }

    const { address, latitude, longitude, name } = validatedData.data;
  },
);
