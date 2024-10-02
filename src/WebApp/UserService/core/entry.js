import { Router } from "express";
import { IndexDomain, ClassDomain, TopicDomain } from "./domain.js"

const router = Router()

router.use("/", IndexDomain.isAuth)

// Class
router.get("/", ClassDomain.index)
router.get("/class/:classId/grade/:gradeId", TopicDomain.index)


export default router