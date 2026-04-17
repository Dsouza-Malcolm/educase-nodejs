import type { Request, Response } from "express";
import { ApiError } from "../lib/api/error.js";
import { ApiResponse } from "../lib/api/response.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { createSchool, findSchoolByNameAndAddress } from "./repository.js";
import { schoolSchema } from "./schema.js";

export const addSchool = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const incomingData = req.body;

    const validatedData = schoolSchema.parse(incomingData);

    const existingSchool = await findSchoolByNameAndAddress({
      name: validatedData.name,
      address: validatedData.address,
    });

    if (existingSchool) throw new ApiError(409, "School already exists");

    const newSchool = await createSchool({
      ...validatedData,
    });

    res.status(201).json(
      new ApiResponse(201, "New school created", {
        id: newSchool.id,
        ...validatedData,
      }),
    );
  },
);
