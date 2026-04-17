import app from "./app.js";
import { db } from "./config/db.js";
import { ENV } from "./config/env.js";

app.listen(ENV.PORT, "0.0.0.0", async () => {
  try {
    await db.query("SELECT 1");
    console.log("Database connected");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }

  console.log(`Server running on port ${ENV.PORT}`);
});
