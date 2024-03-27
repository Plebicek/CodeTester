import { getGradesByUser, getGrades } from "../models/grade.js";
import { getGroupByUser } from "../models/user.js";

export async function homepage(req, res) {
  /*
  const gradeQuery = await getGradesByUser(req.user.id); //ToDo needs reduce sql select
  console.log(gradeQuery);
  let grades = gradeQuery.group_bridges[0]?.groups.grade_bridges;
  console.log(grades); */
  let groups = await getGroupByUser(req.user.id);
  console.log(groups);
  let grades = await getGrades(groups[0].group_id);
  console.log(grades);
  res.render("index", { grades: grades });
}
