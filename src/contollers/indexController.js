import { getGradesByUser } from "../models/grade.js";

<<<<<<< HEAD
export async function homepage(req,res) {   
    const gradeQuery = await getGradesByUser(req.user.id) //ToDo needs reduce sql select
    console.log("user grade query "+gradeQuery)
    let grades =  gradeQuery?.group_bridges[0]?.groups?.grade_bridges
    if(!grades) {
        grades = undefined
    }
    res.render("index", {"grades" : grades}) 
=======
export async function homepage(req, res) {
  const gradeQuery = await getGradesByUser(req.user.id); //ToDo needs reduce sql select
  let grades = gradeQuery.group_bridges[0].groups.grade_bridges;
  console.log(grades);
  res.render("index", { grades: grades });
>>>>>>> ui
}
