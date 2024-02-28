import { Router } from "express";
import userRouter from './userRouter.js'
import indexRouter from "./indexRouter.js"
import jwtAuth from "../middlewares/jwtAuth.js"


const router = Router()
    router.use("/", userRouter)
    router.use("/", jwtAuth, indexRouter)

export default router