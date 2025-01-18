import { getGradeAndTopicsById } from "../models/grade.js";

export async function viewGrade(req, res) {
  let gradeId = parseInt(req.params.gradeId);
  if (isNaN(gradeId)) {
    return res.redirect("/");
  }
  try {
    let result = await getGradeAndTopicsById(gradeId,parseInt(req.user.id));
    if (result instanceof Error || !result) {
      return res.redirect("/");
    }
    return res.render("grade", {
      grade: result,
      path: req.path,
    });
  } catch (err) {
    return res.redirect(`${req.baseUrl}`);
  }
}
