import {
  searchUsers,
  getAllUsers,
  getGroups,
  getGrades,
  getTopics,
  getTasks,
  getAnswers,
  getTestsAndTopics,
  updateTask,
} from "../models/admin.js";
import { navigation } from "../utils/dashUtils.js";

/* export async function dashboard(req,res) {
    let {dashId} = req.params
    const URL = `${req.baseUrl}/`
    console.log(URL)
    switch (dashId) {
        case "users":
            return res.redirect(URL+"/users")
        case "groups":
            return res.redirect("/groups")
        default:
            return res.redirect(URL+"users")
    }
} */

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
    console.log(users);
  }
  console.log(users);

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
  console.log(path);
  const current = "Grades";
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
  let { gradeId } = req.params;
  console.log(gradeId);
  const current = "Topics";
  let topics = await getTopics(parseInt(gradeId));
  console.log(topics);
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
  let { topicId } = req.params;
  const current = "Tasks";
  let tasks = await getTasks(parseInt(topicId));
  console.log(tasks);
  res.render("admin/tasks", {
    sideNav: navigation,
    current: current,
    tasks,
    path,
  });
}

// === TESTS ===
export async function dashTest(req, res) {
  const current = "Tests";
  let topics = await getTestsAndTopics();
  res.render("admin/test", {
    sideNav: navigation,
    current: current,
    topics,
  });
}

export async function dashTestUpload(req, res) {
  const current = "Tests";
  let taskId = req.params.taskId;
  let test = await updateTask(parseInt(taskId));
  res.render("admin/pr-upload", {
    sideNav: navigation,
    current: current,
    test,
  });
}
// === ANSWERS ===
export async function dashAnswer(req, res) {
  let { taskId } = req.params;
  const current = "Answers";
  let answers = await getAnswers(parseInt(taskId));
  answers.forEach((answer) => {
    answer.percentage = Math.round(
      (answer.pass / (answer.fails + answer.pass)) * 100
    );
  });
  console.log(answers);
  res.render("admin/answers", {
    sideNav: navigation,
    current: current,
    answers,
  });
}
