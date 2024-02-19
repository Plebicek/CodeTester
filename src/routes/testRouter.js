import {Router} from 'express';
import {ViewAllTests, uploadSolution, viewUploadSolution, upload} from '../contollers/testContoller.js';

const router = Router()

router.get('/', ViewAllTests)
router.get('/upload', viewUploadSolution)
router.post('/upload', upload.single("file") ,uploadSolution)

export default router