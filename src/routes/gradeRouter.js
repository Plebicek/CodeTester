import { Router } from "express";
import { viewGrade } from "../contollers/gradeController.js";
import { isGrade } from "../middlewares/checkGrade.js";

const router = Router();

router.use("/grade/:gradeId", isGrade)

router.get("/grade/:gradeId", viewGrade);

export default router;
