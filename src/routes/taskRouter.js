import { Router } from "express";
import {
  upload,
  uploadSolution,
  viewTask,
} from "../contollers/taskController.js";
import checkExistingFile from "../middlewares/fileSaver.js";
import { checkAnswerOvertime } from "../middlewares/taskMiddle.js";

const router = Router();

router.use("/topic/:topicId/task/:taskId", checkAnswerOvertime)

router.get("/topic/:topicId/task/:taskId", viewTask);
router.post(
  "/topic/:topicId/task/:taskId/upload",
  checkExistingFile,
  upload.single("file"),
  uploadSolution
);
export default router;
