import { Router } from "express";
import multer from "multer";
import {
  uploadSolution,
  viewTask,
} from "../contollers/taskController.js";
import upload from "../utils/upload.js";
import checkOrCreateAnswer from "../middlewares/fileSaver.js";
import { checkAnswerOvertime } from "../middlewares/taskMiddle.js";


const router = Router();

router.use("/topic/:topicId/task/:taskId", checkAnswerOvertime)


router.get("/topic/:topicId/task/:taskId", viewTask);

router.post(
  "/topic/:topicId/task/:taskId/upload",
  [
    checkOrCreateAnswer, 
    upload.single("file"),
    uploadSolution
  ]
)

router.use((err, req, res) => {
  let path = `${req.baseUrl}${req.path.replace("/upload", "")}`
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.redirect(path)
        }
    }
    console.log(err)
    return res.redirect(req.get("referer")+`?error=${encodeURIComponent(err.message)}`)
});



export default router;
