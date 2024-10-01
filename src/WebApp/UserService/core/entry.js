import { Router } from "express";
import Index from "./domain.js"
import ClassEntry from "./class/entry.js"

const router = Router()

router.use("/", Index.isAuth)

router.use("/", ClassEntry)

export default router