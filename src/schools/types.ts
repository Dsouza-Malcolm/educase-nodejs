import type z from "zod";
import type {
  findSchoolInputSchema,
  schoolCoordinatesSchema,
  schoolSchema,
} from "./schema.js";

export type School = z.infer<typeof schoolSchema>;

export type CreateSchool = School;

export type FindSchoolInput = z.infer<typeof findSchoolInputSchema>;

export type SchoolRow = School & { id: number };

export type SchoolCoordinates = z.infer<typeof schoolCoordinatesSchema>;
