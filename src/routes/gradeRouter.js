import {Router} from 'express';
/* import { uploadSolution, viewUploadSolution, upload} from '../contollers/testContoller.js'; */
import { viewGrade } from '../contollers/gradeController.js';


const router = Router()

router.get("/grade/:gradeId", viewGrade)
/* router.get('/upload',viewUploadSolution)
router.post('/upload', upload.single("file") ,uploadSolution) */

export default router