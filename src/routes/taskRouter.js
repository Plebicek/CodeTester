import viewTasks from "../contollers/taskController.js"
import { Router } from "express"

const router = Router()

    router.get('/tasks', viewTasks)
    router.post("/test", function (req,res) {
    console.log(req.body)
    res.status(200).json('ok')
})

export default router
