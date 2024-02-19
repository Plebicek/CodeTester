import { Router } from "express";
import testRouter from './testRouter.js'
import userRouter from './userRouter.js'
import taskRouter from "./taskRouter.js"

const router = Router()
    router.use(testRouter)
    router.use(userRouter)
    router.use(taskRouter)

export default router