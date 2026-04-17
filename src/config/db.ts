import mysql2 from "mysql2/promise";
import { ENV } from "./env.js";

export const db = mysql2.createPool({
  uri: ENV.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  maxIdle: 30000,
  connectTimeout: 10000,
});
