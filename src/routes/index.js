import { Router } from "express";
import userRouter from './userRouter.js'
import indexRouter from "./indexRouter.js"
import gradeRouter from "./gradeRouter.js"
import taskRouter from "./taskRouter.js"
import jwtAuth from "../middlewares/jwtAuth.js"



const router = Router()
    router.use("/", userRouter)
    router.use("/", jwtAuth)
    router.use("/", indexRouter)
    router.use("/", gradeRouter)
    router.use("/grade/:gradeId/", taskRouter)

export default router