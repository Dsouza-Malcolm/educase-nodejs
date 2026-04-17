import { Router } from "express";
import { addSchool, listSchools } from "./controller.js";

const router = Router();

router.post("/addSchool", addSchool);

router.get("/listSchools", listSchools);

export default router;
