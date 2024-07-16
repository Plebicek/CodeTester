import {
  searchUsers,
  getAllUsers,
  getGroups,
  getGrades,
  getTopics,
  getTasks,
  getAnswers,
  getTestsAndTopics,
  deleteAnswer,
} from "../models/admin.js";
import { JAVA_UPLOAD } from "./taskController.js";
import { navigation } from "../utils/dashUtils.js";
import {setTaskToTestQueue} from "../helper/test_queue.js";
import {rmSync} from "node:fs"

// === USERS ===
export async function dashUsers(req, res) {
  let users = await getAllUsers();
  const current = "Users";
  
  res.render("admin/users", {
    sideNav: navigation,
    current: current,
    users: users,
  });
}

export async function searchUser(req, res) {
  const current = "Users";
  let users = [];

  users = await searchUsers(req.body.user);

  if (!Array.isArray(users)) {
    users = [users];
  }

  res.render("admin/users", {
    sideNav: navigation,
    users: users,
    current: current,
  });
}

// === GROUP ===
export async function dashGroup(req, res) {
  const current = "Groups";
  let groups = await getGroups();
  
  res.render("admin/groups", { sideNav: navigation, current, groups });
}

// === GRADE ===
export async function dashGrade(req, res) {
  const path = `${req.baseUrl}${req.path}`;
  const current = "Groups";
  
  let grades = await getGrades();
  
  grades.sort((a, b) => {
    let num1 = parseInt(a.grade_name.split(".")[0]);
    let num2 = parseInt(b.grade_name.split(".")[0]);
    return num2 - num1;
  });
  
  res.render("admin/grades", {
    sideNav: navigation,
    current: current,
    grades: grades,
    path,
  });
}

// === TOPICS ===
export async function dashTopic(req, res) {
  const path = `${req.baseUrl}${req.path}`;
  const { gradeId } = req.params
  const current = "Groups";
  
  let topics = await getTopics(parseInt(gradeId));
  
  res.render("admin/topics", {
    sideNav: navigation,
    current: current,
    topics,
    path,
  });
}
// === TASKS ===
export async function dashTask(req, res) {
  const path = `${req.baseUrl}${req.path}`;
  const { topicId } = req.params;
  const current = "Groups";
  
  let tasks = await getTasks(parseInt(topicId));
  
  res.render("admin/tasks", {
    sideNav: navigation,
    current,
    tasks,
    path,
  });
}

// === TESTS ===
export async function dashTest(req, res) {
  const current = "Tests";
  let topics = await getTestsAndTopics();
  
  res.render("admin/tests", {
    sideNav: navigation,
    current: current,
    topics,
  });
}

export async function dashTestUpload(req, res) {
  const path = `${req.baseUrl}${req.path}`
  const current = "Tests";
  
  if (req.method == "POST") {
    setTaskToTestQueue({testId : req.locals.testId}) 
    return res.redirect(`${req.baseUrl}/tests`)
  }

  res.render("admin/pre-upload", {
    sideNav: navigation,
    current: current,
    path
  });
}

// === ANSWERS ===
export async function dashAnswer(req, res) {
  let { taskId } = req.params;
  const current = "Groups";
  
  let answers = await getAnswers(parseInt(taskId));
  console.log(answers)
  
  answers.forEach((answer) => {
    answer.percentage = Math.ceil((answer.pass / (answer.fails + answer.pass)) * 100);
  });

  res.render("admin/answers", {
    sideNav: navigation,
    current: current,
    answers,
    path : `${req.baseUrl}${req.path}`
  });
}

export async function deleteUserAnswer(req,res) {
  const answerId = req.body.answerId 
  try {
    await deleteAnswer(answerId)
    rmSync(JAVA_UPLOAD + `${answerId}.zip`)
    console.log(`${req.baseUrl}${req.path.replace("/delete-user", "")}`)
    return res.redirect(`${req.baseUrl}${req.path.replace("/delete-answer", "")}`)
  } catch (err) {
    return res.send("answer does not exists")
  } 
}
