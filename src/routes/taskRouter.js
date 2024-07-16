import { Router } from "express";
import {
  uploadSolution,
  viewTask,
} from "../contollers/taskController.js";
import checkOrCreateAnswer from "../middlewares/fileSaver.js";
import { checkAnswerOvertime } from "../middlewares/taskMiddle.js";
import multerHandler from "../middlewares/mimetypeChecker.js";

const router = Router();

router.use("/topic/:topicId/task/:taskId", checkAnswerOvertime)


router.get("/topic/:topicId/task/:taskId", viewTask);



router.post(
  "/topic/:topicId/task/:taskId/upload",
  [
    checkOrCreateAnswer, 
    multerHandler, 
    uploadSolution
  ]
)

/*router.use((err, req, res, next) => {
  let path = `${req.baseUrl}${req.path.replace("/upload", "")}`
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.redirect(path)
        }
    }
    return next()
});

*/



export default router;
