import app from "./app.js";
import { ENV } from "./config/env.js";

app.listen(ENV.PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
