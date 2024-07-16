import { getPureTask, getTopicsTasks } from "../models/task.js";
import path from "path";
import dayjs from "dayjs";
import { setTaskToQueue } from "../helper/queue.js";
import getTest from "../models/test.js";
export const JAVA_UPLOAD = path.join(process.cwd(), "/java/uploads/");
export const JAVA_TEST = path.join(process.cwd(), "/java/tests/");

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
  const errorMessageBadType = decodeURIComponent(req.query?.error || "");
  try {
    let task = await getPureTask(req.params.taskId);
    task.task_due = dayjs(task.task_due).format("DD.MM. YYYY HH:mm:ss");

    res.render("task", {
      stats: req.stats,
      task: task,
      path: `${req.baseUrl}${req.path}`,
      msg: { errUpload: req.query.msgUpload, badType: errorMessageBadType },
    });
  } catch (err) {
    console.log("View task contoller ", err);
    res.status(500).redirect("/");
  }
}

export async function uploadSolution(req, res, next) {
  const fileId = req.locals.answerId;
  const userId = req.user.id;
  const testId = await getTest(req.params.taskId);
  try {
    setTaskToQueue({ fileId, testId, userId });
    res.status(200).redirect(req.baseUrl) 
  } catch (error) {
    next(error);
  }
}

