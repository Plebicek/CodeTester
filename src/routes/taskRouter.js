import { Router } from "express";
import {
  upload,
  uploadSolution,
  viewTask,
} from "../contollers/taskController.js";
import checkExistingFile from "../middlewares/fileSaver.js";

const router = Router();


router.get("/topic/:topicId/task/:taskId", viewTask);
router.post(
  "/topic/:topicId/task/:taskId/upload",
  checkExistingFile,
  upload.single("file"),
  uploadSolution
);
export default router;
