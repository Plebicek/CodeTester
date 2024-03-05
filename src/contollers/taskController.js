import { getTaskById, getTopicsTasks } from "../models/task.js";
import { readdir } from "node:fs/promises";
import multer from "multer";
import path from "path";
import decompress from "decompress";
import { createAnswer } from "../models/answer.js";

const JAVA_PATH = path.join(process.cwd(), "/java/");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, JAVA_PATH);
  },
  filename: function (req, file, cb) {
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
    console.log(topic);
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
    let task = await getTaskById(taskId);
    console.log(task);
    console.log(req.originalUrl);
    res.render("task", { task: task, path: req.originalUrl });
  } catch (err) {
    res.status(500).redirect("/");
  }
}

export async function uploadSolution(req, res) {
  console.log(req.file);
  let { taskId } = req.params;

  //create answer record to db
  //Needs:
  //max size
  //file type
  //if file require needs set to queue

  //rename file to uuid

  //task user.id task.id answer.id
  /* decompress(path.join(JAVA_PATH + req.file.originalname), JAVA_PATH) */
  res.status(200).json("File was successfully uploaded");
}

export function viewUpload(req, res) {
  res.render("upload");
}
