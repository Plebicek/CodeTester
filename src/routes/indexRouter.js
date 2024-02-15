import { Router } from "express";
import taskRouter from './testRouter.js'

const router = Router()
    router.use(taskRouter)


export default router