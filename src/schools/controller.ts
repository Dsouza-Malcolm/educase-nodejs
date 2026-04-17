import type { Request, Response } from "express";
import { ApiError } from "../lib/api/error.js";
import { ApiResponse } from "../lib/api/response.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import {
  createSchool,
  fetchSchools,
  findSchoolByNameAndAddress,
} from "./repository.js";
import { schoolCoordinatesSchema, schoolSchema } from "./schema.js";
import { getDistanceKm } from "../utils/distance.js";

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

export const listSchools = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const incomingQuery = req.query;

    const { latitude, longitude } =
      schoolCoordinatesSchema.parse(incomingQuery);

    const schools = await fetchSchools();

    if (schools.length === 0)
      return res.status(200).json(
        new ApiResponse(200, "No schools available", {
          count: 0,
          schools: [],
          userLocation: { latitude, longitude },
        }),
      );

    const schoolsWithDistance = schools.map((school) => {
      const distance = getDistanceKm(
        latitude,
        longitude,
        school.latitude,
        school.longitude,
      );

      return {
        ...school,
        distance,
      };
    });

    const sorted = [...schoolsWithDistance].sort(
      (a, b) => a.distance - b.distance,
    );

    return res.status(200).json(
      new ApiResponse(200, "List of schools by distance", {
        count: schoolsWithDistance.length,
        schools: sorted,
        userLocation: {
          latitude,
          longitude,
        },
      }),
    );
  },
);
