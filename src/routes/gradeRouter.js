import {Router} from 'express';
/* import { uploadSolution, viewUploadSolution, upload} from '../contollers/testContoller.js'; */
import { viewGrade } from '../contollers/gradeController.js';
import { isGrade } from "../middlewares/checkGrade.js";

const router = Router()

router.use("/grade/:gradeId", isGrade)

router.get("/grade/:gradeId",  viewGrade)
/* router.get('/upload',viewUploadSolution)
router.post('/upload', upload.single("file") ,uploadSolution) */

export default router