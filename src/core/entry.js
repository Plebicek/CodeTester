import { Router } from "express"
import Core from "./domain.js"
const router = Router()

router.get("/", Core.getIndex)

export default router