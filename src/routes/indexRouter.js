import {Router} from 'express';
/* import { uploadSolution, viewUploadSolution, upload} from '../contollers/testContoller.js'; */
import { homepage } from '../contollers/indexController.js';


const router = Router()

router.get('/', homepage)
/* router.get('/upload',viewUploadSolution)
router.post('/upload', upload.single("file") ,uploadSolution) */

export default router