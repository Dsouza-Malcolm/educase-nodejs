import z from "zod";
import dotenv from "dotenv";

dotenv.config();

const EnvSchema = z.object({
  DB_HOST: z.string().nonempty(),
  DB_PASSWORD: z.string().nonempty(),
  DB_USER: z.string().nonempty(),
  DB_NAME: z.string().nonempty(),
  DB_PORT: z.coerce.number().default(3306),
  PORT: z.coerce.number(),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.message);
  process.exit(1);
}

export const ENV = parsed.data;
