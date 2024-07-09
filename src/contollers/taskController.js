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
    res.send("upload");
  } catch (error) {
    res.json({ error });
    next(error);
  }
  /*
  const taskId = parseInt(req.params.taskId);
  const userId = parseInt(req.user.id);
  let userAnswer = await createAnswer(taskId, userId);
  if (userAnswer instanceof Error) {
    return res.status(500).json("While sending an asnwer error has occured");
    }
  rename(
    JAVA_UPLOAD + req.file.originalname,
    JAVA_UPLOAD + userAnswer.answer_id + ".zip",
    (err) => {if (err) console.log(err)});
  await addTaskToQueue(userAnswer);
	console.log("added to queue")
  res.redirect(`${req.baseUrl}`); */
}
/*
export async function uploadSolution(req, res) {
  
  3. upload querz id, send it to request next
  4. this func, add to queue
  5. res.send("added to queue")??
  
  
  let userAnswer = await createAnswer(taskId, userId);
  if (userAnswer instanceof Error) {
    return res.status(500).json("While sending an asnwer error has occured");
  }
  rename(
    JAVA_UPLOAD + req.file.originalname,
    JAVA_UPLOAD + userAnswer.answer_id + ".zip",
    (err) => {if (err) console.log(err)});
  await addTaskToQueue(userAnswer);
	console.log("added to queue")
  res.redirect(`${req.baseUrl}`);
}
*/
