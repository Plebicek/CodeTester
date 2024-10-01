import { Router } from "express";
import ClassDomain from "./domain.js"

const router = Router()

router.get("/", ClassDomain.index)

export default router