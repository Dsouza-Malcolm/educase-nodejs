import type { RowDataPacket } from "mysql2";
import { db } from "../config/db.js";
import type { CreateSchool, FindSchoolInput, SchoolRow } from "./types.js";

export const createSchool = async (data: CreateSchool) => {
  const { name, address, latitude, longitude } = data;

  const sql = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;

  const values = [name, address, latitude, longitude];

  const [result]: any = await db.query(sql, values);

  return {
    id: result.insertId,
  };
};

export const fetchSchools = async (): Promise<SchoolRow[]> => {
  const sql = `SELECT * FROM schools`;

  const [rows] = await db.query<(SchoolRow & RowDataPacket)[]>(sql);

  return rows;
};

export const findSchoolByNameAndAddress = async (data: FindSchoolInput) => {
  const { name, address } = data;

  const sql = `
    SELECT id, name, address, latitude, longitude FROM schools
    WHERE name = ? AND address = ?
    LIMIT 1
  `;

  const values = [name, address];

  const [rows] = await db.query<(SchoolRow & RowDataPacket)[]>(sql, values);

  return rows.length > 0 ? rows[0] : null;
};
