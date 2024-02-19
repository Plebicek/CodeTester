import viewTasks from "../contollers/taskController.js"
import { Router } from "express"

const router = Router()

router.get('/tasks', viewTasks)

export default router
