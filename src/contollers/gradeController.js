import { getGradeAndTopicsById } from "../models/grade.js";
import { getTasksByTopicIds, getTopicsWithTasks } from "../models/topic.js";

export async function viewGrade(req, res) {
  let gradeId = parseInt(req.params.gradeId);
  if (isNaN(gradeId)) {
    return res.redirect("/");
  }
  try {
    let result = await getGradeAndTopicsById(gradeId);
    if (result instanceof Error || !result) {
      return res.redirect("/");
    }
    console.log(result);
    console.log(result.topics);
    console.log(result.topics[0].tasks);
    return res.render("grade", {
      grade: result,
      path: req.path,
    });
  } catch (err) {
    return res.redirect(`${req.baseUrl}`);
  }
  /*
  let tasksIds = [];
  try {
    let grade = await getGradeAndTopicsById(gradeId);
    if (!grade) {
      return res.redirect("/");
    }
    let datas = await getTopicsWithTasks(grade.grade_id);
    console.log(datas);
    console.log(grade);
    grade.topics.forEach((topics) => {
      tasksIds.push(topics.topic_id);
    });
    let tasks = await getTasksByTopicIds(tasksIds);
    console.log(tasks);
    tasksIds.sort((a, b) => {
      return a - b;
    });
    return res.render("grade", {
      grade: grade,
      tasks: tasks,
      task_order: tasksIds,
      topics: grade.topics,
      path: req.path,
    });
  } catch (err) {
    return res.status(500).redirect("/");
  }
  */
}
