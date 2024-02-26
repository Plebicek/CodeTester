import {Router} from 'express';
import {ViewAllTests, uploadSolution, viewUploadSolution, upload} from '../contollers/testContoller.js';
import jwtAuth from "../middlewares/jwtAuth.js"

const router = Router()

router.get('/', ViewAllTests)
router.get('/upload', jwtAuth,  viewUploadSolution)
router.post('/upload', upload.single("file") ,uploadSolution)

export default router