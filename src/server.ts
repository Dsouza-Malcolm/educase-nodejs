import app from "./app.js";
import { db } from "./config/db.js";

const PORT = 5000;

app.listen(PORT, async () => {
  try {
    await db.query("SELECT 1"); // ✅ test connection
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    process.exit(1);
  }

  console.log(`Server running on port ${PORT}`);
});
