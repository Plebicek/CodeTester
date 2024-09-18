import { Router } from "express";
import Logic from "./../logic/index.js"

const router = Router()

router.get("/", Logic.get)

export default router