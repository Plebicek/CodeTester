import {Router} from 'express';
import {ViewAllTests, uploadSolution, viewUploadSolution} from '../contollers/testContoller.js';

const router = Router()

router.get('/', ViewAllTests)
router.get('/uploadSolution', viewUploadSolution)
router.post('/uploadSolution', uploadSolution)

export default router