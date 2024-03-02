import {Router} from 'express';
import {upload, uploadSolution, viewTask, viewTasks} from '../contollers/taskController.js';

const router = Router()

router.get('/topic/:topicId', viewTasks)
router.get("/topic/:topicId/task/:taskId", viewTask)
router.post("/topic/:topicId/task/:taskId/upload", upload.single("file"), uploadSolution)
export default router

