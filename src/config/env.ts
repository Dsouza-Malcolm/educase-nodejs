import z from "zod";
import dotenv from "dotenv";

dotenv.config();

const EnvSchema = z.object({
  DATABASE_URL: z.string().nonempty(),
  PORT: z.coerce.number(),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.message);
  process.exit(1);
}

export const ENV = parsed.data;
