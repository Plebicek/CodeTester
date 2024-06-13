import { Router } from "express";
import multer from "multer";
import {
  upload,
  uploadSolution,
  viewTask,
} from "../contollers/taskController.js";
import checkExistingFile from "../middlewares/fileSaver.js";
import { checkAnswerOvertime } from "../middlewares/taskMiddle.js";

const router = Router();

router.use("/topic/:topicId/task/:taskId", checkAnswerOvertime)

router.get("/topic/:topicId/task/:taskId" , viewTask);

router.post(
  "/topic/:topicId/task/:taskId/upload",
  checkExistingFile,
  upload.single("file"),
  function(err,req,res,next) {
   if (err) {
    console.log("full url ",req.get("referer"))
    return next(err)
  }
  next()
  }, 
  uploadSolution
);

router.use((err, req, res, next) => {
  let path = `${req.baseUrl}${req.path.replace("/upload", "")}`
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.redirect(path)
        }
    }
    return res.redirect(req.get("referer")+`?error=${encodeURIComponent(err.message)}`)
});



export default router;
