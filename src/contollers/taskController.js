import { getPureTask,  getTopicsTasks } from "../models/task.js";
import multer from "multer";
import path from "path";
import { createAnswer } from "../models/answer.js";
import { rename } from "node:fs";
import { addTaskToQueue } from "../utils/taskQueue.js";
import dayjs from "dayjs";

export const JAVA_UPLOAD = path.join(process.cwd(), "/java/uploads/");
export const JAVA_TEST = path.join(process.cwd(), "/java/tests/");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, JAVA_UPLOAD);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export let upload = multer({ storage: storage , limits : {fileSize : 1024 }});

export async function viewTasks(req, res) {
  let topicId = parseInt(req.params.topicId);
  if (isNaN(topicId)) {
    return res.redirect("/");
  }
  try {
    let topic = await getTopicsTasks(topicId);
    res.render("tasks", {
      topic: topic.topic_name,
      tasks: topic.tasks,
      path: req.originalUrl,
    });
  } catch (err) {
    res.status(500).redirect("/");
  }
}

export async function viewTask(req, res) {
  try {
    let task = await getPureTask(req.params.taskId)
    task.task_due = dayjs(task.task_due).format("DD.MM. YYYY HH:mm:ss")

    res.render("task", {
      stats : req.stats,
      task: task,
      path: `${req.baseUrl}${req.path}`,
      msg: { errUpload: req.query.msgUpload },
    });
  } catch (err) {
    console.log("View task contoller ", err)
    res.status(500).redirect("/");
  }
}

export async function uploadSolution(req, res) {
  let taskId = parseInt(req.params.taskId);
  let userId = parseInt(req.user.id);
  let userAnswer = await createAnswer(taskId, userId);
  if (userAnswer instanceof Error) {
    return res.status(500).json("While sending an asnwer error has occured");
  }
  rename(
    JAVA_UPLOAD + req.file.originalname,
    JAVA_UPLOAD + userAnswer.answer_id + ".zip",
    (err) => {
      if (err) console.log(err);
    }
  );
  await addTaskToQueue(userAnswer);
  res.redirect(`${req.baseUrl}`);
}
