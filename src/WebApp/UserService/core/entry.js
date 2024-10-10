import { Router } from "express";
import { IndexDomain, ClassDomain, TopicDomain, AssignmentDomain } from "./domain.js"

const router = Router()

router.use("/", IndexDomain.isAuth)

// Class
router.get("/", ClassDomain.index)
router.get("/class/:classId/grade/:gradeId", TopicDomain.index)
router.get("/class/:classId/grade/:gradeId/topic/:topicId/assignment/:assignmentId", AssignmentDomain.page)


export default router