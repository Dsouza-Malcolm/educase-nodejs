import z from "zod";

export const schoolSchema = z.object({
  name: z.string().nonempty("Name is required").trim(),
  address: z.string().nonempty("Address is required").trim(),
  latitude: z.coerce
    .number({
      error: "Latitude must be a number",
    })
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z.coerce
    .number({
      error: "Longitude must be a number",
    })
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
});

export const findSchoolInputSchema = schoolSchema.pick({
  name: true,
  address: true,
});

export const schoolCoordinatesSchema = schoolSchema.pick({
  latitude: true,
  longitude: true,
});
