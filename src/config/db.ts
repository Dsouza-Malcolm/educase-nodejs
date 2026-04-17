import mysql2 from "mysql2/promise";
import { ENV } from "./env.js";

export const db = mysql2.createPool({
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  maxIdle: 30000,
  connectTimeout: 10000,
});
