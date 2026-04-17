import { Router } from "express";
import { addSchool } from "./controller.js";

const router = Router();

router.post("/addSchool", addSchool);

router.get("/listSchools");

export default router;
