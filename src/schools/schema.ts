import z from "zod";

export const schoolSchema = z.object({
  name: z.string().nonempty().trim(),
  address: z.string().nonempty().trim(),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

export const findSchoolInputSchema = schoolSchema.pick({
  name: true,
  address: true,
});

export const schoolCoordinatesSchema = schoolSchema.pick({
  latitude: true,
  longitude: true,
});
