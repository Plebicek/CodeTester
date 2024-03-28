import { getGrades } from "../models/grade.js";
import { getGroupByUser } from "../models/user.js";

export async function homepage(req, res) {
  let groups = await getGroupByUser(req.user.id);
  let filter = []
  if (groups.length > 0) {
    let gradesBridge = await getGrades(groups[0].group_id);
    filter = gradesBridge.sort((a,b) => {
      return parseInt(a.grades.grade_name.split(".")[0]) -  parseInt(b.grades.grade_name.split(".")[0])
    });
  }
   

  res.render("index", { grades: filter });
}
