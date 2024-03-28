import { getTaskById, getTopicsTasks } from "../models/task.js";
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
    //check requirements
    cb(null, JAVA_UPLOAD);
  },
  filename: function (req, file, cb) {
    //rename by id
    cb(null, file.originalname);
  },
});

export let upload = multer({ storage: storage });

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
  let taskId = parseInt(req.params.taskId);
  if (isNaN(taskId)) {
    return res.redirect("/");
  }
  try {
    let task = await getTaskById(taskId, req.user.id);
    task.task_due = dayjs(task.task_due).format("DD/MM/YYYY HH:mm:ss")
    if (task?.answers[0]) {
      let stats = task.answers[0]
      stats.percentage = (stats.pass / (stats.pass + stats.fails))*100
      stats.total = stats.pass + stats.fails
    }
    console.log(task?.answers[0])
    res.render("task", {
      stats : task?.answers[0],
      task: task,
      path: `${req.baseUrl}${req.path}`,
      msg: { errUpload: req.query.msgUpload },
    });
  } catch (err) {
    console.log(err)
    res.status(500).redirect("/");
  }
}

export async function uploadSolution(req, res) {
  console.log(req.file)
  let taskId = parseInt(req.params.taskId);
  let userId = parseInt(req.user.id);
  let userAnswer = await createAnswer(taskId, userId);
  console.log(userAnswer);
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
  res.redirect(`${req.baseUrl}/topic/${req.params.topicId}/task/${taskId}`);

  //create answer record to db
  //Needs:
  //max size
  //file type
  //if file require needs set to queue

  //rename file to uuid

  //task user.id task.id answer.id
  /* decompress(path.join(JAVA_PATH + req.file.originalname), JAVA_PATH) */
  /* res.status(200).json("File was successfully uploaded"); */
}
